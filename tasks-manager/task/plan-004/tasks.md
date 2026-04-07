# Tasks chi tiết - Plan 004 (V4 App Appointments)

## Quy tắc thực thi

- Mỗi task là atomic, có đầu vào/đầu ra rõ ràng.
- Mỗi task gán đúng 1 skill chính.
- Mỗi task bắt buộc qua 4 gate: Logic, Nghiệp vụ, Security, Test.
- Không chuyển phase nếu task trước chưa có bằng chứng pass gate.

## Phase A - Baseline & Contract

### [x] T001 - Trích contract Appointments từ guide v3
- Skill chính: `writing-plans`
- File:
  - Đọc: `tasks-manager/guilde/backend_guide_ver3.md`
  - Tạo: `tasks-manager/task/plan-004/appointment-contract-mapping.md`
- Đầu ra: Bảng endpoint + method + auth + payload/response chuẩn cho v4.
- Gate:
  - Logic: đủ toàn bộ endpoint Appointments trong guide.
  - Nghiệp vụ: mô tả đúng luồng buyer/owner.
  - Security: đánh dấu endpoint bắt buộc auth.
  - Test: đối chiếu trực tiếp với guide.

### [x] T002 - Đối chiếu contract guide với code BE hiện tại
- Skill chính: `software-architecture`
- File:
  - Đọc: `Be/appointments/models.py`, `serializers.py`, `views.py`, `urls.py`, `services.py`
  - Sửa: `tasks-manager/task/plan-004/appointment-contract-mapping.md`
- Đầu ra: Danh sách gap cụ thể (đúng/sai/thiếu) trước khi code.
- Gate:
  - Logic: gap có nguyên nhân rõ ràng.
  - Nghiệp vụ: gap gắn với use-case thực tế.
  - Security: gap auth/authz được highlight.
  - Test: có checklist gap làm baseline verify.

## Phase B - Backend Appointments Hardening

### [x] T003 - Chuẩn hóa model Appointment + migration (nếu cần)
- Skill chính: `django-pro`
- File:
  - Sửa: `Be/appointments/models.py`
  - Tạo/Sửa: migration trong `Be/appointments/migrations/`
- Đầu ra: model phản ánh đúng domain và dễ kiểm soát dữ liệu.
- Gate:
  - Logic: field/choices/index không mâu thuẫn.
  - Nghiệp vụ: phù hợp luồng đặt lịch và quản lý lịch.
  - Security: không tạo field lộ dữ liệu nhạy cảm.
  - Test: migration check pass.

### [x] T004 - Chuẩn hóa serializer validation cho create/status
- Skill chính: `python-pro`
- File:
  - Sửa: `Be/appointments/serializers.py`
- Đầu ra: validate chặt cho dữ liệu ngày giờ/trạng thái/thông tin liên hệ.
- Gate:
  - Logic: rule validate nhất quán.
  - Nghiệp vụ: reject dữ liệu sai rule lịch hẹn.
  - Security: sanitize input, không tin tưởng client.
  - Test: test invalid payload trả lỗi đúng format.

### [x] T005 - Chuẩn hóa service/repository cho status transitions
- Skill chính: `django-pro`
- File:
  - Sửa: `Be/appointments/repositories.py`
  - Sửa: `Be/appointments/services.py`
- Đầu ra: logic chuyển trạng thái tập trung ở service, query tập trung ở repository.
- Gate:
  - Logic: transition matrix rõ và chặt.
  - Nghiệp vụ: buyer/owner/admin đúng quyền thao tác.
  - Security: chặn thao tác trái quyền.
  - Test: test transition pass đủ nhánh chính.

### [x] T006 - Chuẩn hóa views/urls theo contract v4
- Skill chính: `django-pro`
- File:
  - Sửa: `Be/appointments/views.py`
  - Sửa: `Be/appointments/urls.py`
- Đầu ra: endpoint response/status code đúng contract chốt.
- Gate:
  - Logic: route và action mapping rõ ràng.
  - Nghiệp vụ: list/detail/status/delete đúng hành vi.
  - Security: mọi endpoint mutate có auth/authz.
  - Test: API test route-level pass.

### [x] T007 - Rà soát bảo mật Appointments ở mức object-level
- Skill chính: `backend-security-coder`
- File:
  - Sửa (nếu cần): `Be/appointments/views.py`, `Be/core/permissions.py`
- Đầu ra: ma trận quyền buyer/owner/admin được enforce ổn định.
- Gate:
  - Logic: không có xung đột permission.
  - Nghiệp vụ: đúng quy tắc nghiệp vụ quyền truy cập.
  - Security: chống IDOR trên detail/status/delete.
  - Test: test unauthorized/forbidden pass.

