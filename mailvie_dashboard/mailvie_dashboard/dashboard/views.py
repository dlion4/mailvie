from django.shortcuts import render
from django.views.generic import TemplateView

class HomeView(TemplateView):
    template_name="pages/home.html"
# Create your views here.
class CredentialApiView(TemplateView):
    template_name = "pages/api-keys.html"
# Create your views here.
class BillingView(TemplateView):
    template_name = "pages/billing.html"

# Create your views here.
class EmailVerificationView(TemplateView):
    template_name = "pages/email_verify.html"

class FileListVerificationView(TemplateView):
    template_name = "pages/files.html"

class AccountSettingsView(TemplateView):
    template_name = "pages/account_settings.html"