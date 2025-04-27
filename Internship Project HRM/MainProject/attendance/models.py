from django.db import models
from accounts.models import User
from department.models import Department
from django.utils import timezone
from datetime import time
from django.db.models import Sum

class AttendanceDetails(models.Model):
    SHIFT_CHOICES = [
        (time(6, 0), "06:00 AM"),
        (time(8, 0),  "08:00 AM"),
        (time(9, 0),  '09:00 AM'),
        (time(10, 0), "10:00 AM"),
        (time(14, 0), "02:00 PM"),
        (time(18, 0), "06:00 PM"),
        (time(19, 0), '07:00 PM'),
        (time(22, 0), "10:00 PM"),
    ]

    emp = models.OneToOneField(User, on_delete=models.PROTECT, null=False, blank=False)
    dept = models.ForeignKey(Department, on_delete=models.PROTECT, related_name="attendance_records",null=True)
    shiftStartTime = models.TimeField(choices=SHIFT_CHOICES, null=False, blank=False)
    shiftEndTime = models.TimeField(choices=SHIFT_CHOICES, null=False, blank=False)
    
    def __str__(self):
        return f"{self.emp.username} - {self.shiftStartTime} to {self.shiftEndTime}"


class Attendance(models.Model):
    attendance_detail = models.ForeignKey(AttendanceDetails, on_delete=models.PROTECT, null=False, blank=False)
    emp = models.ForeignKey(User, on_delete=models.PROTECT, related_name="attendance_logs", null=False, blank=False)
    date = models.DateField(auto_now_add=True)  
    startTime = models.TimeField(default=timezone.now, null=True, blank=True)
    endTime = models.TimeField(null=True, blank=True)
    Remark=models.CharField(max_length=20,choices=[('Late', 'Late'),('Over Time', 'Over Time'),('On Time', 'On Time'),],default='On Time')
    status = models.CharField(max_length=20,choices=[('Present', 'Present'),('Absent', 'Absent'),('Leave', 'Leave'),('Half day', 'Half day'),('Holiday','Holiday'),("Week-off","Week-off")],default='Present')

    class Meta:
        unique_together = ('emp', 'date') 
        constraints = [
            models.UniqueConstraint(fields=['emp','date', 'status'], name='unique_emp_status')  
        ]
        indexes = [
            models.Index(fields=['date']),
            models.Index(fields=['emp', 'status'])  
        ]
        
    def __str__(self):
        return f"{self.emp.username} - {self.date} - {self.status}"



class Leave(models.Model):
    emp = models.ForeignKey(User, on_delete=models.PROTECT, related_name="leave_requests", null=False, blank=False)
    applied_on=models.DateField(auto_now_add=True)
    date_from = models.DateField(null=False, blank=False)
    date_to = models.DateField(null=False, blank=False)
    reason = models.TextField()
    status = models.CharField(max_length=20,choices=[('Pending', 'Pending'),('Approved', 'Approved'),('Rejected', 'Rejected')],default='Pending')
    approved_by = models.ForeignKey(User, on_delete=models.PROTECT, null=False, blank=False)
    def __str__(self):
        return f"{self.emp.username} - {self.date_from} to {self.date_to} - {self.status}"
class LeaveType(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=50, unique=True)  # e.g. 'SICK', 'VACATION'
    requires_approval = models.BooleanField(default=True)
    is_paid = models.BooleanField(default=True)
    def __str__(self):
        return self.name

    
class LeavePolicy(models.Model):
    leave_type = models.ForeignKey(LeaveType, on_delete=models.CASCADE, related_name='policies')
    department = models.ForeignKey(Department, null=True, blank=True, on_delete=models.SET_NULL, related_name='leave_policies')
    # location = models.ForeignKey(Location, null=True, blank=True, on_delete=models.SET_NULL, related_name='leave_policies')
    annual_quota = models.PositiveIntegerField()  # e.g. 15 days/year
    carry_forward = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        unique_together = ('leave_type', 'department')

    def __str__(self):
        target = []
        if self.department:
            target.append(f"Dept: {self.department.name}")
        if self.location:
            target.append(f"Loc: {self.location.name}")
        return f"{self.leave_type.name} Policy ({', '.join(target) if target else 'Global'})"



class Holiday(models.Model):
    name = models.CharField(max_length=35)
    date = models.DateField()
    department = models.ForeignKey(Department,on_delete=models.DO_NOTHING)

class UserLeaveBalance(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leave_balances')
    leave_policy = models.ForeignKey('LeavePolicy', on_delete=models.CASCADE, related_name='user_balances')
    year = models.PositiveIntegerField()  # You can use current year
    total_allocated = models.PositiveIntegerField(default=0)  # Total leave granted for year
    used = models.PositiveIntegerField(default=0)             # Used so far
    carried_forward = models.PositiveIntegerField(default=0)  # From previous year
    remaining = models.PositiveIntegerField(default=0)        # Computed field
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'leave_policy', 'year')

    def save(self, *args, **kwargs):
        # Auto-compute remaining
        self.remaining = (self.total_allocated + self.carried_forward) - self.used
        super().save(*args, **kwargs)

    def aggregate_total_remaining(self):
        total = self.aggregate(total=Sum('remaining'))['total']
        return total or 0

    def __str__(self):
        return f"{self.user} - {self.leave_policy.leave_type.code} ({self.year})"