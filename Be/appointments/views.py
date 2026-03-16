from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from .models import Appointment
from .serializers import AppointmentSerializer, AppointmentStatusUpdateSerializer
from .repositories import AppointmentRepository
from .services import AppointmentService


class AppointmentListView(generics.ListCreateAPIView):
    """
    GET: Lấy danh sách lịch hẹn CỦA TÔI (người đặt)
    POST: Đặt một lịch hẹn mới
    """
    permission_classes = [IsAuthenticated]
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        return AppointmentRepository.get_user_appointments(self.request.user)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Chuyển business logic cho Service
        appointment = AppointmentService.create_appointment(
            user=request.user, 
            validated_data=serializer.validated_data
        )
        
        return Response(
            AppointmentSerializer(appointment).data, 
            status=status.HTTP_201_CREATED
        )


class OwnerAppointmentListView(generics.ListAPIView):
    """
    GET: Lấy danh sách lịch hẹn khách ĐẶT TRÊN NHÀ QUẢN LÝ
    (Dành cho Role Chủ Nhà)
    """
    permission_classes = [IsAuthenticated]
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        return AppointmentRepository.get_owner_appointments(self.request.user)


class AppointmentDetailView(generics.RetrieveDestroyAPIView):
    """
    GET: Xem chi tiết 1 lịch hẹn
    DELETE: Hủy lịch hẹn
    """
    permission_classes = [IsAuthenticated]
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        # Allow both user's viewing and owner's viewing
        return Appointment.objects.filter(models.Q(user=self.request.user) | models.Q(property__owner=self.request.user))
        
    def delete(self, request, *args, **kwargs):
        # Logic Hủy do Service xử lý
        AppointmentService.cancel_appointment(request.user, self.kwargs['pk'])
        return Response({'message': 'Lịch hẹn đã được hủy thành công!'}, status=status.HTTP_200_OK)


class AppointmentStatusUpdateView(APIView):
    """
    PATCH: Cập nhật trạng thái Lịch hẹn
    Dành cho quản lý (Chủ nhà xác nhận, từ chối...)
    """
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk, *args, **kwargs):
        serializer = AppointmentStatusUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        appointment = AppointmentService.update_status(
            user=request.user,
            appointment_id=pk,
            new_status=serializer.validated_data['status']
        )
        
        return Response({
            'message': 'Đã cập nhật trạng thái',
            'data': AppointmentSerializer(appointment).data
        })
