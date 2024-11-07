from django.urls import path
from . import views


urlpatterns = [
    path("validate", views.EmailValidationView.as_view()),
]
