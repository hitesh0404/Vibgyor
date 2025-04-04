from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import TaskAssignedViewSet, TaskSubmittedViewSet, TeamTaskAssignViewSet, TeamTaskSubmittedViewSet

router = DefaultRouter()
router.register(r'task-assigned', TaskAssignedViewSet, basename='task-assigned')
router.register(r'task-submitted', TaskSubmittedViewSet, basename='task-submitted')
router.register(r'team-task-assign', TeamTaskAssignViewSet, basename='team-task-assign')
router.register(r'team-task-submitted', TeamTaskSubmittedViewSet, basename='team-task-submitted')

urlpatterns = [
    path('task/', include(router.urls)),
]