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
    if request.method == "POST":
        request_data_str = request.body.decode("utf-8")
        request_data = json.loads(request_data_str)

        name = request_data.get("name")
        description = request_data.get("description")

        location = Location.objects.create(name=name, description=description)
        return HttpResponse("Location created successfully")
    else:
        return HttpResponse("Create Location Page")


@csrf_exempt
def get_locations(request):
    if request.method == "GET":
        locations = Location.objects.all()
        serialized_locations = Location_Serializer(locations, many=True)
        return JsonResponse(serialized_locations.data, safe=False)
    else:
        return HttpResponse("Get Locations Page")


@csrf_exempt
def signup_manager(request):
    if request.method == "POST":
        request_data_str = request.body.decode("utf-8")
        request_data = json.loads(request_data_str)

        email = request_data.get("email")
        password = request_data.get("password")
        first_name = request_data.get("first_name")
        last_name = request_data.get("last_name")

        location_name = request_data.get("location_name")

        try:
            location = Location.objects.get(name=location_name)

        except Location.MultipleObjectsReturned:
            return HttpResponse("Multiple Locations with same name", status=400)

        except Location.DoesNotExist:
            return HttpResponse("Location does not exist", status=400)

        gender = request_data.get("gender")
        age = request_data.get("age")
        hobby = request_data.get("hobby")
        job = request_data.get("job")
        organization = request_data.get("organization")

        role = "manager"
        points = 0
        user_uuid = uuid.uuid4()

        try:
            user = User.objects.get(username=email)
            return HttpResponse("User already exists", status=400)
        except User.DoesNotExist:
            pass

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

        response_data = {
            "message": "Manager created successfully",
            "manager_uuid": participant.uuid,
            "manager_email": participant.email,
            "manager_first_name": participant.first_name,
            "manager_last_name": participant.last_name,
            "manager_role": participant.role,
        }

        return JsonResponse(response_data, safe=False)
    else:
        return HttpResponse("Signup Page")


@csrf_exempt
def login_manager(request):
    if request.method == "POST":
        request_data_str = request.body.decode("utf-8")
        request_data = json.loads(request_data_str)

        email = request_data.get("email")
        password = request_data.get("password")

        user = authenticate(username=email, password=password)
        print(user, "User data")
        if user is not None:
            login(request, user)

            participant_deatils = Participant.objects.get(user=user)

            response_data = {
                "message": "Logged in successfully",
                "manager_uuid": participant_deatils.uuid,
                "manager_email": participant_deatils.email,
                "manager_first_name": participant_deatils.first_name,
                "manager_last_name": participant_deatils.last_name,
                "manager_role": participant_deatils.role,
                "manager_location": participant_deatils.location.name,
                "manager_points": participant_deatils.points,
                "manager_organization": participant_deatils.organization,
            }
            return JsonResponse(response_data, safe=False)
        else:
            return HttpResponse("Invalid credentials", status=401)
    else:
        return HttpResponse("Login Page")


@csrf_exempt
def signup_user(request):
    if request.method == "POST":
        request_data_str = request.body.decode("utf-8")
        request_data = json.loads(request_data_str)

        # print(request_data)
        email = request_data.get("email")
        password = request_data.get("password")
        first_name = request_data.get("first_name")
        last_name = request_data.get("last_name")

        location_name = request_data.get("location_name")

        try:
            location = Location.objects.get(name=location_name)

        except Location.MultipleObjectsReturned:
            return HttpResponse("Multiple Locations with same name", status=400)

        except Location.DoesNotExist:
            return HttpResponse("Location does not exist", status=400)

        gender = request_data.get("gender")
        age = request_data.get("age")
        hobby = request_data.get("hobby")
        job = request_data.get("job")
        organization = request_data.get("organization")

        role = "user"
        points = 100
        user_uuid = uuid.uuid4()

        try:
            user = User.objects.get(username=email)
            return HttpResponse("User already exists", status=400)
        except User.DoesNotExist:
            pass

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
        response_data = {
            "message": "User created successfully",
            "user_uuid": participant.uuid,
            "user_email": participant.email,
            "user_first_name": participant.first_name,
            "user_last_name": participant.last_name,
            "user_role": participant.role,
            "user_location": participant.location.name,
            "user_points": participant.points,
        }
        return JsonResponse(response_data, safe=False)

    else:
        return HttpResponse("Signup Page")


