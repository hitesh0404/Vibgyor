from rest_framework import viewsets
from .models import Team, Team_Member, SubTaskAssigned, SubTaskSubmit
from .serializers import TeamSerializer, TeamMemberSerializer, SubTaskAssignedSerializer, SubTaskSubmitSerializer
from rest_framework.permissions import IsAuthenticated

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [IsAuthenticated]


class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = Team_Member.objects.all()
    serializer_class = TeamMemberSerializer
    permission_classes = [IsAuthenticated]


class SubTaskAssignedViewSet(viewsets.ModelViewSet):
    queryset = SubTaskAssigned.objects.all()
    serializer_class = SubTaskAssignedSerializer
    permission_classes = [IsAuthenticated]


class SubTaskSubmitViewSet(viewsets.ModelViewSet):
    queryset = SubTaskSubmit.objects.all()
    serializer_class = SubTaskSubmitSerializer
    permission_classes = [IsAuthenticated]