from django.urls import path

from . import views

urlpatterns = [
    path("", views.HomeView.as_view(), name="home"),
    path("verify-api-key", views.CredentialApiView.as_view(), name="api_key_view"),
    path("billing", views.BillingView.as_view(), name="billing_view"),
    path("verify", views.EmailVerificationView.as_view(), name="email_verify_view"),
    path("settings", views.AccountSettingsView.as_view(), name="account_setting_view"),
    path(
        "upload-files",
        views.FileListVerificationView.as_view(),
        name="email_list_verify_view",
    ),
]
