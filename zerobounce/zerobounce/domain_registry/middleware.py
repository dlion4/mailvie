from django.conf import settings
from django.core.cache import cache
from zerobounce.domain_registry.models import WhiteListDomain
from django.db.models import Q
class CORSAllowedOriginsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not hasattr(settings, "CORS_ALLOWED_ORIGINS_INITIALIZED"):
            cached_cors_origins = cache.get("cors_allowed_origins")
            if cached_cors_origins is None:
                cors_origins:list = list(
                    WhiteListDomain.objects.filter(Q(is_active=True)&Q(is_verified=True)).values_list("domain_name", flat=True)
                )
                cache.set("cors_allowed_origins", cors_origins, timeout=300)
            else:
                cors_origins:list = cached_cors_origins
            cors_origins.append("http://localhost:5173")
            settings.CORS_ALLOWED_ORIGINS = cors_origins
            settings.CORS_ALLOWED_ORIGINS_INITIALIZED = True  # Prevent reinitialization
        response = self.get_response(request)
        return response
