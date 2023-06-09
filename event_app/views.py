from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import Event
from datetime import datetime
from organization_app.models import Organization
from django.utils import timezone 



# Create your views here.
@api_view(['POST', 'PUT', 'GET'])
def events_handler(request):
    if request.method == 'GET':
        events = Event.objects.filter(end_time__gt=timezone.now())
            # Build a list of dictionaries containing event information
        if not events.exists():
        # If there are no events, return a JSON response with an appropriate message
            return JsonResponse({'message': 'No events found',
                                 'success': False})
        event_list = []
        for event in events:
            event_dict = {
                'event_id': event.id,
                'event_name': event.event_name,
                'start_time': event.start_time.isoformat(),
                'end_time': event.end_time.isoformat(),
                'description': event.description,
                'volunteers_required': event.volunteers_required,
                'protective_equipment': event.protective_equipment,
                'address': event.street_address,
                'organization': event.organization.organization_name
            }
            event_list.append(event_dict)

        # Return the event list as a JSON response
        return JsonResponse({'events': event_list,
                             'success': True})

@api_view(["POST"])
def event_creation(request):
    data = request.data
    event_name = data.get('event_name')
    start_time_str = data.get('start_time')
    end_time_str = data.get('end_time')
    description = data.get('description')
    volunteers_required = data.get('volunteers_required')
    protective_equipment = data.get('protective_equipment')
    street_address = data.get('street_address')
    # * * * * * * * * * * * * * * * *
    try:
        organization = Organization.objects.get(organizer = request.user.id)
        print(organization)
    except Organization.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'Organization not found'})

    print("event_name:", event_name)
    print("start_time_str:", start_time_str)
    print("end_time_str:", end_time_str)
    print("description:", description)
    print("volunteers_required:", volunteers_required)
    print("protective_equipment:", protective_equipment)
    print("street_address:", street_address)

    print("organization:", organization)

    datetime_format = '%Y-%m-%dT%H:%M'
    start_time = timezone.make_aware(datetime.strptime(start_time_str, datetime_format))
    end_time = timezone.make_aware(datetime.strptime(end_time_str, datetime_format))



    event = Event.objects.create(
        event_name=event_name,
        start_time=start_time,
        end_time=end_time,
        description=description,
        volunteers_required=volunteers_required,
        protective_equipment=protective_equipment,
        street_address=street_address,
        organization=organization,
    )

    return JsonResponse({'success': True})


@api_view(["GET"])
def organizer_dashboard(request):
    pass


@api_view(["GET"])
def event_list_by_organization(request, organizationId):
    print(request)
    print(organizationId)
    if request.method == 'GET':
        current_date = timezone.now().date()
        events = Event.objects.filter(organization_id=organizationId)
            # Build a list of dictionaries containing event information
        print("$$$$$$$$$$")
        print(events.query)
        if not events.exists():
        # If there are no events, return a JSON response with an appropriate message
            return JsonResponse({'message': 'No events found',
                                 'success': False})
        upcoming_events = events.filter(start_time__date__gte=current_date).order_by('start_time')
        past_events = events.filter(start_time__date__lt=current_date).order_by('-start_time')
        event_list = []
        for event in  upcoming_events:
            event_dict = {
                'event_id': event.id,
                'event_name': event.event_name,
                'start_time': event.start_time.isoformat(),
                'end_time': event.end_time.isoformat(),
                'description': event.description,
                'volunteers_required': event.volunteers_required,
                'protective_equipment': event.protective_equipment,
                'address': event.street_address,
                'organization': event.organization.organization_name
            }
            event_list.append(event_dict)
        for event in past_events:
            event_dict = {
                'event_id': event.id,
                'event_name': event.event_name,
                'start_time': event.start_time.isoformat(),
                'end_time': event.end_time.isoformat(),
                'description': event.description,
                'volunteers_required': event.volunteers_required,
                'protective_equipment': event.protective_equipment,
                'address': event.street_address,
                'organization': event.organization.organization_name
            }
            event_list.append(event_dict)

        # Return the event list as a JSON response
        return JsonResponse({'events': event_list,
                             'success': True})


@api_view(["GET"])
def get_organization_events(request):
    print(request.data['organizationId'])
    if request.method == 'GET':
        events = Event.objects.filter(stop_time__gt=timezone.now())
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
                'volunteers_required': event.volunteers_required,
                'protective_equipment': event.protective_equipment,
                'address': event.street_address,
                'organization': event.organization.organization_name
            }
            event_list.append(event_dict)

        # Return the event list as a JSON response
        return JsonResponse({'events': event_list,
                             'success': True})

@api_view(["GET"])
def events_on_date(request, date):
    iso_date = datetime.fromisoformat(date).date()
    events = Event.objects.filter(start_time__date=iso_date)

    if not events.exists():
        return JsonResponse({'message': 'No events found', 'success': False})

    event_list = []
    for event in events:
        event_dict = {
            'id': event.id,  # Include the id property
            'event_name': event.event_name,
            'start_time': event.start_time.isoformat(),
            'end_time': event.end_time.isoformat(),
            'description': event.description,
            'volunteers_required': event.volunteers_required,
            'protective_equipment': event.protective_equipment,
            'address': event.street_address,
            'organization': event.organization.organization_name
        }
        event_list.append(event_dict)

    return JsonResponse({'events': event_list, 'success': True})


@api_view(["GET"])
def event_detail(request, eventId):
    try:
        event = Event.objects.get(id=eventId)
    except Event.DoesNotExist:
        return JsonResponse({'message': 'Event not found', 'success': False})
    
    event_dict = {
        'id': event.id,  
        'event_name': event.event_name,
        'start_time': event.start_time.isoformat(),
        'end_time': event.end_time.isoformat(),
        'description': event.description,
        'volunteers_required': event.volunteers_required,
        'protective_equipment': event.protective_equipment,
        'address': event.street_address,
        'organization': event.organization.organization_name
    }

    return JsonResponse({'event': event_dict, 'success': True})
