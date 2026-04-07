# Tasks chi tiet - Plan 007 (V7 CORS + FE-BE Connectivity Hardening)

## Quy tac thuc thi

- Moi task atomic, co input/output ro rang.
- Moi task gan skill chinh.
- Moi task bat buoc qua 4 gate: Logic, Nghiep vu, Security, Test.
- Khong chuyen phase neu dependency chua pass.

## Dependency map

- Phase A (contract baseline) -> bat buoc truoc implement.
- Phase B (backend config) -> can contract chot.
- Phase C (frontend sync) -> can backend contract on dinh.
- Phase D (verify + smoke) -> can backend/frontend sync xong.
- Phase E (gate audit + review) -> chot V7.

## Phase A - Preflight & Contract Baseline

### [x] T000 - Preflight theo rule
- Skill chinh: `writing-plans`
- Muc tieu: xac nhan da doc review + guide + rules + skill lien quan truoc khi implement V7.
- Input:
  - `tasks-manager/review/REVIEW.md`
  - `tasks-manager/guilde/backend_guide_ver3.md`
  - `tasks-manager/.claude/rules/*.md`
  - `tasks-manager/.claude/skills/deploy/SKILL.md`
  - `tasks-manager/.claude/skills/security-review/SKILL.md`
- Output:
  - ghi nhan preflight context trong note thuc thi.
- Dependency: none.

### [x] T001 - Trich contract V7 tu guide
- Skill chinh: `software-architecture`
- Muc tieu: trich cac yeu cau phase ket noi FE-BE/CORS tu guide v3.
- Input:
  - `tasks-manager/guilde/backend_guide_ver3.md`
- Output:
  - tao `tasks-manager/task/plan-007/connectivity-contract-mapping.md` (baseline section).
- Dependency: T000.

### [x] T002 - Gap analysis guide vs code hien tai
- Skill chinh: `software-architecture`
- Muc tieu: xac dinh sai khac giua contract V7 va implementation hien tai.
- Input:
  - `Be/core/settings.py`
  - `Be/core/urls.py`
  - `FE/src/lib/api.ts`
  - `FE/src/lib/*Api.ts`
  - `FE/src/contexts/AuthContext.tsx`
  - `connectivity-contract-mapping.md`
- Output:
  - cap nhat bang gap (truoc/sau, risk, muc do uu tien).
- Dependency: T001.

### [x] T003 - Chot contract connectivity V7
- Skill chinh: `software-architecture`
- Muc tieu: khoa cac diem mo ho:
  - CORS origins
  - base URL FE
  - auth header
  - error shape parser
- Output:
  - `connectivity-contract-mapping.md` ban chot.
- Dependency: T002.

## Phase B - Backend Connectivity Hardening

### [x] T004 - Chuan hoa CORS/ALLOWED_HOSTS theo env
- Skill chinh: `django-pro`
- Muc tieu: backend chap nhan dung host local can thiet (co `127.0.0.1:8080`) va khong mo qua muc.
- Input:
  - `Be/core/settings.py`
- Output:
  - config CORS/hosts ro rang theo env variable.
- Dependency: T003.

### [x] T005 - Chuan hoa policy auth header va route-level behavior
- Skill chinh: `django-pro`
- Muc tieu: dam bao endpoint mutate yeu cau auth header nhat quan, endpoint public khong bi chan nham.
- Input:
  - `Be/core/urls.py`
  - `Be/*/views.py`
- Output:
  - route/permission behavior khop contract V7.
- Dependency: T004.

### [x] T006 - Hardening error response cho ket noi API
- Skill chinh: `backend-security-coder`
- Muc tieu:
  - khong leak stack/path noi bo ra FE.
  - co message loi du de FE parse.
- Input:
  - `Be/*/views.py` (cac endpoint chinh)
- Output:
  - error handling conventions duoc enforce.
- Dependency: T005.

### [x] T007 - Tao/cap nhat backend smoke script cho connectivity
- Skill chinh: `python-testing-patterns`
- Muc tieu: co script smoke backend contract ket noi.
- Output:
  - `tasks-manager/task/plan-007/evidence/run-plan007-connectivity-smoke.py`
