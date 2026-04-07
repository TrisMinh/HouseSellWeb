import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const DEFAULT_API_ORIGIN = 'http://127.0.0.1:8000';
const rawApiOrigin = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() || DEFAULT_API_ORIGIN;

export const API_ORIGIN = rawApiOrigin.replace(/\/+$/, '');
export const BASE_URL = API_ORIGIN;

const ACCESS_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';

type RetryableRequestConfig = AxiosRequestConfig & { _retry?: boolean };

export const tokenStorage = {
  getAccess: () => localStorage.getItem(ACCESS_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_KEY),
  setTokens: (access: string, refresh: string) => {
    localStorage.setItem(ACCESS_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
  },
  setAccess: (access: string) => localStorage.setItem(ACCESS_KEY, access),
  clear: () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};

const api = axios.create({
  baseURL: API_ORIGIN,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = tokenStorage.getAccess();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (error: unknown) => void }> = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((pending) => {
    if (token) {
      pending.resolve(token);
    } else {
      pending.reject(error);
    }
  });
  failedQueue = [];
};

const redirectToLogin = () => {
  if (window.location.pathname !== '/login') {
    window.location.href = '/login';
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = (error.config || {}) as RetryableRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      const refresh = tokenStorage.getRefresh();

      if (!refresh) {
        tokenStorage.clear();
        redirectToLogin();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post<{ access: string }>(`${API_ORIGIN}/api/auth/token/refresh/`, {
          refresh,
        });

        const newAccess = data.access;
        tokenStorage.setAccess(newAccess);
        processQueue(null, newAccess);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        tokenStorage.clear();
        redirectToLogin();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
