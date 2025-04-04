from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Department

class Departmentserializer(HyperlinkedModelSerializer):
    class Meta:
        model = Department
        fields = "__all__"