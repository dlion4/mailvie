from django.urls import path
from .views import (
    AuthorizeProvideTokenView,
    CreateUserAPIView,
    RenewAccessRefreshTokenView,
    ResetPasswordAPIView,
    ResetRequestPasswordAPIView,
)

urlpatterns = [
    path("login", AuthorizeProvideTokenView.as_view()),
    path("signup", CreateUserAPIView.as_view()),
    path("password-reset-request", ResetRequestPasswordAPIView.as_view()),
    path("password-reset/<password_reset_token>", ResetPasswordAPIView.as_view(), name="password_reset"),
    path(
        "renew/access-refresh-token",
        RenewAccessRefreshTokenView.as_view(),
    ),
]
