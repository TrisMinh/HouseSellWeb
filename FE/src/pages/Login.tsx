
import { useState } from 'react';
import { Eye, EyeOff, Lock, CheckCircle2, Shield } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '@/assets/images/logo.png';
import { useAuth } from '@/contexts/AuthContext';
import { isAxiosError } from 'axios';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect về trang trước đó nếu có, không thì về trang chủ
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) return;

    setIsLoading(true);
    setError('');
    try {
      await login({ username: username.trim(), password });
      navigate(from, { replace: true });
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        const detail = err.response?.data?.detail
          || err.response?.data?.non_field_errors?.[0]
          || err.response?.data?.error
          || 'Đăng nhập thất bại. Vui lòng thử lại.';
        setError(detail);
      } else {
        setError('Đăng nhập thất bại. Vui lòng thử lại.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#F6F7F9]">
      {/* Left Visual Panel (60%) */}
      <div className="hidden lg:flex w-[60%] relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Modern Architecture" 
            className="w-full h-full object-cover opacity-50 block"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-end p-16 text-white h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-4 leading-tight text-white">Welcome back</h1>
            <p className="text-lg text-slate-300 font-light">
              Find verified listings, trusted agents, and premium projects.
              <br />Experience the future of real estate trading.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Login Card (40%) */}
      <div className="flex-1 flex flex-col justify-center items-center p-4 lg:p-8 relative">
        <motion.div 
          className="w-full max-w-[460px] bg-white rounded-2xl shadow-xl p-8 md:p-10 relative overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Decorative top accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-blue-300" />

          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
               <img src={logo} alt="Blue Sky Logo" className="h-32 w-auto object-contain scale-125" />
             </Link>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Sign in to your account</h2>
            <p className="text-slate-500">Access your personalized dashboard</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <motion.form 
            className="space-y-5"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            onSubmit={handleLogin}
          >
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Tên đăng nhập
              </label>
              <motion.input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all outline-none text-slate-900 placeholder:text-slate-400"
                placeholder="Nhập tên đăng nhập"
                autoComplete="username"
                required
                whileFocus={{ scale: 1.01 }}
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Mật khẩu</label>
              <div className="relative">
                <motion.input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all outline-none text-slate-900 placeholder:text-slate-400"
                  placeholder="Nhập mật khẩu"
                  autoComplete="current-password"
                  required
                  whileFocus={{ scale: 1.01 }}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            <motion.div className="flex items-center justify-between" variants={itemVariants}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-accent focus:ring-accent" 
                />
                <span className="text-sm text-slate-600">Ghi nhớ đăng nhập</span>
              </label>
              <a href="#" className="text-sm font-medium text-accent hover:text-accent-hover transition-colors">
                Quên mật khẩu?
              </a>
            </motion.div>

            <motion.button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg shadow-lg shadow-slate-900/20 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              variants={itemVariants}
              whileHover={!isLoading ? { scale: 1.02, y: -2 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Đang đăng nhập...
                </span>
              ) : 'Đăng nhập'}
            </motion.button>
          </motion.form>

          {/* Footer */}
          <div className="mt-8 text-center text-sm">
            <span className="text-slate-500">Chưa có tài khoản? </span>
            <Link to="/register" className="font-semibold text-accent hover:text-accent-hover transition-colors">
              Đăng ký ngay
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex justify-center gap-6 border-t border-slate-100 pt-6">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
               <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
               <span>Tin đăng đã xác minh</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
               <Shield className="w-3.5 h-3.5 text-blue-500" />
               <span>Đăng nhập an toàn</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
               <Lock className="w-3.5 h-3.5 text-slate-400" />
               <span>Bảo mật thông tin</span>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default Login;
