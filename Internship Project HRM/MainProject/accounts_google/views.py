from rest_framework import permissions
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from django.conf import settings
from urllib.parse import urljoin

import requests
from django.urls import reverse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

class GoogleLogin(SocialLoginView):
    permission_classes = [permissions.AllowAny]  # Allow any user to access this endpoint
    adapter_class = GoogleOAuth2Adapter
    callback_url = settings.GOOGLE_OAUTH_CALLBACK_URL
    client_class = OAuth2Client 

# class GoogleLoginCallback(APIView):
#     permission_classes = [permissions.AllowAny]

#     def get(self, request, *args, **kwargs):
#         """
#         If you are building a fullstack application (eq. with React app next to Django)
#         you can place this endpoint in your frontend application to receive
#         the JWT tokens there - and store them in the state
#         """

#         code = request.GET.get("code")

#         if code is None:
#             return Response(status=status.HTTP_400_BAD_REQUEST)
        
#         # Remember to replace the localhost:8000 with the actual domain name before deployment
#         token_endpoint_url = urljoin("http://localhost:8000", reverse("google_login"))
#         response = requests.post(url=token_endpoint_url, data={"code": code})

#         return Response(response.json(), status=status.HTTP_200_OK)
from allauth.socialaccount.helpers import complete_social_login
from allauth.socialaccount.models import SocialLogin
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from allauth.socialaccount.helpers import complete_social_login
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.models import SocialLogin
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from allauth.socialaccount.models import SocialAccount

class GoogleLoginCallback(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        
        """
        Handle the callback from Google, exchange the authorization code for an access token,
        and authenticate the user.
        """
        code = request.GET.get("code")

        if not code:
            return Response({"error": "No authorization code provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # The GoogleOAuth2Adapter will handle the code exchange and OAuth flow
            adapter = GoogleOAuth2Adapter(request)
            
            # Create a SocialLogin object using the adapter
            login = SocialLogin(adapter)
            
            # Exchange the code and complete the social login
            complete_social_login(request, login)

            # Get the authenticated user
            user = login.account.user

            # You can return a JWT token or session token for the authenticated user
            return Response({
                "message": "Authenticated successfully",
                "user_id": user.id,
                "username": user.username,
            }, status=status.HTTP_200_OK)

        except Exception as e:
            # Log the error for debugging
            return Response({"error": f"Error during login: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
 
from django.conf import settings
from django.shortcuts import render
from django.views import View

...

class LoginPage(View):
    def get(self, request, *args, **kwargs):
        return render(
            request,
            "accounts_google/login.html",
            { 
                "google_callback_uri": settings.GOOGLE_OAUTH_CALLBACK_URL,
                "google_client_id": settings.GOOGLE_OAUTH_CLIENT_ID,
            },
        )
    
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import RedirectView

...

# class UserRedirectView(LoginRequiredMixin, RedirectView):
#     """
#     This view is needed by the dj-rest-auth-library in order to work the google login. It's a bug.
#     """

#     permanent = False

#     def get_redirect_url(self):
#         return "redirect-url"
# views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import GoogleLoginSerializer

class GoogleLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        
        """
        Handle the callback from Google, exchange the authorization code for an access token,
        and authenticate the user.
        """
        code = request.GET.get("code")

        if not code:
            return Response({"error": "No authorization code provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # The GoogleOAuth2Adapter will handle the code exchange and OAuth flow
            adapter = GoogleOAuth2Adapter(request)
            
            # Create a SocialLogin object using the adapter
            login = SocialLogin(adapter)
            
            # Exchange the code and complete the social login
            complete_social_login(request, login)

            # Get the authenticated user
            user = login.account.user

            # You can return a JWT token or session token for the authenticated user
            return Response({
                "message": "Authenticated successfully",
                "user_id": user.id,
                "username": user.username,
            }, status=status.HTTP_200_OK)
        except Exception as e:
            # Log the error for debugging
            return Response({"error": f"Error during login: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def post(self, request):
        serializer = GoogleLoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
