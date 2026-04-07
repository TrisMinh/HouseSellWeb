# Tasks chi tiet - Plan 005 (V5 App News)

## Quy tac thuc thi

- Moi task phai atomic, co input/output ro rang.
- Moi task gan 1 skill chinh.
- Moi task phai co dependency va rui ro chinh.
- Moi task bat buoc qua 4 gate: Logic, Nghiep vu, Security, Test.
- Khong chuyen phase neu task dependency chua pass.

## Dependency map

- Phase A -> bat buoc truoc khi sua code.
- Phase B (BE) -> can xong contract chot o Phase A.
- Phase C (FE) -> can contract BE da chot va backend verify co ban.
- Phase D -> dong bo artifact + review memory sau verify.

## Phase A - Preflight & Contract

### [x] T000 - Preflight theo rule
- Skill chinh: `writing-plans`
- Muc tieu: xac nhan da doc rule/guide/review va pham vi cong viec.
- Input:
  - `tasks-manager/review/REVIEW.md`
  - `tasks-manager/guilde/backend_guide_ver3.md`
  - `tasks-manager/.claude/rules/*.md`
- Output: danh sach preflight da xac nhan trong note thuc thi.
- Phu thuoc: none.
- Rui ro chinh: bo sot rule dan den lech quy trinh.
- Gate:
  - Logic: preflight checklist day du.
  - Nghiep vu: pham vi V5 News duoc chot lai.
  - Security: rule auth/authz duoc nhac lai truoc khi code.
  - Test: co bang chung da doc/doi chieu tai lieu.

### [x] T001 - Trich contract News tu guide v3
- Skill chinh: `writing-plans`
- Muc tieu: tao baseline contract API News theo guide.
- Input:
  - `tasks-manager/guilde/backend_guide_ver3.md`
- Output:
  - Tao `tasks-manager/task/plan-005/news-contract-mapping.md` (ban dau).
- Phu thuoc: T000.
- Rui ro chinh: trich sai endpoint/payload tu guide.
- Gate:
  - Logic: du 5 endpoint list/detail/create/update/delete.
  - Nghiep vu: co mo ta role public/staff.
  - Security: endpoint mutate duoc danh dau auth.
  - Test: doi chieu truc tiep voi guide.

### [x] T002 - Gap analysis contract vs code hien tai (BE + FE)
- Skill chinh: `software-architecture`
- Muc tieu: xac dinh ro diem sai/thieu truoc khi sua.
- Input:
  - `Be/news/models.py`
  - `Be/news/serializers.py`
  - `Be/news/repositories.py`
  - `Be/news/services.py`
  - `Be/news/views.py`
  - `Be/news/urls.py`
  - `FE/src/lib/newsApi.ts`
  - `FE/src/pages/News.tsx`
  - `tasks-manager/task/plan-005/news-contract-mapping.md`
- Output:
  - Cap nhat `news-contract-mapping.md` voi bang gap truoc/sau.
- Phu thuoc: T001.
- Rui ro chinh: bo sot mismatch response shape va role matrix.
- Gate:
  - Logic: moi gap co nguyen nhan + muc sua.
  - Nghiep vu: gap gan voi use-case that.
  - Security: gap auth/authz/object access duoc highlight.
  - Test: gap list duoc dung lam baseline verify.

### [x] T003 - Chot contract cuoi cho V5 News
- Skill chinh: `software-architecture`
- Muc tieu: khoa cac diem mo ho (role matrix, pagination shape, delete response).
- Input:
  - `news-contract-mapping.md` ban sau T002.
- Output:
  - `news-contract-mapping.md` phien ban chot de implement.
- Phu thuoc: T002.
- Rui ro chinh: contract con mo ho lam BE/FE thuc thi lech.
- Gate:
  - Logic: contract khong mau thuan giua endpoint.
  - Nghiep vu: role matrix ro tung hanh dong.
  - Security: object-level access duoc mo ta ro.
  - Test: contract co tieu chi assertion cho test.

### [x] T004 - Tao khung regression checklist cho News
- Skill chinh: `writing-plans`
- Muc tieu: tao checklist smoke de dung xuyen suot thuc thi.
- Input:
  - Contract da chot o T003.
- Output:
  - Tao `tasks-manager/task/plan-005/news-regression-checklist.md` (ban khung).
