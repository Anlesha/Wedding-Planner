import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Sparkles, Eye, EyeOff, Lock, Mail, User, Store, ShieldCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      showToast('Welcome back to MarryOn!', 'success');
      if (email.toLowerCase().includes('vendor')) navigate('/vendor/dashboard');
      else if (email.toLowerCase().includes('admin')) navigate('/admin/dashboard');
      else navigate('/app/dashboard');
    } catch (err: any) {
      showToast(err.message || 'Login failed. Please verify credentials.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (role: 'customer' | 'vendor' | 'admin') => {
    setIsLoading(true);
    let targetEmail = 'aarav.meera@marryon.app';
    if (role === 'vendor') targetEmail = 'rohan@deshpandephoto.com';
    if (role === 'admin') targetEmail = 'admin@marryon.app';

    await login(targetEmail, 'demo1234', role);
    showToast(`Signed in as ${role.toUpperCase()}`, 'success');

    if (role === 'vendor') navigate('/vendor/dashboard');
    else if (role === 'admin') navigate('/admin/dashboard');
    else navigate('/app/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-8 shadow-premium space-y-6 bg-white/95 backdrop-blur-md">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-roseGold-500 to-blush-400 flex items-center justify-center text-white mx-auto shadow-soft">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-mauve-900">Welcome Back</h1>
          <p className="text-xs text-mauve-500">Log in to manage your wedding planning workspace</p>
        </div>

        {/* Quick Demo Persona Logins */}
        <div className="p-3 bg-blush-50 rounded-2xl border border-blush-200/80 space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-mauve-600 text-center">
            Instant Demo Sign-In
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickLogin('customer')}
              className="px-2 py-2 rounded-xl bg-white border border-roseGold-200 text-xs font-semibold text-mauve-800 hover:bg-roseGold-50 hover:text-roseGold-800 transition-colors flex flex-col items-center gap-1 shadow-xs"
            >
              <User className="w-3.5 h-3.5 text-roseGold-600" />
              Couple
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('vendor')}
              className="px-2 py-2 rounded-xl bg-white border border-roseGold-200 text-xs font-semibold text-mauve-800 hover:bg-roseGold-50 hover:text-roseGold-800 transition-colors flex flex-col items-center gap-1 shadow-xs"
            >
              <Store className="w-3.5 h-3.5 text-roseGold-600" />
              Vendor
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="px-2 py-2 rounded-xl bg-white border border-roseGold-200 text-xs font-semibold text-mauve-800 hover:bg-roseGold-50 hover:text-roseGold-800 transition-colors flex flex-col items-center gap-1 shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-roseGold-600" />
              Admin
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="aarav.meera@marryon.app"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-semibold uppercase tracking-wider text-mauve-700">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs text-roseGold-600 hover:underline">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4" />}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-mauve-400 hover:text-mauve-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isLoading}>
            Sign In
          </Button>
        </form>

        <div className="text-center text-xs text-mauve-500 pt-2 border-t border-blush-100">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-semibold text-roseGold-700 hover:underline">
            Register for Free
          </Link>
        </div>
      </Card>
    </div>
  );
};
