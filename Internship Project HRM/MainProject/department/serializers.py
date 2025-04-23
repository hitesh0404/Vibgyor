from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Department
from .models import Location

class Departmentserializer(HyperlinkedModelSerializer):
    class Meta:
        model = Department
        fields = "__all__"

class LocationSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Location
        fields = "__all__"