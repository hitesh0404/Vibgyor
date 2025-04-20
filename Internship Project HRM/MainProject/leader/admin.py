from django.contrib import admin

# Register your models here.
from .models import Team,Team_Member,SubTaskAssigned,SubTaskSubmit

admin.site.register([Team,Team_Member,SubTaskAssigned,SubTaskSubmit])