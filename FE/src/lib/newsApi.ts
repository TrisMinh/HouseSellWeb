import api from './api';
import { PaginatedResponse } from './propertiesApi';

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

export type NewsListResponse = PaginatedResponse<NewsItem> | NewsItem[];

export const getNewsList = async (): Promise<NewsListResponse> => {
  const { data } = await api.get<NewsListResponse>('/api/news/');
  return data;
};

export const getNewsDetail = async (id: number | string): Promise<NewsItem> => {
  const { data } = await api.get<NewsItem>(`/api/news/${id}/`);
  return data;
};

export const createNews = async (payload: FormData | CreateNewsPayload): Promise<NewsItem> => {
  const isFormData = payload instanceof FormData;
  const { data } = await api.post<NewsItem>('/api/news/', payload, {
    headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
  });
  return data;
};

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

export const deleteNews = async (id: number): Promise<{ message: string }> => {
  const { data } = await api.delete<{ message: string }>(`/api/news/${id}/`);
  return data;
};