- Dependency: T006.

## Phase C - Frontend API Sync

### [x] T008 - Chuan hoa `API_BASE_URL` trong FE
- Skill chinh: `typescript-pro`
- Muc tieu: FE dung `VITE_API_BASE_URL` + fallback, khong hardcode host rai rac.
- Input:
  - `FE/src/lib/api.ts`
  - `FE/src/lib/*Api.ts`
- Output:
  - transport layer FE nhat quan.
- Dependency: T003.

### [x] T009 - Dong bo auth attach/refresh/error handling
- Skill chinh: `typescript-pro`
- Muc tieu: auth header attach dung cho mutate, refresh flow va handler 401 on dinh.
- Input:
  - `FE/src/lib/authApi.ts`
  - `FE/src/contexts/AuthContext.tsx`
  - `FE/src/components/ProtectedRoute.tsx`
- Output:
  - auth transport behavior khop contract V7.
- Dependency: T008.

### [x] T010 - Loai bo host hardcode o page/component chinh
- Skill chinh: `typescript-pro`
- Muc tieu: pages khong goi truc tiep URL absolute toi backend.
- Input:
  - `FE/src/pages/*`
  - `FE/src/components/*`
- Output:
  - call API thong qua layer `lib/*Api.ts`.
- Dependency: T009.

### [x] T011 - Tao checklist regression connectivity
- Skill chinh: `writing-plans`
- Muc tieu: co checklist pass/fail cho flow ket noi V7.
- Output:
  - `tasks-manager/task/plan-007/connectivity-regression-checklist.md`
- Dependency: T010.

## Phase D - Verify Runtime (8080 focus)

### [x] T012 - Verify backend command
- Skill chinh: `python-testing-patterns`
- Command:
  - `python manage.py check`
  - `python manage.py makemigrations --check --dry-run`
  - `python manage.py test properties appointments news prediction accounts`
- Output:
  - log ket qua verify backend.
- Dependency: T007.

### [x] T013 - Verify frontend command
- Skill chinh: `typescript-pro`
- Command:
  - `npm run build`
  - `npm run test -- --run`
- Output:
  - log ket qua verify frontend.
- Dependency: T010.

### [x] T014 - Browser smoke tren cong 8080
- Skill chinh: `software-architecture`
- Muc tieu: smoke flow FE-BE qua host FE `127.0.0.1:8080`.
- Flow bat buoc:
  1. register/login
  2. list property
  3. detail property
  4. news list
  5. create appointment
  6. prediction
- Output:
  - evidence JSON + cap nhat checklist.
- Dependency: T011, T012, T013.

## Phase E - Gate Audit Bat Buoc + Review

### [x] T018 - Gate Logic audit
- Skill chinh: `software-architecture`
- Muc tieu: doi chieu contract V7 voi code backend/frontend sau implement.
- Output:
  - cap nhat trang thai gate Logic trong `plan-007.md`.

### [x] T019 - Gate Nghiep vu audit
- Skill chinh: `software-architecture`
- Muc tieu: xac nhan user flow ket noi API khong dut do mismatch contract.
- Output:
  - cap nhat trang thai gate Nghiep vu trong `plan-007.md`.

### [x] T020 - Gate Security audit
- Skill chinh: `backend-security-coder`
- Muc tieu:
  - kiem tra CORS mo rong qua muc
  - check token/secret leak
  - check auth bypass risk
- Output:
  - cap nhat trang thai gate Security trong `plan-007.md` + risk note.

### [x] T021 - Gate Test runtime audit
- Skill chinh: `python-testing-patterns`
- Muc tieu: rerun command verify sau gate logic/nghiep vu/security.
- Output:
  - cap nhat trang thai gate Test trong `plan-007.md`.

### [x] T015 - Cap nhat review memory Plan 007
- Skill chinh: `writing-plans`
- Muc tieu: ghi day du viec da lam, verification, risk ton dong, lessons, next steps.
- Output:
  - `tasks-manager/review/REVIEW.md`
- Dependency:
  - T014 + T018 + T019 + T020 + T021.