## Phase C - Test & Verify Backend

### [x] T008 - Viết test service/repository cho Appointments
- Skill chính: `python-testing-patterns`
- File:
  - Sửa: `Be/appointments/tests.py`
- Đầu ra: test đủ create/list/transition/cancel các nhánh quan trọng.
- Gate:
  - Logic: cover cả nhánh happy path + edge case.
  - Nghiệp vụ: phản ánh đúng role và status flow.
  - Security: case trái quyền trả lỗi đúng.
  - Test: module test Appointments pass.

### [x] T009 - Viết test API integration cho endpoint Appointments
- Skill chính: `python-testing-patterns`
- File:
  - Sửa: `Be/appointments/tests.py`
- Đầu ra: integration test cho toàn bộ endpoint v4.
- Gate:
  - Logic: request/response shape ổn định.
  - Nghiệp vụ: endpoint hành xử đúng theo contract.
  - Security: auth/authz assertions đầy đủ.
  - Test: integration tests pass.

### [x] T010 - Chạy verify backend cho plan-004
- Skill chính: `python-testing-patterns`
- Lệnh:
  - `python Be/manage.py check`
  - `python Be/manage.py makemigrations --check --dry-run`
  - `python Be/manage.py test appointments`
- Đầu ra: log verify backend cho Appointments.
- Gate:
  - Logic: không lỗi cấu hình/runtime.
  - Nghiệp vụ: test nghiệp vụ pass.
  - Security: test permission/validation pass.
  - Test: tất cả lệnh pass hoặc có báo cáo lỗi rõ ràng.

## Phase D - FE Contract Sync cho Appointments

### [x] T011 - Đồng bộ `appointmentsApi.ts` theo contract mới
- Skill chính: `software-architecture`
- File:
  - Sửa: `FE/src/lib/appointmentsApi.ts`
- Đầu ra: type + payload + response parser đồng bộ BE.
- Gate:
  - Logic: type mapping không mâu thuẫn.
  - Nghiệp vụ: đủ field cho màn hình lịch hẹn.
  - Security: xử lý lỗi API an toàn.
  - Test: smoke gọi API thành công.

### [x] T012 - Đồng bộ luồng đặt lịch từ ScheduleModal/PropertyDetail
- Skill chính: `software-architecture`
- File:
  - Sửa: `FE/src/components/common/ScheduleModal.tsx`
  - Sửa: `FE/src/pages/PropertyDetail.tsx`
- Đầu ra: payload đặt lịch đúng format backend, không còn mismatch thời gian.
- Gate:
  - Logic: date/time mapping nhất quán.
  - Nghiệp vụ: user đặt lịch đúng kỳ vọng.
  - Security: không submit dữ liệu rác.
  - Test: flow create appointment pass.

### [x] T013 - Đồng bộ màn `AppointmentDetail` theo status/permission mới
- Skill chính: `software-architecture`
- File:
  - Sửa: `FE/src/pages/AppointmentDetail.tsx`
- Đầu ra: hiển thị và action (cancel/status) đúng trạng thái backend.
- Gate:
  - Logic: UI state khớp backend state.
  - Nghiệp vụ: thao tác chỉ hiện khi hợp lệ.
  - Security: không mở action trái quyền ở UI.
  - Test: flow detail/cancel/status smoke pass.

### [x] T014 - Tạo checklist regression Appointments FE
- Skill chính: `writing-plans`
- File:
  - Tạo: `tasks-manager/task/plan-004/appointment-regression-checklist.md`
- Đầu ra: checklist pass/fail cho các luồng lịch hẹn.
- Gate:
  - Logic: bao phủ đủ flow chính.
  - Nghiệp vụ: bám hành trình user thật.
  - Security: có mục kiểm tra lỗi quyền truy cập.
  - Test: checklist được dùng để chạy smoke thực tế.

## Phase E - Tổng hợp & Review Memory

### [x] T015 - Cập nhật review memory cho plan-004
- Skill chính: `writing-plans`
- File:
  - Sửa: `tasks-manager/review/REVIEW.md`
- Đầu ra: ghi rõ việc đã làm, verification, rủi ro còn lại, bước tiếp theo.
- Gate:
  - Logic: timeline rõ ràng.
  - Nghiệp vụ: trạng thái hoàn thành đúng thực tế.
  - Security: nêu rõ risk tồn đọng (nếu có).
  - Test: đính kèm kết quả verify/smoke.


