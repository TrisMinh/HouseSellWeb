# Tasks - Plan 001

## Danh sách task chi tiết

- [x] Xác nhận nguồn file guide
- Đầu vào: thư mục `BE`.
- Hành động: tìm tất cả file có tên chứa `guide`.
- Đầu ra: danh sách file guide hợp lệ.
- Done khi: có danh sách rõ file và đường dẫn.

- [x] Tạo thư mục task để chứa guide
- Đầu vào: `tasks-manager/`.
- Hành động: tạo `task/` nếu chưa tồn tại.
- Đầu ra: thư mục đích chứa guide.
- Done khi: có `tasks-manager/task/`.

- [x] Copy file guide từ BE vào task
- Đầu vào: danh sách file guide từ bước 1.
- Hành động: copy toàn bộ vào `task/`.
- Đầu ra: file guide xuất hiện trong `task/`.
- Done khi: số file copy khớp danh sách nguồn.

- [x] Tạo rule Planning & Approval
- Đầu vào: yêu cầu user.
- Hành động: thêm file rule bắt buộc plan/task/approval trước code.
- Đầu ra: `.claude/rules/planning-approval.md`.
- Done khi: rule có đủ điều kiện “chỉ code sau khi user duyệt”.

- [x] Tạo rule Review Memory
- Đầu vào: yêu cầu user.
- Hành động: thêm file rule bắt buộc cập nhật review sau mỗi việc.
- Đầu ra: `.claude/rules/review-memory.md`.
- Done khi: định nghĩa rõ nội dung cần ghi vào review.

- [x] Tạo rule Preflight Check
- Đầu vào: yêu cầu user.
- Hành động: thêm rule đọc review + guide + rules + chọn skill trước khi làm.
- Đầu ra: `.claude/rules/preflight-check.md`.
- Done khi: rule mô tả đủ các bước preflight bắt buộc.

- [x] Chuẩn hóa ngôn ngữ file rule
- Đầu vào: các file trong `.claude/rules/`.
- Hành động: chỉnh về tiếng Việt có dấu.
- Đầu ra: rule dễ đọc, thống nhất ngôn ngữ.
- Done khi: toàn bộ file rule đã được chuẩn hóa.

- [x] Cập nhật review memory
- Đầu vào: toàn bộ thay đổi đã thực hiện.
- Hành động: ghi tóm tắt vào `review/REVIEW.md`.
- Đầu ra: bộ nhớ công việc có thể đọc lại nhanh.
- Done khi: review có phần đã làm + kết quả + bước tiếp.

