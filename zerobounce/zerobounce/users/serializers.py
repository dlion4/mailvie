from rest_framework import serializers

from zerobounce.services.core.serializers import OrganizationSerializer
from .models import User
from django.db import transaction

class UserSerializer(serializers.ModelSerializer):
    # whitelist_domains = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "is_subscribed",
            # "whitelist_domains",
        )
        read_only_fields = ("username",)

    # def get_whitelist_domains(self, obj):
    #     from zerobounce.domain_registry.api.serializers import WhiteListDomainSerializer
    #     whitelist_domains = obj.domain_owner.all()  # Assumes a reverse relationship
    #     return WhiteListDomainSerializer(whitelist_domains, many=True).data


class CreateUserSerializer(serializers.ModelSerializer):
    organizations = OrganizationSerializer(many=True, read_only=True)

    def create(self, validated_data):
        print(validated_data)
        try:
            user = User.objects.create_user(**validated_data)
            return user
        except Exception as e:
            raise serializers.ValidationError(f"Error creating user: {str(e)}")



    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "password",
            "username",
            "first_name",
            "last_name",
            "is_superuser",
            "is_active",
            "is_staff",
            "organizations",
        )
        read_only = [
            "is_superuser",
            "is_active",
            "is_staff",]
        extra_kwargs = {"password": {"write_only": True}}


class UserAuthenticationSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=2555)
    password = serializers.CharField(max_length=200)
    source = serializers.CharField(read_only=True, max_length=100, allow_blank=True)


class UserPasswordResetSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, allow_blank=True)
    password = serializers.CharField(max_length=100, min_length=8, allow_blank=True)
    password2 = serializers.CharField(max_length=100, min_length=8, allow_blank=True)

    class Meta:
        model = User
        fields = ["email", "password", "password2"]

    def validate(self, data):
        """
        Check that the two password fields match.
        """
        password = data.get("password")
        password2 = data.get("password2")

        # Ensure passwords are at least 6 characters long
        if (len(password.strip()) < 8) or (len(password2.strip()) < 8):
            raise serializers.ValidationError(
                "Password must be at least 6 characters long."
            )

        if password != password2:
            raise serializers.ValidationError("The two password fields didn't match.")
        return data

    def update(self, instance, validated_data):
        instance.set_password(validated_data["password"])  # Hash the password
        instance.save()
        return instance


class RefreshTokenAccessRetrieveSerializer(serializers.Serializer):
    refresh_token = serializers.CharField(max_length=1000)
