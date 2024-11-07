from django.db import models

from zerobounce.users.models import User

# Create your models here.

class WhiteListDomain(models.Model):
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="domain_owner", to_field="id")
    domain_name = models.CharField(max_length=200, unique=True)
    is_active = models.BooleanField(default=True)
    enrolled_date = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=True)
    
    def __str__(self):
        return self.domain_name
