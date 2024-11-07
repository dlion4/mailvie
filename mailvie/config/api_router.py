from rest_framework_nested import routers

from mailvie.updates.viewsets import BlogViewSet
from mailvie.updates.viewsets import TagViewSet
from mailvie.users.api.views import UserViewSet

router = routers.SimpleRouter()

router.register("users", UserViewSet)

router.register(r"tags", TagViewSet)

tag_router = routers.NestedSimpleRouter(router, r"tags", lookup="tag")
tag_router.register(r"blogs", BlogViewSet, basename="tag-blogs")
# 'basename' is optional. Needed only if the same viewset is registered more than once
# Official DRF docs on this option: http://www.django-rest-framework.org/api-guide/routers/

app_name = "api"
urlpatterns = [
    *router.urls,
    *tag_router.urls,  # Add nested router URLs to the main URL patterns
]
