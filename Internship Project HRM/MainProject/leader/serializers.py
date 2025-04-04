from rest_framework import serializers
from .models import Team, Team_Member, SubTaskAssigned, SubTaskSubmit
from department.models import Department  # If you want to include department info
from accounts.models import User  # Assuming you want to include user info

class TeamSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Team
        fields = "__all__"


class TeamMemberSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Team_Member
        fields = "__all__"


class SubTaskAssignedSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SubTaskAssigned
        fields = "__all__"


class SubTaskSubmitSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SubTaskSubmit
        fields = "__all__"