from django.urls import path
import core.views

urlpatterns = [
    # authetication
    path("signup/manager", core.views.signup_manager, name="signup_manager"),
    path("login/manager", core.views.login_manager, name="login_manager"),
    path("signup/user", core.views.signup_user, name="signup_user"),
    path("login/user", core.views.login_user, name="login_user"),
    # locations
    path("add/location", core.views.add_location, name="add_location"),
    path("get/locations", core.views.get_locations, name="get_locations"),
    path("add/location_type", core.views.add_location_type, name="add_location_type"),
    path(
        "get/location_types", core.views.get_location_types, name="get_location_types"
    ),
    # category
    path("add/category", core.views.add_category, name="add_category"),
    path("get/categories", core.views.get_categories, name="get_categories"),
    path(
        "get/category/<uuid:pk>",
        core.views.get_category_by_uuid,
        name="get_category_by_uuid",
    ),
    # tasks
    path("create/task", core.views.create_task, name="create_task"),
    path("get/tasks", core.views.get_tasks, name="get_tasks"),
    path(
        "get/task/location/<str:pk>",
        core.views.get_task_by_location,
        name="get_task_by_location",
    ),
    path(
        "get/task/quest/<uuid:pk>",
        core.views.get_task_by_quest,
        name="get_task_by_quest",
    ),
    path(
        "get/task/category/<uuid:pk>",
        core.views.get_task_by_category,
        name="get_task_by_category",
    ),
    path(
        "get/task/location_type/<uuid:pk>",
        core.views.get_task_by_location_type,
        name="get_task_by_location_type",
    ),
    # quest
    path("create/quest", core.views.create_quest, name="create_quest"),
    path(
        "get/quest/location/<str:pk>",
        core.views.get_quest_by_location,
        name="get_quest_by_location",
    ),
    path(
        "get/quest/category/<uuid:pk>",
        core.views.get_quest_by_category,
        name="get_quest_by_category",
    ),
    path(
        "get/quest/location_type/<uuid:pk>",
        core.views.get_quest_by_location_type,
        name="get_quest_by_location_type",
    ),
    path(
        "get/quest/createdBy/<uuid:pk>",
        core.views.get_quest_by_createdBy,
        name="get_quest_by_createdBy",
    ),
    path(
        "compare/quest/createdBy",
        core.views.compare_quest_by_createdBy,
        name="compare_quest_by_createdBy",
    ),
    # User Quest
    path(
        "purchased/user_quest",
        core.views.purchased_user_quest,
        name="purchased_user_quest",
    ),
    path(
        "get/user_quest/user/<uuid:pk>",
        core.views.get_user_quest_by_user,
        name="get_user_quest_by_user",
    ),
    # Participant details
    path("get/user/<uuid:pk>", core.views.get_user_by_uuid, name="get_user_by_uuid"),
    path(
        "get/manager/<uuid:pk>",
        core.views.get_manager_by_uuid,
        name="get_manager_by_uuid",
    ),
    # Embeddings
    path(
        "create/single_quest_embeddings",
        core.views.create_single_quest_embeddings,
        name="create_single_quest_embeddings",
    ),
    path(
        "create/all_quest_embeddings",
        core.views.create_all_quest_embeddings,
        name="create_all_quest_embeddings",
    ),
    path(
        "get/quest/search_results",
        core.views.quest_search_results,
        name="quest_search_results",
    ),
]
