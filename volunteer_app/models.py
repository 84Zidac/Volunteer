# volunteer_app/models.py
from django.db import models
from user_app.models import App_User
from event_app.models import Event


class Volunteer_Registration(models.Model):
    user = models.ForeignKey(App_User, on_delete=models.CASCADE)
    registration_date = models.DateField()
    # auto_now_add was messing up the incoming date going into db
    # registration_date = models.DateField(auto_now_add=True)
    num_guests = models.IntegerField(default=0)
    attendance = models.BooleanField(default=False)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - {self.id}"
