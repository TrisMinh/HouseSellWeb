# Tasks chi tiet - Plan 010 (Data seed vietnam-real-estates)

## Quy tac thuc thi

- Moi task atomic, co input/output ro rang.
- Moi task gan skill chinh.
- Moi task bat buoc qua 4 gate: Logic, Nghiep vu, Security, Test.
- Khong chuyen phase neu dependency chua pass.
- Chua implement code khi plan chua duoc user xac nhan.

## Dependency map

- Phase A (preflight + contract chot) -> bat buoc truoc implement.
- Phase B (dataset profiling + mapping) -> can contract Plan 010.
- Phase C (seed command implementation) -> can B xong.
- Phase D (runtime verify + smoke) -> can C xong.
- Phase E (gate audit + review) -> chot Plan 010.

## Phase A - Preflight & Contract

### [ ] T000 - Preflight theo rule
- Skill chinh: `writing-plans`
- Muc tieu: xac nhan da doc review + guide + rules + skills lien quan truoc implement.
- Input:
  - `tasks-manager/review/REVIEW.md`
  - `tasks-manager/guilde/backend_guide_ver3.md`
  - `tasks-manager/.claude/rules/*.md`
  - `C:/Users/ADMIN/.codex/skills/writing-plans/SKILL.md`
- Output:
  - note preflight trong log lam viec.
- Dependency: none.

### [ ] T001 - Chot contract data seeding theo yeu cau user
- Skill chinh: `software-architecture`
- Muc tieu: dong bo scope:
  - ~100 property
  - ~10 users
  - 4-6 images/property
  - relation mua/ban + lien he dat lich hen
- Input:
  - `tasks-manager/plan/plan-010.md`
  - message yeu cau user
- Output:
  - cap nhat `data-seed-contract-mapping.md` (ban baseline).
- Dependency: T000.

### [ ] T002 - Thiet ke strategy image URL cho ImageField
- Skill chinh: `django-pro`
- Muc tieu: verify cach luu image URL ngoai trong `PropertyImage.image` hoac fallback strategy.
- Input:
  - `Be/properties/models.py`
  - `Be/properties/serializers.py`
- Output:
  - quyet dinh ky thuat + risk note trong contract mapping.
- Dependency: T001.

## Phase B - Dataset Profiling & Mapping

### [ ] T003 - Profile dataset parquet va define filter quality
- Skill chinh: `python-pro`
- Muc tieu: xac dinh dieu kien chon record hop le (price/area/location/title).
- Input:
  - `LinearRegressionModel/data/vietnam-real-estates/shard_*.parquet`
- Output:
  - rule loc record cho seed.
- Dependency: T001.

### [ ] T004 - Dinh nghia mapping property_type/listing_type/status
- Skill chinh: `software-architecture`
- Muc tieu:
  - map `property_type_name` -> enum he thong
  - infer `listing_type` (sale/rent)
  - phan bo `status` phuc vu mo phong mua/ban
- Output:
  - mapping table trong `data-seed-contract-mapping.md`.
- Dependency: T003.

### [ ] T005 - Dinh nghia relation users/properties/favorites/appointments
- Skill chinh: `software-architecture`
- Muc tieu:
  - owner assignment
  - buyer/visitor assignment khac owner
  - phan bo trang thai appointment
- Output:
  - relation matrix + count target.
- Dependency: T004.

## Phase C - Implementation seed command

### [ ] T006 - Mo rong argument command seed_data
- Skill chinh: `django-pro`
- Muc tieu: bo sung argument seed mode dataset-driven va count control.
- Input:
  - `Be/core/management/commands/seed_data.py`
- Output:
  - command support users/properties/images/appointments/favorites/seed/reset.
- Dependency: T005.

### [ ] T007 - Implement loader + sampler tu parquet
- Skill chinh: `python-pro`
- Muc tieu: doc parquet local, loc record hop le, sample reproducible.
- Input:
  - `Be/core/management/commands/seed_data.py`
- Output:
  - danh sach records du dieu kien de tao property.
- Dependency: T006.

### [ ] T008 - Implement tao users + profile data thuc te
- Skill chinh: `django-pro`
- Muc tieu: tao ~10 users va enrich profile (phone/address/bio) on dinh.
- Input:
  - `Be/core/management/commands/seed_data.py`
  - `Be/accounts/models.py`
- Output:
  - users/profile dataset for ownership + interaction.
- Dependency: T006.

