from rest_framework.decorators import api_view
from .models import Organization
from user_app.models import App_User
from django.http import JsonResponse


@api_view(["POST"])
def user_organization_sign_up(request):
    email = request.data['email']
    password = request.data['password']
    first_name = request.data['first_name']
    last_name = request.data['last_name']
    organization_name = request.data['organization_name']
    description = request.data['description']
    website = request.data['website']
    contact_email = request.data['contact_email']
    phone_number = request.data['phone_number']
    try:
      new_coord = App_User.objects.create_user(
      username=email,
      email=email,
      first_name=first_name,
      last_name=last_name,
      password=password,
      is_coordinator = True)
      new_coord.save()
      new_org = Organization.objects.create(
        organization_name = organization_name,
        description = description,
        website = website,
        contact_email = contact_email,
        phone_number = phone_number,
        organizer_id = new_coord
      )
      new_org.save()
      return JsonResponse({"success": True})
    except Exception as e:
        print(e)
        return JsonResponse({"success": False})