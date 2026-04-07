# Tasks chi tiết - Plan 002 (Atomic + 1 Skill/Task)

## Quy tắc thực thi

- Mỗi task là một bước nhỏ, làm xong trong thời gian ngắn.
- Mỗi task gán đúng 1 skill chính.
- Mỗi task phải ghi bằng chứng qua 4 cổng: Logic/Nghiệp vụ/Security/Test.
- Không chuyển task tiếp theo nếu task hiện tại chưa pass.

## Phase A - Contract Baseline

### [x] T001 - Lập bảng endpoint hiện tại của BE
- Skill chính: `django-pro`
- File:
  - Đọc: `Be/core/urls.py`, `Be/*/urls.py`
  - Tạo: `tasks-manager/task/plan-002/api-contract-mapping.md`
- Đầu ra: Danh sách endpoint + method + mục đích.
- Gate:
  - Logic: mapping đủ endpoint public/mutate.
  - Nghiệp vụ: endpoint map đúng màn FE đang dùng.
  - Security: đánh dấu endpoint cần auth.
  - Test: đối chiếu URL với code thực tế.

### [x] T002 - Lập bảng field response chính cho FE
- Skill chính: `software-architecture`
- File:
  - Đọc: `Be/*/serializers.py`, `Be/*/views.py`
  - Sửa: `tasks-manager/task/plan-002/api-contract-mapping.md`
- Đầu ra: Bảng field response cho listings/detail/news/appointments/prediction/auth.
- Gate:
  - Logic: field name nhất quán.
  - Nghiệp vụ: đủ field FE cần render.
  - Security: không expose field nhạy cảm.
  - Test: kiểm tra bằng serializer definitions.

## Phase B - Refactor BE theo V3

### [x] T003 - Tạo `properties/repositories.py`
- Skill chính: `django-pro`
- File:
  - Tạo: `Be/properties/repositories.py`
- Đầu ra: Hàm truy vấn tập trung (list/get/by-owner/favorite/increment-view).
- Gate:
  - Logic: hàm query tách biệt, không trùng lặp.
  - Nghiệp vụ: đáp ứng đủ use-case hiện tại.
  - Security: chỉ query dữ liệu được phép.
  - Test: tạo test repository cơ bản hoặc test qua service.

### [x] T004 - Tạo `properties/services.py`
- Skill chính: `python-pro`
- File:
  - Tạo: `Be/properties/services.py`
- Đầu ra: Business logic create/update/delete/toggle favorite/upload image.
- Gate:
  - Logic: business rule nằm trong service, không ở view.
  - Nghiệp vụ: đúng hành vi owner và user thường.
  - Security: check quyền trước mutate.
  - Test: test service các nhánh chính.

### [x] T005 - Refactor `properties/views.py` sang controller mỏng
- Skill chính: `django-pro`
- File:
  - Sửa: `Be/properties/views.py`
- Đầu ra: View chỉ parse request -> gọi service/repository -> trả response.
- Gate:
  - Logic: không còn query/business logic dày trong view.
  - Nghiệp vụ: response giữ tương thích FE.
  - Security: permission check còn hiệu lực.
  - Test: endpoint test pass sau refactor.

### [x] T006 - Tạo `core/permissions.py` dùng chung
- Skill chính: `backend-security-coder`
- File:
  - Tạo: `Be/core/permissions.py`
  - Sửa: các views cần dùng chung permission.
- Đầu ra: Permission class dùng lại cho owner/staff/object-level.
- Gate:
  - Logic: không xung đột permission hiện có.
  - Nghiệp vụ: đúng ma trận quyền.
  - Security: chặn unauthorized chuẩn.
  - Test: test role matrix pass.

### [x] T007 - Thêm serializer cho prediction input
- Skill chính: `python-pro`
- File:
  - Tạo: `Be/prediction/serializers.py`
  - Sửa: `Be/prediction/views.py`
