from rest_framework.views import APIView
from rest_framework import response
from django.contrib.auth.hashers import make_password
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from google.oauth2 import id_token
from google.auth.transport import requests
from django.conf import settings
from django.contrib.auth import get_user_model
from accounts.models import Role,Department
from department.models import Location
from django.conf import settings
User = get_user_model()
import secrets
class GoogleLoginView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        token = request.data.get('token')
        if not token or not isinstance(token, str):
            return Response({"error": "Token missing"}, status=400)
        try:
            # Verify Google token
            id_info = id_token.verify_oauth2_token(
                token, 
                requests.Request(),
                settings.GOOGLE_OAUTH_CLIENT_ID
            )
            if not id_info.get('email_verified', False):
                return Response({"error": "Email not verified by Google"}, status=400)
            # Get or create user
            email = id_info['email']
            # First get or create default Location
            default_location, _ = Location.objects.get_or_create(
                name='Headquarters',
                defaults={'name': 'Headquarters'}
            )

            # Then get or create default Department
            default_department, _ = Department.objects.get_or_create(
                dept_name='General',
                defaults={
                    'location': default_location,
                    'description': 'Default department for new employees',
                    'WeekOff': 5,  # Saturday
                    'status': True
                }
            )

            # Get or create default Role
            default_role, _ = Role.objects.get_or_create(
                RoleName='Employee',
                defaults={'description': 'Default role for new employees'}
            )

            # Now create/update the user
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    'is_active':True,
                    'username': email.split('@')[0],
                    'first_name': id_info.get('given_name', ''),
                    'last_name': id_info.get('family_name', ''),
                    'role': default_role,
                    'department': default_department,
                    'contact_details': '0000000000',  # Default phone number
                    'gender': 'N',  # "Don't want to mention"
                    'password': make_password(secrets.token_urlsafe(16)),  # Required field
                }
            )

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            user_data = {
                "id": user.id,
                'username': email.split('@')[0],
                "firstName": user.first_name,
                "lastName": user.last_name,
                "email": user.email,
                "role": user.role.RoleName if user.role else "Employee",
                "department": user.department.dept_name if user.department else None,
            }

            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user_data": user_data
            })

        except ValueError:
            return Response({"error": "Invalid Google token"}, status=400)


class GoogleOauthClientId(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self,request):
        return response(
            {
                "GOOGLE_OAUTH_CLIENT_ID":settings.GOOGLE_OAUTH_CLIENT_ID
            }
        )