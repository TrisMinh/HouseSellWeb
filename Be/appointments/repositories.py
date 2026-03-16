from .models import Appointment

class AppointmentRepository:
    """
    Repository for Appointment queries to separate DB layer from Service layer
    """
    
    @staticmethod
    def get_user_appointments(user):
        """Lấy danh sách lịch hẹn của một user cụ thể"""
        return Appointment.objects.filter(user=user).select_related('property', 'property__owner')
        
    @staticmethod
    def get_owner_appointments(owner_user):
        """Lấy danh sách các lịch hẹn mà khách đặt trên các BĐS của chủ sở hữu này"""
        return Appointment.objects.filter(property__owner=owner_user).select_related('property', 'user')

    @staticmethod
    def get_by_id(pk: int):
        """Lấy 1 lịch hẹn theo ID"""
        return Appointment.objects.get(pk=pk)

    @staticmethod
    def create_appointment(data: dict) -> Appointment:
        """Tạo lịch hẹn mới"""
        return Appointment.objects.create(**data)
