from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import Address, Event


# Create your views here.
@api_view(['POST', 'PUT', 'GET'])
def events_handler(request):
    if request.method == 'GET':
        events = Event.objects.select_related('address').all()
            # Build a list of dictionaries containing event information
        if not events.exists():
        # If there are no events, return a JSON response with an appropriate message
            return JsonResponse({'message': 'No events found',
                                 'success': False})
        event_list = []
        for event in events:
            event_dict = {
                'event_name': event.event_name,
                'start_time': event.start_time.isoformat(),
                'end_time': event.end_time.isoformat(),
                'description': event.description,
                'volunteers_required': event.volunteers_reqired,
                'protective_equipment': event.protective_equipment,
                'address': {
                    'street': event.address.street,
                    'city': event.address.city,
                    'state': event.address.state,
                    'zipcode': event.address.zipcode
                },
                'organization': event.organization.name
            }
            event_list.append(event_dict)

        # Return the event list as a JSON response
        return JsonResponse({'events': event_list,
                             'success': True})
