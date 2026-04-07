# Tasks chi tiet - Plan 008 (V8 Media Files E2E Hardening)

## Quy tac thuc thi

- Moi task atomic, co input/output ro rang.
- Moi task gan skill chinh.
- Moi task bat buoc qua 4 gate: Logic, Nghiep vu, Security, Test.
- Khong chuyen phase neu dependency chua pass.

## Dependency map

- Phase A (contract baseline) -> bat buoc truoc implement.
- Phase B (backend hardening) -> can contract V8 chot.
- Phase C (frontend sync) -> can backend contract/media behavior on dinh.
- Phase D (verify + smoke) -> can backend/frontend sync xong.
- Phase E (gate audit + review) -> chot V8.

## Phase A - Preflight & Contract Baseline

### [x] T000 - Preflight theo rule
- Skill chinh: `writing-plans`
- Muc tieu: xac nhan da doc review + guide + rules + skill lien quan truoc khi implement V8.
- Input:
  - `tasks-manager/review/REVIEW.md`
  - `tasks-manager/guilde/backend_guide_ver3.md`
  - `tasks-manager/.claude/rules/*.md`
  - `tasks-manager/.claude/skills/deploy/SKILL.md`
  - `tasks-manager/.claude/skills/security-review/SKILL.md`
- Output:
  - ghi nhan preflight context trong note thuc thi.
- Dependency: none.

### [x] T001 - Trich contract V8 tu guide
- Skill chinh: `software-architecture`
- Muc tieu: trich yeu cau "Giai doan 8: Media Files" tu guide v3.
- Input:
  - `tasks-manager/guilde/backend_guide_ver3.md`
- Output:
  - tao `tasks-manager/task/plan-008/media-contract-mapping.md` (baseline section).
- Dependency: T000.

### [x] T002 - Gap analysis guide vs code hien tai
- Skill chinh: `software-architecture`
- Muc tieu: xac dinh sai khac giua contract V8 va implementation BE/FE hien tai.
- Input:
  - `Be/core/settings.py`
  - `Be/core/urls.py`
  - `Be/properties/models.py`
  - `Be/properties/serializers.py`
  - `Be/properties/services.py`
  - `Be/properties/views.py`
  - `FE/src/lib/propertiesApi.ts`
  - `FE/src/pages/AddProperty.tsx`
  - `FE/src/pages/ManageProperty.tsx`
  - `media-contract-mapping.md`
- Output:
  - cap nhat bang gap (truoc/sau, risk, muc do uu tien).
- Dependency: T001.

### [x] T003 - Chot contract media V8
- Skill chinh: `software-architecture`
- Muc tieu: khoa cac diem mo ho:
  - field multipart upload
  - validation type/size/count
  - response schema image
  - delete behavior + owner scope
- Output:
  - `media-contract-mapping.md` ban chot.
- Dependency: T002.

## Phase B - Backend Media Hardening

### [x] T004 - Chuan hoa media policy trong settings/env
- Skill chinh: `django-pro`
- Muc tieu: bo sung cau hinh gioi han media upload theo env (size/count/type policy).
- Input:
  - `Be/core/settings.py`
- Output:
  - media policy constants/env duoc khai bao ro rang.
- Dependency: T003.

### [x] T005 - Chuan hoa validation upload media
- Skill chinh: `backend-security-coder`
- Muc tieu: enforce validation type/size/count/caption-order theo contract V8.
- Input:
  - `Be/properties/serializers.py`
  - `Be/properties/services.py`
  - `Be/properties/views.py`
- Output:
  - upload flow reject payload sai, message loi on dinh cho FE parse.
- Dependency: T004.

### [x] T006 - Chuan hoa delete media + primary image behavior
- Skill chinh: `django-pro`
- Muc tieu: dam bao delete image khong gay lech state gallery (owner scope + primary fallback neu can).
- Input:
  - `Be/properties/services.py`
  - `Be/properties/repositories.py`
  - `Be/properties/views.py`
- Output:
  - behavior delete duoc chot theo contract V8.
- Dependency: T005.

### [x] T007 - Mo rong test matrix backend media
- Skill chinh: `python-testing-patterns`
- Muc tieu: bo sung test happy-path + negative-path:
  - invalid type
  - oversized file
  - vuot gioi han so anh
  - non-owner upload/delete
- Input:
  - `Be/properties/tests.py`
- Output:
  - test media endpoint bao phu contract V8.
