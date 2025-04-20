from django.contrib import admin

# Register your models here.
from .models import TaskAssigned,TaskSubmitted,TeamTaskAssign,TeamTaskSubmitted


admin.site.register([TaskAssigned,TaskSubmitted,TeamTaskAssign,TeamTaskSubmitted])