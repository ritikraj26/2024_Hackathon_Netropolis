import json
from django.shortcuts import render, HttpResponse
from django.contrib.auth import login, authenticate, logout
from .models import Manager, Participant, User
from django.views.decorators.csrf import csrf_exempt



@csrf_exempt
def signupView(request):
    if request.method == 'POST':
        request_data_str = request.body.decode('utf-8')
        request_data = json.loads(request_data_str)
        username = request_data.get('username')
        password = request_data.get('password')
        print(type(password))
        print(password)
        email = request_data.get('email')
        user = User.objects.create_user(username=username, password=password, email=email)
        community_manager = Manager.objects.create(user=user)
        # login(request, community_manager)
        return HttpResponse('Signed up successfully')
    return HttpResponse('Signup Page')



@csrf_exempt
def loginView(request):
    if request.method == 'POST':
        request_data_str = request.body.decode('utf-8')
        request_data = json.loads(request_data_str)
        username = request_data.get('username')
        password = request_data.get('password')
        email = request_data.get('email')
        
        print("Username:", username)
        print("Password:", password)
        print("Email:", email)

        try:
            user = User.objects.get(email=email)
        except:
            return HttpResponse('user Does not exist')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse('Logged in')
        else:
            print('Invalid login')
            return HttpResponse('Invalid login')
    else:
        return HttpResponse('Login Page')

