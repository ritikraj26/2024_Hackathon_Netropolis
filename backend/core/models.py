from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission


# User Part
class User(models.Model):
    uuid = models.UUIDField()
    username = models.CharField(max_length = 100, unique = True)
    first_name = models.CharField(max_length = 100)
    last_name = models.CharField(max_length = 100)
    age = models.IntegerField()
    hobby = models.CharField(max_length = 100)
    job = models.CharField(max_length = 100)
    roleId = models.IntegerField(default = 3)


class CommunityManager(models.Model):
    uuid = models.UUIDField()
    username = models.CharField(max_length = 100, unique = True)
    first_name = models.CharField(max_length = 100)
    last_name = models.CharField(max_length = 100)
    age = models.IntegerField()
    orgName = models.CharField(max_length = 100)
    roleId = models.IntegerField(default = 2)
    locationId = models.IntegerField()


class Role(models.Model):
    id = models.AutoField(primary_key = True)
    name = models.CharField(max_length = 100)


class Gender(models.Model):
    id = models.AutoField(primary_key = True)
    name = models.CharField(max_length = 100)


class Category(models.Model):
    id = models.AutoField(primary_key = True)
    name = models.CharField(max_length = 100)


class LocationType(models.Model):
    id = models.AutoField(primary_key = True)
    name = models.CharField(max_length = 100)


class Location(models.Model):
    id = models.AutoField(primary_key = True)
    name = models.CharField(max_length = 100)
    locationTypeId = models.IntegerField()



# Quest Part  
class Quest(models.Model):
    id = models.AutoField(primary_key = True)
    name = models.CharField(max_length = 100)
    description = models.CharField(max_length = 100)
    days = models.IntegerField()
    maxParticipants = models.IntegerField()


class Task(models.Model):
    id = models.AutoField(primary_key = True)
    name = models.CharField(max_length = 100)
    description = models.CharField(max_length = 100)
    categoryId = models.IntegerField()
    locationId = models.IntegerField()


class QuestTask(models.Model):
    id = models.AutoField(primary_key = True)
    dayNumber = models.IntegerField()
    questId = models.IntegerField()
    taskId = models.IntegerField()