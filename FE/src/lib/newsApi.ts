import api from './api';
import { PaginatedResponse } from './propertiesApi';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  thumbnail: string | null;
  author: number;
  author_name: string;
  author_fullname: string;
  views_count: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateNewsPayload {
  title: string;
  content: string;
  is_published?: boolean;
}

// ─── News API ───────────────────────────────────────────────────────────

/** Lấy danh sách danh sách tin tức public */
export const getNewsList = async (): Promise<PaginatedResponse<NewsItem> | NewsItem[]> => {
  const { data } = await api.get('/api/news/');
  return data;
};

/** Lấy chi tiết một bài viết tin tức */
export const getNewsDetail = async (id: number | string): Promise<NewsItem> => {
  const { data } = await api.get<NewsItem>(`/api/news/${id}/`);
  return data;
};

/** Đăng một bài viết mới (Cần đăng nhập / role admin hoặc nhân viên) */
export const createNews = async (payload: FormData | CreateNewsPayload): Promise<NewsItem> => {
  const isFormData = payload instanceof FormData;
  const { data } = await api.post<NewsItem>('/api/news/', payload, {
    headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
  });
  return data;
};

/** Sửa bài viết (của mình hoặc admin sửa) */
export const updateNews = async (
  id: number, 
  payload: FormData | Partial<CreateNewsPayload>
): Promise<NewsItem> => {
   const isFormData = payload instanceof FormData;
   const { data } = await api.patch<NewsItem>(`/api/news/${id}/`, payload, {
    headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
  });
  return data;
};

/** Xóa bài viết */
export const deleteNews = async (id: number): Promise<{ message: string }> => {
  const { data } = await api.delete(`/api/news/${id}/`);
  return data;
};
