from django.urls import path
from . import views

urlpatterns = [
    path("api-key", views.CredentialApiView.as_view(), name="api_key_view"),
]