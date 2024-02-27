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
def add_location_type(request):
    if request.method == 'POST':
        request_data_str = request.body.decode('utf-8')
        request_data = json.loads(request_data_str)

        name = request_data.get('name')
        loaction_type_uuid = uuid.uuid4()
        location_type = Location_Type.objects.create(uuid=loaction_type_uuid,name=name)
        return HttpResponse('Location Type created successfully')
    else:
        return HttpResponse('Create Location Type Page')


    


@csrf_exempt
def add_category(request):
    if request.method == 'POST':
        request_data_str = request.body.decode('utf-8')
        request_data = json.loads(request_data_str)

        name = request_data.get('name')
        category_uuid = uuid.uuid4()
        category = Category.objects.create(uuid=category_uuid, name=name)
        return HttpResponse('Category created successfully')
    else:
        return HttpResponse('Create Category Page')
    

@csrf_exempt
def get_categories(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serialized_categories = Category_Serializer(categories, many=True)
        return JsonResponse(serialized_categories.data, safe=False)
    
@csrf_exempt
def get_category_by_uuid(request,pk):
    if request.method == 'GET':
        category = Category.objects.get(uuid=pk)
        serialized_category = Category_Serializer(category)
        return JsonResponse(serialized_category.data, safe=False)
    


@csrf_exempt
def create_task(request):
    if request.method == 'POST':
        request_data_str = request.body.decode('utf-8')
        request_data = json.loads(request_data_str)

        name = request_data.get('name')
        description = request_data.get('description')
        
        category = None
        location=None
        location_type=None

        category_name = request_data.get('category_name')
        try:
            category = Category.objects.get(name=category_name)
        except Category.DoesNotExist:
            return HttpResponse('Category does not exist', status=400)
        
        location_name = request_data.get('location_name')
        try:
            location = Location.objects.get(name=location_name)
        except:
            return HttpResponse('Location does not exist', status=400)
        
        location_type_name = request_data.get('location_type_name')
        try:
            location_type = Location_Type.objects.get(name=location_type_name)
        except:
            return HttpResponse('Location Type does not exist', status=400)
        
        points = request_data.get('points')
        duration = request_data.get('duration')
        task_uuid = uuid.uuid4()

        task = Task.objects.create(
            uuid=task_uuid,
            name=name,
            description=description,
            category=category,
            location=location,
            location_type=location_type,
            points=points,
            duration=duration,
        )
        return HttpResponse('Task created successfully')
    else:
        return HttpResponse('Create Task Page')
    

@csrf_exempt
def get_tasks(request):
    if request.method == 'GET':
        tasks = Task.objects.all()
        serialized_tasks = Task_Serializer(tasks, many=True)
        return JsonResponse(serialized_tasks.data, safe=False)
    

@csrf_exempt
def get_task_by_location(request,pk):
    if request.method == 'GET':
        location = Location.objects.get(name=pk)
        tasks = Task.objects.filter(location=location.uuid)
        serialized_tasks = Task_Serializer(tasks, many=True)
        return JsonResponse(serialized_tasks.data, safe=False)
    
@csrf_exempt
def get_task_by_category(request):
    if request.method == 'GET':
        request_data_str = request.body.decode('utf-8')
        request_data = json.loads(request_data_str)
        name = request_data.get('name')
        category = Category.objects.get(name=name)
        tasks = Task.objects.filter(category=category.uuid)
        serialized_tasks = Task_Serializer(tasks, many=True)
        return JsonResponse(serialized_tasks.data, safe=False)
    

@csrf_exempt
def create_quest(request):
    if request.method == 'POST':
        request_data_str = request.body.decode('utf-8')
        request_data = json.loads(request_data_str)

        name = request_data.get('name')
        description = request_data.get('description')
        max_people = request_data.get('max_people')
        location_name = request_data.get('location_name')
        creator_uuid = request_data.get('creator_uuid')

        location = Location.objects.get(name=location_name)
        created_by = Participant.objects.get(uuid=creator_uuid)
        quest_uuid = uuid.uuid4()

        total_points=0
        total_duration=0

        tasks = request_data.get('tasks')

        for task in tasks:
            task_uuid = task.get('uuid')
            task = Task.objects.get(uuid=task_uuid)
            total_points += task.points
            total_duration += task.duration

        quest = Quest.objects.create(
            uuid=quest_uuid,
            name=name,
            description=description,
            max_people=max_people,
            location=location,
            created_by=created_by,
            total_points=total_points,
            total_duration=total_duration
        )

        print(quest)
        for task in tasks:
            task_uuid = task.get('uuid')
            day_number = task.get('day_number')
            task = Task.objects.get(uuid=task_uuid)
            quest_task = Quest_Task.objects.create(
                uuid=uuid.uuid4(),
                quest=quest,
                task=task,
                is_completed=False,
                day_number=day_number
            )
        return HttpResponse('Quest created successfully')
    else:
        return HttpResponse('Create Quest Page')
    
@csrf_exempt
def get_quest_by_location(request,pk):
    if request.method == 'GET':
        location = Location.objects.get(name=pk)
        quests = Quest.objects.filter(location=location.uuid)
        serialized_quests = Quest_Serializer(quests, many=True)
        return JsonResponse(serialized_quests.data, safe=False)
    



