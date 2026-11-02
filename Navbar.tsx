import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useWedding } from '../../contexts/WeddingContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { 
  Heart, 
  Menu, 
  X, 
  Bell, 
  Sparkles, 
  User, 
  LogOut, 
  LayoutDashboard,
  ShieldCheck,
  Store
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, isAuthenticated, role, logout } = useAuth();
  const { notifications, wishlist } = useWedding();
  const location = useLocation();
  const navigate = useNavigate();

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const publicNavLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore Vendors', href: '/vendors' },
    { name: 'Features', href: '/features' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const getDashboardLink = () => {
    if (role === 'vendor') return '/vendor/dashboard';
    if (role === 'admin') return '/admin/dashboard';
    return '/app/dashboard';
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-blush-200/60 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-roseGold-600 via-roseGold-400 to-blush-300 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-mauve-900 block leading-none">
                Marry<span className="text-roseGold-500">On</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-mauve-400 font-medium">
                Smart Wedding Planner
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {publicNavLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-medium transition-colors hover:text-roseGold-600 ${
                    isActive ? 'text-roseGold-600 font-semibold' : 'text-mauve-700'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="hidden sm:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Wishlist Link */}
                <Link
                  to="/app/wishlist"
                  className="relative p-2.5 text-mauve-600 hover:text-roseGold-600 hover:bg-blush-50 rounded-xl transition-colors"
                  title="My Wishlist"
                >
                  <Heart className="w-5 h-5" />
                  {wishlist.length > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-roseGold-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs">
                      {wishlist.length}
                    </span>
                  )}
                </Link>

                {/* Notifications Link */}
                <Link
                  to="/app/notifications"
                  className="relative p-2.5 text-mauve-600 hover:text-roseGold-600 hover:bg-blush-50 rounded-xl transition-colors"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                      {unreadNotifications}
                    </span>
                  )}
                </Link>

                {/* Dashboard Shortcut */}
                <Link to={getDashboardLink()}>
                  <Button variant="outline" size="sm" leftIcon={<LayoutDashboard className="w-4 h-4" />}>
                    Dashboard
                  </Button>
                </Link>

                {/* User Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pl-2.5 pr-2 rounded-xl border border-blush-200 hover:border-roseGold-300 transition-all bg-blush-50/50"
                  >
                    <div className="w-7 h-7 rounded-full bg-roseGold-100 flex items-center justify-center text-roseGold-700 font-bold text-xs uppercase overflow-hidden">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        user?.name?.charAt(0) || 'U'
                      )}
                    </div>
                    <span className="text-xs font-semibold text-mauve-900 max-w-[100px] truncate">
                      {user?.name?.split(' ')[0]}
                    </span>
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-premium border border-blush-200/80 py-2 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-4 py-2 border-b border-blush-100">
                        <p className="text-xs font-semibold text-mauve-900 truncate">{user?.name}</p>
                        <p className="text-[11px] text-mauve-500 truncate">{user?.email}</p>
                        <Badge variant="roseGold" size="sm" className="mt-1 capitalize">
                          {role} Account
                        </Badge>
                      </div>

                      <div className="py-1">
                        <Link
                          to={getDashboardLink()}
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-mauve-700 hover:bg-blush-50 hover:text-roseGold-700"
                        >
                          <LayoutDashboard className="w-4 h-4 text-roseGold-500" />
                          My Dashboard
                        </Link>
                        {role === 'customer' && (
                          <Link
                            to="/app/ai-planner"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-mauve-700 hover:bg-blush-50 hover:text-roseGold-700"
                          >
                            <Sparkles className="w-4 h-4 text-roseGold-500" />
                            AI Wedding Planner
                          </Link>
                        )}
                        <Link
                          to={role === 'vendor' ? '/vendor/settings' : role === 'admin' ? '/admin/settings' : '/app/settings'}
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-mauve-700 hover:bg-blush-50 hover:text-roseGold-700"
                        >
                          <User className="w-4 h-4 text-roseGold-500" />
                          Account Settings
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-blush-100">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm" rightIcon={<Sparkles className="w-3.5 h-3.5" />}>
                    Start Planning
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu trigger button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-mauve-700 hover:text-roseGold-600 hover:bg-blush-50 rounded-xl"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-blush-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-1 pb-3 border-b border-blush-100">
            {publicNavLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-mauve-700 hover:text-roseGold-600 hover:bg-blush-50 rounded-lg"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {isAuthenticated ? (
            <div className="pt-2 flex flex-col gap-2">
              <Link
                to={getDashboardLink()}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full"
              >
                <Button variant="primary" size="md" className="w-full" leftIcon={<LayoutDashboard className="w-4 h-4" />}>
                  Go to {role.toUpperCase()} Dashboard
                </Button>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-rose-600 bg-rose-50 rounded-xl"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-2 grid grid-cols-2 gap-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="md" className="w-full">
                  Log in
                </Button>
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="md" className="w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
