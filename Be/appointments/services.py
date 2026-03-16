from django.core.exceptions import PermissionDenied
from rest_framework.exceptions import ValidationError
from .repositories import AppointmentRepository
from .models import AppointmentStatus

class AppointmentService:
    """
    Business logic layer for Appointments.
    """

    @staticmethod
    def create_appointment(user, validated_data: dict):
        """
        User đặt lịch hẹn xem nhà.
        """
        validated_data['user'] = user
        return AppointmentRepository.create_appointment(validated_data)

    @staticmethod
    def update_status(user, appointment_id: int, new_status: str):
        """
        Chủ nhà hoặc người đặt có quyền cập nhật trạng thái.
        Ví dụ: Chủ nhà (Owner) có thể Confirm/Reject/Complete.
        Người hẹn (User) có thể Cancel.
        """
        appointment = AppointmentRepository.get_by_id(appointment_id)

        # Quyền của người đặt lịch: Chỉ được HỦY
        if appointment.user == user:
            if new_status != AppointmentStatus.CANCELLED:
                raise PermissionDenied("Bạn chỉ có quyền HỦY lịch hẹn của mình.")
            
        # Quyền của chủ nhà: Được Xác nhận, Từ chối, Hoàn thành
        elif appointment.property.owner == user:
            if new_status == AppointmentStatus.CANCELLED:
                raise ValidationError("Chủ nhà không dùng trạng thái Cancelled, hãy dùng Rejected.")
        else:
            raise PermissionDenied("Bạn không có quyền thay đổi trạng thái lịch hẹn này.")

        appointment.status = new_status
        appointment.save()
        return appointment

    @staticmethod
    def cancel_appointment(user, appointment_id: int):
        """
        Hủy lịch hẹn (Dành cho người đăt)
        """
        appointment = AppointmentRepository.get_by_id(appointment_id)
        if appointment.user != user:
            raise PermissionDenied("Bạn không có quyền HỦY lịch hẹn này.")
        
        if appointment.status in [AppointmentStatus.COMPLETED, AppointmentStatus.REJECTED]:
            raise ValidationError("Không thể hủy lịch hẹn đã hoàn thành hoặc bị từ chối.")
            
        appointment.status = AppointmentStatus.CANCELLED
        appointment.save()
