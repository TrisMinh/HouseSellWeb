# Plan 008 - V8 Media Files E2E Hardening (Property Images)

## Checklist Tien Do

- [x] Da tao plan
- [x] Da thuc thi plan
- [x] Da verify ket qua
- [x] Da cap nhat task + review

## Skill orchestration dung cho ke hoach nay

- `writing-plans`: chia phase/task atomic, ro input/output/dependency.
- `software-architecture`: chot contract media upload va mapping guide -> code.
- `django-pro`: chuan hoa endpoint upload/delete media, serializer, settings.
- `backend-security-coder`: hardening upload validation + permission boundary.
- `python-testing-patterns`: test matrix BE cho upload/delete media.
- `typescript-pro`: dong bo FE API client + Add/Manage flow theo contract media.

## Muc tieu

1. Chot contract V8 cho media files: upload/delete image, serving URL, gioi han upload.
2. Hardening backend upload media theo owner scope, validation type/size/count.
3. Dong bo FE AddProperty/ManageProperty de dung API that (khong dung mock image flow).
4. Dam bao URL anh render on dinh tren PropertyDetail/Listings/Profile.
5. Co checklist regression media + evidence verify theo 4 gate.

## Baseline truoc V8

- Da co `MEDIA_URL`/`MEDIA_ROOT` trong `Be/core/settings.py`.
- Da co media serving route trong `Be/core/urls.py`.
- Da co endpoint:
  - `POST /api/properties/<id>/images/`
  - `DELETE /api/properties/images/<id>/`
- Da co FE helper upload/delete trong `FE/src/lib/propertiesApi.ts`.
- Khoang trong hien tai:
  - Add/Manage page van dang mock-heavy, chua dong bo tron ven voi API media.
  - Validation upload chua du chat (type/size/count) o muc contract V8.
  - Test media chua bao phu du edge case permission/invalid payload.
  - Chua co artifact contract/checklist rieng cho V8 media.

## Scope chi tiet

### Backend

- Chot contract upload/delete media trong app `properties`.
- Chuan hoa validation upload:
  - mime/type hop le
  - gioi han dung luong file
  - gioi han so anh moi lan upload va tong so anh/property
  - xu ly caption/order/is_primary nhat quan
- Chuan hoa hanh vi delete image:
  - owner/staff boundary
  - khong de trang thai image metadata bi lech.
- Bo sung/cap nhat test matrix media endpoint.

### Frontend

- Dong bo `propertiesApi` theo contract V8 (multipart fields + typed response).
- AddProperty:
  - tao property that
  - upload gallery image that sau khi tao property
  - hien thi upload state/error ro rang.
- ManageProperty:
  - load du lieu property that
  - upload/delete image that
  - cap nhat gallery state theo response API.
- PropertyDetail/Listings/Profile:
  - dam bao render URL anh on dinh theo `getImageUrl` va fallback.

### Artifact va quy trinh

- Tao `media-contract-mapping.md`.
- Tao `media-regression-checklist.md`.
- Luu evidence smoke/media report cho V8.

## Out of scope

- Di chuyen media sang cloud object storage (S3/R2/GCS).
- Xu ly image optimization nang cao (thumbnail worker, CDN transform).
- Refactor tong the UI/UX ngoai pham vi media upload flow.

## Done criteria

1. Co `media-contract-mapping.md` chot request/response/rules cho V8.
2. Backend enforce validation upload theo contract (type/size/count/owner scope).
3. Test backend media pass voi case happy-path + negative-path.
4. FE AddProperty/ManageProperty dong bo API media, khong con mock upload flow.
5. Property image URL hien thi dung tren luong list/detail/management.
6. Verify command BE + FE pass.
7. Co `media-regression-checklist.md` + evidence smoke.
8. `tasks-manager/review/REVIEW.md` duoc cap nhat.

## 4 cong kiem tra bat buoc

### Gate 1 - Logic
- Contract upload/delete/media URL khop giua serializer/service/view/FE client.
- State gallery FE khong lech sau upload/delete.

### Gate 2 - Nghiep vu
- Seller tao/sua tin va quan ly anh theo dung user flow.
- Buyer xem duoc anh tren listing/detail theo dung data tu backend.

### Gate 3 - Security
- Khong upload file sai dinh dang vuot policy.
- Khong bypass quyen owner de upload/delete media cua nguoi khac.
- Khong leak path noi bo/secret qua response loi.

### Gate 4 - Test chay thuc te
- Backend check/migration/tests pass.
- Frontend build/test pass.
- Browser/manual smoke media flow pass theo checklist.

## Task gate bat buoc (theo rule)

- Gate Logic: `T018` (tasks.md)
- Gate Nghiep vu: `T019` (tasks.md)
- Gate Security: `T020` (tasks.md)
- Gate Test runtime: `T021` (tasks.md)

## Trang thai gate hien tai (2026-04-07)

| Gate | Trang thai | Evidence |
|---|---|---|
| Logic | PASS | Contract V8 chot va FE-BE dong bo upload/delete/media URL theo `media-contract-mapping.md` |
| Nghiep vu | PASS | AddProperty/ManageProperty da dung API that, Listings/Detail render image URL on dinh |
| Security | PASS | BE enforce validation type/size/count + owner boundary, test negative-path pass |
| Test | PASS | Backend check/migrate/test pass, FE build/test pass, media smoke C01..C10 pass |

## Deliverables

- `tasks-manager/plan/plan-008.md`
- `tasks-manager/task/plan-008/tasks.md`
- `tasks-manager/task/plan-008/media-contract-mapping.md`
- `tasks-manager/task/plan-008/media-regression-checklist.md`
- `tasks-manager/task/plan-008/evidence/run-plan008-media-smoke.py`
- `tasks-manager/task/plan-008/evidence/plan008-media-smoke-report.json`
- `tasks-manager/review/REVIEW.md`