@csrf_exempt
def login_user(request):
    if request.method == "POST":
        request_data_str = request.body.decode("utf-8")
        request_data = json.loads(request_data_str)

        email = request_data.get("username")
        password = request_data.get("password")
        user = authenticate(username=email, password=password)
        if user is not None:
            login(request, user)
            participant_deatils = Participant.objects.get(user=user)
            response_data = {
                "message": "Logged in successfully",
                "user_uuid": participant_deatils.uuid,
                "user_email": participant_deatils.email,
                "user_first_name": participant_deatils.first_name,
                "user_last_name": participant_deatils.last_name,
                "user_role": participant_deatils.role,
                "user_location": participant_deatils.location.name,
                "user_points": participant_deatils.points,
                "user_organization": participant_deatils.organization,
            }
            return JsonResponse(response_data, safe=False)
        else:
            return HttpResponse("Invalid credentials", status=401)
    else:
        return HttpResponse("Login Page")


@csrf_exempt
def logout_manager(request):
    if request.method == "POST":
        logout(request)
        return HttpResponse("Logged out successfully")
    else:
        return HttpResponse("Logout Page")


@csrf_exempt
def logout_user(request):
    if request.method == "POST":
        logout(request)
        return HttpResponse("Logged out successfully")
    else:
        return HttpResponse("Logout Page")


@csrf_exempt
def add_location_type(request):
    if request.method == "POST":
        request_data_str = request.body.decode("utf-8")
        request_data = json.loads(request_data_str)

        name = request_data.get("name")
        loaction_type_uuid = uuid.uuid4()
        location_type = Location_Type.objects.create(uuid=loaction_type_uuid, name=name)
        return HttpResponse("Location Type created successfully")
    else:
        return HttpResponse("Create Location Type Page")


@csrf_exempt
def get_location_types(request):
    if request.method == "GET":
        location_types = Location_Type.objects.all()
        serialized_location_types = Location_Type_Serializer(location_types, many=True)
        return JsonResponse(serialized_location_types.data, safe=False)


@csrf_exempt
def add_category(request):
    if request.method == "POST":
        request_data_str = request.body.decode("utf-8")
        request_data = json.loads(request_data_str)

        name = request_data.get("name")
        category_uuid = uuid.uuid4()
        category = Category.objects.create(uuid=category_uuid, name=name)
        return HttpResponse("Category created successfully")
    else:
        return HttpResponse("Create Category Page")


@csrf_exempt
def get_categories(request):
    if request.method == "GET":
        categories = Category.objects.all()
        serialized_categories = Category_Serializer(categories, many=True)
        return JsonResponse(serialized_categories.data, safe=False)


@csrf_exempt
def get_category_by_uuid(request, pk):
    if request.method == "GET":
        category = Category.objects.get(uuid=pk)
        serialized_category = Category_Serializer(category)
        return JsonResponse(serialized_category.data, safe=False)


@csrf_exempt
def create_task(request):
    if request.method == "POST":
        request_data_str = request.body.decode("utf-8")
        request_data = json.loads(request_data_str)

        name = request_data.get("name")
        description = request_data.get("description")
        created_by = request_data.get("created_by")

        category = None
        location = None
        location_type = None

        category_name = request_data.get("category_name")
        try:
            category = Category.objects.get(name=category_name)
        except Category.DoesNotExist:
            return HttpResponse("Category does not exist", status=400)
        except Category.MultipleObjectsReturned:
            return HttpResponse("Multiple Categories with same name", status=400)

        location_name = request_data.get("location_name")
        try:
            location = Location.objects.get(name=location_name)
        except Location.DoesNotExist:
            return HttpResponse("Location does not exist", status=400)
        except Location.MultipleObjectsReturned:
            return HttpResponse("Multiple Locations with same name", status=400)

        location_type_name = request_data.get("location_type_name")
        try:
            location_type = Location_Type.objects.get(name=location_type_name)
        except Location_Type.DoesNotExist:
            return HttpResponse("Location Type does not exist", status=400)
        except Location_Type.MultipleObjectsReturned:
            return HttpResponse("Multiple Location Types with same name", status=400)

        points = request_data.get("points")
        duration = request_data.get("duration")
        task_uuid = uuid.uuid4()

        task = Task.objects.create(
            uuid=task_uuid,
            name=name,
            description=description,
            created_by=created_by,
            category=category,
            location=location,
            location_type=location_type,
            points=points,
            duration=duration,
        )
        return HttpResponse("Task created successfully")
    else:
        return HttpResponse("Create Task Page")


