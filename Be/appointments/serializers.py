from rest_framework import serializers
from .models import Appointment

class AppointmentSerializer(serializers.ModelSerializer):
    """
    DTO cho Lịch Hẹn
    Return full Property details instead of just ID for mapping the UI easily.
    """
    property_title = serializers.CharField(source='property.title', read_only=True)
    property_owner = serializers.CharField(source='property.owner.username', read_only=True)
    property_address = serializers.CharField(source='property.address', read_only=True)
    
    class Meta:
        model = Appointment
        fields = [
            'id', 'property', 'property_title', 'property_owner', 'property_address',
            'date', 'time', 'name', 'phone', 'message', 'status', 'created_at'
        ]
        read_only_fields = ['status', 'created_at']

    def validate(self, data):
        # Additional custom validation could go here if needed.
        return data

class AppointmentStatusUpdateSerializer(serializers.Serializer):
    """
    DTO cho phép chủ nhà / Admin cập nhật trạng thái Lịch Hẹn
    """
    status = serializers.ChoiceField(choices=[
        ('confirmed', 'Đã xác nhận'),
        ('rejected', 'Bị từ chối'),
        ('completed', 'Đã hoàn thành'),
        ('cancelled', 'Đã hủy'),
    ])