- Đầu ra: Input prediction validate chặt trước khi gọi model service.
- Gate:
  - Logic: validate trước xử lý.
  - Nghiệp vụ: default values đúng nghiệp vụ hiện tại.
  - Security: reject input lỗi/sai kiểu.
  - Test: payload invalid trả 400 đúng format.

## Phase C - Factories + Seed + Tests

### [x] T008 - Tạo `utils/factories.py`
- Skill chính: `python-testing-patterns`
- File:
  - Tạo: `Be/utils/__init__.py`, `Be/utils/factories.py`
- Đầu ra: Factory cho user/property/news/appointment.
- Gate:
  - Logic: factory sinh dữ liệu nhất quán.
  - Nghiệp vụ: dữ liệu mẫu phản ánh case thật.
  - Security: không hardcode secret.
  - Test: factories dùng được trong test suite.

### [x] T009 - Tạo command `seed_data`
- Skill chính: `django-pro`
- File:
  - Tạo: `Be/core/management/__init__.py`
  - Tạo: `Be/core/management/commands/__init__.py`
  - Tạo: `Be/core/management/commands/seed_data.py`
- Đầu ra: command seed có flag số lượng, tránh tạo trùng không kiểm soát.
- Gate:
  - Logic: chạy nhiều lần không gây lỗi nghiêm trọng.
  - Nghiệp vụ: seed đúng data cần demo FE.
  - Security: không mở lỗ hổng qua command input.
  - Test: chạy command thành công ở local.

### [x] T010 - Viết test cho properties
- Skill chính: `python-testing-patterns`
- File:
  - Sửa: `Be/properties/tests.py`
- Đầu ra: test CRUD/favorite/permission.
- Gate:
  - Logic: cover nhánh chính và edge.
  - Nghiệp vụ: đúng hành vi owner vs non-owner.
  - Security: unauthorized bị chặn.
  - Test: test module pass.

### [x] T011 - Viết test cho appointments và news
- Skill chính: `python-testing-patterns`
- File:
  - Sửa: `Be/appointments/tests.py`
  - Sửa: `Be/news/tests.py`
- Đầu ra: test status update, permission edit/delete news.
- Gate:
  - Logic: trạng thái chuyển đúng rule.
  - Nghiệp vụ: đúng luồng đặt lịch và quản lý tin.
  - Security: role check đầy đủ.
  - Test: test modules pass.

### [x] T012 - Viết test cho prediction và auth smoke
- Skill chính: `python-testing-patterns`
- File:
  - Sửa: `Be/prediction/tests.py`
  - Sửa: `Be/accounts/tests.py`
- Đầu ra: test validate input prediction + auth smoke.
- Gate:
  - Logic: response shape ổn định.
  - Nghiệp vụ: login/predict flow dùng được.
  - Security: reject bad token/input.
  - Test: test modules pass.

## Phase D - Đồng bộ FE theo contract mới

### [x] T013 - Cập nhật API core client FE
- Skill chính: `software-architecture`
- File:
  - Sửa: `FE/src/lib/api.ts`
- Đầu ra: base client thống nhất error handling và auth header.
- Gate:
  - Logic: client wrapper không phá caller cũ.
  - Nghiệp vụ: hỗ trợ đủ use-case các module.
  - Security: không log token nhạy cảm.
  - Test: smoke gọi API qua client thành công.

### [x] T014 - Cập nhật `propertiesApi.ts`
- Skill chính: `software-architecture`
- File:
  - Sửa: `FE/src/lib/propertiesApi.ts`
- Đầu ra: request/response khớp contract BE mới.
- Gate:
  - Logic: parser field đúng.
  - Nghiệp vụ: listings/detail/favorite chạy đúng.
  - Security: payload mutate sạch, không field thừa.
  - Test: manual/API smoke pass.

### [x] T015 - Cập nhật `appointmentsApi.ts` + `newsApi.ts`
- Skill chính: `software-architecture`
- File:
  - Sửa: `FE/src/lib/appointmentsApi.ts`
  - Sửa: `FE/src/lib/newsApi.ts`
