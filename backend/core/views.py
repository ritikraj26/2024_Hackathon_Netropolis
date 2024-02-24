from supabase_py import create_client
import json
from django.shortcuts import render, HttpResponse
from django.views.decorators.csrf import csrf_exempt


SUPABASE_URL = "https://lwojmawvcshsjivpyhuq.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3b2ptYXd2Y3Noc2ppdnB5aHVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3OTQxNjIsImV4cCI6MjAyNDM3MDE2Mn0.qUO8eC1KNVatV6lvJHxwgvY1IGUq7dLAIq1hMVLI3o0"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


@csrf_exempt 
def signupView(request):
    if request.method == 'POST':
        request_data_str = request.body.decode('utf-8')
        request_data = json.loads(request_data_str)

        username = request_data.get('username')
        password = request_data.get('password')
        email = request_data.get('email')
        first_name = request_data.get('first_name')
        last_name = request_data.get('last_name')
        age = request_data.get('age')
        hobby = request_data.get('hobby')
        job = request_data.get('job')


        user = supabase.auth.get_user_by_email(email)
        if user:
            return HttpResponse('Account already exists', status=400)

        user = supabase.auth.sign_up(email=email, password=password)
        if not user.get('error'):
            user_uuid = user.get('user').get('id')
            user_data = {
                'uuid': user_uuid,
                'username': username,
                'first_name': first_name,
                'last_name': last_name,
                'age': age,
                'hobby': hobby,
                'job': job,
            }
            supabase.table('core_user').insert(user_data).execute()
        else:
            return HttpResponse(f'Signup failed: {user["error"]["message"]}', status=400)

        return HttpResponse('Signed up successfully')

    return HttpResponse('Signup Page') 


@csrf_exempt
def loginView(request):
    if request.method == 'POST':
        request_data_str = request.body.decode('utf-8')
        request_data = json.loads(request_data_str)

        username = request_data.get('username')
        password = request_data.get('password')
        
        user = supabase.auth.sign_in(username=username, password=password)
        if user.get('error'):
            return HttpResponse('Login failed', status=400)
    else:
        return HttpResponse('Login Page')


@csrf_exempt
def logout(request):
    if request.method == 'POST':
        supabase.auth.sign_out()
        return HttpResponse('Logged out successfully')
    else:
        return HttpResponse('Logout Page')
    

# Manager CRUD for task

@csrf_exempt
def viewTasks(request):
    if request.method == 'GET':
        user = supabase.auth.user()
        if user:
            tasks = supabase.table('tasks').select('*').execute()
            return HttpResponse(json.dumps(tasks), content_type='application/json')
        else:
            return HttpResponse('User not logged in', status=401)
    else:
        return HttpResponse('Invalid request method', status=405)


@csrf_exempt
def addTask(request):
    if request.method == 'POST':
        user = supabase.auth.user()
        if user:
            request_data_str = request.body.decode('utf-8')
            request_data = json.loads(request_data_str)
            name = ""
            description = ""
            locationId = 0
            categoryId = 0
            try:
                name = request_data.get('name')
                description = request_data.get('description')
                locationId = request_data.get('locationId')
                categoryId = request_data.get('categoryId')

                if not supabase.table("core_location").select('id').eq('id', locationId).execute():
                    return HttpResponse('Please Enter a Valid Location', status=404)
                if not supabase.table("core_category").select('id').eq('id', categoryId).execute():
                    return HttpResponse('Please Enter a Valid Category', status=404)
                task = {
                    'name': name,
                    'description': description,
                    'locationId': locationId,
                    'categoryId': categoryId,
                }
                supabase.table('tasks').insert(task).execute()
                return HttpResponse('Task added successfully')
            except Exception as e:
                print(f"An error occurred: {str(e)}")
                return HttpResponse('Task not added', status=400)
        else:
            return HttpResponse('User not logged in', status=401)
    else:
        return HttpResponse('Invalid request method', status=405)


