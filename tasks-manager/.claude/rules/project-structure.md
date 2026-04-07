# Rule: Project Structure

## Mục tiêu

Tổ chức dự án theo mô hình “mini operating system” để agent và team dễ mở rộng.

## Cấu trúc đề xuất

```text
project/
  context/
    business_goal.md
    stakeholders.md
    scope.md
    terminology.md
  skills/
    knowledge/
    verification/
    automation/
    scaffolding/
    review/
    runbooks/
    infra/
  templates/
  data/
  scripts/
  outputs/
  logs/
  lessons/
```

## Quy tắc skill folder

Mỗi skill nên có tối thiểu:

```text
skill-name/
  SKILL.md
  examples/
  templates/
  verification/
  changelog.md
```

Nếu là skill kỹ thuật, bổ sung:

```text
skill-name/
  scripts/
  test-data/
```

## Nguyên tắc

- Một skill = một nhiệm vụ.
- Tách rõ knowledge và execution.
- Luôn có verification artifact đi kèm.
