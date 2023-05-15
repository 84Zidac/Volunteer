# event_app/models.py
from django.db import models
from organization_app.models import Organization


# class Address(models.Model):
#     street = models.TextField(blank=False, null=False)
#     city = models.CharField(max_length=50, null=False, blank=False)
#     state = models.CharField(max_length=20, null=False, blank=False)
#     zipcode = models.CharField(max_length=20, null=False, blank=False)


class Event(models.Model):
    event_name = models.CharField(max_length=255, null=False, blank=False)
    start_time = models.DateTimeField(null=False, blank=False)
    end_time = models.DateTimeField(null=False, blank=False)
    description = models.TextField(blank=False, null=False)
    volunteers_required = models.IntegerField(null=False, blank=False)
    protective_equipment = models.TextField(null=True)
    street_address = models.TextField(blank=False, null=False)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)

