# API Contract Mapping - Plan 002

## 1) Endpoint Mapping (BE -> FE)

| Module | Method | Endpoint | Auth | FE dùng |
|---|---|---|---|---|
| Auth | POST | `/api/auth/register/` | Không | `authApi.register` |
| Auth | POST | `/api/auth/login/` | Không | `authApi.login` |
| Auth | POST | `/api/auth/logout/` | Có | `authApi.logout` |
| Auth | POST | `/api/auth/token/refresh/` | Không | `api.ts` interceptor |
| Auth | GET/PATCH | `/api/auth/users/me/` | Có | `authApi.getMe`, `authApi.updateProfile` |
| Auth | POST | `/api/auth/users/change-password/` | Có | `authApi.changePassword` |
| Properties | GET/POST | `/api/properties/` | GET: Không, POST: Có | `propertiesApi.getProperties`, `propertiesApi.createProperty` |
| Properties | GET/PUT/PATCH/DELETE | `/api/properties/{id}/` | GET: Không, mutate: Có | `propertiesApi.getProperty`, `propertiesApi.updateProperty`, `propertiesApi.deleteProperty` |
| Properties | GET | `/api/properties/my/` | Có | `propertiesApi.getMyProperties` |
| Properties | POST | `/api/properties/{id}/images/` | Có | `propertiesApi.uploadPropertyImages` |
| Properties | DELETE | `/api/properties/images/{id}/` | Có | `propertiesApi.deletePropertyImage` |
| Properties | GET | `/api/properties/favorites/` | Có | `propertiesApi.getFavorites` |
| Properties | POST | `/api/properties/{id}/favorite/` | Có | `propertiesApi.toggleFavorite` |
| Appointments | GET/POST | `/api/appointments/` | Có | `appointmentsApi.getMyAppointments`, `appointmentsApi.createAppointment` |
| Appointments | GET | `/api/appointments/owner/` | Có | `appointmentsApi.getOwnerAppointments` |
| Appointments | GET/DELETE | `/api/appointments/{id}/` | Có | `appointmentsApi.getAppointmentDetails`, `appointmentsApi.cancelAppointment` |
| Appointments | PATCH | `/api/appointments/{id}/status/` | Có | `appointmentsApi.updateAppointmentStatus` |
| News | GET/POST | `/api/news/` | GET: Không, POST: Staff | `newsApi.getNewsList`, `newsApi.createNews` |
| News | GET/PATCH/DELETE | `/api/news/{id}/` | GET: Không, mutate: Có quyền | `newsApi.getNewsDetail`, `newsApi.updateNews`, `newsApi.deleteNews` |
| Prediction | POST | `/api/prediction/` | Không | `PricePrediction.tsx` |

## 2) Response Field Mapping chính

## 2.1 Properties - List (`GET /api/properties/`)

| Field | Kiểu | FE dùng |
|---|---|---|
| `id` | number | id card/detail |
| `title` | string | tiêu đề |
| `property_type` | string | loại BĐS |
| `listing_type` | string | bán/thuê |
| `status` | string | trạng thái |
| `price` | number | giá |
| `area` | number | diện tích |
| `bedrooms` | number/null | số phòng ngủ |
| `bathrooms` | number/null | số phòng tắm |
| `city`, `district`, `address` | string | địa chỉ |
| `owner_name` | string | hiển thị chủ đăng |
| `primary_image` | string/null | ảnh đại diện |
| `views_count` | number | lượt xem |
| `is_featured` | boolean | nổi bật |
| `created_at` | string(datetime) | ngày đăng |

## 2.2 Properties - Detail (`GET /api/properties/{id}/`)

Kế thừa các field list + bổ sung:

| Field | Kiểu |
|---|---|
| `description` | string |
| `floors` | number/null |
| `ward` | string/null |
| `latitude`, `longitude` | number/null |
| `images` | `[{ id, image, caption, is_primary, order }]` |
| `is_favorited` | boolean |
| `owner` | number |
| `owner_username`, `owner_name` | string |
| `updated_at` | string(datetime) |

## 2.3 Favorite Toggle (`POST /api/properties/{id}/favorite/`)

| Field | Kiểu |
|---|---|
| `message` | string |
| `is_favorited` | boolean |

## 2.4 Appointments

### List/Detail item

| Field | Kiểu |
|---|---|
| `id` | number |
| `property` | number |
| `property_title`, `property_owner`, `property_address` | string |
| `date` | string(date) |
| `time` | string(time) |
| `name`, `phone`, `message` | string |
| `status` | `pending \| confirmed \| rejected \| completed \| cancelled` |
| `created_at` | string(datetime) |

### Update status (`PATCH /api/appointments/{id}/status/`)

| Field | Kiểu |
|---|---|
| `message` | string |
| `data` | appointment object |

## 2.5 News

| Field | Kiểu |
|---|---|
| `id` | number |
| `title`, `content` | string |
| `thumbnail` | string/null |
| `author` | number |
| `author_name`, `author_fullname` | string |
| `views_count` | number |
| `is_published` | boolean |
| `created_at`, `updated_at` | string(datetime) |

## 2.6 Prediction (`POST /api/prediction/`)

### Request body

| Field | Kiểu | Bắt buộc |
|---|---|---|
| `latitude`, `longitude` | number | Không (có default) |
| `total_rooms` | number | Không (có default) |
| `total_bedrooms` | number | Không (có default) |
| `housing_median_age` | number | Không (có default) |
| `population` | number | Không (có default) |
| `households` | number (>0) | Không (có default) |
| `median_income` | number | Không (có default) |
| `ocean_proximity` | enum | Không (có default) |

### Response body

| Field | Kiểu |
|---|---|
| `estimated_price` | number |
| `price_min` | number |
| `price_max` | number |
| `confidence` | number |
| `price_per_m2` | number |

## 3) Rủi ro contract hiện tại

1. Một số page FE (`Listings`, `PropertyDetail`, `AppointmentDetail`) vẫn dùng mock data, chưa gọi API thực tế.
2. Nếu chuyển page mock sang live API cần map lại UI field theo `propertiesApi` và `appointmentsApi`.
3. BE hiện chưa cấu hình pagination mặc định; FE đã xử lý cả hai dạng `array` và `paginated object`.
