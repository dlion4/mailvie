import uuid
import jwt
import datetime
from django.conf import settings
from rest_framework import authentication, exceptions
from .models import User
from datetime import timezone
from zerobounce.config.setup import load_keys

# Key configurations for JWT
RSA_PRIVATE_KEY = load_keys()[0]
RSA_PUBLIC_KEY = load_keys()[1]
JWT_EXPIRATION_DELTA = 3600  # 1 hour for access token
JWT_REFRESH_EXPIRATION_DELTA = 86400 * 7  # 7 days for refresh token


class JWTAuthentication(authentication.BaseAuthentication):
    """
    Custom JWT Authentication Class for validating access and refresh tokens.
    """

    def authenticate(self, request):
        auth = request.headers.get("Authorization", None)
        if not auth:
            # raise exceptions.AuthenticationFailed(
            #     "Authorization header must be provided"
            # )
            return None
        try:
            token_type, token = auth.split()
            if token_type.lower() != "bearer":
                raise exceptions.AuthenticationFailed(
                    "Authorization header must start with Bearer"
                )

            if token_type.lower() == "bearer":
                return self.authenticate_access_token(token)
        except ValueError:
            raise exceptions.AuthenticationFailed("Invalid authorization header format")

    def authenticate_access_token(self, token):
        try:
            payload = jwt.decode(
                token,
                RSA_PUBLIC_KEY,
                algorithms=["RS256"],
                options={"verify_aud": True},  # Enable audience verification
                audience=settings.JWT_AUDIENCE,  # Check audience
                issuer=settings.JWT_ISSUER,  # Check issuer
            )
            user = User.objects.get(id=payload["user_id"])
            return (user, token)

        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed("Access token has expired")

        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed("Invalid access token")

    @staticmethod
    def generate_access_token(user):
        payload = {
            "user_id": str(user.id),
            "exp": datetime.datetime.now(timezone.utc)
            + datetime.timedelta(seconds=JWT_EXPIRATION_DELTA),
            "iat": datetime.datetime.now(timezone.utc),  # Issued at
            "jti": str(uuid.uuid4()),  # JWT ID for uniqueness
            "iss": settings.JWT_ISSUER,
            "aud": settings.JWT_AUDIENCE,
            # 'role': user.role,  # Example of adding user role or permissions
        }
        return jwt.encode(payload, RSA_PRIVATE_KEY, algorithm="RS256")

    @staticmethod
    def generate_refresh_token(user):
        payload = {
            "user_id": str(user.id),
            "exp": datetime.datetime.now(timezone.utc) + datetime.timedelta(seconds=JWT_REFRESH_EXPIRATION_DELTA),
            "refresh": True,
            "iat": datetime.datetime.now(timezone.utc),  # Issued at
            "jti": str(uuid.uuid4()),  # JWT ID for uniqueness
            "iss": settings.JWT_ISSUER,
            "aud": settings.JWT_AUDIENCE,
        }
        return jwt.encode(payload, RSA_PRIVATE_KEY, algorithm="RS256")
