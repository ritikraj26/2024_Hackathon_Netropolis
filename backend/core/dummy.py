import os
from supabase_py import create_client

SUPABASE_URL = "https://lwojmawvcshsjivpyhuq.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3b2ptYXd2Y3Noc2ppdnB5aHVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3OTQxNjIsImV4cCI6MjAyNDM3MDE2Mn0.qUO8eC1KNVatV6lvJHxwgvY1IGUq7dLAIq1hMVLI3o0"

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