### [ ] T009 - Implement tao 100 properties tu dataset mapping
- Skill chinh: `django-pro`
- Muc tieu: insert property records map dung schema.
- Input:
  - mapping T004
  - `Be/properties/models.py`
- Output:
  - ~100 property records.
- Dependency: T007, T008.

### [ ] T010 - Implement gan 4-6 images/property bang URL ngoai
- Skill chinh: `backend-dev-guidelines`
- Muc tieu:
  - moi property 4-6 images
  - co `is_primary=True` cho it nhat 1 image
- Input:
  - `Be/properties/models.py`
  - `Be/core/management/commands/seed_data.py`
- Output:
  - image records hoat dong voi FE detail/listing.
- Dependency: T002, T009.

### [ ] T011 - Implement favorites + appointments mo phong mua/ban/lien he
- Skill chinh: `django-pro`
- Muc tieu:
  - tao favorites tu non-owner users
  - tao appointments voi status da dang (pending/confirmed/completed/cancelled)
  - dam bao khong appointment owner tu dat cho property cua minh
- Input:
  - `Be/appointments/models.py`
  - `Be/properties/models.py`
- Output:
  - relation data phuc vu demo nghiep vu.
- Dependency: T009.

### [ ] T012 - Bao toan backward compatibility seed command cu
- Skill chinh: `backend-dev-guidelines`
- Muc tieu: giu mode seed cu van dung duoc cho smoke/test.
- Output:
  - command chay duoc ca mode cu va mode dataset moi.
- Dependency: T006-T011.

## Phase D - Verify Runtime & Smoke

### [ ] T013 - Verify static checks backend
- Skill chinh: `python-testing-patterns`
- Command:
  - `python manage.py check`
  - `python manage.py makemigrations --check --dry-run`
- Dependency: T012.

### [ ] T014 - Run seed command theo target user
- Skill chinh: `python-testing-patterns`
- Muc tieu: chay seed voi target ~10 users, ~100 properties, 4-6 images/property.
- Output:
  - log command + so luong tao thanh cong.
- Dependency: T012.

### [ ] T015 - Tao smoke script verify count + integrity
- Skill chinh: `python-testing-patterns`
- Muc tieu: script check:
  - user/property/image/appointment/favorite counts
  - image range 4-6/property
  - relation owner/requester hop le
- Output:
  - `tasks-manager/task/plan-010/evidence/run-plan010-data-seed-smoke.py`
  - `tasks-manager/task/plan-010/evidence/plan010-data-seed-report.json`
- Dependency: T014.

### [ ] T016 - Chay test suite lien quan
- Skill chinh: `python-testing-patterns`
- Command:
  - `python manage.py test accounts properties appointments news prediction`
- Dependency: T013, T014.

### [ ] T017 - Tao checklist regression data seeding
- Skill chinh: `writing-plans`
- Output:
  - `tasks-manager/task/plan-010/data-seed-regression-checklist.md`
- Dependency: T015, T016.

## Phase E - Gate Audit Bat Buoc + Review

### [ ] T018 - Gate Logic audit
- Skill chinh: `software-architecture`
- Muc tieu: doi chieu mapping + data integrity voi contract Plan 010.
- Output:
  - cap nhat trang thai gate Logic trong `plan-010.md`.

### [ ] T019 - Gate Nghiep vu audit
- Skill chinh: `software-architecture`
- Muc tieu: xac nhan data phuc vu dung flow mua/ban + dat lich hen tren he thong.
- Output:
  - cap nhat trang thai gate Nghiep vu trong `plan-010.md`.

### [ ] T020 - Gate Security audit
- Skill chinh: `backend-security-coder`
- Muc tieu:
  - check policy image URL
  - check command khong mo rong attack surface
  - check khong leak sensitive data
- Output:
  - cap nhat trang thai gate Security trong `plan-010.md`.

### [ ] T021 - Gate Test runtime audit
- Skill chinh: `python-testing-patterns`
- Muc tieu: rerun check + smoke sau gate logic/nghiep vu/security.
- Output:
  - cap nhat trang thai gate Test trong `plan-010.md`.

### [ ] T022 - Cap nhat review memory Plan 010
- Skill chinh: `writing-plans`
- Muc tieu: ghi lai file da doi, verification, risk ton dong, bai hoc.
- Output:
  - `tasks-manager/review/REVIEW.md`
- Dependency:
  - T017 + T018 + T019 + T020 + T021.
