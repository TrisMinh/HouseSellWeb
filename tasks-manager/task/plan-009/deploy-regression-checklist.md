# Deploy Regression Checklist - Plan 009 (V9)

## Muc tieu

Kiem tra readiness truoc deploy cho 3 lop: Admin, API docs, Security baseline.

## Cac ca kiem tra

### C01 - Admin registry coverage
- Input: Django admin registry.
- Ky vong: co du model quan tri domain.
- Status: PASS

### C02 - Admin login page reachable
- Input: `GET /admin/login/`.
- Ky vong: status `200`.
- Status: PASS

### C03 - Admin index truy cap duoc khi auth
- Input: superuser + login session.
- Ky vong: `GET /admin/` status `200`.
- Status: PASS

### C04 - Swagger UI policy dung theo setting
- Input: `GET /swagger/`.
- Ky vong:
  - `SWAGGER_PUBLIC=true` -> `200`
  - `SWAGGER_PUBLIC=false` -> can auth moi `200`.
- Status: PASS

### C05 - Swagger JSON co endpoint chinh
- Input: `GET /swagger.json`.
- Ky vong: co `/api/auth/login/`, `/api/properties/`, `/api/appointments/`, `/api/news/`, `/api/prediction/`.
- Status: PASS

### C06 - Deploy guard settings
- Input: static/runtime check `settings.py`.
- Ky vong: co guard enforce secret + hosts khi `DEBUG=False`.
- Status: PASS

### C07 - Backend env template day du
- Input: `Be/.env.example`.
- Ky vong: co bien bat buoc deploy/security/docs.
- Status: PASS

### C08 - Superuser runbook ton tai
- Input: `tasks-manager/task/plan-009/superuser-runbook.md`.
- Ky vong: co quy trinh interactive + non-interactive an toan.
- Status: PASS

## Verify commands

- Backend:
  - `python manage.py check`
  - `python manage.py makemigrations --check --dry-run`
  - `python manage.py test accounts properties appointments news prediction`
- Smoke:
  - `python tasks-manager/task/plan-009/evidence/run-plan009-deploy-readiness-smoke.py`

## Evidence

- Smoke script:
  - `tasks-manager/task/plan-009/evidence/run-plan009-deploy-readiness-smoke.py`
- Smoke report:
  - `tasks-manager/task/plan-009/evidence/plan009-deploy-readiness-report.json`
