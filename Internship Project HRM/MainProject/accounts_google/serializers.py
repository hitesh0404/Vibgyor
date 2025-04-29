# serializers.py

from rest_framework import serializers
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from accounts.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class GoogleLoginSerializer(serializers.Serializer):
    token = serializers.CharField()

    def validate(self, data):
        token = data.get("token")
        try:
            idinfo = id_token.verify_oauth2_token(token, google_requests.Request())

            if "email" not in idinfo:
                raise serializers.ValidationError("Email not provided by Google")

            email = idinfo["email"]
            first_name = idinfo.get("given_name", "")
            last_name = idinfo.get("family_name", "")

            user, created = User.objects.get_or_create(email=email, defaults={
                "username": email,
                "first_name": first_name,
                "last_name": last_name,
                "role_id": 1,  # Or assign default role
            })

            if not user.is_active:
                raise serializers.ValidationError("User account is disabled")

            refresh = RefreshToken.for_user(user)
            return {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": {
                    "username": user.username,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "role": user.role.RoleName,
                }
            }

        except ValueError:
            raise serializers.ValidationError("Invalid Google token")
