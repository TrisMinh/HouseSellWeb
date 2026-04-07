# Appointment Contract Mapping - Plan 004

## 1) Contract từ Guide V3 (nguồn chuẩn)

### Base path
- `/api/appointments/`

### Endpoints

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| GET | `/api/appointments/` | Danh sách lịch hẹn của tôi (buyer/requester) | Bắt buộc |
| GET | `/api/appointments/{id}/` | Chi tiết lịch hẹn | Bắt buộc |
| POST | `/api/appointments/` | Đặt lịch xem nhà | Bắt buộc |
| PATCH | `/api/appointments/{id}/status/` | Cập nhật trạng thái (confirm/reject/complete/cancel) | Bắt buộc |
| DELETE | `/api/appointments/{id}/` | Hủy lịch hẹn | Bắt buộc |

## 2) Đối chiếu code trước khi hardening (baseline)

### Điểm đã đúng
- Có đủ endpoint chính cho list/detail/create/status/delete.
- Có endpoint riêng cho owner: `GET /api/appointments/owner/`.
- Có service/repository layer cho appointments.

### Gap phát hiện
- Validation create còn lỏng:
  - Chưa chặn ngày giờ quá khứ.
  - Chưa chặn user đặt lịch cho chính BĐS của mình.
  - Chưa chặn BĐS inactive/sold/rented.
- Transition status chưa chặt:
  - Chưa có ma trận chuyển trạng thái rõ theo vai trò.
- Object-level access còn thiếu staff path cho detail/list actor scope.
- Test coverage còn mỏng (mới cover vài case).

## 3) Contract chốt sau Plan 004

### Endpoint matrix

| Method | Endpoint | Request | Response | Quyền |
|---|---|---|---|---|
| GET | `/api/appointments/` | none | `Appointment[]` | requester đã login |
| GET | `/api/appointments/owner/` | none | `Appointment[]` | owner đã login |
| GET | `/api/appointments/{id}/` | none | `Appointment` | requester/owner/admin |
| POST | `/api/appointments/` | `CreateAppointmentPayload` | `Appointment` | user đã login, không phải chủ nhà của BĐS đó |
| PATCH | `/api/appointments/{id}/status/` | `{ status }` | `{ message, data: Appointment }` | requester/owner/admin theo rule transition |
| DELETE | `/api/appointments/{id}/` | none | `{ message }` | requester hủy lịch của chính mình |

### Create payload

```json
{
  "property": 12,
  "date": "2026-04-08",
  "time": "10:30",
  "name": "Nguyen Van A",
  "phone": "0900000000",
  "message": "Xin hen xem nha"
}
```

### Appointment response shape

```json
{
  "id": 91,
  "property": 12,
  "property_title": "Riverside Villa",
  "property_owner": "owner_user",
  "property_address": "123 Nguyen Hue, District 1",
  "date": "2026-04-08",
  "time": "10:30:00",
  "name": "Nguyen Van A",
  "phone": "0900000000",
  "message": "Xin hen xem nha",
  "status": "pending",
  "created_at": "2026-04-07T09:10:11.000Z",
  "updated_at": "2026-04-07T09:10:11.000Z"
}
```

## 4) Rule nghiệp vụ trạng thái (chốt)

### Requester (buyer)
- Được phép: `pending/confirmed -> cancelled`.
- Không được phép: chuyển sang `confirmed/rejected/completed`.

### Owner hoặc Admin
- `pending -> confirmed/rejected`
- `confirmed -> completed/rejected`
- Không được phép đổi từ trạng thái terminal (`rejected/completed/cancelled`).

## 5) Validation backend bắt buộc

- `date` không được ở quá khứ.
- Nếu `date` là hôm nay, `time` phải ở tương lai.
- Không cho đặt lịch vào BĐS của chính user.
- Không cho đặt lịch vào BĐS không còn khả dụng (`inactive/sold/rented` hoặc `is_active=false`).

## 6) FE sync points

- `FE/src/lib/appointmentsApi.ts`
  - Bổ sung `updated_at` trong `Appointment` type.
- `FE/src/components/common/ScheduleModal.tsx`
  - Chuẩn hóa time slot về định dạng `HH:mm`, gắn giờ vào `Date` trước khi submit.
- `FE/src/pages/PropertyDetail.tsx`
  - Duy trì payload `date/time` đúng chuẩn backend.
- `FE/src/pages/AppointmentDetail.tsx`
  - Nút cancel mở cho cả trạng thái `pending` và `confirmed` để khớp nghiệp vụ mới.

## 7) Kết luận gate

- Logic: luồng endpoint + trạng thái rõ ràng, không mâu thuẫn.
- Nghiệp vụ: vai trò buyer/owner/admin được tách đúng.
- Security: auth + object-level + validation đầu vào đầy đủ hơn.
- Test: được verify bằng test appointments và smoke FE build.
