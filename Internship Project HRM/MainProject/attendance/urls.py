from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import *

router = DefaultRouter()
router.register(r'attendance-details', AttendanceDetailsViewSet, basename='attendance_details')
router.register(r'attendance', AttendanceViewSet, basename='attendance')
router.register(r'leave', LeaveViewSet, basename='leave')

urlpatterns = [
    path('attendance/', include(router.urls)),
]