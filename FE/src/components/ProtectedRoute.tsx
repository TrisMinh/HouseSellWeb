import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireVerifiedSeller?: boolean;
}

/**
 * Bọc quanh các Route cần đăng nhập.
 * Nếu chưa đăng nhập → redirect về /login (và nhớ URL hiện tại để quay lại).
 * Nếu đang load → hiện spinner.
 */
const ProtectedRoute = ({ children, requireVerifiedSeller = false }: ProtectedRouteProps) => {
  const { isLoggedIn, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900" />
      </div>
    );
  }

  if (!isLoggedIn) {
    // Lưu lại URL muốn vào để sau khi login có thể redirect đúng chỗ
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireVerifiedSeller && !user?.agent_is_verified) {
    return <Navigate to="/profile" state={{ from: location, requiresVerification: true }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
