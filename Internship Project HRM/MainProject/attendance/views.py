from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions,mixins
from rest_framework.response import Response
from .models import *
from .serializers import *
from datetime import date
from rest_framework.views import APIView
from django.db.models import Q

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
class AttendanceStatus(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        print("here")
        emp = request.user
        data = Attendance.objects.filter(Q(date=date.today) & Q(emp = emp)).only(['startTime','endTime','attendance_detail'])
        if data:
            return  Response(
                {
                    'shiftStartTime' : data.attendance_detail.shiftStartTime,
                    'shiftEndTime' : data.attendance_detail.shiftEndTime,
                    'checkinTime': data.starTime,
                    'checkoutTime': data.endTime,
                }
            )      
        else:
            return Response({
                {
                    'checkinTime': None,
                    'checkoutTime': None,
                }
            })