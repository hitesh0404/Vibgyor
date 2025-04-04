from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import *

router = DefaultRouter()
router.register(r'department', DepartmentViewSet, basename='department')

urlpatterns = [
    path('department/', include(router.urls)),
]