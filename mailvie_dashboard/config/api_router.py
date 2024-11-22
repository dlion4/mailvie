from django.conf import settings
from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter

from mailvie_dashboard.users.api import views
from mailvie_dashboard.users.api.views import UserViewSet

router = DefaultRouter() if settings.DEBUG else SimpleRouter()

router.register("users", UserViewSet)


app_name = "api"
urlpatterns = [
    *router.urls,
    path("users/validate", views.ValidateUserAPIView.as_view()),
]




