# Media Contract Mapping - Plan 008 (V8)

## Muc tieu

Chot contract upload/delete/serve image cho `properties` de BE-FE dong bo theo phase V8.

## Guide baseline (backend_guide_ver3)

- `MEDIA_URL` + `MEDIA_ROOT` phai duoc cau hinh.
- Upload anh trong Property phai duoc ho tro.
- URL phuc vu anh phai duoc expose tu backend.

## Runtime truoc V8 (as-is)

- Da co:
  - `MEDIA_URL = '/media/'`
  - `MEDIA_ROOT = BASE_DIR / 'media'`
  - `core/urls.py` co `static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)`.
- Da co endpoint:
  - `POST /api/properties/<id>/images/` (owner only)
  - `DELETE /api/properties/images/<id>/` (owner only)
- FE da co helper upload/delete:
  - `uploadPropertyImages(propertyId, files)`
  - `deletePropertyImage(imageId)`
- Gap:
  - Chua co upload policy chat cho type/size/count.
  - FE `AddProperty`/`ManageProperty` van mock-heavy, chua dung API media xuyen suot.

## Contract V8 sau khi chot

### 1) Upload image

- Method: `POST /api/properties/<property_id>/images/`
- Auth: `Bearer` required.
- Permission: owner cua property (hoac staff qua owner scope workflow).
- Content-Type: `multipart/form-data`
- Form fields:
  - `images`: `File[]` (bat buoc, >= 1)
  - `caption`: `string` (optional, max 200 chars)
  - `is_primary`: `boolean|string` (optional)
  - `order`: `number|string` (optional, >= 0)
- Success `201`:
```json
[
  {
    "id": 123,
    "image": "http://127.0.0.1:8000/media/properties/2026/04/example.jpg",
    "caption": "Front facade",
    "is_primary": true,
    "order": 0
  }
]
```
- Validation `400`:
  - type khong hop le
  - file size vuot nguong
  - vuot max files moi lan upload
  - vuot max tong so image / property

### 2) Delete image

- Method: `DELETE /api/properties/images/<image_id>/`
- Auth: `Bearer` required.
- Permission: owner cua image/property.
- Success `200`:
```json
{ "message": "Da xoa anh thanh cong." }
```
- Rule state:
  - Neu xoa image dang `is_primary=true`, backend tu chon image tiep theo lam primary (neu con image).

### 3) Serve image URL

- Media route:
  - `core/urls.py` su dung `static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)`.
- FE render:
  - Dung `getImageUrl(path)` de normalize path tu API.
  - Khong hardcode host media trong page/component.

## Upload policy V8 (settings/env)

- `PROPERTY_IMAGE_ALLOWED_TYPES` (default: `image/jpeg,image/png,image/webp,image/gif`)
- `PROPERTY_IMAGE_MAX_UPLOAD_BYTES` (default: 5MB)
- `PROPERTY_IMAGE_MAX_FILES_PER_UPLOAD` (default: 10)
- `PROPERTY_IMAGE_MAX_FILES_PER_PROPERTY` (default: 30)

## Mapping BE-FE files lien quan

- Backend:
  - `Be/core/settings.py`
  - `Be/properties/services.py`
  - `Be/properties/repositories.py`
  - `Be/properties/views.py`
  - `Be/properties/tests.py`
- Frontend:
  - `FE/src/lib/propertiesApi.ts`
  - `FE/src/pages/AddProperty.tsx`
  - `FE/src/pages/ManageProperty.tsx`
  - `FE/src/pages/Listings.tsx`

## Ket luan contract

- V8 contract da chot theo huong: validate chat o BE, FE dung 1 API layer cho media workflow, va URL image render thong nhat qua helper.
