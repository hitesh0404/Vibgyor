# from rest_framework import serializers
from django.contrib.auth.models import Permission, Group
from rest_framework.serializers import HyperlinkedModelSerializer,ModelSerializer
from rest_framework import serializers
from .models import User,Role,Department
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        exclude = ['user_permissions','groups']
        extra_kwargs = {
            'password': {'write_only': True, 'required':False },
            'role': {'write_only': True, 'required':False }
        }
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Hash password if it's being updated
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super().update(instance, validated_data)

class RoleSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Role
        fields = "__all__"


class DepartmentSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Department
        exclude = ['location']
        
class ManagerSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url','first_name','last_name','username','role','department','manager']




class JWTLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)
    user_data = serializers.DictField(read_only=True)

    def validate(self, data):
        username_or_email = data.get("username")
        password = data.get("password")

        # Try to authenticate with username first
        user = authenticate(username=username_or_email, password=password)

        # If failed, try to use email to fetch the user
        if not user:
            try:
                user_obj = User.objects.get(email=username_or_email)
                user = authenticate(username=user_obj.username, password=password)
            except User.DoesNotExist:
                raise serializers.ErrorDetail("User Doesn't Exists")

        if not user:
            raise serializers.ValidationError("Invalid credentials")

        if not user.is_active:
            raise serializers.ValidationError("User account is disabled.")

        # Generate JWT token pair
        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        # Optional: Add custom claims or user data
        user_data = {
            "id": user.id,
            "firstName": user.first_name,
            "lastName": user.last_name,
            "username": user.username,
            "email": user.email,
            "role": user.role.RoleName if user.role else "Employee",
            "department": user.department.dept_name if user.department else None,
        }

        return {
            "refresh": str(refresh),
            "access": str(access),
            "user_data": user_data
        }
