import json
import threading
from django.urls import reverse
from rest_framework import viewsets, mixins
from drf_spectacular.utils import extend_schema, OpenApiParameter
from zerobounce.config.utils import send_background_email
from .decorators import validate_before_authorization
from django.utils.decorators import method_decorator
from zerobounce.users.task import ThreadManager, send_tokens_to_webhook
from .models import User
from .permissions import IsUserOrCreatingAccountOrReadOnly
from .serializers import (
    CreateUserSerializer, UserPasswordResetSerializer, UserSerializer,
    UserAuthenticationSerializer,
    RefreshTokenAccessRetrieveSerializer
)
from django.db import IntegrityError
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.request import Request
from django.conf import settings
from .services import JWTAuthentication
import jwt
from .services import  RSA_PUBLIC_KEY
from zerobounce.config.utils import expiring_token_generator

manager = ThreadManager()

@extend_schema(tags=["User Management"])
class UserViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet):
    """Updates and retrieves user accounts"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsUserOrCreatingAccountOrReadOnly,)

    def get_serializer_class(self):
        is_creating_a_new_user = self.action == 'create'
        if is_creating_a_new_user:
            return CreateUserSerializer
        return self.serializer_class
    
    def dispatch(self, request, *args, **kwargs):
        if self.action in ['create', 'update', 'retrieve']:
            decorated_method = validate_before_authorization(getattr(self, self.action))
            return decorated_method(request, *args, **kwargs)
        return super().dispatch(request, *args, **kwargs)


@extend_schema(tags=["User Creation"])
class CreateUserAPIView(generics.CreateAPIView):
    """Creates a new user account"""
    permission_classes = [AllowAny]
    @method_decorator(validate_before_authorization)
    def post(self, request, *args, **kwargs):
        try:
            user = User.objects.create_user(
                email=request.data.get("email"),
                password=request.data.get("password"),
            )
            user.save()
            return Response(
            {"message": "user created successfully"},
            status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({"message": "email already exists"}, status=status.HTTP_400_BAD_REQUEST)

@extend_schema(tags=["Authorization Token"])
class AuthorizeProvideTokenView(generics.CreateAPIView):
    """View to obtain a new access and refresh token."""
    serializer_class = UserAuthenticationSerializer
    permission_classes=[AllowAny]
    @method_decorator(validate_before_authorization)
    def post(self, request:Request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            user = User.objects.get(email=serializer.data.get("email"))
            if user.check_password(serializer.data.get("password")):
                access_token = JWTAuthentication.generate_access_token(user)
                refresh_token = JWTAuthentication.generate_refresh_token(user)
                manager.run_function_in_thread(send_tokens_to_webhook, access_token,refresh_token, user.email)
                return Response({
                    'access_token': access_token,
                    'refresh_token': refresh_token,
                    "username": user.username,
                    "email":user.email,
                    "phone": "", 
                    "date_joined": user.date_joined,
                    "is_active": user.is_active,
                    "user_id": str(user.id),
                    }, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


@extend_schema(tags=["Refresh Token"])
class RenewAccessRefreshTokenView(generics.GenericAPIView):
    """View to refresh the access token using the refresh token."""
    serializer_class = RefreshTokenAccessRetrieveSerializer
    permission_classes=[AllowAny]

    def post(self, request:Request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        if not serializer.data.get("refresh_token"):
            return Response({'error': 'Refresh token is required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            payload = jwt.decode(
                serializer.data.get("refresh_token"),
                RSA_PUBLIC_KEY,
                algorithms=['RS256'],
                audience=settings.JWT_AUDIENCE,
                issuer=settings.JWT_ISSUER, 
            )
            if not payload["refresh"]:
                return Response({'error': 'Please provide refresh token'}, status=status.HTTP_401_UNAUTHORIZED)
            try:
                user = User.objects.get(id=payload['user_id'])
                new_access_token = JWTAuthentication.generate_access_token(user)
                new_refresh_token = JWTAuthentication.generate_refresh_token(user)

                return Response({
                    'access_token': new_access_token,
                    'refresh_token': new_refresh_token,
                }, status=status.HTTP_200_OK)

            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except jwt.ExpiredSignatureError:
            return Response({'error': 'Refresh token has expired'}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.InvalidTokenError as e:
            return Response({'error': f'Invalid refresh token ~ {str(e)}'}, status=status.HTTP_401_UNAUTHORIZED)


@extend_schema(tags=["Request Password Reset"])
class ResetRequestPasswordAPIView(generics.GenericAPIView):
    serializer_class = UserPasswordResetSerializer
    permission_classes = [AllowAny]

    def _send_thread_email(self, user:User,link:str, *args, **kwargs):
        thread = threading.Thread(
            target=send_background_email,
            args=(None, "mails/reset-password-sent-link.html", {"username": user.username, "link": link}, [user.email]),
        )
        thread.start()

    @extend_schema(operation_id="reset_password_request")
    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        try:
            user = User.objects.get(email=email)
            password_reset_token = expiring_token_generator.make_token(user)
            link = str(
                f"{settings.AUTH_SERVICE_PROVIDER_URL}/password-reset/{password_reset_token}"
            )
            self._send_thread_email(user, link)
        except User.DoesNotExist:
            manager.run_function_in_thread(send_tokens_to_webhook, access_token='', refresh_token='', email=email)
            return Response({"message": "No  user with that email address"}, status=status.HTTP_404_NOT_FOUND)
        manager.run_function_in_thread(send_tokens_to_webhook, access_token='', refresh_token='', email=email)
        return Response({"message":  "Password reset link sent", "token": password_reset_token}, status=status.HTTP_200_OK)


@extend_schema(tags=["Password Reset"])
class ResetPasswordAPIView(generics.GenericAPIView):
    serializer_class = UserPasswordResetSerializer
    permission_classes = [AllowAny]
    @extend_schema(
        parameters=[
            OpenApiParameter("password_reset_token", str, location=OpenApiParameter.PATH)
        ],
        operation_id="reset_password"
    )
    def post(self, request, *args, **kwargs):
        url_params_token = kwargs.get("password_reset_token")

        encoded_uuid, _, _, _ = url_params_token.rsplit("-", 3)
        decoded_uuid = expiring_token_generator.base64_decode_uuid(encoded_uuid)
        try:
            user = User.objects.get(id=decoded_uuid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"message": "No user could be found with the provided token"},
                status=status.HTTP_404_NOT_FOUND,
            )
        if user and expiring_token_generator.check_token(user, url_params_token):
            request.data.update({"email": user.email})
            serializer = UserPasswordResetSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.update(user, serializer.validated_data)
            return Response({"message": "Password reset successful"}, status=status.HTTP_200_OK)
        return Response({"message": "The provided token is expired. Request a new token"},
            status=status.HTTP_400_BAD_REQUEST)
