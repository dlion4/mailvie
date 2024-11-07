from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from django.db import IntegrityError
from zerobounce.domain_registry.api.serializers import WhiteListDomainSerializer
from zerobounce.domain_registry.models import WhiteListDomain
from zerobounce.users.decorators import jwt_authentication_required
from django.utils.decorators import method_decorator
from rest_framework.exceptions import ValidationError
from drf_spectacular.utils import extend_schema


@extend_schema(tags=["White List Domains"])
class WhiteListDomainView(APIView):
    serializer_class = WhiteListDomainSerializer
    permission_classes = [permissions.AllowAny]
    model = WhiteListDomain
    @method_decorator(jwt_authentication_required)
    def post(self, request):
        try:
            serializer = self.serializer_class(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except (IntegrityError, ValidationError) as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @method_decorator(jwt_authentication_required)
    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        if pk is not None:
            return self.retrieve_organization(request, pk)
        return self.list_organizations(request)

    def list_organizations(self, request):
        organizations = self.model.objects.prefetch_related("owner").filter(owner=request.user)
        serializer = self.serializer_class(organizations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve_organization(self, request, pk):
        try:
            domain = self.model.objects.get(owner=request.user, pk=pk)
            serializer = self.serializer_class(domain)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except self.model.DoesNotExist:
            return Response(
                {"error": "No whitelist domains found"},
                status=status.HTTP_404_NOT_FOUND,
            )

    @method_decorator(jwt_authentication_required)
    def put(self, request, *args, **kwargs):
        return self.update_organization(request, kwargs["pk"])

    @method_decorator(jwt_authentication_required)
    def patch(self, request, *args, **kwargs):
        return self.update_organization(request, kwargs["pk"], partial=True)
    @method_decorator(jwt_authentication_required)
    def delete(self, request, *args, **kwargs):
        try:
            domain = self.model.objects.get(owner=request.user, pk=kwargs.get("pk"))
            domain.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except self.model.DoesNotExist:
            return Response(
                {"error": "No whitelist domains found"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def update_organization(self, request, pk, partial=False):
        try:
            domain = self.model.objects.get(owner=request.user, pk=pk)
            request.data["owner"] = request.user
            serializer = self.serializer_class(
                instance=domain,
                data=request.data,
                partial=partial,
                context={"request": request},
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        except self.model.DoesNotExist:
            return Response(
                {"error": "No whitelist domains found"},
                status=status.HTTP_404_NOT_FOUND,
            )
