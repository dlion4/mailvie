from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.mixins import UpdateModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from mailvie_dashboard.users.models import User

from .serializers import UserSerializer


class UserViewSet(RetrieveModelMixin, ListModelMixin, UpdateModelMixin, GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = "pk"

    def get_queryset(self, *args, **kwargs):
        assert isinstance(self.request.user.id, int)
        return self.queryset.filter(id=self.request.user.id)

    @action(detail=False)
    def me(self, request):
        serializer = UserSerializer(request.user, context={"request": request})
        return Response(status=status.HTTP_200_OK, data=serializer.data)


class ValidateUserAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        source = request.data.get("source", None)
        email = request.data.get("email")
        password = request.data.get("password")
        if not source:
            return self._error_response(
                "Expected source", status.HTTP_417_EXPECTATION_FAILED)
        if source == "signup":
            return self._handle_signup(request, email, password)
        if source == "login":
            return self._handle_login(request, email, request.data)
        return self._error_response("Invalid source", status.HTTP_400_BAD_REQUEST)

    def _handle_signup(self,request, email, password):
        """Handle signup logic"""
        if not email:
            return self._error_response(
                "Expected email", status.HTTP_417_EXPECTATION_FAILED)
        if User.objects.filter(email=email).exists():
            return Response({"detail": "user exists already"})
        user = User.objects.create_user(email=email, password=password)
        serializer = UserSerializer(instance=user, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def _handle_login(self,request, email, data):
        """Handle login logic"""
        if not email:
            return self._error_response(
                "Expected email", status.HTTP_417_EXPECTATION_FAILED)

        password = data.get("password")
        if not password:
            return self._error_response(
                "Expected password", status.HTTP_417_EXPECTATION_FAILED)
        user = User.objects.filter(email=email).first()
        if not user:
            return self._handle_signup(request, email, password)
        if not user or not user.check_password(password):
            return self._error_response(
                "Invalid credentials", status.HTTP_401_UNAUTHORIZED)
        return Response({"detail": ""},status=status.HTTP_200_OK)
    def _error_response(self, detail, status_code):
        """Helper function to return error response"""
        return Response(data={"detail": detail}, status=status_code)
