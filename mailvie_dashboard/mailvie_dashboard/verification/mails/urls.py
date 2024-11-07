from django.urls import path

from . import views
app_name = "mails"
urlpatterns =[
    path(
        "validate-single", views.SingleEmailAddressValidationAPIView.as_view(),
         name="validate_single_email"),
]