@csrf_exempt
def get_tasks(request):
    if request.method == "GET":
        tasks = Task.objects.all()
        serialized_tasks = Task_Serializer(tasks, many=True)
        return JsonResponse(serialized_tasks.data, safe=False)


@csrf_exempt
def get_task_by_location(request, pk):
    if request.method == "GET":
        location = Location.objects.get(uuid=pk)
        tasks = Task.objects.filter(location=location.uuid)
        serialized_tasks = Task_Serializer(tasks, many=True)
        return JsonResponse(serialized_tasks.data, safe=False)


@csrf_exempt
def get_task_by_category(request, pk):
    if request.method == "GET":
        category = Category.objects.get(uuid=pk)
        tasks = Task.objects.filter(category=category.uuid)
        serialized_tasks = Task_Serializer(tasks, many=True)
        return JsonResponse(serialized_tasks.data, safe=False)


@csrf_exempt
def get_task_by_location_type(request, pk):
    if request.method == "GET":
        location_type = Location_Type.objects.get(uuid=pk)
        tasks = Task.objects.filter(location_type=location_type.uuid)
        serialized_tasks = Task_Serializer(tasks, many=True)
        return JsonResponse(serialized_tasks.data, safe=False)


@csrf_exempt
def create_quest(request):
    if request.method == "POST":
        request_data_str = request.body.decode("utf-8")
        request_data = json.loads(request_data_str)

        name = request_data.get("name")
        description = request_data.get("description")
        max_people = request_data.get("max_people")
        location_name = request_data.get("location_name")
        creator_uuid = request_data.get("creator_uuid")

        try:
            location = Location.objects.get(name=location_name)
        except Location.DoesNotExist:
            return HttpResponse("Location does not exist", status=400)
        except Location.MultipleObjectsReturned:
            return HttpResponse("Multiple Locations with same name", status=400)

        try:
            creator = Participant.objects.get(uuid=creator_uuid)
        except Participant.DoesNotExist:
            return HttpResponse("Creator does not exist", status=400)

        quest_uuid = uuid.uuid4()

        total_points = 0
        total_duration = 0

        tasks = request_data.get("tasks")

        for task in tasks:
            task_uuid = task.get("uuid")

            try:
                task = Task.objects.get(uuid=task_uuid)
            except Task.DoesNotExist:
                return HttpResponse("Task does not exist", status=400)

            total_points += task.points
            total_duration += task.duration

        quest = Quest.objects.create(
            uuid=quest_uuid,
            name=name,
            description=description,
            max_people=max_people,
            location=location,
            created_by=creator,
            total_points=total_points,
            total_duration=total_duration,
        )

        for task in tasks:
            task_uuid = task.get("uuid")
            day_number = task.get("day_number")
            task = Task.objects.get(uuid=task_uuid)
            quest_task = Quest_Task.objects.create(
                uuid=uuid.uuid4(),
                quest=quest,
                task=task,
                is_completed=False,
                day_number=day_number,
            )

        response_data = {
            "message": "Quest created successfully",
            "quest_uuid": quest.uuid,
            "quest_name": quest.name,
            "quest_description": quest.description,
            "quest_total_points": quest.total_points,
            "quest_total_duration": quest.total_duration,
            "location": quest.location.name,
            "creator_id": creator.uuid,
            "quest_max_people": quest.max_people,
            "tasks": tasks,
        }
        return JsonResponse(response_data, safe=False)
    else:
        return HttpResponse("Create Quest Page")


