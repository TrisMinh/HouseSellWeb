# Command: fix-issue

## Purpose

Sửa lỗi theo hướng root-cause, không vá tạm, có test và có xác minh.

## Inputs

- Mô tả lỗi
- Cách tái hiện (nếu có)
- Log/stack trace/screenshot
- Phạm vi ảnh hưởng

## Execution Flow

1. Reproduce lỗi ổn định.
2. Khoanh vùng root cause.
3. Đề xuất fix nhỏ nhất nhưng đúng bản chất.
4. Thêm/cập nhật test để chặn regression.
5. Chạy test, lint, smoke check.
6. Review impact liên thông.
7. Cập nhật lesson learned.

## Verification (4C)

- Correctness: fix đúng root cause.
- Completeness: có test, có edge-case check.
- Context-fit: không phá workflow nghiệp vụ hiện tại.
- Consequence: không tạo side effect nguy hiểm.

## Anti-pattern

- Chỉ fix symptom.
- Bỏ qua test vì “gấp”.
- Merge khi chưa xác thực tác động.
