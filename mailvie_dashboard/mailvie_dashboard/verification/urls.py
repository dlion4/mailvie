from django.urls import path, include


urlpatterns = [
    path(
        "mails/",
        include("mailvie_dashboard.verification.mails.urls", namespace="mails")),
]
