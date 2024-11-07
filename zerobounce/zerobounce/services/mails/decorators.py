from functools import wraps
from rest_framework import exceptions
from django.conf import settings
from time import time
from collections import defaultdict
from rest_framework.response import Response
from rest_framework import status


# Example usage within a view
from zerobounce.services.core.models import Project
from zerobounce.users.models import User


def listen_for_operation_environ_for_db_selection(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        request.db = "production"
        return func(request, *args, **kwargs)

    return wrapper


def listen_for_operation_environ_for_selection(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        # Use .get() to fetch the header and provide a default for better readability
        sandbox = request.headers.get("X-Use-Sandbox")
        if sandbox is None:
            raise exceptions.ValidationError("X-Use-Sandbox header not set")
        # Set the sandbox value on the request object
        request.sandbox = sandbox.lower() in [
            "true",
            "1",
            "yes",
            True
        ]  # Cast the sandbox variable to a boolean
        return func(request, *args, **kwargs)

    return wrapper


def authenticate_project_secret_and_access_keys(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        # Use .get() with a default value to avoid explicitly checking for None
        access_key = request.headers.get("M-Project-Access-Key")

        if not access_key:
            raise exceptions.AuthenticationFailed(
                "M-Project-Access-Key Access key header not set"
            )
        try:
            project = Project.objects.get(access_key=access_key)
            # Combine the checks for project status into a single condition
            if not (project.is_active and not project.is_blacklisted):
                raise exceptions.AuthenticationFailed(
                    "Project is not active or is blacklisted"
                )

            request.project = project
            return func(request, *args, **kwargs)
        except Project.DoesNotExist:
            raise exceptions.AuthenticationFailed(
                f"No project with the provide access key {access_key}"
            )

    return wrapper


def set_endpoint_for_service(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        project = request.project
        service_name = project.service.name
        endpoints = {
            "Email Validation": {
                "sandbox": f"{settings.SANDBOX_BASE_ENDPOINT}",
                "production": f"{settings.PRODUCTION_BASE_ENDPOINT}",
            },
            # "IP Lookup": {
            #     "sandbox": "https://sandbox.iplookup.endpoint/api/v1",
            #     "production": "https://production.iplookup.endpoint/api/v1",
            # },
            # "Bulk SMS": {
            #     "sandbox": "https://sandbox.bulksms.endpoint/api/v1",
            #     "production": "https://production.bulksms.endpoint/api/v1",
            # },
            # "Email Sending": {
            #     "sandbox": "https://sandbox.emailsending.endpoint/api/v1",
            #     "production": "https://production.emailsending.endpoint/api/v1",
            # },
        }

        # Get the appropriate endpoint based on the service and sandbox mode
        if service_name in endpoints:
            if request.sandbox:  # Check if sandbox mode is active
                request.endpoint = endpoints[service_name]["sandbox"]
            else:
                request.endpoint = endpoints[service_name]["production"]
        else:
            raise exceptions.ValidationError("Invalid service specified")
        return func(request, *args, **kwargs)

    return wrapper


# Stores request timestamps for each user
user_request_log = defaultdict(list)



# def rate_limit(requests_per_period, period_in_seconds):
def handle_project_throttle_decorator(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        email = request.project.organization.user.email  #
        user = User.objects.get(email=email)
        user_id = user.id
        current_time = time()
        requests_per_period = 3
        period_in_seconds = 1
        print("the current time: ", current_time)
        if user.pricing_plan == "D":
            requests_per_period = 3
            period_in_seconds = 1
        elif user.pricing_plan == "S":
            requests_per_period = 5
            period_in_seconds = 60
        elif user.pricing_plan == "P":
            requests_per_period = 10
            period_in_seconds = 60

        user_request_log[user_id] = [
            timestamp
            for timestamp in user_request_log[user_id]
            if current_time - timestamp < period_in_seconds
        ]
        # Rate limit logic
        if len(user_request_log[user_id]) >= requests_per_period:
            return Response(
                {"detail": "Rate limit exceeded. Try again later."},
                status=status.HTTP_429_TOO_MANY_REQUESTS,
            )
        # Log current request
        user_request_log[user_id].append(current_time)
        return func(request, *args, **kwargs)
    return wrapper



# Higher-order decorator to combine the existing decorators
def check_project_and_deduct_credits(func):
    @listen_for_operation_environ_for_selection
    @authenticate_project_secret_and_access_keys
    @set_endpoint_for_service
    # @handle_project_throttle_decorator
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        project = (
            request.project
        )  # Get the project attached by the authenticate decorator

        # Check if the sandbox mode is enabled
        if (
            request.sandbox
        ):  # Assuming request.sandbox is already set by the previous decorator
            # Sandbox mode is active, do not deduct credits
            pass  # No action needed, just use the project in the view
        else:

            # Deduct credits if sandbox mode is not active
            if project.service.credits <= 0:
                raise exceptions.ValidationError(
                    "Insufficient credits; consider upgrading or purchasing more credits"
                )
            project.service.credits -= 1  # Deduct one credit
            project.save()  # Save the updated project
        # Attach project to the request for use in the view
        request.project = project
        return func(request, *args, **kwargs)

    return wrapper
