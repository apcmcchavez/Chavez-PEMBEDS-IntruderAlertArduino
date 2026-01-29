from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DetectionViewSet, get_stats

router = DefaultRouter()
router.register(r'detections', DetectionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('stats/', get_stats, name='stats'),
]