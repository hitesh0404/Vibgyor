from django.contrib import admin

# Register your models here.
from .models import Attendance,AttendanceDetails,Leave

admin.site.register([AttendanceDetails,Attendance,Leave]) 