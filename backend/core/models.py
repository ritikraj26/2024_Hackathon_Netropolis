from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.translation import gettext_lazy as _

# defaul fields in AbstractUser
# username
# first_name
# last_name
# email
# password
# groups
# user_permissions
# is_staff
# is_active
# is_superuser
# last_login
# date_joined

# Participant Model
class Participant(AbstractUser):
    region = models.CharField(max_length=100, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    field_of_specialization = models.CharField(max_length=100, null=True, blank=True)
    quests_and_regions_completed = models.JSONField(null=True, blank=True)
    contribution_points = models.IntegerField(default=0)

    groups = models.ManyToManyField(
        Group,
        verbose_name=_('groups'),
        blank=True,
        related_name='participant_groups'
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_('user permissions'),
        blank=True,
        related_name='participant_user_permissions'
    )

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


# Community Manager Model
class CommunityManager(AbstractUser):
    region = models.CharField(max_length=100, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)


    groups = models.ManyToManyField(
        Group,
        verbose_name=_('groups'),
        blank=True,
        related_name='community_manager_groups'
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_('user permissions'),
        blank=True,
        related_name='community_manager_user_permissions'
    )

    class Meta:
        verbose_name = "Community Manager"
        verbose_name_plural = "Community Managers"
    
    def __str__(self):
        return self.username
    
    def save(self, *args, **kwargs):
        self.is_staff = True
        self.is_superuser = False
        self.is_active = True
        super().save(*args, **kwargs)


# Admin Model
# class Admin(AbstractUser):
#     class Meta:
#         verbose_name = "Admin"
#         verbose_name_plural = "Admins"

#     def __str__(self):
#         return self.username
    
#     def save(self, *args, **kwargs):
#         self.is_staff = True
#         self.is_superuser = True
#         self.is_active = True
#         super().save(*args, **kwargs)


# class Quest(models.Model):
#     description = models.TextField()
#     duration = models.DurationField()
#     region = models.CharField(max_length=100)
#     points = models.IntegerField()
#     is_active = models.BooleanField(default=True)
#     participation_size = models.IntegerField()
#     start_date = models.DateField()
#     end_date = models.DateField()
#     community_manager = models.ForeignKey(Community_Manager, on_delete=models.CASCADE, related_name="quests")


# class Task(models.Model):
#     name = models.CharField(max_length=100)
#     description = models.TextField()
#     points = models.IntegerField()
#     region = models.CharField(max_length=100)
#     duration = models.DurationField()
#     quest = models.ForeignKey(Quest, on_delete=models.CASCADE, related_name="tasks", null=True, blank=True)
#     is_active = models.BooleanField(default=True)



# class TaskImage(models.Model):
#     task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="images")
#     image = models.ImageField(upload_to="task_images/")



class QuestRequest(models.Model):
    pass


