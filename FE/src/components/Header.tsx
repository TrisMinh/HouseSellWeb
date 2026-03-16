import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/images/logo.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navLinks = [
  { label: 'News', href: '/news' },
  { label: 'Prediction', href: '/prediction' },
  { label: 'Buy', href: '/listings?type=buy' },
  { label: 'Sell', href: '/listings?type=sell' },
  { label: 'Rent', href: '/listings?type=rent' },
];

export const Header = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } 
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setMobileMenuOpen(false); 
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
    >
      <div className="w-full pointer-events-auto">
        <div className="flex items-center justify-between h-[116px] bg-transparent px-8 md:px-12 relative overflow-hidden">
            {/* Logo Section (Left) */}
            <a href="/" className="flex items-center gap-3 group h-full overflow-hidden">
              <img src={logo} alt="Blue Sky Logo" className="h-full w-auto object-contain mix-blend-multiply scale-[1.8]" />
            </a>

          {/* Right Actions (Nav + Sign In) */}
          <div className="flex items-center gap-6">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-xl text-xl font-medium text-foreground/80 hover:text-foreground hover:bg-black/5 transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Conditional User Profile / Sign In */}
            {isLoggedIn ? (
              <div className="hidden sm:flex items-center">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-3 cursor-pointer hover:bg-black/5 p-2 rounded-xl transition-all select-none outline-none">
                      <Avatar className="h-10 w-10 border border-border">
                        <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} alt="User" />
                        <AvatarFallback>{(user?.first_name?.[0] || user?.username?.[0] || 'U').toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-lg">
                        {user?.first_name || user?.last_name 
                          ? `${user.first_name || ''} ${user.last_name || ''}`.trim() 
                          : user?.username || 'User'}
                      </span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 mt-2">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => window.location.href = '/profile'}
                    >
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => window.location.href = '/your-info'}
                    >
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="cursor-pointer text-red-600 focus:text-red-600"
                      onClick={async () => {
                        await logout();
                        window.location.href = '/';
                      }}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <a href="/login" className="hidden sm:block">
                <Button className="rounded-xl px-5 py-4 h-auto text-xl font-medium bg-black text-white hover:bg-black/80 shadow-md hover:shadow-lg transition-all">
                  Sign in
                </Button>
              </a>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:bg-black/5 rounded-xl ml-2"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border pointer-events-auto"
          >
            <nav className="px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 rounded-lg text-lg font-medium hover:bg-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="h-px bg-border my-2" />
              {isLoggedIn ? (
                <>
                  <a 
                    href="/profile"
                    className="px-4 py-3 rounded-lg text-lg font-medium hover:bg-accent transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </a>
                  <button
                    className="px-4 py-3 rounded-lg text-lg font-medium hover:bg-accent transition-colors text-red-600 text-left w-full"
                    onClick={async () => {
                      setMobileMenuOpen(false);
                      await logout();
                      window.location.href = '/';
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <a 
                  href="/login"
                  className="px-4 py-3 rounded-lg text-lg font-medium hover:bg-accent transition-colors text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </a>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
