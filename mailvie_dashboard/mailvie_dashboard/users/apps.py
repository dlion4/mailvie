import contextlib

from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class UsersConfig(AppConfig):
    name = "mailvie_dashboard.users"
    verbose_name = _("Users")

    def ready(self):
        with contextlib.suppress(ImportError):
            import mailvie_dashboard.users.signals  # noqa: F401
