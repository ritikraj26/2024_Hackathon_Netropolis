# Generated by Django 5.0.2 on 2024-02-27 12:41

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0005_remove_user_age_remove_user_gender_remove_user_hobby_and_more"),
    ]

    operations = [
        migrations.DeleteModel(
            name="User",
        ),
    ]
