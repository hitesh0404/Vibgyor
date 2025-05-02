from .views import GoogleLoginView
from django.urls import path
urlpatterns = [
    path('api/auth/google/', GoogleLoginView.as_view(), name='google-login'),
]