from django.db import models
from zerobounce.users.models import User


class Organization(models.Model):
    name = models.CharField(max_length=300)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Service(models.Model):  # Changed to models.Model
    name = models.CharField(max_length=300, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    credits = models.IntegerField(default=100)

    def __str__(self):
        return self.name


class Project(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    name = models.CharField(max_length=300)
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="service_project")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_blacklisted = models.BooleanField(default=False)
    # The `secret_key` field in the `Project` model is a `CharField` with a maximum length of 300
    # characters. It is defined with `blank=True` and `null=True`, which means that it is optional and
    # can be left empty in the database (i.e., it can be null).
    secret_key = models.CharField(max_length=300, blank=True, null=True)
    access_key = models.CharField(max_length=300, blank=True, null=True)

    class Meta:
        constraints = [
            # Uniqueness constraint on organization, service, and project name
            models.UniqueConstraint(
                name="unique_project_per_organization_and_service",
                fields=(
                    "organization",
                    "name",
                    "service",
                ),  # Enforce uniqueness across these fields
            ),
        ]

    def __str__(self):
        return f"{self.name} - {self.service.name} - {self.organization.name}"



class Environment(models.Model):
    env = models.CharField(max_length=100, choices=(("S", "sandbox"), ("P", "production")), default="S")
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, to_field="id")
    def __str__(self):
        return self.get_env_display()
