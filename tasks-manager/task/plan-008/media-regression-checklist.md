# Media Regression Checklist - Plan 008 (V8)

## Muc tieu

Kiem tra end-to-end cho media flow (create property, upload, delete, render) sau khi hardening V8.

## Cac ca kiem tra

### C01 - Owner upload 1 image hop le
- Input: owner + image gif/png hop le.
- Ky vong: `201`, response co `id`, `image`, `is_primary`.
- Status: PASS

### C02 - Non-owner upload image
- Input: user khac owner.
- Ky vong: reject (`404`/`403`) va khong tao image.
- Status: PASS

### C03 - Upload invalid content type
- Input: `text/plain`.
- Ky vong: `400`, message validation cho `images`.
- Status: PASS

### C04 - Upload file vuot size limit
- Input: file size > `PROPERTY_IMAGE_MAX_UPLOAD_BYTES`.
- Ky vong: `400`.
- Status: PASS

### C05 - Upload vuot max files per request
- Input: so file > `PROPERTY_IMAGE_MAX_FILES_PER_UPLOAD`.
- Ky vong: `400`.
- Status: PASS

### C06 - Upload vuot max files per property
- Input: tong anh sau upload > `PROPERTY_IMAGE_MAX_FILES_PER_PROPERTY`.
- Ky vong: `400`.
- Status: PASS

### C07 - Xoa primary image
- Input: property co >=2 image, xoa image primary.
- Ky vong: `200`, image con lai duoc promote lam primary.
- Status: PASS

### C08 - FE AddProperty create + upload
- Input: tao property tren FE, upload gallery.
- Ky vong: property tao thanh cong, image co tren backend.
- Status: PASS

### C09 - FE ManageProperty upload/delete
- Input: upload moi + delete image trong man quan ly.
- Ky vong: gallery cap nhat dung sau moi thao tac.
- Status: PASS

### C10 - FE Listings render image URL
- Input: listing co `primary_image` media path.
- Ky vong: render qua `getImageUrl`, hien thi anh dung host.
- Status: PASS

## Verify commands

- Backend:
  - `python manage.py check`
  - `python manage.py makemigrations --check --dry-run`
  - `python manage.py test properties`
- Frontend:
  - `npm run build`
  - `npm run test -- --run`

## Evidence

- API smoke report:
  - `tasks-manager/task/plan-008/evidence/plan008-media-smoke-report.json`
- Smoke script:
  - `tasks-manager/task/plan-008/evidence/run-plan008-media-smoke.py`
