from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Holiday, AttendanceDetails, Attendance
from accounts.models import User
from datetime import date, timedelta


from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import AttendanceDetails, Attendance, Holiday
from accounts.models import User
from datetime import date, timedelta
import calendar


@receiver(post_save, sender=AttendanceDetails)
def create_or_update_future_attendance(sender, instance, created, **kwargs):
    if not instance.dept:
        return

    today = date.today()
    future_days = 360  # You can change this range
    user = instance.emp
    department = instance.dept

    # Get holidays
    holidays = set(Holiday.objects.filter(
        department=department,
        date__gte=today
    ).values_list('date', flat=True))

    # Get department week-off day as integer (0=Mon, ..., 6=Sun)
    week_off_day = department.WeekOff

    # Delete any future attendance records for this user
    Attendance.objects.filter(emp=user, date__gte=today).delete()

    # Generate future attendance records
    for day_offset in range(future_days):
        attendance_date = today + timedelta(days=day_offset)

        # Check for holiday
        if attendance_date in holidays:
            Attendance.objects.create(
                attendance_detail=instance,
                emp=user,
                date=attendance_date,
                status='Holiday',
                Remark=''
            )
            continue

        # Check for week-off
        if attendance_date.weekday() == week_off_day:
            Attendance.objects.create(
                attendance_detail=instance,
                emp=user,
                date=attendance_date,
                status='Week-off',
                Remark='Week-off'
            )
            continue

        # # Otherwise, mark as Present
        # Attendance.objects.create(
        #     attendance_detail=instance,
        #     emp=user,
        #     date=attendance_date,
        #     status='Present',
        #     Remark='On Time'
        # )

@receiver(post_save, sender=Holiday)
def mark_holiday_for_department(sender, instance, created, **kwargs):
    if not instance.department:
        return

    users = User.objects.filter(department=instance.department)
    holiday_date = instance.date

    for user in users:
        # Get their current shift, if assigned
        try:
            shift = AttendanceDetails.objects.get(emp=user)
        except AttendanceDetails.DoesNotExist:
            shift = None

        # Create or update attendance for the holiday date
        attendance, _ = Attendance.objects.update_or_create(
            emp=user,
            date=holiday_date,
            defaults={
                'attendance_detail': shift,
                'status': 'Holiday',
                'Remark': '',
            }
        )
