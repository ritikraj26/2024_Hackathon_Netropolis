from django.urls import path
import core.views

urlpatterns = [
    path("login/", core.views.loginView, name="login"),
    path("signup/", core.views.signupView, name="signup"),
    # path("logout/", "core.views.logout"),
]