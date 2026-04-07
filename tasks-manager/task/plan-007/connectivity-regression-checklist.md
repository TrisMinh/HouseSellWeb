# Connectivity Regression Checklist - Plan 007

## Muc tieu

- Xac nhan FE-BE ket noi on dinh tren origin FE `http://127.0.0.1:8080`.
- Kiem chung contract V7: CORS, base URL, auth header, refresh flow, error handling.

## Chuan bi

- Backend: `http://127.0.0.1:8000`
- Frontend: `http://127.0.0.1:8080`
- FE env (neu co): `VITE_API_BASE_URL=http://127.0.0.1:8000`
- DB co toi thieu 1 property active de dat lich.

## Checklist

### C01 - Register (public)
- Action:
  - FE origin 8080 goi `POST /api/auth/register/`.
- Expect:
  - status `201`.

### C02 - Login + token issue
- Action:
  - FE origin 8080 goi `POST /api/auth/login/`.
- Expect:
  - status `200`.
  - response co `access`, `refresh`.

### C03 - List properties (public)
- Action:
  - FE origin 8080 goi `GET /api/properties/`.
- Expect:
  - status `200`.
  - co it nhat 1 property.

### C04 - Property detail (public)
- Action:
  - FE origin 8080 goi `GET /api/properties/{id}/`.
- Expect:
  - status `200`.
  - co `id`, `title`.

### C05 - News list (public)
- Action:
  - FE origin 8080 goi `GET /api/news/`.
- Expect:
  - status `200`.

### C06 - Create appointment (authenticated mutate)
- Action:
  - FE origin 8080 goi `POST /api/appointments/` voi header bearer token.
- Expect:
  - status `201`.

### C07 - Prediction (public post)
- Action:
  - FE origin 8080 goi `POST /api/prediction/` voi payload V6.
- Expect:
  - status `200`.
  - co key `estimated_price`.

### C08 - Backend verify
- Command:
  - `python manage.py check`
  - `python manage.py makemigrations --check --dry-run`
  - `python manage.py test properties appointments news prediction accounts`
- Expect:
  - pass.

### C09 - Frontend verify
- Command:
  - `npm run build`
  - `npm run test -- --run`
- Expect:
  - pass.

## Ket qua thuc thi (dien khi chay)

| Check | Ket qua | Evidence/Ghi chu |
|---|---|---|
| C01 | PASS | Browser smoke report: `status=201` |
| C02 | PASS | Browser smoke report: `status=200`, `hasAccessToken=true` |
| C03 | PASS | Browser smoke report: `status=200`, `count>0` |
| C04 | PASS | Browser smoke report: `status=200` |
| C05 | PASS | Browser smoke report: `status=200` |
| C06 | PASS | Browser smoke report: `status=201` |
| C07 | PASS | Browser smoke report: `status=200` |
| C08 | PASS | `manage.py check`, `makemigrations --check --dry-run`, `test properties appointments news prediction accounts` deu pass |
| C09 | PASS | `npm run build` + `npm run test -- --run` pass |

## Evidence

- Backend smoke: `tasks-manager/task/plan-007/evidence/plan007-connectivity-smoke-report.json`
- Browser smoke (origin 8080): `tasks-manager/task/plan-007/evidence/plan007-browser-connectivity-smoke-report.json`
