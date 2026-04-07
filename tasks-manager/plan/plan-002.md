# Plan 002 - Hoàn thiện V3 BE + FE (Contract Sync)

## Checklist Tien Do

- [x] Da tao plan
- [x] Da thuc thi plan
- [x] Da verify ket qua
- [x] Da cap nhat task + review
## Skill orchestration dùng cho kế hoạch này

- `writing-plans`: chia phase và task nhỏ, rõ đầu vào/đầu ra.
- `django-pro`: chuẩn kiến trúc Django/DRF.
- `python-pro`: chuẩn code Python production.
- `backend-security-coder`: kiểm soát security khi thay đổi API.
- `python-testing-patterns`: test strategy và bằng chứng chạy test.
- `software-architecture`: kiểm tra tính logic và tính nhất quán kiến trúc.

## Mục tiêu

1. Hoàn thiện BE theo guide v3 (đặc biệt module `properties`).
2. Đồng bộ FE để gửi request và hiển thị đúng response mới từ BE.
3. Thiết lập quy trình kiểm tra bắt buộc theo 4 cổng:
   - Logic
   - Nghiệp vụ
   - Security
   - Test chạy thực tế

## Phạm vi

### Backend

- Tạo `properties/repositories.py`.
- Tạo `properties/services.py`.
- Refactor `properties/views.py` thành controller mỏng.
- Tạo `core/permissions.py` dùng chung.
- Chuẩn hóa input validation cho `prediction` qua serializer.
- Tạo `utils/factories.py`.
- Tạo command `core/management/commands/seed_data.py`.
- Viết test cho các flow chính.

### Frontend

- Đồng bộ contract BE-FE ở layer API:
  - `FE/src/lib/api.ts`
  - `FE/src/lib/authApi.ts`
  - `FE/src/lib/propertiesApi.ts`
  - `FE/src/lib/appointmentsApi.ts`
  - `FE/src/lib/newsApi.ts`
- Cập nhật UI pages bị ảnh hưởng:
  - `FE/src/pages/Listings.tsx`
  - `FE/src/pages/PropertyDetail.tsx`
  - `FE/src/pages/News.tsx`
  - `FE/src/pages/PricePrediction.tsx`
  - `FE/src/pages/AppointmentDetail.tsx`

## Out of scope

- Docker/CI/CD production deployment.
- Refactor toàn bộ app ngoài phạm vi v3.
- Thay đổi DB engine hoặc migration phá dữ liệu.

## Định nghĩa hoàn thành (Done Criteria)

1. `properties` chạy đúng pattern Repository + Service + DTO + Permission.
2. `prediction` có serializer validate input.
3. FE gọi đúng endpoint/payload và parse đúng response.
4. Có tài liệu mapping contract BE-FE.
5. Có test và smoke test end-to-end pass.
6. Đã qua 4 cổng kiểm tra cho từng nhóm task.

## 4 cổng kiểm tra bắt buộc

### Gate 1 - Logic

- Luồng xử lý không mâu thuẫn.
- Không tạo side effect ngoài ý định.

### Gate 2 - Nghiệp vụ

- Đáp ứng đúng yêu cầu business hiện tại.
- Không phá workflow đang dùng ở FE.

### Gate 3 - Security

- Input validation đầy đủ.
- Auth/Authz đúng quyền.
- Không lộ thông tin nhạy cảm trong error response/log.

### Gate 4 - Test chạy thực tế

- Unit/integration test pass.
- Smoke test BE-FE pass với các flow chính.

## Deliverables

- `tasks-manager/task/plan-002/tasks.md` (task atomic + skill mapping).
- `tasks-manager/task/plan-002/api-contract-mapping.md`.
- `tasks-manager/task/plan-002/fe-regression-checklist.md`.
- Cập nhật `tasks-manager/review/REVIEW.md` sau mỗi phase.


