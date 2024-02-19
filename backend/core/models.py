from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    region = models.CharField(max_length=100, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
   

class Participant(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="participant")
    field_of_specialization = models.CharField(max_length=100, null=True, blank=True)
    quests_and_regions_completed = models.JSONField(null=True, blank=True)
    contribution_points = models.IntegerField(default=0)

    groups = models.ManyToManyField(Group, related_name="participants")
    user_permissions = models.ManyToManyField(Permission, related_name="participants")

    class Meta:
        verbose_name = "Participant"
        verbose_name_plural = "Participants"
    
    def __str__(self):
        return self.username
    
    def save(self, *args, **kwargs):
        self.is_staff = False
        self.is_superuser = False
        self.is_active = True
        super().save(*args, **kwargs)


class Manager(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="community_manager")
    age = models.IntegerField(null=True, blank=True)
    groups = models.ManyToManyField(Group, related_name="community_managers")
    user_permissions = models.ManyToManyField(Permission, related_name="community_managers")
    

    class Meta:
        verbose_name = "Manager"
        verbose_name_plural = "Managers"
    
    def __str__(self):
        return self.username
    
    def save(self, *args, **kwargs):
        self.is_staff = True
        self.is_superuser = False
        self.is_active = True
        super().save(*args, **kwargs)



