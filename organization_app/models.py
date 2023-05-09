from django.db import models
from user_app.models import App_User


class Organization(models.Model):
    organization_name = models.CharField(
        max_length=50,
        null=False,
        blank=False,
    )
    description = models.TextField(blank=False, null=False)
    website = models.TextField(blank=False, null=False)
    contact_email = models.EmailField(blank=False, null=False, unique=True)
    phone_number = models.CharField(max_length=12)
    organizer = models.ForeignKey(App_User, on_delete=models.CASCADE)
