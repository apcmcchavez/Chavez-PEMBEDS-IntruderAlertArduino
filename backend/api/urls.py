from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DetectionViewSet, SmartDeviceViewSet, get_stats

router = DefaultRouter()
router.register(r'detections', DetectionViewSet)
router.register(r'controls', SmartDeviceViewSet, basename='controls')

urlpatterns = [
    path('', include(router.urls)),
    path('stats/', get_stats, name='stats'),
]