import json
from django.conf import settings
from django.urls import path, include
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic.base import RedirectView
from rest_framework.authtoken import views
from rest_framework import permissions
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)
from .routers import urlpatterns as router_urlpatterns
from rest_framework.response import Response
from rest_framework.views import APIView, status
from zerobounce.users.urls import urlpatterns as users_urlpatterns

class HelloTRPCAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, *args, **kwargs):
        caller = request.query_params.get("name")
        print(dir(request))
        return Response(
            {"message": f"Hello, TRPC API!: instance from the rpc: {caller}"},
            status=status.HTTP_200_OK,
        )


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router_urlpatterns)),
    path("api/auth/", include("zerobounce.users.urls")),
    path("api/services/", include("zerobounce.services.urls")),
    path("api-token-auth/", views.obtain_auth_token),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    # SCHEMA DRF PATTERNS
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    # Optional UI:
    path(
        "api/schema/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "api/schema/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
    path("", RedirectView.as_view(permanent=True, pattern_name="swagger-ui")),
    # TEST
    path("api/auth/hello", HelloTRPCAPIView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
