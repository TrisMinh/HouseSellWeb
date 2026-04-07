# Command: deploy

## Purpose

Triển khai thay đổi lên môi trường đích với quy trình an toàn, có verification và rollback.

## Inputs

- Environment (`dev`/`staging`/`prod`)
- Version/commit/tag cần deploy
- Scope thay đổi

## Execution Flow

1. Xác định SCOPE và phạm vi deploy.
2. Chạy pre-check:
   - build pass
   - tests pass
   - migration plan rõ ràng
3. Tạo deployment plan + rollback plan.
4. Deploy theo từng phase (ưu tiên canary/rolling nếu có).
5. Verify sau deploy:
   - health check
   - smoke test
   - log và error rate
6. Nếu fail: rollback ngay theo plan.
7. Ghi lại kết quả vào logs/lessons.

## Verification (4C)

- Correctness: đúng version, đúng env, đúng config.
- Completeness: đã chạy đủ pre-check và post-check.
- Context-fit: phù hợp với release window và risk profile.
- Consequence: đánh giá rủi ro khi keep/revert.

## Anti-pattern

- Deploy khi chưa có rollback plan.
- Skip test/smoke check.
- Đánh dấu done khi chưa monitor sau deploy.
