# Generated by Django 5.0.2 on 2024-02-27 13:05

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0009_user"),
    ]

    operations = [
        migrations.DeleteModel(
            name="User",
        ),
    ]
