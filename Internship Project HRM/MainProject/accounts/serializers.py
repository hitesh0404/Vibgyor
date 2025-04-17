# from rest_framework import serializers
from django.contrib.auth.models import Permission, Group
from rest_framework.serializers import HyperlinkedModelSerializer,ModelSerializer
from rest_framework import serializers
from .models import User,Role,Department
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        # fields = '__all__'  # or list all fields explicitly
        exclude = ['user_permissions']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # Hash password before saving
        # validated_data.pop('password2')
        validated_data['password'] = make_password(validated_data['password'])
        
        # department = Department.objects.get(dept_name = validated_data.pop['department'])[0]
        # role = Department.objects.get(id = validated_data.pop['role'] )[0]
        # manager_email = validated_data.pop('manager', None)
        # manager = None
        # if manager_email:
        #     manager = User.objects.get(email=manager_email)
        # user = User.objects.create(
        #     department=department,
        #     role=role,
        #     manager=manager,
        #     **validated_data
        # )
        # print(role,department,manager)
        return super().create(validated_data)


    def update(self, instance, validated_data):
        # Hash password if it's being updated
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super().update(instance, validated_data)
# class UserSerializer(HyperlinkedModelSerializer):
#     user_permissions = serializers.PrimaryKeyRelatedField(many=True, queryset=Permission.objects.all())
#     groups = serializers.PrimaryKeyRelatedField(many=True, queryset=Group.objects.all())
#     role = serializers.PrimaryKeyRelatedField(queryset=Role.objects.all())
#     department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all())
#     manager = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)
#     class Meta:
#         model = User
#         fields = "__all__"

# class UserRegisterSerializer(ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['role','department','manager']


class RoleSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Role
        fields = "__all__"

class DepartmentSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Department
        fields = "__all__"
        
class ManagerSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url','first_name','last_name','role','department','manager']

# class UserPermissionSerializer(ModelSerializer):
#     class Meta:
#         model = Permission
#         fields = "__all__"