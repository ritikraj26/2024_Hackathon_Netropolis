from rest_framework import serializers
from .models import (
    Location, 
    Participant, 
    Category, 
    Location_Type, 
    Task, 
    Quest, 
    Quest_Task, 
    User_Quest
)


class Location_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

class Category_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class Location_Type_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Location_Type
        fields = '__all__'

class Participant_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = '__all__'

class Task_Serializer(serializers.ModelSerializer):
    category = Category_Serializer(read_only=True)
    location = Location_Serializer(read_only=True)
    location_type = Location_Type_Serializer(read_only=True)

    class Meta:
        model = Task
        fields = '__all__'  

class Quest_Serializer(serializers.ModelSerializer):
    location = Location_Serializer(read_only=True)
    created_by = Participant_Serializer(read_only=True)

    class Meta:
        model = Quest
        fields = '__all__'

class QuestTaskSerializer(serializers.ModelSerializer):
    quest = Quest_Serializer(read_only=True)
    task = Task_Serializer(read_only=True)

    class Meta:
        model = Quest_Task
        fields = '__all__' 

class UserQuestSerializer(serializers.ModelSerializer):
    user = Participant_Serializer(read_only=True)
    quest = Quest_Serializer(read_only=True)

    class Meta:
        model = User_Quest
        fields = '__all__'
