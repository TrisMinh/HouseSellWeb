import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  getMe,
  isAuthenticated,
  type LoginPayload,
  type RegisterPayload,
  type UserProfile,
} from '@/lib/authApi';

// ─── Context types ────────────────────────────────────────────────────────────
interface AuthContextType {
  /** User hiện tại, null nếu chưa đăng nhập */
  user: UserProfile | null;
  /** Đang fetch thông tin user lần đầu */
  loading: boolean;
  /** Đã đăng nhập chưa */
  isLoggedIn: boolean;
  /** Đăng nhập: trả về user profile hoặc throw Error */
  login: (payload: LoginPayload) => Promise<UserProfile>;
  /** Đăng xuất */
  logout: () => Promise<void>;
  /** Đăng ký: trả về data hoặc throw Error */
  register: (payload: RegisterPayload) => Promise<unknown>;
  /** Cập nhật user trong context (dùng sau khi update profile) */
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  /** Làm mới thông tin user từ server */
  refreshUser: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user khi app khởi động (nếu đã có token)
  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuthenticated()) {
        setLoading(false);
        return;
      }
      try {
        const me = await getMe();
        setUser(me);
      } catch {
        // Token hết hạn hoặc không hợp lệ → bỏ qua (interceptor đã xử lý logout)
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (payload: LoginPayload): Promise<UserProfile> => {
    // Đăng nhập lấy token rồi fetch profile đầy đủ
    await apiLogin(payload);
    const me = await getMe();
    setUser(me);
    return me;
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  const register = async (payload: RegisterPayload) => {
    return apiRegister(payload);
  };

  const refreshUser = async () => {
    try {
      const me = await getMe();
      setUser(me);
    } catch {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoggedIn: !!user,
        login,
        logout,
        register,
        setUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
/** Dùng trong bất kỳ component nào để truy cập auth state */
export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth phải được dùng bên trong <AuthProvider>');
  }
  return ctx;
};

export default AuthContext;
