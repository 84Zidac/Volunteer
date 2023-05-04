from django.urls import path
from . import views

urlpatterns = [
    path('organization/', views.user_organization_sign_up, name='org_register'), # template url path
]