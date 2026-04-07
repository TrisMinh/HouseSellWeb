# SKILL: security-review

## Purpose

Ra soat rui ro bao mat truoc khi merge/deploy, uu tien tac dong thuc te va kha nang khai thac.

## Use When

- PR co auth, payment, upload, API public, data nhay cam.
- Truoc release.
- Sau incident can hardening.

## Required Inputs

- Scope code can review.
- Context nghiep vu va data sensitivity.
- Threat model co ban (neu co).

## Expected Output

- Danh sach finding theo muc do nghiem trong.
- Moi finding co scenario khai thac/tac dong.
- De xuat fix uu tien theo risk.

## Execution Approach

1. Xac dinh attack surface.
2. Kiem authn/authz, input validation, output encoding.
3. Kiem secret handling va dependency risk.
4. Danh gia logging/auditing cho hanh dong nhay cam.
5. Tong hop finding + remediation plan.

## Quality Criteria

- Finding cu the, co bang chung.
- Uu tien theo muc do tac dong that.
- Co de xuat fix kha thi.
- Khong bao cao chung chung, khong "noise".

## Verification

- Co duong nao bypass phan quyen?
- Co lo data nhay cam?
- Co secret hardcode?
- Co route co the bi abuse de gay outage?

## Edge Cases

- Multi-tenant boundary leak.
- Broken object-level authorization.
- File upload + parser exploit.
- SSRF/IDOR tren endpoint noi bo.

## References

- `../../rules/security.md`
- `../../rules/api-conventions.md`
- `../../commands/review.md`

## Changelog

- v1.0.0: Khoi tao skill security review co focus exploitability.
