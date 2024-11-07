
from django.conf import settings
from django.shortcuts import redirect


class EnsureAuthenticatedMiddleware:
    """
    Middleware to ensure that the user is authenticated.
    If not, redirect them to the external login page.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        if "application/json" in request.META.get("HTTP_ACCEPT", ""):
            return self.get_response(request)

        if not request.user.is_authenticated:
            auth_redirect_url = f"{settings.AUTH_DOMAIN}/login"
            return redirect(auth_redirect_url)

        return self.get_response(request)
