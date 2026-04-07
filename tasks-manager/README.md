# Tasks Manager - Skill-Based Execution

Bộ thư mục này là “Skill OS” để vận hành AI theo hướng có cấu trúc, thay vì chỉ dựa vào prompt ngắn hạn.

## Mục tiêu

- Chuyển từ prompt-based usage sang skill-based execution.
- Tăng độ tin cậy: có quy trình, có verification, có versioning.
- Tái sử dụng được cho cả cá nhân và team.

## Cấu trúc chính

- `.claude/commands/`: lệnh nghiệp vụ cốt lõi (`deploy`, `fix-issue`, `review`).
- `.claude/rules/`: rule bắt buộc theo từng nhóm.
- `.claude/skills/`: skill đóng gói năng lực và runbook tái sử dụng.
- `.claude/settings.json`: cấu hình mặc định của hệ thống.
- `.claude/settings.local.json`: tùy chỉnh local.
- `guides/`: bộ guide tiếng Việt phục vụ thực thi.
- `plans/`: nơi lưu plan theo từng mã plan.
- `tasks/`: nơi lưu task list chi tiết tương ứng với từng plan.
- `review/`: bộ nhớ tóm tắt những gì đã làm để đọc lại nhanh.
- `CLAUDE.md`: operating rules cấp dự án.
- `CLAUDE.local.md`: override local.

## Vòng lặp vận hành

`SCOPE -> SKILL -> EXECUTE -> VERIFY -> EVOLVE`

## Quy tắc bắt buộc trước khi code

1. Luôn tạo plan trước.
2. Từ plan, tạo task list chi tiết theo từng bước hành động.
3. Hỏi ý kiến user và chờ xác nhận.
4. Chỉ bắt đầu code sau khi user duyệt plan/task.
5. Khi thay đổi API, phải đồng bộ cả BE và FE theo cùng contract request/response.
6. Mỗi task phải chia nhỏ, có skill phù hợp, và phải qua cổng kiểm tra logic/nghiệp vụ/security/test trước khi báo cáo.

## Định nghĩa hoàn thành

- Đầu ra đúng format và đúng mục tiêu.
- Đã qua verification 4C (`Correctness`, `Completeness`, `Context-fit`, `Consequence`).
- Đã cập nhật `review/REVIEW.md`.
