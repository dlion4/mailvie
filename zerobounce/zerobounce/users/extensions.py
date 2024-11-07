# in zerobounce/users/extensions.py (or services.py)
from drf_spectacular.extensions import OpenApiAuthenticationExtension

class JWTAuthenticationExtension(OpenApiAuthenticationExtension):
    target_class = 'zerobounce.users.services.JWTAuthentication'  # Adjust based on your JWT class path
    name = 'JWTAuth'

    def get_security_definition(self, auto_schema):
        return {
            'type': 'http',
            'scheme': 'bearer',
            'bearerFormat': 'JWT',
        }

# Register the extension
JWTAuthenticationExtension.register()
