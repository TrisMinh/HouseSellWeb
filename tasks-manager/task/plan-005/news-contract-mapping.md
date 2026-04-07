# News Contract Mapping - Plan 005

## 1) Contract tu Guide V3 (nguon chuan)

### Base path
- `/api/news/`

### Endpoints

| Method | Endpoint | Mo ta | Auth |
|---|---|---|---|
| GET | `/api/news/` | Danh sach bai viet | Public |
| GET | `/api/news/{id}/` | Chi tiet bai viet | Public (chi bai duoc phep xem) |
| POST | `/api/news/` | Tao bai viet moi | Bat buoc |
| PATCH | `/api/news/{id}/` | Cap nhat bai viet | Bat buoc |
| DELETE | `/api/news/{id}/` | Xoa bai viet | Bat buoc |

## 2) Baseline code truoc hardening (thoi diem plan-005)

### Diem da dung
- Da co du endpoint list/detail/create/update/delete.
- Da co model `News` co `is_published`, `views_count`, `author`.
- Da co service/repository layer, khong de logic 100% trong view.
- Da co actor scope repository (anonymous/user/staff) cho list/detail.

### Gap phat hien
- `GET /api/news/` hien tai dang tra published-only cho tat ca role o `NewsListView.get_queryset()`.
  - Chua dung matrix da chot cho authenticated user (published + own drafts).
- View va repository co overlap role scope (de lech logic ve sau).
- Serializer chua co validation rule ro cho title/content rong qua nguong nghiep vu.
- Response shape list chua chot 1 kieu duy nhat giua BE/FE.
- Test module `news` moi cover co ban (public list + create role), chua du matrix quyen + view count + detail scope.

## 3) Contract chot sau Plan 005 (target)

### 3.1 Role matrix

| Actor | GET list | GET detail bai public | GET detail bai draft cua minh | GET detail bai draft nguoi khac | POST | PATCH/DELETE |
|---|---|---|---|---|---|---|
| Anonymous | Duoc | Duoc | Khong | Khong | Khong | Khong |
| User authenticated | Duoc (public + own draft) | Duoc | Duoc | Khong | Khong | Chi bai cua minh |
| Staff | Duoc (tat ca) | Duoc | Duoc | Duoc | Duoc | Chi bai cua minh (hoac superuser) |
| Superuser | Duoc (tat ca) | Duoc | Duoc | Duoc | Duoc | Duoc |

Ghi chu:
- Quy tac mutate duoc enforce 2 lop: permission class + service object-level check.
- Neu user khong co quyen xem object detail -> uu tien tra `404` de tranh object enumeration.

### 3.2 Endpoint matrix va response shape

| Method | Endpoint | Request | Response | Status code |
|---|---|---|---|---|
| GET | `/api/news/` | Query optional (`page`, `page_size`) | `NewsListResponse` (chot 1 shape) | `200` |
| GET | `/api/news/{id}/` | none | `NewsItem` | `200` |
| POST | `/api/news/` | `CreateNewsPayload` (`multipart/form-data` hoac `application/json`) | `NewsItem` | `201` |
| PATCH | `/api/news/{id}/` | `UpdateNewsPayload` | `NewsItem` | `200` |
| DELETE | `/api/news/{id}/` | none | `{ "message": "..." }` | `200` |

### 3.3 List response shape (chon 1 kieu)

Target chot: paginated shape

```json
{
  "count": 120,
  "next": "http://localhost:8000/api/news/?page=2",
  "previous": null,
  "results": [
    {
      "id": 10,
      "title": "...",
      "content": "...",
      "thumbnail": "http://localhost:8000/media/news/2026/04/a.jpg",
      "author": 3,
      "author_name": "editor01",
      "author_fullname": "Editor One",
      "views_count": 26,
      "is_published": true,
      "created_at": "2026-04-07T05:10:00Z",
      "updated_at": "2026-04-07T05:20:00Z"
    }
  ]
}
```

Neu chua chot paginated o backend, can ghi ro trong release note va FE van support mode tam `NewsItem[]` trong giai doan chuyen tiep.

### 3.4 Payload contract

#### Create payload

```json
{
  "title": "Vietnam property market update",
  "content": "Full article content...",
  "is_published": true
}
```

#### Update payload (PATCH)

```json
{
  "title": "Updated title",
  "content": "Updated content",
  "is_published": false
}
```

### 3.5 Validation rules bat buoc

- `title`: required, not blank, max theo model, trim whitespace.
- `content`: required, not blank.
- `is_published`: boolean.
- `thumbnail`: optional; neu co, phai la file hop le.

### 3.6 View count policy

- `views_count` tang 1 khi `GET /api/news/{id}/` thanh cong va user co quyen xem bai.
- Khong tang neu request fail (`404/403`).
- `views_count` la read-only field trong API mutate.

### 3.7 Error contract (toi thieu)

| Tinh huong | Status | Shape toi thieu |
|---|---|---|
| Chua dang nhap mutate | 401/403 | `{ "detail": "..." }` |
| Trai quyen object-level | 403 hoac 404 theo policy | `{ "detail": "..." }` |
| Payload invalid | 400 | `{ "field": ["..."] }` |
| Object khong ton tai/khong truy cap duoc | 404 | `{ "detail": "..." }` |

## 4) FE sync points bat buoc

- `FE/src/lib/newsApi.ts`
  - Chot 1 kieu parse list (target paginated).
  - Type `NewsItem` khop serializer output.
- `FE/src/pages/News.tsx`
  - Featured + latest list lay tu API thay vi mock la nguon chinh.
  - Fallback mock chi khi API fail/empty theo rule ro rang.
  - Bo cast `any` o `NewsCard` mapping.

## 5) Mapping task -> contract sections

| Task | Noi dung contract lien quan |
|---|---|
| T001-T003 | Chot endpoint, role matrix, response shape |
| T005-T008 | Enforce contract o serializer/repository/service/view |
| T009 | Security object-level + anti-IDOR |
| T010-T012 | Verify contract bang test backend |
| T013-T015 | Dong bo FE theo contract + smoke |

## 6) Tieu chi pass contract mapping

- Co bang "baseline -> target" ro tung endpoint.
- Co role matrix day du va khong mau thuan.
- Co payload/response examples cho FE implement.
- Co policy view count va error contract.

## 7) Trang thai sau khi trien khai (2026-04-07)

- `GET /api/news/` da dung actor scope theo role va da paginated.
- `GET /api/news/{id}/` da dung actor scope; bai khong truy cap duoc tra `404`.
- `POST /api/news/` chi staff/superuser; service co defense-in-depth role check.
- `PATCH/DELETE /api/news/{id}/` dung object-level rule: author hoac superuser.
- `views_count` tang khi GET detail thanh cong, khong tang o request fail.
- FE `newsApi.ts` da support response list paginated.
- FE `News.tsx` da bo cast `any` o luong mapping News card va parse list response an toan.