- Phu thuoc: T003.
- Rui ro chinh: checklist thieu flow quan trong.
- Gate:
  - Logic: bao phu list/detail/create/update/delete.
  - Nghiep vu: gom flow public + author + staff/admin.
  - Security: co item check unpublished leakage.
  - Test: checklist co cot pass/fail + evidence.

## Phase B - Backend News Hardening

### [x] T005 - Chuan hoa serializer/model contract
- Skill chinh: `python-pro`
- Muc tieu: dam bao validation va output shape on dinh cho FE.
- Input:
  - `Be/news/models.py`
  - `Be/news/serializers.py`
  - Contract T003.
- Output:
  - Cap nhat serializer/model (neu can) + migration (neu co doi schema).
- Phu thuoc: T003.
- Rui ro chinh: thay doi schema lam vo du lieu/migration.
- Gate:
  - Logic: read_only/write_only/required dung theo contract.
  - Nghiep vu: field du cho News page.
  - Security: khong cho ghi field cam.
  - Test: payload invalid tra loi dung format.

### [x] T006 - Chuan hoa repository actor scope (hoan tat T005 da lam)
- Skill chinh: `django-pro`
- Muc tieu: tap trung query scope theo role, khong duplicate.
- Input:
  - `Be/news/repositories.py`
  - Contract T003.
- Output:
  - Repository final voi actor scope cho list + detail.
- Phu thuoc: T005.
- Rui ro chinh: scope sai dan den lo bai draft.
- Gate:
  - Logic: query nhat quan, khong side-effect.
  - Nghiep vu: anonymous/user/staff nhin dung tap du lieu.
  - Security: unpublished khong lo sai doi tuong.
  - Test: test scope theo role pass.

### [x] T007 - Chuan hoa service layer (create/update/delete/view_count)
- Skill chinh: `python-pro`
- Muc tieu: dat business rule vao service, view mong.
- Input:
  - `Be/news/services.py`
  - Contract T003.
- Output:
  - Service final cho mutate + view_count policy.
- Phu thuoc: T006.
- Rui ro chinh: rule quyen trong service xung dot voi permission view.
- Gate:
  - Logic: flow create/update/delete/view_count nhat quan.
  - Nghiep vu: patch/delete dung role matrix.
  - Security: chan sua/xoa trai quyen.
  - Test: co case pass/fail cho tung nhanh quyen.

### [x] T008 - Chuan hoa views/permissions/urls theo contract
- Skill chinh: `django-pro`
- Muc tieu: enforce contract o endpoint level va response/status code.
- Input:
  - `Be/news/views.py`
  - `Be/news/urls.py`
  - `Be/core/permissions.py` (neu can)
  - Contract T003.
- Output:
  - API News dong nhat list/detail/mutate.
- Phu thuoc: T007.
- Rui ro chinh: sai queryset list cho authenticated user.
- Gate:
  - Logic: route -> action mapping ro rang.
  - Nghiep vu: list/detail dung actor scope da chot.
  - Security: mutate endpoint co auth/authz dung.
  - Test: route-level integration pass.

### [x] T009 - Security review object-level access cho News
- Skill chinh: `backend-security-coder`
- Muc tieu: kiem tra va khoa IDOR/over-permission.
- Input:
  - `Be/news/views.py`
  - `Be/news/services.py`
  - `Be/news/repositories.py`
- Output:
  - Danh sach diem security da xu ly + code fix (neu co).
- Phu thuoc: T008.
- Rui ro chinh: role check bi dat o sai tang, gay bypass.
- Gate:
  - Logic: khong xung dot giua permission class va service check.
  - Nghiep vu: role matrix khong bi mo rong trai y.
  - Security: unauthorized/forbidden duoc chan chac chan.
  - Test: co case test cho access trai quyen.

### [x] T010 - Viet test list/detail scope + view_count
- Skill chinh: `python-testing-patterns`
- Muc tieu: cover actor visibility va policy view_count.
- Input:
  - `Be/news/tests.py`
  - Contract T003.
- Output:
  - Test cases cho anonymous/user/staff + view_count.
- Phu thuoc: T009.
- Rui ro chinh: test khong cover nhanh edge unpublished.
- Gate:
  - Logic: assert du happy + edge path.
  - Nghiep vu: dung policy publish/unpublish.
  - Security: khong truy cap duoc bai sai role.
  - Test: module test pass.

