# event_app/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # path('register/', views.user_sign_up, name='register'), # template url path
    path('events/', views.events_handler, name='events'), # template url path
    path('event-creation/', views.event_creation, name='event_creation'),
    path('organizer/dashboard/', views.organizer_dashboard, name='organizer_dashboard'),
    path('events_on_date/<str:date>/', views.events_on_date, name='events_on_date'),
]
