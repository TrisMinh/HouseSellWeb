# Superuser Runbook - Plan 009 (V9)

## Muc tieu

Tao tai khoan admin cho moi truong van hanh mot cach an toan, khong de lo credential trong repo/log.

## Cach 1 - Interactive (khuyen dung cho local/staging)

```powershell
cd Be
python manage.py createsuperuser
```

He thong se hoi:
- username
- email
- password (nhap an)

## Cach 2 - Non-interactive (CI/bootstrap)

Chi dung khi secret duoc cap qua secret manager/runtime env.

```powershell
cd Be
$env:DJANGO_SUPERUSER_USERNAME="admin"
$env:DJANGO_SUPERUSER_EMAIL="admin@example.com"
$env:DJANGO_SUPERUSER_PASSWORD="<strong-secret-from-vault>"
python manage.py createsuperuser --noinput
```

## Checklist bao mat

- Khong commit password vao `.env`, script, markdown.
- Password phai du do manh (>= 12 ky tu, co chu hoa/thuong/so/ky tu dac biet).
- Sau khi tao account production:
  - dang nhap `/admin/` va doi mat khau neu duoc cap tam.
  - bat MFA neu co plugin/chinh sach he thong.
- Dinh ky audit superuser va bo tai khoan khong con su dung.

## Troubleshooting nhanh

- Loi `That username is already taken`:
  - chon username khac hoac update user cu trong admin shell.
- Loi `command not found`:
  - dam bao dang o thu muc `Be/` va virtualenv da active.
- Loi DB connect:
  - kiem tra bien env DB (`HSW_DB_*`/`DB_*`) va quyen truy cap.
