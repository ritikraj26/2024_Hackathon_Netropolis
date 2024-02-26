import os
from supabase_py import create_client

SUPABASE_URL = "https://xerztxtqspoezlapouta.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhlcnp0eHRxc3BvZXpsYXBvdXRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg4NTkzOTMsImV4cCI6MjAyNDQzNTM5M30.tY3aDKoc7ol06VKrDPHkcPhSkbwzfBBed_607gVVUZE"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# inserting into Gender
gender_data = [
    {"name": "Male"},
    {"name": "Female"},
]

for data in gender_data:
    supabase.table("core_gender").insert(data).execute()

# inserting into Role
role_data = [
    {"name": "Admin"},
    {"name": "Community Manager"},
    {"name": "User"},
]

for data in role_data:
    supabase.table("core_role").insert(data).execute()

# inserting location
location_data = [
    {"name": "Tokyo"},
    {"name": "Osaka"},
    {"name": "Kyoto"},
    {"name": "Hiroshima"},
    {"name": "Sapporo"},
]

for data in location_data:
    supabase.table("core_location").insert(data).execute()



# inserting catgory data

category_data = [
    {"name": "labor shortage issue experience"},
    {"name": "nature activities tea experience"},
    {"name": "Local life experience"},
]

for data in category_data:
    supabase.table("core_category").insert(data).execute()


# inserting task data
# more to be added
task_data = [
    {"name":"Experience feeding farmed fish by local fishermen","description":"","categoryId":1,"locationId":1},
    {"name":"Experience casting a net for inshore fishing by local fishermen","description":"","categoryId":1,"locationId":1},
    {"name":"Experience helping with fish preparation and sorting","description":"","categoryId":1,"locationId":1},
    {"name":"Experience planting coral reefs while scuba diving","description":"","categoryId":1,"locationId":1},
    {"name":"Experience helping pick up trash at the beach","description":"","categoryId":1,"locationId":1},
]



