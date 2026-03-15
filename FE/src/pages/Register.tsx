import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, CheckCircle2, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '@/assets/images/logo.png';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="flex min-h-screen w-full bg-[#F6F7F9]">
      {/* Left Visual Panel (60%) */}
      <div className="hidden lg:flex w-[60%] relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Modern Luxury Home" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-end p-16 text-white w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-4 leading-tight text-white">Join the Elite</h1>
            <p className="text-lg text-slate-300 font-light">
              Create your account to access exclusive listings and personalized market insights.
              <br />Your journey to the perfect home starts here.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Register Card (40%) */}
      <div className="flex-1 flex flex-col justify-center items-center p-4 lg:p-8 relative">
        <motion.div 
          className="w-full max-w-[500px] bg-white rounded-2xl shadow-xl p-8 md:p-10 relative overflow-hidden"
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
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Create an account</h2>
            <p className="text-slate-500">Start your real estate journey today</p>
          </div>

          {/* Form */}
          <motion.form 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
              <div className="relative">
                <motion.input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-lg border border-slate-200 focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all outline-none text-slate-900 placeholder:text-slate-400"
                  placeholder="John Doe"
                  whileFocus={{ scale: 1.01 }}
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <div className="relative">
                <motion.input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-lg border border-slate-200 focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all outline-none text-slate-900 placeholder:text-slate-400"
                  placeholder="name@example.com"
                  whileFocus={{ scale: 1.01 }}
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <motion.input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-lg border border-slate-200 focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all outline-none text-slate-900 placeholder:text-slate-400"
                  placeholder="Create a password"
                  whileFocus={{ scale: 1.01 }}
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
              <div className="relative">
                <motion.input 
                  type={showPassword ? "text" : "password"} 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-lg border border-slate-200 focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all outline-none text-slate-900 placeholder:text-slate-400"
                  placeholder="Confirm your password"
                  whileFocus={{ scale: 1.01 }}
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </motion.div>

            <motion.div className="flex items-start gap-2 pt-2" variants={itemVariants}>
              <input 
                type="checkbox" 
                id="terms"
                className="mt-1 w-4 h-4 rounded border-slate-300 text-accent focus:ring-accent" 
              />
              <label htmlFor="terms" className="text-sm text-slate-600">
                I agree to the <Link to="/terms" className="text-accent hover:text-accent-hover">Terms of Service</Link> and <Link to="/privacy" className="text-accent hover:text-accent-hover">Privacy Policy</Link>
              </label>
            </motion.div>

            <motion.button 
              type="submit" 
              className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg shadow-lg shadow-slate-900/20 transition-colors mt-2"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Account
            </motion.button>
          </motion.form>

          {/* Footer */}
          <div className="text-center text-sm mt-8">
            <span className="text-slate-500">Already have an account? </span>
            <Link to="/login" className="font-semibold text-accent hover:text-accent-hover transition-colors">
              Sign in
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex justify-center gap-6 border-t border-slate-100 pt-6">
             <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Shield className="w-3.5 h-3.5 text-blue-500" />
                <span>Secure registration</span>
             </div>
             <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                <span>Verified access</span>
             </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default Register;
