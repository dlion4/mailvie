from rest_framework import viewsets, mixins
from .models import User
from .permissions import IsUserOrCreatingAccountOrReadOnly
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    CreateUserSerializer,
    UserSerializer,
)
from rest_framework import permissions
from drf_spectacular.utils import extend_schema
from django.db import transaction


@extend_schema(tags=["User Management"])
class UserViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.ListModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """
    Updates and retrieves user accounts
    """

    def get_queryset(self):
        users_default = User.objects.all().order_by("-date_joined")
        return users_default

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = (IsUserOrCreatingAccountOrReadOnly, permissions.AllowAny,)

    def get_serializer_class(self):
        is_creating_a_new_user = self.action == "create"
        if is_creating_a_new_user:
            return CreateUserSerializer
        return self.serializer_class

    def update(self, request, *args, **kwargs):
        user_instance = self.get_object()
        serializer = self.get_serializer(user_instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                user_instance = self.get_object()
                user_instance.delete()
        except Exception as e:
            return Response(
                {"detail": f"Failed to delete user: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(status=status.HTTP_204_NO_CONTENT)
