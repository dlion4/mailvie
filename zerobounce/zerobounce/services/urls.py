from django.urls import path, include

from zerobounce.services.core.views import ServiceAPIView


urlpatterns = [
    path("mails/", include("zerobounce.services.mails.urls")),
    path("core/", include("zerobounce.services.core.urls")),
    path("", ServiceAPIView.as_view()),
]
