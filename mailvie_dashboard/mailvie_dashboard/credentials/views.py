from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.
class CredentialApiView(TemplateView):
    template_name = "pages/api-keys.html"