from django.contrib import admin

# Register your models here.
from .models import Attendance,AttendanceDetails,Leave,LeavePolicy,LeaveType,Holiday,UserLeaveBalance

admin.site.register([AttendanceDetails,Attendance,Leave,LeavePolicy,LeaveType,Holiday,UserLeaveBalance]) 