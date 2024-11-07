from django.urls import path
from . import views

urlpatterns = [
    path("organization/", views.HandleOrganizationAPIView.as_view()),
    path(
        "organization/<int:pk>/",
        views.HandleOrganizationAPIView.as_view(),
        name="organization-detail",
    ),
    path(
        "organization/<int:pk>/projects",
        views.ProjectApiView.as_view(),
        name="organization-projects",
    ),
    path(
        "organization/<int:pk>/projects/<int:project_pk>",
        views.ProjectApiView.as_view(),
        name="organization-project-detail",
    ),
    path(
        "organization/<int:pk>/projects/<int:project_pk>/credentials",
        views.ProjectCredentialApiView.as_view(),
        name="organization-project-detail-credentials",
    ),
]
