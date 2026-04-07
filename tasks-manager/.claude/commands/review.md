# Command: review

## Purpose

Code review theo thứ tự ưu tiên: bug/risk/regression trước, style sau.

## Review Priorities

1. Logic sai, crash, mất dữ liệu, security risk.
2. Behavioral regression.
3. Missing tests/verification.
4. Performance bottleneck nghiêm trọng.
5. Maintainability và clarity.

## Output Format

- Findings trước tiên, sắp xếp theo mức độ nghiêm trọng.
- Mỗi finding có:
  - Mô tả rõ ràng
  - File và vị trí
  - Tác động thực tế
  - Hướng sửa đề xuất
- Nếu không có finding nghiêm trọng, ghi rõ residual risk/test gaps.

## Verification

- Có test bảo vệ cho thay đổi quan trọng chưa?
- Có case edge nào chưa được cover?
- Có rollback/safe-guard nếu production incident xảy ra?
