# CLAUDE.md - Skill-Based Operating Rules

## 1) Tư duy gốc

Prompt là câu lệnh tạm thời.  
Skill là năng lực đóng gói.  
Skill system là bộ nhớ vận hành.

Hệ thống này ưu tiên:

- Tái sử dụng thay vì prompt ad-hoc.
- Chạy workflow thay vì trả lời một lần.
- Verification trước khi coi là xong.
- Tích lũy bài học sau mỗi lỗi.

## 2) Vòng lặp thực thi bắt buộc

Mọi tác vụ không đơn giản phải theo vòng:

1. `SCOPE`: xác định bài toán, đầu ra, tiêu chí pass/fail.
2. `SKILL`: chọn skill phù hợp.
3. `EXECUTE`: thực thi bằng template/script/workflow.
4. `VERIFY`: kiểm tra bằng framework 4C.
5. `EVOLVE`: cập nhật lessons/changelog.

## 3) Rule bắt buộc trước khi code

1. Luôn tạo plan trước.
2. Từ plan tạo task list chi tiết.
3. Trình user duyệt plan + task.
4. Chỉ code sau khi user xác nhận.

Tham chiếu: `.claude/rules/planning-approval.md`

## 4) Rule preflight trước mọi công việc

Trước khi làm việc mới, phải:

1. Đọc `review/REVIEW.md`.
2. Đọc guide liên quan trong `task/`.
3. Đọc các file trong `.claude/rules/`.
4. Xác định skill phù hợp trong `C:\Users\ADMIN\.codex\skills`.

Tham chiếu: `.claude/rules/preflight-check.md`

## 4.1) Rule đồng bộ contract BE-FE

Khi làm backend hoặc frontend liên quan API:

1. Sửa BE phải cập nhật FE tương ứng.
2. Sửa FE request phải cập nhật BE tương ứng.
3. Không được chốt xong nếu chưa verify end-to-end BE-FE.

Tham chiếu: `.claude/rules/be-fe-contract-sync.md`

## 4.2) Rule task nhỏ + skill + quality gates

1. Mỗi task phải được chia nhỏ (atomic).
2. Mỗi task phải có ít nhất 1 skill phù hợp.
3. Trước khi báo cáo phải qua 4 cổng:
   - Logic
   - Nghiệp vụ
   - Security
   - Test chạy thực tế

Tham chiếu: `.claude/rules/task-skill-gates.md`

## 5) Rule review memory

Sau mỗi việc phải cập nhật:

- `review/REVIEW.md`

Nội dung gồm: việc đã làm, file thay đổi, verification, rủi ro còn lại, bước tiếp theo.

Tham chiếu: `.claude/rules/review-memory.md`

## 6) Verification Framework 4C

### Correctness
- Đúng logic, đúng dữ kiện, đúng quy trình, đúng format.

### Completeness
- Đủ phần, đủ bước, không bỏ sót trọng điểm.

### Context-fit
- Phù hợp mục tiêu, đối tượng, bối cảnh.

### Consequence
- Đánh giá rủi ro nếu đưa vào dùng ngay.

## 7) Definition of Done

Chỉ được đánh dấu xong khi:

- Đầu ra đạt tiêu chí chất lượng.
- Đã qua verification 4C.
- Có bằng chứng test/check.
- Đã cập nhật `review/REVIEW.md`.

## 8) Tài liệu bắt buộc tham chiếu

- `.claude/rules/*`
- `.claude/commands/*`
- `.claude/skills/*/SKILL.md`
- `.claude/settings.json`
- `plans/*`
- `tasks/*`
- `review/REVIEW.md`
