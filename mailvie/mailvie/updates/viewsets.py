from rest_framework import permissions
from rest_framework import viewsets

from .models import Blog
from .models import Tag
from .serializers import BlogSerializer
from .serializers import TagSerializer


class TagViewSet(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()
    permission_classes = [permissions.AllowAny]

class BlogViewSet(viewsets.ModelViewSet):
    serializer_class = BlogSerializer
    queryset = Blog.objects.all()
    permission_classes = [permissions.AllowAny]
