# News Regression Checklist - Plan 005

## Muc tieu
- Smoke test nhanh luong News sau khi hardening BE-FE.
- Xac nhan 4 gate: Logic, Nghiep vu, Security, Test.

## Chuan bi
- Backend chay tai `http://localhost:8000`.
- Frontend chay tai `http://localhost:5173`.
- Co 4 tai khoan test:
  - `anon` (khong login)
  - `user_a` (normal user, co bai draft cua chinh minh)
  - `staff_a` (is_staff=true, khong phai superuser)
  - `admin` (superuser)
- Co du data:
  - 1 bai `published` cua user khac.
  - 1 bai `draft` cua `user_a`.
  - 1 bai `draft` cua user khac.

## Checklist

### C01 - Public list chi thay bai published
- Buoc:
  1. Khong login.
  2. Goi `GET /api/news/`.
- Ky vong:
  - `200`.
  - Khong co bai `is_published=false`.

### C02 - Public detail bai published
- Buoc:
  1. Khong login.
  2. Goi `GET /api/news/{published_id}/`.
- Ky vong:
  - `200`.
  - Response co field `title/content/author_name/views_count`.

### C03 - Public detail bai draft bi chan
- Buoc:
  1. Khong login.
  2. Goi `GET /api/news/{draft_id}/`.
- Ky vong:
  - `404` (hoac `403` neu policy chot nhu vay).
  - Khong lo noi dung draft.

### C04 - User thuong list thay public + own draft
- Buoc:
  1. Login `user_a`.
  2. Goi `GET /api/news/`.
- Ky vong:
  - `200`.
  - Co bai published.
  - Co draft cua `user_a`.
  - Khong co draft cua user khac.

### C05 - User thuong xem detail own draft
- Buoc:
  1. Login `user_a`.
  2. Goi `GET /api/news/{own_draft_id}/`.
- Ky vong:
  - `200`.

### C06 - User thuong khong xem duoc draft nguoi khac
- Buoc:
  1. Login `user_a`.
  2. Goi `GET /api/news/{other_user_draft_id}/`.
- Ky vong:
  - `404` (hoac `403` theo policy).

### C07 - Non-staff khong duoc tao bai
- Buoc:
  1. Login `user_a`.
  2. `POST /api/news/` payload hop le.
- Ky vong:
  - `403`.

### C08 - Staff duoc tao bai
- Buoc:
  1. Login `staff_a`.
  2. `POST /api/news/` payload hop le.
- Ky vong:
  - `201`.
  - `author` la `staff_a`.

### C09 - Validation title/content
- Buoc:
  1. Login `staff_a`.
  2. `POST /api/news/` voi `title` rong hoac `content` rong.
- Ky vong:
  - `400`.
  - Tra loi loi theo field.

### C10 - Author duoc patch bai cua minh
- Buoc:
  1. Login tac gia bai viet.
  2. `PATCH /api/news/{id}/` doi `title`.
- Ky vong:
  - `200`.
  - Field thay doi dung.

### C11 - User khac khong duoc patch bai khong phai cua minh
- Buoc:
  1. Login user khac khong phai tac gia.
  2. `PATCH /api/news/{id}/`.
- Ky vong:
  - `403` hoac `404` theo policy.

### C12 - Superuser duoc patch/delete bai bat ky
- Buoc:
  1. Login `admin`.
  2. `PATCH` va `DELETE` 1 bai cua user khac.
- Ky vong:
  - `PATCH` -> `200`.
  - `DELETE` -> `200` va co `message`.

### C13 - Delete by non-owner bi chan
- Buoc:
  1. Login user thuong khong phai owner.
  2. `DELETE /api/news/{id}/`.
- Ky vong:
  - `403` hoac `404`.

### C14 - View count tang khi GET detail thanh cong
- Buoc:
  1. Ghi nhan `views_count` hien tai cua 1 bai co quyen xem.
  2. Goi `GET /api/news/{id}/` 2 lan.
- Ky vong:
  - `views_count` tang +2.

### C15 - View count khong tang khi truy cap bai khong du quyen
- Buoc:
  1. Login user khong du quyen.
  2. Goi `GET /api/news/{forbidden_or_hidden_id}/`.
- Ky vong:
  - Request fail (`404/403`).
  - `views_count` khong tang.

### C16 - FE trang News render du lieu API that
- Buoc:
  1. Mo trang News khi backend co data that.
  2. Kiem tra featured/list.
- Ky vong:
  - Hien thi du lieu API.
  - Khong crash khi thumbnail null.
  - Khong can cast `any` trong flow chinh.

### C17 - FE fallback mock dung dieu kien
- Buoc:
  1. Simulate API fail hoac tra empty.
  2. Mo trang News.
- Ky vong:
  - Trang van render fallback dung logic.
  - Co thong diep/hanh vi ro rang, khong che mat loi nghiem trong.

### C18 - Verify command bat buoc
- Buoc:
  1. Backend:
     - `python Be/manage.py check`
     - `python Be/manage.py makemigrations --check --dry-run`
     - `python Be/manage.py test news`
  2. Frontend:
     - `npm run build`
     - `npm run test` (neu co)
- Ky vong:
  - Cac lenh pass hoac co bao cao loi ro rang de xu ly tiep.

## Ket qua thuc thi (dien khi chay)

| Check | Ket qua | Evidence/Ghi chu |
|---|---|---|
| C01 | PASS | API smoke `status=200`, khong lo draft |
| C02 | PASS | API smoke `status=200` va day du field detail |
| C03 | PASS | API smoke `status=404` voi draft (public) |
| C04 | PASS | API smoke `status=200`, chi thay public + own draft |
| C05 | PASS | API smoke `status=200` voi own draft |
| C06 | PASS | API smoke `status=404` voi draft nguoi khac |
| C07 | PASS | API smoke `status=403` cho non-staff POST |
| C08 | PASS | API smoke `status=201` cho staff POST |
| C09 | PASS | API smoke `status=400` validation title/content |
| C10 | PASS | API smoke `status=200` author PATCH |
| C11 | PASS | API smoke `status=403` user khac PATCH |
| C12 | PASS | API smoke `patch=200`, `delete=200` voi superuser |
| C13 | PASS | API smoke `status=403` non-owner DELETE |
| C14 | PASS | API smoke view count tang `before=1 -> after=3` |
| C15 | PASS | API smoke view count khong tang voi truy cap bi chan |
| C16 | PASS | Browser smoke hien thi API data + thumbnail null an toan |
| C17 | PASS | Browser smoke fallback mock khi API fail |
| C18 | PASS | `manage.py check`, `makemigrations --check`, `test news`, `npm run build`, `npm run test -- --run` deu pass |

## Auto verification da chay

- Backend:
  - `python manage.py check` -> pass
  - `python manage.py makemigrations --check --dry-run` -> pass (`No changes detected`)
  - `python manage.py test news` -> pass (16 tests)
- Frontend:
  - `npm run build` -> pass (co warning chunk size/dynamic import)
  - `npm run test -- --run` -> pass (1 test)
- Browser smoke:
  - `node FE/scripts/run-news-c16-c17-smoke.mjs` -> pass (C16, C17)

## Evidence

- API smoke report: `tasks-manager/task/plan-005/evidence/plan005-news-api-smoke-report.json`
- FE smoke report: `tasks-manager/task/plan-005/evidence/news-fe-c16-c17-report.json`
