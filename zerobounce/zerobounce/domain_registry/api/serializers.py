from rest_framework import serializers
from ..models import WhiteListDomain

class WhiteListDomainSerializer(serializers.ModelSerializer):
    domain_owner = serializers.SerializerMethodField()
    class Meta:
        model = WhiteListDomain
        fields = [
            "domain_name",
            "is_active",
            "enrolled_date",
            "is_verified",
            "domain_owner",
        ]

    def create(self, validated_data):
        user = self.context["request"].user
        domain = WhiteListDomain.objects.create(
            domain_name=validated_data.get("domain_name"), owner=user
        )
        return domain

    def get_domain_owner(self, obj):
        from zerobounce.users.serializers import UserSerializer
        instance = obj.owner
        return UserSerializer(instance=instance).data
