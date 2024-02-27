from django.urls import path
import core.views

urlpatterns = [
    # authetication
    path("signup/manager", core.views.signup_manager, name="signup_manager"),
    path("login/manager", core.views.login_manager, name="login_manager"),
    path("signup/user", core.views.signup_user, name="signup_user"),
    path("login/user", core.views.login_user, name="login_user"),
    path("add/location", core.views.add_location, name="add_location"),
    # path("login/", core.views.loginView, name="login"),
    # path("signup/user", core.views.signupUser, name=""),
    # path("logout/", "core.views.logout"),
]