# user_app/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser


class App_User(AbstractUser):
    email = models.EmailField(blank=False, null=False, unique=True)
    first_name = models.CharField(max_length=255, null=False, blank=False)
    last_name = models.CharField(max_length=255, null=False, blank=False)
    # Tells Django to utilize users email as their username
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    is_coordinator = models.BooleanField(default=False)
    is_assistant = models.BooleanField(default=False)
    about_section = models.TextField(null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} | {self.email}"