### [x] T011 - Viet test create/update/delete + validation
- Skill chinh: `python-testing-patterns`
- Muc tieu: cover mutate matrix va payload validation.
- Input:
  - `Be/news/tests.py`
  - Contract T003.
- Output:
  - Test cases cho POST/PATCH/DELETE va invalid payload.
- Phu thuoc: T010.
- Rui ro chinh: bo sot case staff != author hoac superuser path.
- Gate:
  - Logic: assert status code + response shape dung.
  - Nghiep vu: role thao tac dung theo matrix.
  - Security: forbidden/unauthorized case day du.
  - Test: module test pass.

### [x] T012 - Verify backend command cho V5 News
- Skill chinh: `python-testing-patterns`
- Muc tieu: co bang chung runtime + migration + test pass.
- Input:
  - Code backend sau T011.
- Output:
  - Ket qua lenh:
    - `python Be/manage.py check`
    - `python Be/manage.py makemigrations --check --dry-run`
    - `python Be/manage.py test news`
- Phu thuoc: T011.
- Rui ro chinh: env DB local gay false fail.
- Gate:
  - Logic: khong loi config/runtime.
  - Nghiep vu: test nghiep vu pass.
  - Security: test quyen/access pass.
  - Test: ket qua command duoc ghi nhan ro rang.

## Phase C - FE Contract Sync

### [x] T013 - Dong bo `newsApi.ts` theo contract chot
- Skill chinh: `typescript-pro`
- Muc tieu: type/payload/response parser khop backend.
- Input:
  - `FE/src/lib/newsApi.ts`
  - Contract T003.
- Output:
  - API layer News typed ro, xu ly list shape nhat quan.
- Phu thuoc: T012.
- Rui ro chinh: FE parse sai list response khi paginated.
- Gate:
  - Logic: mapping type khong mau thuan contract.
  - Nghiep vu: du field cho News page.
  - Security: xu ly loi API an toan, khong throw vo nghia.
  - Test: smoke call API pass.

### [x] T014 - Dong bo `News.tsx` data-first va bo `any`
- Skill chinh: `typescript-pro`
- Muc tieu: uu tien du lieu API that, fallback mock dung dieu kien.
- Input:
  - `FE/src/pages/News.tsx`
  - API layer sau T013.
- Output:
  - Trang News render on dinh, khong cast `any` trong luong chinh.
- Phu thuoc: T013.
- Rui ro chinh: mapping null/empty gay runtime crash.
- Gate:
  - Logic: featured/list mapping dung cho ca data rong.
  - Nghiep vu: hien thi dung bai API theo role public.
  - Security: khong hien thi data draft qua fallback logic sai.
  - Test: smoke UI trang News pass.

### [x] T015 - Verify FE (build/test) + smoke checklist
- Skill chinh: `software-architecture`
- Muc tieu: xac nhan FE-BE sync on dinh o luong News.
- Input:
  - FE code sau T014.
  - `news-regression-checklist.md`.
- Output:
  - Ket qua:
    - `npm run build`
    - `npm run test` (neu co)
    - smoke flow News theo checklist.
- Phu thuoc: T014.
- Rui ro chinh: loi lint/test legacy ngoai pham vi gay nhieu.
- Gate:
  - Logic: khong runtime error tren News page.
  - Nghiep vu: featured + latest list dung du lieu API.
  - Security: khong lo bai unpublished tren public flow.
  - Test: build/test/smoke co evidence.

## Phase D - Dong artifact & Review Memory

### [x] T016 - Chot artifact va cap nhat review memory
- Skill chinh: `writing-plans`
- Muc tieu: chot tai lieu va luu tri thuc van hanh.
- Input:
  - Ket qua T001-T015.
- Output:
  - Hoan thien:
    - `tasks-manager/task/plan-005/news-contract-mapping.md`
    - `tasks-manager/task/plan-005/news-regression-checklist.md`
    - `tasks-manager/review/REVIEW.md`
- Phu thuoc: T015.
- Rui ro chinh: thieu thong tin verification/rui ro ton dong.
- Gate:
  - Logic: timeline va thay doi ro rang.
  - Nghiep vu: trang thai hoan thanh phan anh dung.
  - Security: risk ton dong duoc ghi minh bach.
  - Test: dinh kem ket qua verify/smoke.



