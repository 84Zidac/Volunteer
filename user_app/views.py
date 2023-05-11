# user_app/views.py
# from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from .models import App_User
from django.core.serializers import serialize
from django.contrib.auth.hashers import check_password
# from django.db.models import Sum
# from datetime import datetime
# from rest_framework.decorators import permission_classes
# from rest_framework.permissions import IsAuthenticated
# from datetime import datetime
from dotenv import load_dotenv
import os
import json
import requests

load_dotenv()


@api_view(["POST"])
def user_sign_up(request):
    email = request.data['email']
    password = request.data['password']
    first_name = request.data['first_name']
    last_name = request.data['last_name']
    # name = f"{first_name} {last_name}"
    super_user = False
    staff = False
    if 'super' in request.data:
        super_user = request.data['super']
    if 'staff' in request.data:
        staff = request.data['staff']
    try:
        # creates new user
        new_user = App_User.objects.create_user(
            username=email,
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=password,
            is_superuser=super_user,
            is_staff=staff)
        new_user.save()
        return JsonResponse({"success": True})
    except Exception as e:
        print(e)
        return JsonResponse({"success": False})


@api_view(["POST"])
def user_log_in(request):
    email = request.data['email']
    password = request.data['password']
    user = authenticate(username=email, password=password)
    if user is not None and user.is_active:
        try:
            # Creates SessionID
            login(request._request, user)
            print(user)
            return JsonResponse({
                'email': user.email,
                'name': f"{user.first_name} {user.last_name}",
                'isCoordinator': user.is_coordinator,
                'aboutMe': user.about_section})
        except Exception as e:
            print(e)
            return JsonResponse({'login': False})
    return JsonResponse({'login': False})


@api_view(["GET"])
def dashboard(request):
    if request.user.is_authenticated:
        user_info = serialize(
            "json",
            [request.user],
            fields=['name', 'email'])
        user_info_workable = json.loads(user_info)
        return JsonResponse(user_info_workable[0]['fields'])
    else:
        return JsonResponse({"user": None})


@api_view(["GET", "POST", "PUT"])
def curr_user(request):
    if request.user.is_authenticated and request.method == "GET":
        #                    format       query                     options
        user_info = serialize(
            "json",
            [request.user],
            fields=['name', 'email'])
        user_info_workable = json.loads(user_info)
        return JsonResponse(user_info_workable[0]['fields'])
    elif request.user.is_authenticated and request.method == "POST":
        user = App_User.objects.get(id = request.user.id)
        password_verification = check_password(request.data['password'], user.password)
        if password_verification == True:
            return JsonResponse({'password': True})
        else:
            return JsonResponse({'password':False})
    elif request.user.is_authenticated and request.method == "PUT":
        if 'password' in request.data:
            try:
                user = App_User.objects.get(id = request.user.id)
                user.set_password(request.data['password'])
                user.save()
                update_session_auth_hash(request, user)
                return JsonResponse({'sucess': True})
            except:
                return JsonResponse({'sucess': False})
        elif 'about_me' in request.data:
            try:
                user = App_User.objects.get(id = request.user.id)
                user.about_section = request.data['about_me']
                user.save()
                return JsonResponse({
                'email': user.email,
                'name': f"{user.first_name} {user.last_name}",
                'isCoordinator': user.is_coordinator,
                'aboutMe': user.about_section})
            except:
                return JsonResponse({'sucess': False})

    else:
        return JsonResponse({"user": None})


@api_view(['POST'])
def user_log_out(request):
    try:
        # Removes SessionID
        logout(request)
        return JsonResponse({"logout": True})
    except Exception as e:
        print(e)
        return JsonResponse({"logout": False})


def send_the_index(request):
    # returns the index from React Project
    the_index = open('static/index.html')
    return HttpResponse(the_index)


# def get_weather_data(request, date):
#     # would need to input lat and long for another city
#     api_key = os.getenv('REACT_APP_OPENWEATHERMAP_API_KEY')
#     # city = "Wichita"
#     # timestamp = int(datetime.strptime(date, '%Y-%m-%d').strftime('%s'))
#     url = f'https://api.openweathermap.org/data/3.0/onecall?lat=37.6872&lon=-97.3301&appid={api_key}'
#     # url = f'http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=40.7128&lon=-74.0060&dt={timestamp}&appid={api_key}'
#     response = requests.get(url)
#     weather_data = response.json()
#     return JsonResponse(weather_data)

@api_view(["GET"])
def get_weather_data(request, date):
    # would need to input lat and long for another city
    api_key = os.getenv('REACT_APP_OPENWEATHERMAP_API_KEY')
    print(api_key)
    if not api_key:
        return JsonResponse({"error": "API key not found"})

    # city = "Wichita"
    # timestamp = int(datetime.strptime(date, '%Y-%m-%d').strftime('%s'))
    url = f'https://api.openweathermap.org/data/3.0/onecall?lat=37.6872&lon=-97.3301&appid={api_key}'
    # url = f'http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=40.7128&lon=-74.0060&dt={timestamp}&appid={api_key}'
    
    try:
        response = requests.get(url)
        if response.status_code != 200:
            return JsonResponse({"error": f"API request failed with status code {response.status_code}"})
        
        weather_data = response.json()
        print(weather_data)
        return JsonResponse(weather_data)
    except Exception as e:
        print(f"Error: {e}")
        return JsonResponse({"error": f"An error occurred: {e}"})

