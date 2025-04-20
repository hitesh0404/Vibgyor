from rest_framework import serializers
from .models import TaskAssigned, TaskSubmitted, TeamTaskAssign, TeamTaskSubmitted
from accounts.models import User

class TaskAssignedSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TaskAssigned
        fields = "__all__"


class TaskSubmittedSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TaskSubmitted
        fields = "__all__"


class TeamTaskAssignSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TeamTaskAssign
        fields = "__all__"


class TeamTaskSubmittedSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TeamTaskSubmitted
        fields = "__all__"