from django.urls import path, include
from rest_framework import routers
from .views import ProfileViewSet, RequirementViewSet, AppointmentViewSet, RegisterAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()
router.register(r'profiles', ProfileViewSet, basename='profile')
router.register(r'requirements', RequirementViewSet, basename='requirement')
router.register(r'appointments', AppointmentViewSet, basename='appointment')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', RegisterAPIView.as_view(), name='auth-register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
