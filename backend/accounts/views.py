from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")
        role = data.get("role")

        # Check for admin login first
        if username == "admin@cchub.in" and password == "Admin@123":
            return JsonResponse({"success": True, "role": "admin"})
        # Then check other roles
        elif role == "team" and username == "admin" and password == "adminpass":
            return JsonResponse({"success": True, "role": "team"})
        elif role == "student" and username == "student" and password == "studentpass":
            return JsonResponse({"success": True, "role": "student"})
        else:
            return JsonResponse({"success": False, "message": "Invalid credentials"})
