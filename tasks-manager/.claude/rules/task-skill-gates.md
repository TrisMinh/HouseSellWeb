# Rule: Atomic Task + Skill + Quality Gates

## Muc tieu

Dam bao moi cong viec duoc chia nho, co skill phu hop, va co kiem chung day du truoc khi bao cao.

## Quy tac bat buoc

1. Moi task phai du nho de thuc hien nhanh, co dau vao/dau ra ro rang.
2. Moi task phai gan toi thieu 1 skill phu hop voi dung loai viec.
3. Truoc khi bao cao ket qua, bat buoc di qua 4 cong kiem tra:
   - Logic
   - Nghiep vu
   - Security
   - Test chay thuc te

## Rule bo sung ve hoan tat danh sach task

1. Khong duoc ket thuc session khi con task `PENDING` trong task list dang thuc thi.
2. Phai thuc hien tu tren xuong duoi theo task list, danh dau trang thai ro rang cho tung task.
3. Khong duoc dung o giua va hoi user "co muon lam tiep khong" khi van con task bat buoc chua xong.
4. Neu bi gioi han context/token khi chua xong task list, phai tiep tuc o lan chay tiep theo cho den khi hoan tat.

## Mapping skill toi thieu theo nhom viec

- Lap ke hoach:
  - `writing-plans`
- Backend Django/Python:
  - `django-pro`
  - `python-pro`
  - `backend-dev-guidelines`
- Kiem tra security:
  - `backend-security-coder`
- Kiem tra test:
  - `python-testing-patterns`
- Kiem tra logic/kien truc:
  - `software-architecture`

## Tieu chi pass cho 4 cong

### 1) Logic
- Luong xu ly khong mau thuan.
- Khong tao side-effect sai y do.

### 2) Nghiep vu
- Ket qua dung voi yeu cau business.
- Khong lech quy tac domain da chot.

### 3) Security
- Input duoc validate.
- Auth/Authz dung vai tro.
- Khong lo thong tin nhay cam trong response/log.

### 4) Test chay thuc te
- Co test phu hop voi task.
- Chay test/kiem tra runtime thanh cong truoc khi bao cao.

## Khong duoc bao cao hoan thanh khi

- Chua gan skill cho task.
- Chua qua 1 trong 4 cong kiem tra.
- Chua co bang chung test/check.
- Con task `PENDING` trong pham vi da cam ket thuc hien.
