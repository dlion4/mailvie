import secrets
import uuid
from rest_framework import views
from rest_framework import permissions
from django.utils.decorators import method_decorator
from rest_framework.response import Response
from rest_framework import status
from zerobounce.services.core.models import Organization, Project, Service
from zerobounce.services.core.serializers import OrganizationSerializer, ProjectSerializer, ServiceSerializer
from zerobounce.users.decorators import jwt_authentication_required
from django.db import IntegrityError
from rest_framework.exceptions import NotFound
from drf_spectacular.utils import extend_schema

@extend_schema(tags=["Organization"])
class HandleOrganizationAPIView(views.APIView):
    serializer_class = OrganizationSerializer
    model = Organization
    permission_classes = [permissions.AllowAny]

    @method_decorator(jwt_authentication_required)
    def post(self, request, *args, **kwargs):
        request.data["user"] = request.user
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        try:
            serializer.save()
        except IntegrityError:
            return Response(
                {"error": "Organization with this name already exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @method_decorator(jwt_authentication_required)
    def delete(self, request, *args, **kwargs):
        try:
            organization = self.model.objects.get(user=request.user, pk=kwargs["pk"])
            organization.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except self.model.DoesNotExist:
            return Response(
                {"error": "Organization not found"}, status=status.HTTP_404_NOT_FOUND
            )

    @method_decorator(jwt_authentication_required)
    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        if pk is not None:
            return self.retrieve_organization(request, pk)
        return self.list_organizations(request)

    def list_organizations(self, request):
        organizations = self.model.objects.filter(user=request.user)
        serializer = self.serializer_class(organizations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve_organization(self, request, pk):
        try:
            organization = self.model.objects.get(user=request.user, pk=pk)
            serializer = self.serializer_class(organization)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except self.model.DoesNotExist:
            return Response(
                {"error": "Organization not found"}, status=status.HTTP_404_NOT_FOUND
            )

    @method_decorator(jwt_authentication_required)
    def put(self, request, *args, **kwargs):
        return self.update_organization(request, kwargs["pk"])

    @method_decorator(jwt_authentication_required)
    def patch(self, request, *args, **kwargs):
        return self.update_organization(request, kwargs["pk"], partial=True)

    def update_organization(self, request, pk, partial=False):
        try:
            organization = self.model.objects.get(user=request.user, pk=pk)
            request.data["user"] = request.user
            serializer = self.serializer_class(
                instance=organization,
                data=request.data,
                partial=partial,
                context={"request": request},
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        except self.model.DoesNotExist:
            return Response(
                {"error": "Organization not found"}, status=status.HTTP_404_NOT_FOUND
            )

@extend_schema(tags=["Services"])
class ServiceAPIView(views.APIView):
    serializer_class = ServiceSerializer
    model = Service
    permission_classes = [permissions.AllowAny]
    
    def  get(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            self.model.objects.all(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@extend_schema(tags=["Projects"])
class ProjectApiView(views.APIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]
    model = Project
    @method_decorator(jwt_authentication_required)
    def get(self, request, *args, **kwargs):
        project_pk = kwargs.get("project_pk")
        if project_pk:
            return self.retrieve_project(request, *args, **kwargs)
        return self.list_projects(request, *args, **kwargs)

    @method_decorator(jwt_authentication_required)
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"organization_pk": kwargs.get("pk")})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    def _obtain_object(self,  organization_pk=None, project_pk=None):
        try:
            return self.model.objects.get(organization__pk=organization_pk, pk=project_pk)
        except self.model.DoesNotExist:
            raise NotFound(f"No {self.model.__class__.name} with the provided pks")
    def list_projects(self, request, *args, **kwargs):
        organization_pk = kwargs.get("pk")
        projects = self.model.objects.filter(organization_id=organization_pk)
        serializer = self.serializer_class(projects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def retrieve_project(self, request, *args, **kwargs):
        organization_pk = kwargs.get("pk")
        project_pk = kwargs.get("project_pk")
        serializer = self.serializer_class(
            instance=self._obtain_object(organization_pk, project_pk)
        )
        return Response(serializer.data, status=status.HTTP_200_OK)
    @method_decorator(jwt_authentication_required)
    def put(self, request, *args, **kwargs):
        project = self._obtain_object(kwargs.get("pk"), kwargs.get("project_pk"))
        serializer = self.serializer_class(
            instance=project,
            data=request.data,
            partial=True,
            context={"request": request},
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    @method_decorator(jwt_authentication_required)
    def delete(self, request, *args, **kwargs):
        project = self._obtain_object(kwargs.get("pk"), kwargs.get("project_pk"))
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@extend_schema(tags=["Project Credentials"])
class ProjectCredentialApiView(views.APIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]
    model = Project
    @method_decorator(jwt_authentication_required)
    def post(self,  request, *args, **kwargs):
        project = self._obtain_object(
            kwargs.get("pk"), kwargs.get("project_pk")
        )
        project.access_key = str(uuid.uuid4())
        project.secret_key = secrets.token_hex(32)
        project.save()
        return Response(
            {
                "secret_key": str(project.secret_key),
                "access_key": str(project.access_key),
            }
            , status=status.HTTP_201_CREATED)
    def _obtain_object(self,  organization_pk=None, project_pk=None):
        try:
            return self.model.objects.get(organization__pk=organization_pk, pk=project_pk)
        except self.model.DoesNotExist:
            raise NotFound(f"No {self.model.__class__.name} with the provided pks")

    @method_decorator(jwt_authentication_required)
    def get(self, request, *args, **kwargs):
        project = self._obtain_object(
            kwargs.get("pk"), kwargs.get("project_pk")
        )
        return Response(
            {
                "access_key": str(project.access_key),
                "secret_key": str(project.secret_key),
            },
            status=status.HTTP_200_OK,
        )

    @method_decorator(jwt_authentication_required)
    def delete(self, request, *args, **kwargs):
        project = self._obtain_object(
            kwargs.get("pk"), kwargs.get("project_pk")
        )
        project.access_key = None
        project.secret_key=None
        project.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
