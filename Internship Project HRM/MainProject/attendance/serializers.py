from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Attendance,AttendanceDetails,Leave

class AttendanceSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Attendance
        fields = "__all__"

class AttendanceDetailSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = AttendanceDetails
        fields = "__all__"
        
class LeaveSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Leave
        fields = "__all__"
