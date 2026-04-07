# Plan 004 - V4 App Appointments (Lịch hẹn)

## Checklist Tien Do

- [x] Da tao plan
- [x] Da thuc thi plan
- [x] Da verify ket qua
- [x] Da cap nhat task + review
## Skill orchestration dùng cho kế hoạch này

- `writing-plans`: chia phase/task nhỏ, rõ đầu vào/đầu ra.
- `django-pro`: triển khai endpoint và flow theo chuẩn Django/DRF.
- `python-pro`: chuẩn hóa business logic và validate dữ liệu.
- `backend-security-coder`: kiểm soát auth/authz và dữ liệu nhạy cảm.
- `python-testing-patterns`: thiết kế test và bằng chứng chạy test.
- `software-architecture`: đảm bảo contract BE-FE nhất quán.

## Mục tiêu

1. Hoàn thiện V4 `appointments` theo guide v3 và rule hiện hành.
2. Đồng bộ contract Appointments giữa backend và frontend.
3. Có bằng chứng verify qua 4 cổng: Logic, Nghiệp vụ, Security, Test chạy thực tế.

## Phạm vi

### Backend

- Rà soát và chuẩn hóa model `Appointment` theo nghiệp vụ lịch hẹn.
- Chuẩn hóa serializer create/update-status (validate dữ liệu, validate trạng thái).
- Chuẩn hóa service/repository cho luồng đặt lịch, cập nhật trạng thái, hủy lịch.
- Chuẩn hóa endpoint:
  - `GET /api/appointments/`
  - `GET /api/appointments/owner/`
  - `GET /api/appointments/{id}/`
  - `POST /api/appointments/`
  - `PATCH /api/appointments/{id}/status/`
  - `DELETE /api/appointments/{id}/`
- Bổ sung/hoàn thiện test cho permission matrix và status transitions.

### Frontend

- Đồng bộ `FE/src/lib/appointmentsApi.ts` theo contract backend.
- Đồng bộ luồng đặt lịch từ `FE/src/components/common/ScheduleModal.tsx` + `FE/src/pages/PropertyDetail.tsx`.
- Đồng bộ hiển thị/hủy lịch tại `FE/src/pages/AppointmentDetail.tsx`.
- Tạo checklist regression cho luồng lịch hẹn.

## Out of scope

- Refactor các app ngoài `appointments` (news/prediction/accounts/properties) trừ phần bắt buộc để sync contract.
- Thay đổi kiến trúc deploy/CI/CD.
- Thiết kế lại UI tổng thể toàn bộ FE.

## Định nghĩa hoàn thành (Done Criteria)

1. API Appointments hoạt động đúng theo contract đã chốt cho v4.
2. Rule phân quyền rõ ràng cho buyer/owner/admin khi cập nhật trạng thái và hủy lịch.
3. Validation input đủ chặt (ngày giờ, trạng thái, dữ liệu liên hệ).
4. FE gọi API đúng payload và render đúng response Appointments.
5. Có tài liệu mapping contract và checklist regression cho plan-004.
6. Test backend cho Appointments pass.
7. Có log verification và cập nhật `tasks-manager/review/REVIEW.md`.

## 4 cổng kiểm tra bắt buộc

### Gate 1 - Logic

- Luồng create/list/detail/status/delete không mâu thuẫn.
- Không tạo side effects ngoài phạm vi nghiệp vụ lịch hẹn.

### Gate 2 - Nghiệp vụ

- Buyer/Owner/Admin thao tác đúng quyền và đúng trạng thái chuyển tiếp.
- Dữ liệu lịch hẹn trả về đủ cho FE hiển thị.

### Gate 3 - Security

- Bắt buộc auth cho toàn bộ endpoint Appointments.
- Authz object-level đúng vai trò.
- Không lộ dữ liệu nhạy cảm trong response/error/log.

### Gate 4 - Test chạy thực tế

- Unit/integration test cho Appointments pass.
- Smoke test FE-BE cho luồng đặt lịch, xem chi tiết, cập nhật trạng thái, hủy lịch pass.

## Deliverables

- `tasks-manager/task/plan-004/tasks.md`
- `tasks-manager/task/plan-004/appointment-contract-mapping.md`
- `tasks-manager/task/plan-004/appointment-regression-checklist.md`
- Cập nhật `tasks-manager/review/REVIEW.md` sau khi thực thi.


