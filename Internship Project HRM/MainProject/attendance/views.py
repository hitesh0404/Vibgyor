from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions 
# Create your views here.
from .models import *
from .serializers import *

class AttendanceViewSet(ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    def get_permissions(self):
        permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

class AttendanceDetailsViewSet(ModelViewSet):
    queryset = AttendanceDetails.objects.all()
    serializer_class = AttendanceDetailSerializer
    def get_permissions(self):
        permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]
    
class LeaveViewSet(ModelViewSet):
    queryset = Leave.objects.all()
    serializer_class = LeaveSerializer
    def get_permissions(self):
        permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]
    