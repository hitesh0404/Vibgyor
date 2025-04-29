from django.urls import include, path, re_path
from .views import  GoogleLogin, GoogleLoginCallback, LoginPage,GoogleLoginView
urlpatterns = [
    path("login/", LoginPage.as_view(), name="login"),
    path("api/v1/auth/", include("dj_rest_auth.urls")),
    re_path(r"^api/v1/auth/accounts/", include("allauth.urls")),
    path("api/v1/auth/registration/", include("dj_rest_auth.registration.urls")),
    path("api/v1/auth/google/", GoogleLogin.as_view(), name="google_login"),
    path(
        "api/v1/auth/google/callback/",
        GoogleLoginCallback.as_view(),
        name="google_login_callback",
    ),
    path('auth/', include('dj_rest_auth.urls')),  # login/logout/password
    path('auth/registration/', include('dj_rest_auth.registration.urls')),  # registration
    path('auth/social/', include('allauth.socialaccount.urls')),
    path('auth/social/google/login/callback/', GoogleLoginView.as_view(),),
    path('accounts/google-login/', GoogleLoginView.as_view(), name='google-login'),

    # path("~redirect/", view=UserRedirectView.as_view(), name="redirect")
]