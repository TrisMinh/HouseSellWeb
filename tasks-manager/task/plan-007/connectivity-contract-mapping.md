# Connectivity Contract Mapping - Plan 007 (V7)

## 1) Baseline from guide v3

- FE must call BE through API endpoints under `/api/...`.
- CORS must allow FE dev hosts.
- JWT flow:
  - login returns `access` + `refresh`
  - mutating endpoints require `Authorization: Bearer <access>`
  - refresh endpoint issues new `access`
- FE-BE connection should be validated by smoke flows:
  1. register/login
  2. list properties
  3. property detail
  4. news list
  5. create appointment
  6. prediction

## 2) Runtime snapshot before V7

### Backend

- `Be/core/settings.py`
  - `CORS_ALLOWED_ORIGINS` already includes:
    - `http://localhost:8080`
    - `http://127.0.0.1:8080`
  - `ALLOWED_HOSTS` default:
    - `localhost`
    - `127.0.0.1`
- Missing explicit `CSRF_TRUSTED_ORIGINS` alignment with CORS origins.

### Frontend

- `FE/src/lib/api.ts`
  - hardcoded `BASE_URL = 'http://localhost:8000'`.
  - refresh call uses absolute hardcoded base.
- `FE/src/lib/propertiesApi.ts`
  - image URL helper binds to hardcoded `BASE_URL`.
- Risk:
  - host mismatch between local profiles (`localhost` vs `127.0.0.1`).
  - no env-driven API base contract.

## 3) Gap analysis (before -> after)

| Area | Before V7 | After V7 target |
|---|---|---|
| FE API base | Hardcoded `http://localhost:8000` | `VITE_API_BASE_URL` with safe fallback `http://127.0.0.1:8000` |
| FE refresh flow | Uses hardcoded absolute URL | Uses normalized `API_ORIGIN` from env contract |
| FE image URL builder | Uses hardcoded base | Uses `API_ORIGIN` |
| BE CSRF trust | Not explicitly mapped to CORS list | `CSRF_TRUSTED_ORIGINS` synced from CORS env list |
| Connectivity evidence | Existing per-module smoke only | Dedicated V7 backend smoke + browser smoke from origin 8080 |

## 3.1) Implementation update (completed in V7)

- Updated FE API transport:
  - `FE/src/lib/api.ts`
    - uses `VITE_API_BASE_URL` + fallback `http://127.0.0.1:8000`
    - normalized `API_ORIGIN`
    - refresh flow now uses `API_ORIGIN`
- Updated FE image URL helper:
  - `FE/src/lib/propertiesApi.ts`
    - `getImageUrl()` now builds URL from `API_ORIGIN`
- Updated backend trust config:
  - `Be/core/settings.py`
    - `CSRF_TRUSTED_ORIGINS` synced from CORS origin list env.
- Added V7 smoke assets:
  - `tasks-manager/task/plan-007/evidence/run-plan007-connectivity-smoke.py`
  - `FE/scripts/run-plan007-browser-connectivity-smoke.mjs`
  - `FE/.env.example`

## 4) Final V7 connectivity contract

### FE base URL contract

- Env key: `VITE_API_BASE_URL`
- Example values:
  - `http://127.0.0.1:8000`
  - `http://localhost:8000`
- Fallback if env missing: `http://127.0.0.1:8000`

### Backend CORS/host contract

- `CORS_ALLOWED_ORIGINS` must include FE 8080 hosts:
  - `http://localhost:8080`
  - `http://127.0.0.1:8080`
- `ALLOWED_HOSTS` keeps local defaults:
  - `localhost`
  - `127.0.0.1`
- `CSRF_TRUSTED_ORIGINS` follows the same configured origin list.

### Auth header + refresh contract

- Mutating API calls use:
  - `Authorization: Bearer <access>`
- On `401` with refresh token available:
  - call `POST /api/auth/token/refresh/`
  - update local access token
  - replay failed request once
- If refresh fails:
  - clear tokens
  - redirect to `/login`

### Error handling contract

- BE should return stable error payload (string/object under error keys or DRF field errors).
- FE must parse nested object errors into readable message.
- No backend internal path/stacktrace exposure in response body.

## 5) V7 evidence files

- Backend smoke report:
  - `tasks-manager/task/plan-007/evidence/plan007-connectivity-smoke-report.json`
- Browser (origin 8080) smoke report:
  - `tasks-manager/task/plan-007/evidence/plan007-browser-connectivity-smoke-report.json`
