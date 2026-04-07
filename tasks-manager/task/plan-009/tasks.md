# Tasks chi tiet - Plan 009 (V9 Hoan thien & Deploy Readiness)

## Quy tac thuc thi

- Moi task atomic, co input/output ro rang.
- Moi task gan skill chinh.
- Moi task bat buoc qua 4 gate: Logic, Nghiep vu, Security, Test.
- Khong chuyen phase neu dependency chua pass.

## Dependency map

- Phase A (preflight + contract baseline) -> bat buoc truoc implement.
- Phase B (admin + docs completion) -> can contract V9 chot.
- Phase C (security + deploy hardening) -> can baseline backend ro rang.
- Phase D (verify + smoke) -> can phase B/C xong.
- Phase E (gate audit + review) -> chot V9.

## Phase A - Preflight & Contract Baseline

### [x] T000 - Preflight theo rule
- Skill chinh: `writing-plans`
- Muc tieu: xac nhan da doc review + guide + rules + skill lien quan truoc khi implement V9.
- Input:
  - `tasks-manager/review/REVIEW.md`
  - `tasks-manager/guilde/backend_guide_ver3.md`
  - `tasks-manager/.claude/rules/*.md`
  - `tasks-manager/.claude/skills/deploy/SKILL.md`
  - `tasks-manager/.claude/skills/security-review/SKILL.md`
- Output:
  - ghi nhan preflight context trong note thuc thi.
- Dependency: none.

### [x] T001 - Trich contract V9 tu guide
- Skill chinh: `software-architecture`
- Muc tieu: trich yeu cau "Giai doan 9: Hoan thien & Deploy" tu guide v3.
- Input:
  - `tasks-manager/guilde/backend_guide_ver3.md`
- Output:
  - tao `tasks-manager/task/plan-009/deploy-contract-mapping.md` (baseline section).
- Dependency: T000.

### [x] T002 - Gap analysis guide vs code hien tai
- Skill chinh: `software-architecture`
- Muc tieu: xac dinh sai khac giua contract V9 va implementation backend hien tai.
- Input:
  - `Be/accounts/admin.py`
  - `Be/properties/admin.py`
  - `Be/appointments/admin.py`
  - `Be/news/admin.py`
  - `Be/prediction/admin.py`
  - `Be/core/settings.py`
  - `Be/core/urls.py`
  - `deploy-contract-mapping.md`
- Output:
  - cap nhat bang gap (truoc/sau, risk, muc do uu tien).
- Dependency: T001.

### [x] T003 - Chot contract deploy readiness V9
- Skill chinh: `software-architecture`
- Muc tieu: khoa cac diem mo ho:
  - admin coverage model
  - swagger/doc readiness
  - deploy security baseline
  - superuser runbook
- Output:
  - `deploy-contract-mapping.md` ban chot.
- Dependency: T002.

## Phase B - Backend Completion (Admin + Docs)

### [x] T004 - Audit model inventory cho admin coverage
- Skill chinh: `django-pro`
- Muc tieu: liet ke model can hien thi tren admin va xac dinh model chua dang ky.
- Input:
  - `Be/*/models.py`
  - `Be/*/admin.py`
- Output:
  - danh sach model can register + uu tien.
- Dependency: T003.

### [x] T005 - Hoan thien admin registration con thieu
- Skill chinh: `django-pro`
- Muc tieu: dang ky model con thieu cho `accounts`, `properties`, `prediction`.
- Input:
  - `Be/accounts/admin.py`
  - `Be/properties/admin.py`
  - `Be/prediction/admin.py`
- Output:
  - admin panel co du model can quan tri.
- Dependency: T004.

### [x] T006 - Chuan hoa admin UX cho van hanh
- Skill chinh: `django-pro`
- Muc tieu: bo sung `list_display`, `list_filter`, `search_fields` cho model quan trong.
- Input:
  - `Be/*/admin.py`
- Output:
  - list admin de loc/tim kiem theo domain.
- Dependency: T005.

### [x] T007 - Chuan hoa Swagger/API docs metadata
- Skill chinh: `software-architecture`
- Muc tieu: dam bao docs endpoint schema ro rang cho handoff FE/QA.
- Input:
  - `Be/core/urls.py`
  - `Be/*/views.py`
