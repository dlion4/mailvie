from django.apps import AppConfig


class UsersConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "zerobounce.users"  # Replace 'myapp' with your actual app name

    def ready(self):
        import zerobounce.users.signals  # Import the signals module
        import zerobounce.config.setup  # noqa: F401
        from zerobounce.openapi import JWTAuthenticationScheme  # noqa: F401