@csrf_exempt
def get_quest_by_location(request, pk):
    if request.method == "GET":

        try:
            location = Location.objects.get(uuid=pk)
        except Location.DoesNotExist:
            return HttpResponse("Location does not exist", status=400)

        quests = Quest.objects.filter(location=location.uuid)

        serialized_data = []
        serialized_task = []
        for quest in quests:
            quest_tasks = Quest_Task.objects.filter(quest=quest)
            for quest_task in quest_tasks:
                serialized_task.append(
                    {
                        "task_uuid": quest_task.task.uuid,
                        "task_name": quest_task.task.name,
                        "task_description": quest_task.task.description,
                        "task_points": quest_task.task.points,
                        "task_duration": quest_task.task.duration,
                        "day_number": quest_task.day_number,
                    }
                )
        serialized_data.append(
            {
                "quest_uuid": quest.uuid,
                "quest_name": quest.name,
                "quest_description": quest.description,
                "quest_total_points": quest.total_points,
                "quest_total_duration": quest.total_duration,
                "quest_max_people": quest.max_people,
                "location": quest.location.name,
                "tasks": serialized_task,
            }
        )

        return JsonResponse(serialized_data, safe=False)


@csrf_exempt
def get_quest_by_category(request, pk):
    if request.method == "GET":

        try:
            category = Category.objects.get(uuid=pk)
        except Category.DoesNotExist:
            return HttpResponse("Category does not exist", status=400)

        tasks = Task.objects.filter(category=category.uuid)

        quests = []
        for task in tasks:
            quest_tasks = Quest_Task.objects.filter(task=task)
            for quest_task in quest_tasks:
                quests.append(quest_task.quest)

        serialized_data = []
        serialized_task = []
        for quest in quests:
            quest_tasks = Quest_Task.objects.filter(quest=quest)
            for quest_task in quest_tasks:
                serialized_task.append(
                    {
                        "task_uuid": quest_task.task.uuid,
                        "task_name": quest_task.task.name,
                        "task_description": quest_task.task.description,
                        "task_points": quest_task.task.points,
                        "task_duration": quest_task.task.duration,
                        "day_number": quest_task.day_number,
                    }
                )
        serialized_data.append(
            {
                "quest_uuid": quest.uuid,
                "quest_name": quest.name,
                "quest_description": quest.description,
                "quest_total_points": quest.total_points,
                "quest_total_duration": quest.total_duration,
                "quest_max_people": quest.max_people,
                "location": quest.location.name,
                "tasks": serialized_task,
            }
        )

        return JsonResponse(serialized_data, safe=False)


@csrf_exempt
def get_quest_by_location_type(request, pk):
    if request.method == "GET":

        try:
            location_type = Location_Type.objects.get(uuid=pk)
        except Location_Type.DoesNotExist:
            return HttpResponse("Location Type does not exist", status=400)

        tasks = Task.objects.filter(location_type=location_type.uuid)

        quests = []
        for task in tasks:
            quest_tasks = Quest_Task.objects.filter(task=task)
            for quest_task in quest_tasks:
                quests.append(quest_task.quest)

        serialized_data = []
        serialized_task = []
        for quest in quests:
            quest_tasks = Quest_Task.objects.filter(quest=quest)
            for quest_task in quest_tasks:
                serialized_task.append(
                    {
                        "task_uuid": quest_task.task.uuid,
                        "task_name": quest_task.task.name,
                        "task_description": quest_task.task.description,
                        "task_points": quest_task.task.points,
                        "task_duration": quest_task.task.duration,
                        "day_number": quest_task.day_number,
                    }
                )
        serialized_data.append(
            {
                "quest_uuid": quest.uuid,
                "quest_name": quest.name,
                "quest_description": quest.description,
                "quest_total_points": quest.total_points,
                "quest_total_duration": quest.total_duration,
                "quest_max_people": quest.max_people,
                "location": quest.location.name,
                "tasks": serialized_task,
            }
        )

        return JsonResponse(serialized_data, safe=False)


@csrf_exempt
def get_quest_by_user(request, pk):
    if request.method == "GET":

        try:
            user = Participant.objects.get(uuid=pk)
        except Participant.DoesNotExist:
            return HttpResponse("User does not exist", status=400)

        quests = Quest.objects.filter(created_by=user)

        serialized_data = []
        serialized_task = []
        for quest in quests:
            quest_tasks = Quest_Task.objects.filter(quest=quest)
            for quest_task in quest_tasks:
                serialized_task.append(
                    {
                        "task_uuid": quest_task.task.uuid,
                        "task_name": quest_task.task.name,
                        "task_description": quest_task.task.description,
                        "task_points": quest_task.task.points,
                        "task_duration": quest_task.task.duration,
                        "day_number": quest_task.day_number,
                    }
                )
        serialized_data.append(
            {
                "quest_uuid": quest.uuid,
                "quest_name": quest.name,
                "quest_description": quest.description,
                "quest_total_points": quest.total_points,
                "quest_total_duration": quest.total_duration,
                "quest_max_people": quest.max_people,
                "location": quest.location.name,
                "tasks": serialized_task,
            }
        )

        return JsonResponse(serialized_data, safe=False)


