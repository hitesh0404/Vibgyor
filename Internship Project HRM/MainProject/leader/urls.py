from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import TeamViewSet, TeamMemberViewSet, SubTaskAssignedViewSet, SubTaskSubmitViewSet

router = DefaultRouter()
router.register(r'team', TeamViewSet, basename='team')
router.register(r'team-member', TeamMemberViewSet, basename='team-member')
router.register(r'subtask-assigned', SubTaskAssignedViewSet, basename='subtask-assigned')
router.register(r'subtask-submit', SubTaskSubmitViewSet, basename='subtask-submit')

urlpatterns = [
    path('leader/', include(router.urls)),
]