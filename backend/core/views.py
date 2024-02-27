import json
import uuid
from django.contrib.auth import login, logout, authenticate
from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Location
from django.db import IntegrityError
from django.contrib.auth.models import User
from .models import *
from .serializers import *



@csrf_exempt
def add_location(request):
    if request.method == 'POST':
        request_data_str = request.body.decode('utf-8')
        request_data = json.loads(request_data_str)

        name = request_data.get('name')
        description = request_data.get('description')

        location = Location.objects.create(name=name, description=description)
        return HttpResponse('Location created successfully')
    else:
        return HttpResponse('Create Location Page')



@csrf_exempt 
def signup_manager(request):
    if request.method == 'POST':
        request_data_str = request.body.decode('utf-8')
        request_data = json.loads(request_data_str)

        email = request_data.get('email')
        password = request_data.get('password')
        first_name = request_data.get('first_name')
        last_name = request_data.get('last_name')
        
        location_uuid = request_data.get('location_uuid')
        location = Location.objects.get(uuid=location_uuid)
        gender = request_data.get('gender')
        age = request_data.get('age')
        hobby = request_data.get('hobby')
        job = request_data.get('job')
        organization = request_data.get('organization')

        role = 'manager'
        points = 0
        user_uuid = uuid.uuid4()

        user = User.objects.get(username=email)
        if user:
            return HttpResponse('User already exists', status=400)

        user = User.objects.create_user(username=email, password=password)

        participant = Participant.objects.create(
            user=user,
            first_name=first_name,
            last_name=last_name,
            uuid=user_uuid,
            email=email,
            location=location,
            role=role,
            gender=gender,
            age=age,
            hobby=hobby,
            job=job,
            organization=organization,
            points=points,
        )
        return HttpResponse('Manager created successfully')

    else:
        return HttpResponse('Signup Page')

@csrf_exempt
def login_manager(request):
    if request.method == 'POST':
        request_data_str = request.body.decode('utf-8')
        request_data = json.loads(request_data_str)

        email = request_data.get('username')
        password = request_data.get('password')
        print(email, password)
        user = authenticate(username=email, password=password)
        print(user)
        if user is not None:
            login(request, user)
            return HttpResponse('Logged in successfully')
        else:
            return HttpResponse('Invalid credentials', status=401)
    else:
        return HttpResponse('Login Page')


@csrf_exempt 
def signup_user(request):
    if request.method == 'POST':
        request_data_str = request.body.decode('utf-8')
        request_data = json.loads(request_data_str)

        # print(request_data)
        email = request_data.get('email')
        password = request_data.get('password')
        first_name = request_data.get('first_name')
        last_name = request_data.get('last_name')
        
        location_uuid = request_data.get('location_uuid')
        location = Location.objects.get(uuid=location_uuid)
        gender = request_data.get('gender')
        age = request_data.get('age')
        hobby = request_data.get('hobby')
        job = request_data.get('job')
        organization = request_data.get('organization')

        role = 'user'
        points = 100
        user_uuid = uuid.uuid4()

        user = User.objects.get(username=email)
        if user:
            return HttpResponse('User already exists', status=400)

        user = User.objects.create_user(username=email, password=password)
        print(user)
        participant = Participant.objects.create(
            user=user,
            first_name=first_name,
            last_name=last_name,
            uuid=user_uuid,
            email=email,
            location=location,
            role=role,
            gender=gender,
            age=age,
            hobby=hobby,
            job=job,
            organization=organization,
            points=points,
        )
        return HttpResponse('User created successfully')

    else:
        return HttpResponse('Signup Page')


@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        request_data_str = request.body.decode('utf-8')
        request_data = json.loads(request_data_str)

        email = request_data.get('username')
        password = request_data.get('password')
        user = authenticate(username=email, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse('Logged in successfully')
        else:
            return HttpResponse('Invalid credentials', status=401)
    else:
        return HttpResponse('Login Page')



@csrf_exempt
def logout_manager(request):
    if request.method == 'POST':
        logout(request)
        return HttpResponse('Logged out successfully')
    else:
        return HttpResponse('Logout Page')
    
@csrf_exempt
def logout_user(request):
    if request.method == 'POST':
        logout(request)
        return HttpResponse('Logged out successfully')
    else:
        return HttpResponse('Logout Page')
    


@csrf_exempt
def get_task(request):
    if request.method == 'GET':
        task = Task.objects.all()
        serialized_task = Task_Serializer(task, many=True)
        return JsonResponse(serialized_task.data, safe=False)



