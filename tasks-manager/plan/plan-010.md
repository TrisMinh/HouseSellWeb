# Plan 010 - Data seeding tu vietnam-real-estates cho demo mua/ban

## Checklist Tien Do

- [x] Da tao plan
- [ ] Da thuc thi plan
- [ ] Da verify ket qua
- [ ] Da cap nhat task + review

## Skill orchestration dung cho ke hoach nay

- `writing-plans`: chia phase/task atomic, ro input/output/dependency.
- `software-architecture`: chot mapping dataset -> schema backend va contract data volume.
- `django-pro`: implement command seed theo pattern Django management command.
- `python-pro`: xu ly parquet + mapping + random sampling co seed on dinh.
- `backend-dev-guidelines`: giu boundary service/repository ro rang, khong pha vo API contract.
- `backend-security-coder`: kiem soat nguon image URL, tranh nguon nguy hiem/invalid.
- `python-testing-patterns`: verify command, count data, relation integrity.

## Muc tieu

1. Nap du lieu that tu `LinearRegressionModel/data/vietnam-real-estates` vao he thong backend.
2. Tao khoang 100 property tu dataset, map dung vao schema `properties_property`.
3. Tao khoang 10 user va lien ket user voi property theo role owner + actor mua/ban.
4. Moi property co 4-6 anh, dung image URL tren mang va luu vao `PropertyImage`.
5. Tao du lieu tuong tac mua/ban/lien he: favorites + appointments (pending/confirmed/completed/cancelled).
6. Co command seed idempotent/co tham so de tai tao data nhanh cho dev/demo.

## Baseline truoc Plan 010

- Da co command seed co ban: `Be/core/management/commands/seed_data.py` (factory mock data don gian).
- Da co dataset local: `LinearRegressionModel/data/vietnam-real-estates/shard_000*.parquet`.
- Schema hien tai:
  - `Property` co owner/title/price/area/location/status...
  - `PropertyImage` dang dung `ImageField`.
  - `Appointment` lien ket `user` + `property`.
  - `Favorite` the hien nguoi dung quan tam property.
- Chua co pipeline seed data that tu parquet vao DB.
- Chua co relation dataset-driven cho luong mua/ban va lich hen.

## Scope chi tiet

### Backend data seed

- Nang cap command `seed_data` de ho tro mode seed tu parquet.
- Bo sung tham so de control quy mo:
  - users (mac dinh 10)
  - properties (mac dinh 100)
  - images min/max (mac dinh 4/6)
  - appointments/favorites
  - random seed
  - reset mode (tuy chon)
- Mapping dataset -> Property:
  - `name` -> `title`
  - `description` -> `description`
  - `property_type_name` -> `property_type` (house/apartment/land/villa/other)
  - `price` -> `price`
  - `area` -> `area`
  - `bedroom_count` -> `bedrooms`
  - `bathroom_count` -> `bathrooms`
  - `floor_count` -> `floors`
  - `province_name` -> `city`
  - `district_name` -> `district`
  - `ward_name` -> `ward`
  - `street_name` + `project_name` -> `address` (co fallback)

### Images URL cho PropertyImage

- Tao bo URL image ngoai (on dinh) de gan 4-6 anh/property.
- Prefix URL hop le (`https://...`) de FE render truc tiep.
- Dam bao co 1 anh primary/property.

### Lien ket user voi giao dich/lien he

- Tao ~10 user + profile.
- Gan owner cho 100 property theo round-robin + random.
- Mo phong mua/ban:
  - mot phan property set status `sold`/`rented`.
  - tao appointment completed/confirmed giua owner va user khac owner.
- Mo phong quan tam/lien he:
  - tao favorite tu nhieu user cho property khac owner.
  - tao appointment pending/cancelled cho property con active.

### Verify + artifacts

- Verify counts sau seed: users/properties/images/appointments/favorites.
- Verify relation integrity:
  - khong appointment voi owner == requester.
  - images >= 4/property va <= 6/property.
  - sold/rented co du lieu tuong tac phu hop.
- Update task artifact va review memory.

## Out of scope

- Khong thay doi API contract FE/BE (chi bo sung data seed).
- Khong them model transaction moi.
- Khong crawl web phuc tap cho image; dung URL list co san.
- Khong dong bo lai du lieu prediction model.

## Done criteria

1. Command seed moi chay duoc va tao du lieu theo so luong yeu cau.
2. Tao duoc ~10 users, ~100 properties tu parquet.
3. Moi property co 4-6 image records, co primary image.
4. Tao duoc favorites + appointments de mo phong mua/ban/lien he.
5. Chay `manage.py check`, `makemigrations --check`, test suite lien quan pass.
6. Co script/check hoac output report xac nhan count va integrity.
7. `tasks-manager/task/plan-010/tasks.md` duoc cap nhat trang thai.
8. `tasks-manager/review/REVIEW.md` duoc cap nhat.

## 4 cong kiem tra bat buoc

### Gate 1 - Logic
- Mapping dataset -> schema khong sai kieu du lieu.
- Command seed chay on dinh, khong tao relation vo nghia.

### Gate 2 - Nghiep vu
- Data tao ra phuc vu duoc demo list/detail, mua-ban, lien he dat lich hen.
- So luong va phan bo data dung voi yeu cau user.

### Gate 3 - Security
- Chi dung image URL an toan (`https`) va khong nhung du lieu nguy hiem.
- Khong hardcode secret, khong log data nhay cam.

### Gate 4 - Test chay thuc te
- Check/migration/test pass.
- Command seed + smoke query count pass.

## Task gate bat buoc (theo rule)

- Gate Logic: `T018` (tasks.md)
- Gate Nghiep vu: `T019` (tasks.md)
- Gate Security: `T020` (tasks.md)
- Gate Test runtime: `T021` (tasks.md)

## Trang thai gate hien tai (2026-04-07)

| Gate | Trang thai | Evidence |
|---|---|---|
| Logic | PENDING | Cho implement + verify Plan 010 |
| Nghiep vu | PENDING | Cho data seed xong va doi chieu yeu cau |
| Security | PENDING | Cho review image URL + input guard |
| Test | PENDING | Cho run check/test/smoke |

## Deliverables du kien

- `tasks-manager/plan/plan-010.md`
- `tasks-manager/task/plan-010/tasks.md`
- `tasks-manager/task/plan-010/data-seed-contract-mapping.md`
- `tasks-manager/task/plan-010/data-seed-regression-checklist.md`
- `tasks-manager/task/plan-010/evidence/run-plan010-data-seed-smoke.py`
- `tasks-manager/task/plan-010/evidence/plan010-data-seed-report.json`
- `Be/core/management/commands/seed_data.py` (cap nhat)
- `Be/utils/factories.py` (neu can bo sung helper)
- `tasks-manager/review/REVIEW.md`