- Output:
  - schema/docs route va metadata on dinh theo contract V9.
- Dependency: T003.

### [x] T008 - Verify backend docs/admin command
- Skill chinh: `python-testing-patterns`
- Command:
  - `python manage.py check`
  - `python manage.py makemigrations --check --dry-run`
- Output:
  - log verify backend sau phase B.
- Dependency: T006, T007.

## Phase C - Security + Deploy Hardening

### [x] T009 - Security audit settings cho deploy
- Skill chinh: `security-review`
- Muc tieu: ra soat `SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`, `CORS`, `CSRF` cho profile deploy.
- Input:
  - `Be/core/settings.py`
- Output:
  - danh sach finding + muc do + de xuat fix.
- Dependency: T003.

### [x] T010 - Chuan hoa deployment env template
- Skill chinh: `backend-security-coder`
- Muc tieu: cap nhat/them `.env.example` backend cho deploy an toan.
- Input:
  - `Be/.env.example` (neu co)
  - `Be/core/settings.py`
- Output:
  - env template ro bien bat buoc va gia tri an toan.
- Dependency: T009.

### [x] T011 - Tao superuser runbook an toan
- Skill chinh: `deploy`
- Muc tieu: dinh nghia quy trinh tao superuser cho deploy khong lo credential.
- Input:
  - runbook file moi trong `tasks-manager/task/plan-009/`
- Output:
  - huong dan tao superuser (manual/noinput) + luu y security.
- Dependency: T010.

## Phase D - Verify Runtime & Smoke

### [x] T012 - Verify backend test command
- Skill chinh: `python-testing-patterns`
- Command:
  - `python manage.py test accounts properties appointments news prediction`
- Output:
  - log ket qua verify backend test.
- Dependency: T006, T010.

### [x] T013 - Smoke admin readiness
- Skill chinh: `python-testing-patterns`
- Muc tieu: smoke truy cap `/admin/` va model registration chinh.
- Output:
  - evidence smoke admin.
- Dependency: T011, T012.

### [x] T014 - Smoke Swagger readiness
- Skill chinh: `python-testing-patterns`
- Muc tieu: smoke `/swagger/` va `/swagger.json` co data endpoint chinh.
- Output:
  - evidence smoke swagger.
- Dependency: T007, T012.

### [x] T015 - Tao checklist regression V9
- Skill chinh: `writing-plans`
- Muc tieu: co checklist pass/fail cho admin/docs/deploy readiness.
- Output:
  - `tasks-manager/task/plan-009/deploy-regression-checklist.md`
- Dependency: T013, T014.

## Phase E - Gate Audit Bat Buoc + Review

### [x] T018 - Gate Logic audit
- Skill chinh: `software-architecture`
- Muc tieu: doi chieu contract V9 voi code backend sau implement.
- Output:
  - cap nhat trang thai gate Logic trong `plan-009.md`.

### [x] T019 - Gate Nghiep vu audit
- Skill chinh: `software-architecture`
- Muc tieu: xac nhan team van hanh duoc admin/docs theo nhu cau nghiep vu.
- Output:
  - cap nhat trang thai gate Nghiep vu trong `plan-009.md`.

### [x] T020 - Gate Security audit
- Skill chinh: `security-review`
- Muc tieu:
  - check deploy-safe config
  - check admin/doc exposure risk
  - check secret handling risk
- Output:
  - cap nhat trang thai gate Security trong `plan-009.md` + risk note.

### [x] T021 - Gate Test runtime audit
- Skill chinh: `python-testing-patterns`
- Muc tieu: rerun command verify sau gate logic/nghiep vu/security.
- Output:
  - cap nhat trang thai gate Test trong `plan-009.md`.

### [x] T016 - Cap nhat review memory Plan 009
- Skill chinh: `writing-plans`
- Muc tieu: ghi day du viec da lam, verification, risk ton dong, lessons, next steps.
- Output:
  - `tasks-manager/review/REVIEW.md`
- Dependency:
  - T015 + T018 + T019 + T020 + T021.
