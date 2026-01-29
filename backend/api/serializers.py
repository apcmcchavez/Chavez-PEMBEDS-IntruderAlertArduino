from rest_framework import serializers
from .models import Detection

class DetectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detection
        fields = ['id', 'sensor_type', 'distance', 'timestamp']
        read_only_fields = ['id', 'timestamp']