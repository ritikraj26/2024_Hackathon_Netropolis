import uuid
from django.db import models
from pgvector.django import VectorField
from django.contrib.auth.models import (
    User,
    AbstractUser,
    AbstractBaseUser,
    Group,
    Permission,
)


class Location(models.Model):
    uuid = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    name = models.CharField(max_length=150)
    description = models.TextField()


class Participant(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    uuid = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    email = models.EmailField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)

    role = models.CharField(max_length=150, blank=True, null=True)
    gender = models.CharField(max_length=150, blank=True, null=True)

    age = models.PositiveIntegerField(null=True, blank=True)
    hobby = models.CharField(max_length=150, blank=True, null=True)
    job = models.CharField(max_length=150, blank=True, null=True)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    organization = models.CharField(max_length=150, blank=True, null=True)
    points = models.PositiveIntegerField(default=0, blank=True, null=True)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = "Participant"
        verbose_name_plural = "Participants"


class Category(models.Model):
    uuid = models.UUIDField(primary_key=True, editable=False)
    name = models.CharField(max_length=150)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"


class Location_Type(models.Model):
    uuid = models.UUIDField(primary_key=True, editable=False)
    name = models.CharField(max_length=150)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Location Type"
        verbose_name_plural = "Location Types"


class Task(models.Model):
    uuid = models.UUIDField(primary_key=True, editable=False)
    name = models.CharField(max_length=150)
    description = models.TextField()
    creator_uuid = models.ForeignKey(Participant, on_delete=models.CASCADE)
    points = models.PositiveIntegerField()
    duration = models.PositiveIntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    location_type = models.ForeignKey(Location_Type, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Task"
        verbose_name_plural = "Tasks"


class Quest(models.Model):
    uuid = models.UUIDField(primary_key=True, editable=False)
    name = models.CharField(max_length=150)
    description = models.TextField()
    total_points = models.PositiveIntegerField()
    total_duration = models.PositiveIntegerField()
    max_people = models.PositiveIntegerField()
    location = models.ForeignKey(Location, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(Participant, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Quest"
        verbose_name_plural = "Quests"


class Quest_Task(models.Model):
    uuid = models.UUIDField(primary_key=True, editable=False)
    day_number = models.PositiveIntegerField()
    quest = models.ForeignKey(Quest, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.quest.name} - {self.task.name}"

    class Meta:
        verbose_name = "Quest Task"
        verbose_name_plural = "Quest Tasks"


class User_Quest(models.Model):
    uuid = models.UUIDField(primary_key=True, editable=False)
    is_completed = models.BooleanField(default=False)
    description = models.TextField(default="")
    user = models.ForeignKey(Participant, on_delete=models.CASCADE)
    quest = models.ForeignKey(Quest, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} - {self.quest.name}"

    class Meta:
        verbose_name = "User Quest"
        verbose_name_plural = "User Quests"


class QuestEmbeddings(models.Model):
    quest_uuid = models.UUIDField(unique=True)
    quest_vector = VectorField(dimensions=384)  # This field type is a guess.

    class Meta:
        managed = False
        db_table = "quest_embeddings"