- Đầu ra: sync đúng response shape BE.
- Gate:
  - Logic: mapping data đúng kiểu.
  - Nghiệp vụ: luồng đặt lịch và tin tức hiển thị đúng.
  - Security: lỗi API xử lý an toàn.
  - Test: smoke pass.

### [x] T016 - Cập nhật auth contract FE nếu cần
- Skill chính: `software-architecture`
- File:
  - Sửa: `FE/src/lib/authApi.ts`
  - Sửa: `FE/src/contexts/AuthContext.tsx`
  - Sửa: `FE/src/components/ProtectedRoute.tsx` (nếu cần)
- Đầu ra: login/logout/profile đồng bộ với BE.
- Gate:
  - Logic: state auth nhất quán.
  - Nghiệp vụ: session flow đúng.
  - Security: token lifecycle an toàn.
  - Test: login/logout smoke pass.

### [x] T017 - Cập nhật pages FE bị ảnh hưởng
- Skill chính: `software-architecture`
- File:
  - Sửa: `FE/src/pages/Listings.tsx`
  - Sửa: `FE/src/pages/PropertyDetail.tsx`
  - Sửa: `FE/src/pages/News.tsx`
  - Sửa: `FE/src/pages/PricePrediction.tsx`
  - Sửa: `FE/src/pages/AppointmentDetail.tsx`
- Đầu ra: hiển thị đúng dữ liệu thật từ BE.
- Gate:
  - Logic: render không crash khi thiếu field.
  - Nghiệp vụ: màn hình phản ánh đúng dữ liệu.
  - Security: không render dữ liệu nhạy cảm.
  - Test: smoke UI pass.

### [x] T018 - Tạo checklist regression FE
- Skill chính: `writing-plans`
- File:
  - Tạo: `tasks-manager/task/plan-002/fe-regression-checklist.md`
- Đầu ra: checklist pass/fail từng flow.
- Gate:
  - Logic: checklist đủ flow chính.
  - Nghiệp vụ: bám đúng hành trình user thật.
  - Security: có mục kiểm tra auth và lỗi.
  - Test: dùng checklist để chạy smoke thực tế.

## Phase E - Verify tổng và báo cáo

### [x] T019 - Chạy verify BE
- Skill chính: `python-testing-patterns`
- Lệnh:
  - `python Be/manage.py check`
  - `python Be/manage.py makemigrations --check --dry-run`
  - `python Be/manage.py test`
- Đầu ra: kết quả check/test.
- Gate:
  - Logic: không lỗi cấu hình.
  - Nghiệp vụ: test nghiệp vụ pass.
  - Security: test authz/input validation pass.
  - Test: toàn bộ lệnh pass hoặc có báo cáo rõ lỗi chặn.

### [x] T020 - Chạy smoke end-to-end BE-FE
- Skill chính: `software-architecture`
- Flow bắt buộc:
  1. đăng ký/đăng nhập
  2. xem danh sách BĐS
  3. xem chi tiết BĐS
  4. xem tin tức
  5. đặt lịch
  6. dự đoán giá
- Đầu ra: kết quả pass/fail từng flow.
- Gate:
  - Logic: luồng không đứt đoạn.
  - Nghiệp vụ: kết quả đúng kỳ vọng.
  - Security: flow trái quyền bị chặn.
  - Test: ghi evidence vào checklist.

### [x] T021 - Cập nhật review memory và báo cáo
- Skill chính: `writing-plans`
- File:
  - Sửa: `tasks-manager/review/REVIEW.md`
- Đầu ra: nhật ký đầy đủ việc đã làm + rủi ro + bước tiếp.
- Gate:
  - Logic: timeline thay đổi rõ ràng.
  - Nghiệp vụ: nêu đúng phần hoàn thành/chưa hoàn thành.
  - Security: nêu rõ rủi ro tồn đọng nếu có.
  - Test: đính kèm kết quả verify/smoke.


