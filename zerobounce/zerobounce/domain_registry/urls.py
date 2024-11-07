from django.urls import path
from .api import views as api_views

urlpatterns = [
    path("", api_views.WhiteListDomainView.as_view()),
    path("/<pk>", api_views.WhiteListDomainView.as_view()),
]
