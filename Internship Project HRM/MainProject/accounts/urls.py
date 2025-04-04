from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import CombinedListViewSet, RoleViewSet, UserView, CurrentUserView

router = DefaultRouter()
router.register(r'combined-data', CombinedListViewSet, basename='combined-data')
router.register(r'role', RoleViewSet, basename='role')
router.register(r'permissions', RoleViewSet, basename='permissions')
router.register(r'user', UserView, basename="user")

urlpatterns = [
    path('accounts/', include(router.urls)),
    # Manually add the CurrentUserView endpoint
    path('accounts/users/me/', CurrentUserView.as_view(), name='current-user'),  # Corrected the URL path
]
