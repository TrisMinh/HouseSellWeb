# Appointment Regression Checklist - Plan 004

## Mục tiêu
- Smoke test nhanh toàn bộ luồng lịch hẹn sau khi sync BE-FE.
- Dùng để xác nhận 4 gate: Logic, Nghiệp vụ, Security, Test.

## Chuẩn bị
- Backend chạy tại `http://localhost:8000`.
- Frontend chạy tại `http://localhost:5173`.
- Có 3 tài khoản test: `buyer`, `owner`, `admin`.
- Có ít nhất 1 BĐS active của owner.

## Checklist

### C01 - Buyer tạo lịch hẹn hợp lệ
- Bước:
  1. Login buyer.
  2. Vào chi tiết BĐS của owner.
  3. Book appointment với ngày tương lai, giờ hợp lệ.
- Kỳ vọng:
  - API `POST /api/appointments/` trả `201`.
  - FE điều hướng sang `/appointment/{id}`.
  - Status ban đầu là `pending`.

### C02 - Buyer không thể đặt lịch cho BĐS của chính mình
- Bước:
  1. Login owner.
  2. Vào chi tiết BĐS do chính owner đăng.
  3. Thử book appointment.
- Kỳ vọng:
  - API trả `400` với lỗi field `property`.
  - FE hiển thị lỗi rõ ràng, không crash.

### C03 - Chặn ngày/giờ quá khứ
- Bước:
  1. Login buyer.
  2. Gửi payload tạo lịch với ngày hôm qua (hoặc giờ đã qua nếu cùng ngày).
- Kỳ vọng:
  - API trả `400` (`date`/`time`).
  - Không tạo bản ghi mới.

### C04 - Owner xem danh sách lịch hẹn trên nhà của mình
- Bước:
  1. Login owner.
  2. Gọi `GET /api/appointments/owner/`.
- Kỳ vọng:
  - Trả `200`, có record lịch hẹn liên quan BĐS của owner.

### C05 - Owner xác nhận lịch hẹn pending
- Bước:
  1. Owner gọi `PATCH /api/appointments/{id}/status/` với `confirmed`.
- Kỳ vọng:
  - Trả `200`.
  - `data.status = confirmed`.

### C06 - Owner không được complete trực tiếp từ pending
- Bước:
  1. Owner gọi status update `pending -> completed`.
- Kỳ vọng:
  - Trả `400`.
  - Status giữ nguyên.

### C07 - Buyer chỉ được cancel lịch của chính mình
- Bước:
  1. Buyer A cố cập nhật status lịch của buyer B.
  2. Buyer A cố set status `confirmed` cho lịch của chính mình.
- Kỳ vọng:
  - Trường hợp (1): `403/404` theo scope.
  - Trường hợp (2): `403`.

### C08 - Buyer cancel lịch pending/confirmed
- Bước:
  1. Buyer mở `AppointmentDetail` ở status `pending` hoặc `confirmed`.
  2. Click Cancel.
- Kỳ vọng:
  - API DELETE trả `200`.
  - FE cập nhật status thành `cancelled`.

### C09 - Không cho cancel lịch đã completed/rejected
- Bước:
  1. Buyer thử hủy lịch đã `completed` hoặc `rejected`.
- Kỳ vọng:
  - API trả `400`.
  - FE hiển thị thông báo lỗi.

### C10 - Object-level access cho detail
- Bước:
  1. User không liên quan gọi `GET /api/appointments/{id}/`.
- Kỳ vọng:
  - Trả `404` (không lộ object tồn tại).

### C11 - Admin có thể xử lý lịch như owner
- Bước:
  1. Login admin.
  2. Patch trạng thái lịch pending -> confirmed.
- Kỳ vọng:
  - Trả `200`.

### C12 - Build frontend không lỗi
- Bước:
  1. Chạy `npm run build` trong `FE`.
- Kỳ vọng:
  - Build pass.

## Kết quả thực thi (điền khi chạy)

| Check | Kết quả | Ghi chú |
|---|---|---|
| C01 | PASS | `run-plan004-appointment-smoke.py` -> `201`, status `pending` |
| C02 | PASS | `400` khi owner đặt lịch cho chính BĐS của mình |
| C03 | PASS | `400` với ngày quá khứ |
| C04 | PASS | `GET /owner/` -> `200`, có appointment đã tạo |
| C05 | PASS | `PATCH status=confirmed` -> `200` |
| C06 | PASS | `pending -> completed` bị chặn `400` |
| C07 | PASS | Buyer không được confirm/cancel appointment trái quyền (`403`) |
| C08 | PASS | Buyer cancel appointment hợp lệ -> `200` |
| C09 | PASS | Appointment `completed` không cho cancel (`400`) |
| C10 | PASS | User không liên quan xem detail -> `404` |
| C11 | PASS | Admin update status thành công -> `200` |
| C12 | PASS | FE build `npm run build` -> pass |

## Evidence

- API smoke report: `tasks-manager/task/plan-004/evidence/plan004-appointment-smoke-report.json`
- FE build: `npm run build` trong `FE` (pass)