@csrf_exempt
def create_user_quest(request):
    if request.method == "POST":
        request_data_str = request.body.decode("utf-8")
        request_data = json.loads(request_data_str)

        user_uuid = request_data.get("user_uuid")
        quest_uuid = request_data.get("quest_uuid")

        try:
            user = Participant.objects.get(uuid=user_uuid)
        except Participant.DoesNotExist:
            return HttpResponse("User does not exist", status=400)

        try:
            quest = Quest.objects.get(uuid=quest_uuid)
        except Quest.DoesNotExist:
            return HttpResponse("Quest does not exist", status=400)

        quest_tasks = []

        for quest_task in Quest_Task.objects.filter(quest=quest):
            quest_tasks.append(
                {
                    "task_uuid": quest_task.task.uuid,
                    "task_name": quest_task.task.name,
                    "task_description": quest_task.task.description,
                    "task_points": quest_task.task.points,
                    "task_duration": quest_task.task.duration,
                    "day_number": quest_task.day_number,
                    "is_completed": quest_task.is_completed,
                }
            )

        user_quest = User_Quest.objects.create(
            uuid=uuid.uuid4(), user=user, quest=quest, is_completed=False
        )

        response_data = {
            "message": "User Quest created successfully",
            "user_quest_uuid": user_quest.uuid,
            "user_id": user.uuid,
            "quest_id": quest.uuid,
            "quest_name": quest.name,
            "quest_description": quest.description,
            "quest_total_points": quest.total_points,
            "quest_total_duration": quest.total_duration,
            "location": quest.location.name,
            "max_people": quest.max_people,
            "quest_tasks": quest_tasks,
            "is_completed": "False",
        }
        return JsonResponse(response_data, safe=False)
    else:
        return HttpResponse("Create User Quest Page")


@csrf_exempt
def get_user_quest_by_user(request, pk):
    if request.method == "GET":

        try:
            user = Participant.objects.get(uuid=pk)
        except Participant.DoesNotExist:
            return HttpResponse("User does not exist", status=400)

        user_quests = User_Quest.objects.filter(user=user)

        serialized_data = []
        serialized_task = []
        for user_quest in user_quests:
            quest = user_quest.quest
            quest_tasks = Quest_Task.objects.filter(quest=quest)
            for quest_task in quest_tasks:
                serialized_task.append(
                    {
                        "task_uuid": quest_task.task.uuid,
                        "task_name": quest_task.task.name,
                        "task_description": quest_task.task.description,
                        "task_points": quest_task.task.points,
                        "task_duration": quest_task.task.duration,
                        "day_number": quest_task.day_number,
                        "is_completed": quest_task.is_completed,
                    }
                )
            serialized_data.append(
                {
                    "quest_uuid": quest.uuid,
                    "quest_name": quest.name,
                    "quest_description": quest.description,
                    "quest_total_points": quest.total_points,
                    "quest_total_duration": quest.total_duration,
                    "quest_max_people": quest.max_people,
                    "location": quest.location.name,
                    "tasks": serialized_task,
                    "is_completed": user_quest.is_completed,
                }
            )

        return JsonResponse(serialized_data, safe=False)
    else:
        return HttpResponse("Get User Quest Page")


@csrf_exempt
def get_user_by_uuid(request, pk):
    if request.method == "GET":
        user = Participant.objects.get(uuid=pk)
        serialized_user = Participant_Serializer(user)
        return JsonResponse(serialized_user.data, safe=False)
    else:
        return HttpResponse("Get User Page")


@csrf_exempt
def get_manager_by_uuid(request, pk):
    if request.method == "GET":
        manager = Participant.objects.get(uuid=pk)
        serialized_manager = Participant_Serializer(manager)
        return JsonResponse(serialized_manager.data, safe=False)
    else:
        return HttpResponse("Get Manager Page")
