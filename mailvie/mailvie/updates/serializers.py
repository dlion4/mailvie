from rest_framework import serializers

from .models import Blog
from .models import Tag


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = [
            "tag",
            "title",
            "cover",
            "content",
            "created_at",
        ]


class TagSerializer(serializers.ModelSerializer):
    blogs = BlogSerializer(many=True, read_only=True)
    class Meta:
        model = Tag
        fields = ["id", "name", "blogs"]
