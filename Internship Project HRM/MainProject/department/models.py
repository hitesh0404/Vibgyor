from django.db import models
# Create your models here.

class Location(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name 
WEEKDAYS = [
        (0, 'Monday'),
        (1, 'Tuesday'),
        (2, 'Wednesday'),
        (3, 'Thursday'),
        (4, 'Friday'),
        (5, 'Saturday'),
    ] 

class Department(models.Model):
    dept_id= models.BigAutoField(primary_key=True,auto_created=True)
    dept_name=models.CharField(max_length=100,unique=True,null=False)
    location = models.ForeignKey(Location,on_delete=models.RESTRICT)
    description=models.CharField(max_length=300,null=False)
    create_at=models.DateTimeField (auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    status=models.BooleanField(default=True)
    WeekOff=models.IntegerField(choices=WEEKDAYS,blank=False,default=5)
    def __str__(self):
        return f"{self.dept_name} "