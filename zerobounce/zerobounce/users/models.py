import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    def _create_user(self, email, password, **utils):
        if not email:
            raise ValueError("Email must be provided")
        email = self.normalize_email(email)
        user = self.model(email=email, **utils)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password, **utils):
        return self._create_user(email, password, **utils)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self._create_user(email, password, **extra_fields)


class UserBillingChoices(models.TextChoices):
    D = "D", "Developer"
    B = "B", "Basic"
    S = "S", "Standard"
    P = "P", "Premium"


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(_("Email Address"), unique=True, max_length=100)
    username = models.CharField(max_length=100, blank=True, unique=False)
    is_subscribed = models.BooleanField(default=False)
    pricing_plan = models.CharField(
        max_length=100, default=UserBillingChoices.D, choices=UserBillingChoices.choices
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    
    objects = UserManager()

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        if not self.username:
            self.username = self.email[: self.email.index("@")]
        super().save(*args, **kwargs)
