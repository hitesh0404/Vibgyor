from rest_framework import viewsets
from .models import Task_Assigned, Task_Submitted, TeamTaskAssign, TeamTaskSubmitted
from .serializers import TaskAssignedSerializer, TaskSubmittedSerializer, TeamTaskAssignSerializer, TeamTaskSubmittedSerializer
from rest_framework.permissions import IsAuthenticated

class TaskAssignedViewSet(viewsets.ModelViewSet):
    queryset = Task_Assigned.objects.all()
    serializer_class = TaskAssignedSerializer
    permission_classes = [IsAuthenticated]


class TaskSubmittedViewSet(viewsets.ModelViewSet):
    queryset = Task_Submitted.objects.all()
    serializer_class = TaskSubmittedSerializer
    permission_classes = [IsAuthenticated]


class TeamTaskAssignViewSet(viewsets.ModelViewSet):
    queryset = TeamTaskAssign.objects.all()
    serializer_class = TeamTaskAssignSerializer
    permission_classes = [IsAuthenticated]


class TeamTaskSubmittedViewSet(viewsets.ModelViewSet):
    queryset = TeamTaskSubmitted.objects.all()
    serializer_class = TeamTaskSubmittedSerializer
    permission_classes = [IsAuthenticated]