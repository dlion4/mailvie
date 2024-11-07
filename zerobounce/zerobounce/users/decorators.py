from functools import wraps
from .services import JWTAuthentication
from rest_framework.response import Response
from rest_framework import status
from rest_framework import exceptions
import logging
import requests
import json
from zerobounce.config.common import env


MAIN_DASHBOARD_ENDPOINT_URL = env.str("MAIN_DASHBOARD_ENDPOINT_URL", None)

def jwt_authentication_required(func):
    @wraps(func)
    def wrapper(self, *args, **kwargs):
        request = self._request  # Access the DRF request object
        logger = logging.getLogger("authentication")
        try:
            logger.debug("Starting JWT authentication process.")
            user_and_token = JWTAuthentication().authenticate(
                request
            )  # Authenticate using the request
            if user_and_token is None:
                logger.debug("Authentication failed: No user or token returned.")
                raise exceptions.AuthenticationFailed("Authentication failed")

            user, _ = (
                user_and_token  # Unpack the user and token if authentication was successful
            )
            request.user = (
                user  # Attach the user to the request for later use in the view
            )
            logger.debug("JWT authentication successful.")
            return func(self, *args, **kwargs)  # Call the original function

        except exceptions.AuthenticationFailed as e:
            logger.error(f"Authentication error: {e}")
            return Response({"error": str(e)}, status=status.HTTP_401_UNAUTHORIZED)

    return wrapper


def validate_before_authorization(func):
    @wraps(func)
    def wrapper(self, *args, **kwargs):
        logger = logging.getLogger("validation")
        try:
            data = json.loads(self._request.body)
            response = requests.post(
                f"{MAIN_DASHBOARD_ENDPOINT_URL}/api/users/validate",
                json=data,
                timeout=5
            )
            response.raise_for_status()
            logger.debug("Data validation successful.")
            logger.debug(f"External validation response: {response.json()}")
        except requests.exceptions.RequestException as e:
            logger.error(f"External validation service error: {e}")
            if e.response is not None:
                status_code = e.response.status_code
                detail = json.loads(e.response.text)
            else:
                status_code = status.HTTP_502_BAD_GATEWAY
                detail = json.loads('{"detail": "External validation service error"}')
            return Response({"message": detail["detail"]}, status=status_code)
        except exceptions.PermissionDenied as e:
            logger.error(f"Authorization error: {e}")
            return Response({"message": str(e)}, status=status.HTTP_403_FORBIDDEN)
        return func(self, *args, **kwargs)
    return wrapper
