from django.shortcuts import render

# Create your views here.
from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet
from .models import *
from .serializers import *

class DepartmentViewSet(ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = Departmentserializer
    permission_classes = [permissions.IsAuthenticated]


class LocationViewSet(ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer