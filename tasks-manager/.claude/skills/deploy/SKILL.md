# SKILL: deploy

## Purpose

Trien khai an toan, co kiem soat rui ro, co rollback va co verification ro rang.

## Use When

- Can release version moi.
- Can deploy hotfix.
- Can chay deployment co migration hoac config change.

## Required Inputs

- Environment muc tieu.
- Version/commit/tag.
- Danh sach thay doi.
- Rollback target.

## Expected Output

- Deployment hoan tat va dich vu on dinh.
- Co bang chung verification sau deploy.
- Co log deployment va ghi nhan risk.

## Execution Approach

1. Scope deployment.
2. Chay pre-check (build, test, config, migration readiness).
3. Thuc thi deploy theo phase.
4. Chay post-deploy verify (health + smoke + logs).
5. Neu fail thi rollback.
6. Cap nhat logs/lessons/changelog.

## Quality Criteria

- Khong skip quality gate.
- Rollback plan ro truoc khi deploy.
- Kiem chung sau deploy bat buoc.
- Co phan tich tac dong neu co su co.

## Verification

- Dung version va dung env chua?
- Service health co xanh khong?
- Error rate, latency, key business flow co on khong?
- Rollback da san sang neu can chua?

## Edge Cases

- Migration lock lau.
- Config khac nhau giua env.
- Partial deploy thanh cong.
- Third-party dependency outage.

## References

- `../../commands/deploy.md`
- `../../rules/testing.md`
- `../../rules/error-handling.md`

## Changelog

- v1.0.0: Khoi tao skill deploy theo verify-first model.
