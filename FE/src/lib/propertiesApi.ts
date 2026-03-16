import api, { BASE_URL } from './api';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface PropertyImage {
  id: number;
  image: string; // relative path, thêm BASE_URL để dùng
  caption: string | null;
}

export interface Property {
  id: number;
  title: string;
  description: string;
  property_type: 'house' | 'apartment' | 'land' | 'villa' | 'other';
  listing_type: 'sale' | 'rent';
  price: number;
  area: number;
  bedrooms: number | null;
  bathrooms: number | null;
  floors: number | null;
  address: string;
  ward: string | null;
  district: string | null;
  city: string;
  latitude: number | null;
  longitude: number | null;
  status: 'active' | 'inactive' | 'sold' | 'rented';
  is_featured: boolean;
  owner: number;
  owner_name: string;
  owner_phone: string | null;
  images: PropertyImage[];
  is_favorited: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface PropertyFilters {
  search?: string;
  property_type?: string;
  listing_type?: string;
  city?: string;
  district?: string;
  min_price?: number;
  max_price?: number;
  min_area?: number;
  max_area?: number;
  bedrooms?: number;
  status?: string;
  is_featured?: boolean;
  ordering?: string;
  page?: number;
  page_size?: number;
}

export interface CreatePropertyPayload {
  title: string;
  description: string;
  property_type: string;
  listing_type: string;
  price: number;
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  floors?: number;
  address: string;
  ward?: string;
  district?: string;
  city: string;
  latitude?: number;
  longitude?: number;
}

// ─── Helper ───────────────────────────────────────────────────────────────────
/** Trả về URL đầy đủ cho ảnh BĐS */
export const getImageUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${BASE_URL}${path}`;
};

// ─── Properties API ───────────────────────────────────────────────────────────

/** Lấy danh sách BĐS (có filter, phân trang) */
export const getProperties = async (
  filters?: PropertyFilters
): Promise<PaginatedResponse<Property>> => {
  const { data } = await api.get<PaginatedResponse<Property>>('/api/properties/', {
    params: filters,
  });
  return data;
};

/** Lấy chi tiết 1 BĐS */
export const getProperty = async (id: number): Promise<Property> => {
  const { data } = await api.get<Property>(`/api/properties/${id}/`);
  return data;
};

/** Lấy BĐS của user đang đăng nhập */
export const getMyProperties = async (
  filters?: PropertyFilters
): Promise<PaginatedResponse<Property>> => {
  const { data } = await api.get<PaginatedResponse<Property>>('/api/properties/my/', {
    params: filters,
  });
  return data;
};

/** Tạo BĐS mới */
export const createProperty = async (
  payload: CreatePropertyPayload
): Promise<Property> => {
  const { data } = await api.post<Property>('/api/properties/', payload);
  return data;
};

/** Cập nhật BĐS */
export const updateProperty = async (
  id: number,
  payload: Partial<CreatePropertyPayload>
): Promise<Property> => {
  const { data } = await api.patch<Property>(`/api/properties/${id}/`, payload);
  return data;
};

/** Xóa BĐS */
export const deleteProperty = async (id: number): Promise<void> => {
  await api.delete(`/api/properties/${id}/`);
};

/** Upload ảnh cho BĐS */
export const uploadPropertyImages = async (
  propertyId: number,
  files: File[]
): Promise<PropertyImage[]> => {
  const formData = new FormData();
  files.forEach((file) => formData.append('images', file));
  const { data } = await api.post<PropertyImage[]>(
    `/api/properties/${propertyId}/images/`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return data;
};

/** Xóa 1 ảnh BĐS */
export const deletePropertyImage = async (imageId: number): Promise<void> => {
  await api.delete(`/api/properties/images/${imageId}/`);
};

/** Lấy danh sách BĐS yêu thích */
export const getFavorites = async (): Promise<PaginatedResponse<Property>> => {
  const { data } = await api.get<PaginatedResponse<Property>>('/api/properties/favorites/');
  return data;
};

/** Toggle yêu thích BĐS (thêm hoặc bỏ) */
export const toggleFavorite = async (
  propertyId: number
): Promise<{ is_favorited: boolean }> => {
  const { data } = await api.post<{ is_favorited: boolean }>(
    `/api/properties/${propertyId}/favorite/`
  );
  return data;
};
