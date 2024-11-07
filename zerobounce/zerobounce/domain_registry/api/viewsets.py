from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from zerobounce.domain_registry.api.serializers import WhiteListDomainSerializer
from zerobounce.users.decorators import jwt_authentication_required
from rest_framework import status
from django.utils.decorators import method_decorator
from rest_framework.response import Response

class WhiteListDomainViewSet(ModelViewSet):
    serializer_class = WhiteListDomainSerializer
    permission_classes = [permissions.AllowAny]
    @method_decorator(jwt_authentication_required)
    def create(self, request, *args, **kwargs):
        print(request.user)
        return Response({}, status=status.HTTP_201_CREATED)
        


