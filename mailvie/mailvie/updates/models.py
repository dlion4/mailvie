from django.db import models

from mailvie.updates.utils import upload_directory_path

# Create your models here.



class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)
    def __str__(self):
        return self.name


class Blog(models.Model):
    tag = models.ForeignKey(Tag, null=True, blank=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length=255)
    cover = models.ImageField(upload_to=upload_directory_path, blank=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
