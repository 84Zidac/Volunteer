from django.db import models
from organization_app.models import Organization


class Address(models.Model):
    street = models.TextField(blank=False, null=False)
    city = models.CharField(max_length=50, null=False, blank=False)
    state = models.CharField(max_length=20, null=False, blank=False)
    zipcode = models.CharField(max_length=20, null=False, blank=False)


class Event(models.Model):
    event_name = models.CharField(max_length=255, null=False, blank=False)
    start_time = models.DateTimeField(null=False, blank=False)
    end_time = models.DateTimeField(null=False, blank=False)
    description = models.TextField(blank=False, null=False)
    volunteers_required = models.IntegerField(null=False, blank=False)
    protective_equipment = models.TextField(null=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)

# coordinator will be forien key to the organization of event


# verify attendance