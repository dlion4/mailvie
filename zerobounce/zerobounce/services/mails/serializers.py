from rest_framework import serializers

class EmailValidationSerializer(serializers.Serializer):
    email = serializers.EmailField()
