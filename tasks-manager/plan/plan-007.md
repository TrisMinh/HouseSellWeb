# Plan 007 - V7 CORS + FE-BE Connectivity Hardening

## Checklist Tien Do

- [x] Da tao plan
- [x] Da thuc thi plan
- [x] Da verify ket qua
- [x] Da cap nhat task + review

## Skill orchestration dung cho ke hoach nay

- `writing-plans`: chia phase/task atomic, ro input/output/dependency.
- `software-architecture`: chot contract ket noi FE-BE va mapping guide -> code.
- `django-pro`: chuan hoa config Django cho CORS/ALLOWED_HOSTS/URL.
- `typescript-pro`: dong bo FE API client theo env contract.
- `backend-security-coder`: review risk CORS/auth header/token handling.
- `python-testing-patterns`: verify backend command va smoke script.

## Muc tieu

1. Chot contract ket noi FE-BE cho V7 (base URL, CORS origin, auth header, error shape).
2. Chuan hoa cau hinh backend de FE chay o cong `8080` goi API on dinh.
3. Loai bo hardcode endpoint phan tan tren FE, dua ve 1 API contract layer.
4. Co checklist regression ket noi va evidence smoke end-to-end.
5. Qua 4 gate bat buoc: Logic, Nghiep vu, Security, Test runtime.

## Baseline truoc V7

- Da co contract API cho modules chinh (properties/appointments/news/prediction/auth) o cac plan 002/004/005/006.
- FE va BE co nhieu flow da pass, nhung ket noi van co risk:
  - CORS/host/env co the lech giua local profile.
  - Co kha nang hardcode URL hoac parse loi khong nhat quan.
  - Chua co artifact rieng cho connectivity v7 de chot handoff.

## Scope chi tiet

### Backend

- Chot config CORS/ALLOWED_HOSTS bang env, bao gom host FE `127.0.0.1:8080`.
- Chot policy auth header cho endpoint mutate (`Authorization: Bearer <token>`).
- Chot response loi chung de FE parse on dinh (khong leak noi bo).
- Bo sung/check endpoint health va route-level check cho ket noi.

### Frontend

- Chot 1 nguon `API_BASE_URL` qua env (`VITE_API_BASE_URL`) + fallback local.
- Dong bo `src/lib/api.ts` va cac `*Api.ts` de dung chung transport layer.
- Dam bao flow token attach/refresh/error handling nhat quan.
- Dam bao pages khong hardcode host API truc tiep.

### Artifact va quy trinh

- Tao contract mapping V7 cho ket noi FE-BE.
- Tao checklist regression connectivity.
- Luu evidence smoke + verify command.

## Out of scope

- Refactor business logic sau endpoint (khong doi domain rule cua plan 004/005/006).
- Deploy production full pipeline.
- Toi uu bundle/lint toan bo FE ngoai pham vi ket noi.

## Done criteria

1. Co `connectivity-contract-mapping.md` chot request/response/connectivity rules.
2. Backend config CORS/host/env cho FE `8080` dung va khong mo qua muc can thiet.
3. FE dung 1 API base contract, khong con hardcode host o flow chinh.
4. Smoke ket noi cac flow chinh pass:
   - register/login
   - list/detail property
   - news list
   - create appointment
   - prediction
5. Verify command pass (backend + frontend).
6. Co `connectivity-regression-checklist.md` va evidence report.
7. `tasks-manager/review/REVIEW.md` duoc cap nhat.

## 4 cong kiem tra bat buoc

### Gate 1 - Logic
- Contract base URL/CORS/auth flow khong mau thuan.
- FE parser va BE response shape khop nhau cho flow ket noi.

### Gate 2 - Nghiep vu
- User flow chinh truy cap API lien tuc khong dut do ket noi.
- Hanh vi loi hien thi ro rang, khong vo nghia voi nguoi dung.

### Gate 3 - Security
- CORS/host khong mo qua rong.
- Khong leak token/secret/log nhay cam.
- Auth/Authz flow va refresh token khong bi bypass.

### Gate 4 - Test chay thuc te
- Backend check/migration/test pass.
- FE build/test pass.
- Browser smoke tren cong 8080 pass.

## Task gate bat buoc (theo rule)

- Gate Logic: T018
- Gate Nghiep vu: T019
- Gate Security: T020
- Gate Test runtime: T021

## Trang thai gate hien tai (2026-04-07)

| Gate | Trang thai | Evidence |
|---|---|---|
| Logic | PASS | Contract V7 chot va FE transport dung `VITE_API_BASE_URL` + `API_ORIGIN` |
| Nghiep vu | PASS | Smoke flow C01..C07 pass (register/login, list/detail, news, appointment, prediction) |
| Security | PASS | CORS + CSRF trusted origins cho 8080, khong thay leak path/secret trong response smoke |
| Test | PASS | Backend check/migrate/test pass; FE build/test pass; browser smoke origin 8080 pass |

## Deliverables

- `tasks-manager/plan/plan-007.md`
- `tasks-manager/task/plan-007/tasks.md`
- `tasks-manager/task/plan-007/connectivity-contract-mapping.md`
- `tasks-manager/task/plan-007/connectivity-regression-checklist.md`
- `tasks-manager/review/REVIEW.md`
