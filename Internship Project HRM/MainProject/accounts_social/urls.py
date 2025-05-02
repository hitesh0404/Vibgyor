from .views import GoogleLoginView,GoogleOauthClientId
from django.urls import path

urlpatterns = [
    path('api/auth/google/', GoogleLoginView.as_view(), name='google-login'),
     path('google-client-id/',GoogleOauthClientId.as_view(),name="GOOGLE_OAUTH_CLIENT_ID")
]