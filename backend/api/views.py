from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Detection
from .serializers import DetectionSerializer
from .models import Detection, SmartDevice
from .serializers import DetectionSerializer, SmartDeviceSerializer

class DetectionViewSet(viewsets.ModelViewSet):
    queryset = Detection.objects.all()
    serializer_class = DetectionSerializer
    
class SmartDeviceViewSet(viewsets.ModelViewSet):
    queryset = SmartDevice.objects.all().order_by('id')
    serializer_class = SmartDeviceSerializer

@api_view(['GET'])
def get_stats(request):
    """Get dashboard statistics"""
    total_detections = Detection.objects.count()
    latest_detection = Detection.objects.first()
    
    stats = {
        'total_incidents': total_detections,
        'latest_distance': latest_detection.distance if latest_detection else 0,
        'latest_timestamp': latest_detection.timestamp if latest_detection else None
    }
    
    return Response(stats)