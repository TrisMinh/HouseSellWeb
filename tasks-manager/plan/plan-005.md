# Plan 005 - V5 App News

## Checklist Tien Do

- [x] Da tao plan
- [x] Da thuc thi plan
- [x] Da verify ket qua
- [x] Da cap nhat task + review
## Skill orchestration dung cho ke hoach nay

- `writing-plans`: chia phase/task atomic, ro input/output/dependency.
- `software-architecture`: chot contract BE-FE va response shape.
- `django-pro`: chuan hoa endpoint DRF va queryset actor scope.
- `python-pro`: chuan hoa service/repository/validation.
- `backend-security-coder`: chot va enforce auth/authz matrix.
- `python-testing-patterns`: bo sung test matrix + verify command.
- `typescript-pro`: chuan hoa type FE va bo `any` trong luong News.

## Muc tieu

1. Chot contract API News ro rang, khong mo ho ve role va response.
2. Hoan thien backend News theo matrix quyen da chot.
3. Dong bo FE News page/API theo du lieu that, fallback mock co dieu kien.
4. Co bang chung verify qua 4 cong: Logic, Nghiep vu, Security, Test.

## Baseline hien tai

- Da co `news` app va da thuc thi mot phan T005 (repository actor scope).
- Test `news` hien tai moi co coverage co ban, chua du matrix quyen/day du flow.
- FE News van phu thuoc mock du lieu o nhieu block.

## Scope chi tiet

### Backend

- Chuan hoa contract cho endpoint:
  - `GET /api/news/`
  - `GET /api/news/{id}/`
  - `POST /api/news/`
  - `PATCH /api/news/{id}/`
  - `DELETE /api/news/{id}/`
- Chot role matrix:
  - Anonymous: chi xem bai `is_published=true`.
  - User authenticated thuong: xem bai public + bai do chinh minh tao.
  - Staff/Superuser: xem toan bo.
  - POST: staff/superuser.
  - PATCH/DELETE: author hoac superuser.
- Chot policy view count:
  - Tang 1 moi lan GET detail hop le.
  - Khong tang neu bai khong truy cap duoc.
- Chuan hoa response:
  - List su dung 1 shape duy nhat (uu tien paginated DRF).
  - Detail/create/update tra object News nhat quan.
  - Delete tra status code + body nhat quan theo contract chot.
- Bo sung test cho:
  - list/detail visibility theo role.
  - create/update/delete permission matrix.
  - view count behavior.
  - payload validation.

### Frontend

- Dong bo `FE/src/lib/newsApi.ts` theo contract backend da chot.
- Dong bo `FE/src/pages/News.tsx`:
  - Du lieu API la nguon chinh cho featured + latest list.
  - Fallback mock chi khi API fail hoac empty theo rule ro rang.
  - Loai bo cast `any` trong luong mapping News.
- Bao dam trang News khong runtime crash khi field optional null/thieu.

## Out of scope

- Thiet ke lai toan bo UI/brand trang News.
- Xay CMS/editor noi dung day du.
- Refactor lon module ngoai `news`.
- SEO full-scope (schema/meta/ISR) ngoai contract News.

## Done criteria

1. Co `news-contract-mapping.md` chot contract truoc/sau thay doi.
2. Backend role matrix pass dung theo rule da chot.
3. Khong lo bai unpublished cho doi tuong khong hop le.
4. FE News render on dinh tu API that, fallback mock dung dieu kien.
5. Test backend `news` pass cho matrix quyen + validation + view count.
6. FE build pass; smoke test trang News pass.
7. Co `news-regression-checklist.md` va da danh dau pass/fail.
8. `tasks-manager/review/REVIEW.md` duoc cap nhat day du.

## 4 cong kiem tra bat buoc

### Gate 1 - Logic

- Flow list/detail/create/update/delete khong mau thuan.
- Query scope va response shape nhat quan.

### Gate 2 - Nghiep vu

- Hanh vi theo role matrix dung nhu da chot.
- Publish/unpublish va view count dung expectation.

### Gate 3 - Security

- Mutate endpoint bat buoc auth + authz dung role.
- Chan IDOR/object-level access sai quyen.
- Khong leak draft/unpublished cho public.

### Gate 4 - Test chay thuc te

- Backend command verify pass (check, makemigrations --check, test news).
- FE build/test smoke pass o trang News.

## Deliverables

- `tasks-manager/plan/plan-005.md`
- `tasks-manager/task/plan-005/tasks.md`
- `tasks-manager/task/plan-005/news-contract-mapping.md`
- `tasks-manager/task/plan-005/news-regression-checklist.md`
- `tasks-manager/review/REVIEW.md` (cap nhat ket qua thuc thi)


