from zerobounce.users.models import User
from .models import Organization, Project, Service
from rest_framework import serializers
from django.db import IntegrityError
from rest_framework.exceptions import ValidationError


class ProjectSerializer(serializers.ModelSerializer):
    service_name = serializers.CharField(
        max_length=100, write_only=True
    )  # For input only
    organization = serializers.PrimaryKeyRelatedField(read_only=True)
    service = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Project
        fields = [
            "pk",
            "organization",
            "service",
            "service_name",
            "name",
            "created_at",
            "updated_at",
            "is_active",
            "is_blacklisted",
            "secret_key",
            "access_key",
        ]
        read_only_fields = [
            "secret_key",
            "access_key",
            "organization",
            "service",
        ]

    def create(self, validated_data: dict):
        organization_pk = self.context.get("organization_pk")
        service_name = validated_data.pop("service_name")

        try:
            service = Service.objects.get(name__iexact=service_name)
            organization = Organization.objects.get(pk=organization_pk)
            project = Project.objects.create(
                organization=organization, service=service, **validated_data
            )
            return project
        except (Service.DoesNotExist, Organization.DoesNotExist, IntegrityError) as e:
            raise ValidationError(detail=str(e))


class ServiceSerializer(serializers.ModelSerializer):
    projects = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = ["name", "created_at", "credits", "projects"]

    def create(self, validated_data):
        try:
            service = Service.objects.create(**validated_data)
            return service
        except IntegrityError as e:
            raise ValidationError(detail=str(e))

    def get_projects(self, obj):
        instance = (
            obj.service_project.all()
        )  # Assuming 'service_project' is the related name
        return ProjectSerializer(instance, many=True).data


class OrganizationSerializer(serializers.ModelSerializer):
    projects = ProjectSerializer(many=True, read_only=True)
    services = ServiceSerializer(many=True, read_only=True)

    class Meta:
        model = Organization
        fields = ["id", "name", "services", "projects"]

    def create(self, validated_data):
        user = self.context["request"].user
        if not User.objects.filter(email=user.email).exists():
            raise serializers.ValidationError({"error": "User does not exist."})
        try:
            organization = Organization.objects.create(user=user, **validated_data)
            return organization
        except IntegrityError as e:
            print(f"IntegrityError: {e}")
            raise serializers.ValidationError(
                {"error": "You already have an organization with the same name!"}
            )