- Dependency: T006.

### [x] T008 - Verify backend command
- Skill chinh: `python-testing-patterns`
- Command:
  - `python manage.py check`
  - `python manage.py makemigrations --check --dry-run`
  - `python manage.py test properties`
- Output:
  - log ket qua verify backend.
- Dependency: T007.

## Phase C - Frontend API Sync

### [x] T009 - Chuan hoa media API client FE
- Skill chinh: `typescript-pro`
- Muc tieu: dong bo `propertiesApi` theo contract V8 (upload/delete/typed response).
- Input:
  - `FE/src/lib/propertiesApi.ts`
- Output:
  - API helper FE nhat quan cho media workflow.
- Dependency: T003.

### [x] T010 - Dong bo AddProperty voi create + upload that
- Skill chinh: `typescript-pro`
- Muc tieu: AddProperty bo mock submit, tao property that va upload image that.
- Input:
  - `FE/src/pages/AddProperty.tsx`
  - `FE/src/lib/propertiesApi.ts`
- Output:
  - luong tao tin + upload image chay qua API.
- Dependency: T009.

### [x] T011 - Dong bo ManageProperty voi media API that
- Skill chinh: `typescript-pro`
- Muc tieu: ManageProperty bo mock gallery flow, ho tro upload/delete image that.
- Input:
  - `FE/src/pages/ManageProperty.tsx`
  - `FE/src/lib/propertiesApi.ts`
- Output:
  - luong quan ly gallery dong bo contract V8.
- Dependency: T009.

### [x] T012 - Dong bo render URL image o flow tieu thu
- Skill chinh: `typescript-pro`
- Muc tieu: dam bao PropertyDetail/Listings/Profile render URL image on dinh theo helper chung.
- Input:
  - `FE/src/pages/PropertyDetail.tsx`
  - `FE/src/pages/Listings.tsx`
  - `FE/src/pages/Profile.tsx`
  - `FE/src/lib/propertiesApi.ts`
- Output:
  - khong con host hardcode/parse lech duong dan image.
- Dependency: T010, T011.

### [x] T013 - Tao checklist regression media V8
- Skill chinh: `writing-plans`
- Muc tieu: co checklist pass/fail cho flow media.
- Output:
  - `tasks-manager/task/plan-008/media-regression-checklist.md`
- Dependency: T012.

## Phase D - Verify Runtime

### [x] T014 - Verify frontend command
- Skill chinh: `typescript-pro`
- Command:
  - `npm run build`
  - `npm run test -- --run`
- Output:
  - log ket qua verify frontend.
- Dependency: T012.

### [x] T015 - Browser/manual smoke media flow
- Skill chinh: `software-architecture`
- Muc tieu: smoke flow FE-BE media theo checklist:
  1. tao property moi
  2. upload 1..n images
  3. delete image
  4. xem image tren detail/list
- Output:
  - evidence JSON/log + cap nhat checklist.
- Dependency: T013, T008, T014.

## Phase E - Gate Audit Bat Buoc + Review

### [x] T018 - Gate Logic audit
- Skill chinh: `software-architecture`
- Muc tieu: doi chieu contract V8 voi code backend/frontend sau implement.
- Output:
  - cap nhat trang thai gate Logic trong `plan-008.md`.

### [x] T019 - Gate Nghiep vu audit
- Skill chinh: `software-architecture`
- Muc tieu: xac nhan user flow seller/buyer media khong dut do mismatch contract.
- Output:
  - cap nhat trang thai gate Nghiep vu trong `plan-008.md`.

### [x] T020 - Gate Security audit
- Skill chinh: `backend-security-coder`
- Muc tieu:
  - kiem tra upload abuse risk (type/size/count)
  - check owner-boundary upload/delete
  - check data/path leak risk
- Output:
  - cap nhat trang thai gate Security trong `plan-008.md` + risk note.

### [x] T021 - Gate Test runtime audit
- Skill chinh: `python-testing-patterns`
- Muc tieu: rerun command verify sau gate logic/nghiep vu/security.
- Output:
  - cap nhat trang thai gate Test trong `plan-008.md`.

### [x] T016 - Cap nhat review memory Plan 008
- Skill chinh: `writing-plans`
- Muc tieu: ghi day du viec da lam, verification, risk ton dong, lessons, next steps.
- Output:
  - `tasks-manager/review/REVIEW.md`
- Dependency:
  - T015 + T018 + T019 + T020 + T021.

