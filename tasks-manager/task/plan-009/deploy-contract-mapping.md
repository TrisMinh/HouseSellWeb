# Deploy Contract Mapping - Plan 009 (V9)

## Muc tieu

Chot contract "Hoan thien & Deploy" de backend dat trang thai release-ready an toan theo guide V3.

## Guide baseline (backend_guide_ver3)

Phase 9 yeu cau 4 dau viec:

1. Them Admin panel cho tat ca models.
2. Tao superuser (`python manage.py createsuperuser`).
3. Viet tai lieu API tu dong qua Swagger.
4. Review bao mat deploy (`SECRET_KEY`, `DEBUG=False`).

## Runtime truoc V9 (as-is)

- Admin registration:
  - Da co: `Appointment`, `News`.
  - Chua co: `UserProfile`, `Property`, `PropertyImage`, `Favorite`.
  - `prediction` app hien khong co model DB.
- Swagger:
  - Da co route `/swagger/`, `/redoc/`, `/swagger.json`.
  - Prediction view chua khai bao swagger request-body ro rang.
- Deploy security baseline:
  - Da doc env cho `DJANGO_DEBUG`, `DJANGO_SECRET_KEY`, `DJANGO_ALLOWED_HOSTS`.
  - Chua enforce guard deploy-safe khi `DEBUG=False`.
  - Chua co `.env.example` backend de handoff.

## Contract V9 sau khi chot

### 1) Admin Coverage Contract

- Tat ca model domain phai duoc register trong admin site:
  - `accounts.UserProfile`
  - `properties.Property`
  - `properties.PropertyImage`
  - `properties.Favorite`
  - `appointments.Appointment`
  - `news.News`
- Admin list phai co:
  - `list_display`
  - `search_fields`
  - `list_filter`
- `prediction` app duoc danh dau "no-model" (khong co model can register).

### 2) API Docs Contract (Swagger)

- Route docs:
  - `GET /swagger/`
  - `GET /redoc/`
  - `GET /swagger.json`
- Swagger phai co endpoint chinh:
  - `/api/auth/login/`
  - `/api/properties/`
  - `/api/appointments/`
  - `/api/news/`
  - `/api/prediction/`
- Prediction endpoint khai bao request body serializer de QA/FE test de dang.

### 3) Deploy Security Baseline Contract

- `DEBUG` mac dinh local-friendly, nhung deploy (`DEBUG=False`) bat buoc:
  - `DJANGO_SECRET_KEY` khong duoc de default value.
  - `DJANGO_ALLOWED_HOSTS` khong duoc de rong.
- Docs exposure policy:
  - `SWAGGER_PUBLIC` cau hinh qua env.
  - default theo mode (`DEBUG=True` -> public, `DEBUG=False` -> private).

### 4) Superuser Runbook Contract

- Co runbook tao superuser an toan, khong hardcode password trong repo.
- Ho tro 2 mode:
  - interactive `createsuperuser`
  - non-interactive qua env secret runtime.

## Mapping BE files lien quan

- Settings/URLs:
  - `Be/core/settings.py`
  - `Be/core/urls.py`
- Admin modules:
  - `Be/accounts/admin.py`
  - `Be/properties/admin.py`
  - `Be/appointments/admin.py`
  - `Be/news/admin.py`
  - `Be/prediction/admin.py`
- API docs detail:
  - `Be/prediction/views.py`
- Deploy template/runbook:
  - `Be/.env.example`
  - `tasks-manager/task/plan-009/superuser-runbook.md`

## Ket luan contract

V9 chot theo huong: admin day du de van hanh, swagger ro de handoff, va deploy baseline an toan de tranh loi secret/debug khi release.
