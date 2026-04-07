# Plan 009 - V9 Hoan thien & Deploy Readiness

## Checklist Tien Do

- [x] Da tao plan
- [x] Da thuc thi plan
- [x] Da verify ket qua
- [x] Da cap nhat task + review

## Skill orchestration dung cho ke hoach nay

- `writing-plans`: chia phase/task atomic, ro input/output/dependency.
- `software-architecture`: chot contract V9 (admin, swagger docs, deploy readiness).
- `django-pro`: hoan thien admin registration va deploy-safe Django settings.
- `deploy` (local skill): dong bo quy trinh release-ready, rollback-aware.
- `security-review` (local skill): ra soat rui ro bao mat truoc release.
- `backend-security-coder`: hardening SECRET/DEBUG/HOST/CORS policy khi deploy.
- `python-testing-patterns`: verify command, smoke admin/swagger/deploy readiness.

## Muc tieu

1. Chot contract V9 cho giai doan "Hoan thien & Deploy" theo guide v3.
2. Hoan thien Admin panel cho tat ca model dang su dung trong he thong.
3. Chuan hoa tai lieu API/Swagger de handoff va test de dang.
4. Chot deployment security baseline (`SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`, CORS/CSRF).
5. Co checklist regression deploy readiness + evidence verify theo 4 gate.

## Baseline truoc V9

- Swagger endpoint da ton tai (`/swagger/`, `/redoc/`, `/swagger.json`).
- Settings da doc env cho `DJANGO_DEBUG`, `DJANGO_SECRET_KEY`, `DJANGO_ALLOWED_HOSTS`.
- Admin registration hien co chua dong deu giua cac app:
  - Da co: `appointments`, `news`.
  - Chua day du: `accounts`, `properties`, `prediction`.
- Chua co artifact rieng cho V9 deploy readiness (contract/checklist/evidence).

## Scope chi tiet

### Backend

- Hoan thien admin panel:
  - Dang ky model con thieu.
  - Chuan hoa `list_display`, `search_fields`, `list_filter` theo domain.
- Chuan hoa docs API:
  - Kiem tra metadata/schema route.
  - Dam bao endpoint chinh co ta duoc tren Swagger.
- Chuan hoa deploy baseline:
  - policy env cho `SECRET_KEY`, `DEBUG=False`, hosts/origins.
  - runbook tao superuser an toan cho moi truong deploy.

### Security & Deploy Readiness

- Ra soat risk truoc deploy:
  - secret exposure
  - debug mode leak
  - host/origin mo rong qua muc
  - admin surface risk
- Chot checklist readiness + rollback note.

### Artifact va quy trinh

- Tao `deploy-contract-mapping.md`.
- Tao `deploy-regression-checklist.md`.
- Tao evidence smoke/readiness report cho V9.

## Out of scope

- CI/CD provisioning moi (GitHub Actions, Docker, IaC) neu chua co yeu cau.
- Scale/performance tuning production level.
- Refactor business logic lon ngoai pham vi V9.

## Done criteria

1. Co `deploy-contract-mapping.md` chot contract V9.
2. Admin panel day du cho model can quan tri va test truy cap on dinh.
3. Swagger docs endpoint hoat dong, schema co the dung de handoff FE/test.
4. Deployment security baseline duoc enforce va documented (`DEBUG`, `SECRET`, `HOST/ORIGIN`).
5. Co runbook tao superuser an toan (khong hardcode credential).
6. Verify command backend pass.
7. Co `deploy-regression-checklist.md` + evidence smoke/readiness.
8. `tasks-manager/review/REVIEW.md` duoc cap nhat.

## 4 cong kiem tra bat buoc

### Gate 1 - Logic
- Contract V9 khop giua guide, code backend, va artifact mapping.
- Admin/Swagger/deploy settings khong mau thuan voi nhau.

### Gate 2 - Nghiep vu
- Team co the quan tri du lieu qua admin theo dung domain.
- Team FE/QA co the doc va test API qua Swagger on dinh.

### Gate 3 - Security
- Khong de `DEBUG=True`/secret default trong deploy profile.
- Host/origin policy khong mo qua rong.
- Khong leak thong tin nhay cam tren endpoint docs/admin.

### Gate 4 - Test chay thuc te
- Backend check/migration/test pass.
- Smoke admin + swagger + deploy readiness pass theo checklist.

## Task gate bat buoc (theo rule)

- Gate Logic: `T018` (tasks.md)
- Gate Nghiep vu: `T019` (tasks.md)
- Gate Security: `T020` (tasks.md)
- Gate Test runtime: `T021` (tasks.md)

## Trang thai gate hien tai (2026-04-07)

| Gate | Trang thai | Evidence |
|---|---|---|
| Logic | PASS | Contract V9 chot va doi chieu code/artifact khong thay mismatch |
| Nghiep vu | PASS | Admin model coverage day du va Swagger schema ho tro handoff QA/FE |
| Security | PASS | Guard deploy-safe cho SECRET/HOST khi DEBUG=False + docs exposure policy qua `SWAGGER_PUBLIC` |
| Test | PASS | `check`, `makemigrations --check`, full backend tests, smoke V9 deu pass |

## Deliverables

- `tasks-manager/plan/plan-009.md`
- `tasks-manager/task/plan-009/tasks.md`
- `tasks-manager/task/plan-009/deploy-contract-mapping.md`
- `tasks-manager/task/plan-009/deploy-regression-checklist.md`
- `tasks-manager/task/plan-009/superuser-runbook.md`
- `tasks-manager/task/plan-009/evidence/run-plan009-deploy-readiness-smoke.py`
- `tasks-manager/task/plan-009/evidence/plan009-deploy-readiness-report.json`
- `Be/.env.example`
- `tasks-manager/review/REVIEW.md`
