from rest_framework import serializers
from .models import Detection
from .models import Detection, SmartDevice

class DetectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detection
        fields = ['id', 'sensor_type', 'distance', 'timestamp']
        read_only_fields = ['id', 'timestamp']
    
class SmartDeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = SmartDevice
        fields = '__all__'