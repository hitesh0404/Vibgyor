from django.views import View
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework import viewsets, mixins, permissions, status
from .models import User, Role, Department
from .serializers import RoleSerializer, DepartmentSerializer, ManagerSerializer, UserSerializer, JWTLoginSerializer
from attendance.models import Attendance,UserLeaveBalance
from django.utils.timezone import now
from task.models import TaskAssigned
from django.db.models import Q

class  UserView(viewsets.ModelViewSet):  
    queryset = User.objects.all()
    serializer_class = UserSerializer
    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]
  
class CombinedListViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    """
    A custom viewset that combines roles, departments, and managers into a single list view.
    """
    permission_classes = [permissions.AllowAny]
    def list(self, request, *args, **kwargs):
        # Fetch data for roles, departments, and managers
        roles = Role.objects.all()
        departments = Department.objects.all()
        managers = User.objects.filter(manager__isnull=False)  # Get users who have a manager
       
        # Serialize each of the data sets
        roles_serializer = RoleSerializer(roles, many=True,context= {'request':request})
        departments_serializer = DepartmentSerializer(departments, many=True,context= {'request':request})
        managers_serializer = ManagerSerializer(managers, many=True,context= {'request':request})

        # Return all data in a single response
        return Response({
           
            "roles": roles_serializer.data,
            "departments": departments_serializer.data,
            "managers": managers_serializer.data
        })

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = JWTLoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class Register(View):
    pass

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = permissions.IsAuthenticated


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        return Response( {
            'id':user.id,
            'firstName':user.first_name,
            'lastName' : user.last_name,
            "username": user.username,
            'email': user.email,
            "role": user.role.RoleName if user.role else "Employee",
            "department": user.department.dept_name if user.department else None,
        })

class CurrentUserStateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        today = now().date()
        start_of_month = today.replace(day=1)

        # Get attendance records for current month
        attendance_records = Attendance.objects.filter(
            emp=user,
            date__range=(start_of_month, today)
        )

        # Total working days = All days except Holiday + Week-off
        total_days = attendance_records.exclude(status__in=['Holiday', 'Week-off']).count()

        # Days marked as Leave or Absent
        days_missed = attendance_records.filter(status__in=['Leave', 'Absent']).count()

        # Calculate attendance rate
        attended_days = total_days - days_missed
        attendance_rate = round((attended_days / total_days) * 100, 2) if total_days else 0.0

        pending_tasks = TaskAssigned.objects.filter(Q(emp=user) & Q(status="Pending")).count()
        completed_tasks = TaskAssigned.objects.filter(Q(emp=user) & Q(status="Completed") & Q(given_on__gte=start_of_month)).count()
        current_year = today.year
      
        balance = UserLeaveBalance.objects.filter(user=user,  year=current_year)
        if balance:
            total = balance[0].aggregate_total_remaining()  
        else:
            total = 0
        team_members = User.objects.filter(department=user.department).exclude(id=user.id).count()
        performance_score = 87  # Replace with real model or logic

        return Response({
            "attendanceRate": attendance_rate,
            "pendingTasks": pending_tasks,
            "completedTasks": completed_tasks,
            "leaveBalance": total,
            "teamMembers": team_members,
            "performanceScore": performance_score,
        })

class CustomTokenRefreshView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        refresh_token = request.data.get("refresh")

        if not refresh_token:
            return Response({"detail": "Refresh token is required."}, status=400)

        try:
            refresh = RefreshToken(refresh_token)
            access_token = refresh.access_token

            user = User.objects.get(id=refresh["user_id"])

            user_data = {
                "username": user.username,
                "role": user.role.RoleName if user.role else None,
                "department": user.department.dept_name if user.department else None,
            }

            return Response({
                "access": str(access_token),
                "user_data": user_data
            })
        except (TokenError, InvalidToken, User.DoesNotExist) as e:
            return Response({"detail": "Invalid refresh token"}, status=401)
