from django.db import models

class Detection(models.Model):
    sensor_type = models.CharField(max_length=50, default='ultrasonic')
    distance = models.IntegerField()  # Distance in cm
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-timestamp']  # Newest first
    
    def __str__(self):
        return f"Detection #{self.id} - {self.distance}cm at {self.timestamp}"


class SmartDevice(models.Model):
    name = models.CharField(max_length=50, unique=True)  # e.g., "led1", "motor"
    is_active = models.BooleanField(default=False)       # On/Off switch
    value = models.IntegerField(default=0)               # Brightness/Speed (0-255)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - Active: {self.is_active} - Value: {self.value}"