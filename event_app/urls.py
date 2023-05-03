# user_app/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # path('register/', views.user_sign_up, name='register'), # template url path
    path('events/', views.events_handler, name='events'), # template url path
]
