"""
URL configuration for vibgyor project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from accounts.views import UserView
from accounts.views import CombinedListViewSet
from rest_framework.authtoken.views import obtain_auth_token
router = DefaultRouter()
router.register(r'user',UserView)
# router.register(r'combined-data', CombinedListViewSet, basename='combined-data')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include(router.urls)),
    path('api/',include('accounts.urls')),
    # path('api/',),
    path('api/',include('attendance.urls')),
    path('api/',include('department.urls')),
    path('api/',include('leader.urls')),
    path('api/',include('task.urls')),
    path('api-token-auth/',obtain_auth_token,name='api_token_auth'),
]