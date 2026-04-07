import api, { tokenStorage } from './api';

// ─── Types ────────────────────────────────────────────────────────────────────

/** Payload gửi lên khi Login (backend dùng username field) */
export interface LoginPayload {
  username: string;   // User nhập username hoặc email, đều gửi ở đây
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
}

export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
  new_password_confirm: string;
}

/** User trả về trong login response */
export interface LoginUser {
  id: number;
  username: string;
  email: string;
  full_name: string;
}

/** Profile đầy đủ từ GET /api/auth/users/me/ */
export interface UserProfile {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  avatar: string | null;
  address: string | null;
  bio: string | null;
}

export interface UpdateProfilePayload {
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  bio?: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: LoginUser;
}

// ─── Auth API ─────────────────────────────────────────────────────────────────

/** Đăng nhập, trả về token + user, tự lưu token vào localStorage */
export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>('/api/auth/login/', payload);
  tokenStorage.setTokens(data.access, data.refresh);
  return data;
};

/** Đăng ký tài khoản mới */
export const register = async (payload: RegisterPayload) => {
  const { data } = await api.post('/api/auth/register/', payload);
  return data;
};

/** Đăng xuất, gửi refresh token lên BE để blacklist, xóa token local */
export const logout = async () => {
  const refresh = tokenStorage.getRefresh();
  if (refresh) {
    try {
      await api.post('/api/auth/logout/', { refresh });
    } catch {
      // Bỏ qua lỗi nếu token đã hết hạn
    }
  }
  tokenStorage.clear();
};

/** Lấy thông tin profile user hiện tại */
export const getMe = async (): Promise<UserProfile> => {
  const { data } = await api.get<UserProfile>('/api/auth/users/me/');
  return data;
};

/** Cập nhật profile (multipart nếu có ảnh) */
export const updateProfile = async (payload: FormData | UpdateProfilePayload) => {
  const isFormData = payload instanceof FormData;
  const { data } = await api.patch('/api/auth/users/me/', payload, {
    headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
  });
  return data as UserProfile;
};

/** Đổi mật khẩu */
export const changePassword = async (payload: ChangePasswordPayload) => {
  const { data } = await api.post('/api/auth/users/change-password/', payload);
  return data;
};

/** Kiểm tra xem user đang đăng nhập không (dựa vào access token local) */
export const isAuthenticated = (): boolean => {
  return !!tokenStorage.getAccess();
};
