from django.urls import path
import core.views

urlpatterns = [
    # authetication
    path("signup/manager", core.views.signup_manager, name="signup_manager"),
    path("login/manager", core.views.login_manager, name="login_manager"),
    path("signup/user", core.views.signup_user, name="signup_user"),
    path("login/user", core.views.login_user, name="login_user"),
    
    #locations
    path("add/location", core.views.add_location, name="add_location"),
    path("add/location_type", core.views.add_location_type, name="add_location_type"),

    #category
    path("add/category", core.views.add_category, name="add_category"),
    path("get/categories", core.views.get_categories, name="get_categories"),
    path("get/category/<uuid:pk>", core.views.get_category_by_uuid, name="get_category_by_uuid"),
    
    #tasks
    path("create/task", core.views.create_task, name="create_task"),
    path("get/tasks", core.views.get_tasks, name="get_tasks"),
    path("get/task/location/<str:pk>", core.views.get_task_by_location, name="get_task_by_location"),
    path("get/task/category", core.views.get_task_by_category, name="get_task_by_category"),

    #quest
    path("create/quest", core.views.create_quest, name="create_quest"),
    path("get/quest/location/<str:pk>", core.views.get_quest_by_location, name="get_quest_by_location"),

    

]