# from rest_framework_nested import routers
from rest_framework.routers import SimpleRouter
from zerobounce.domain_registry.api.viewsets import WhiteListDomainViewSet
from zerobounce.users.viewsets import UserViewSet
from django.urls import path
from django.urls import include


router = SimpleRouter()
router.register(r"users", UserViewSet, basename="User")
router.register(r"domain-registry", WhiteListDomainViewSet, basename="DomainRegistry")

urlpatterns = [
    *router.urls,
    # Add your URL patterns here
    path("domain-registration", include("zerobounce.domain_registry.urls")),
]
