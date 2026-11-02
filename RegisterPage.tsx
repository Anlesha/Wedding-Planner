import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { UserRole } from '../../types';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Sparkles, User, Store, Lock, Mail, Phone } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useToast();

  const [role, setRole] = useState<UserRole>('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register(name, email, role, password);
      showToast('Account created successfully!', 'success');
      if (role === 'vendor') {
        navigate('/onboarding/vendor');
      } else {
        navigate('/onboarding/customer');
      }
    } catch (err: any) {
      showToast(err.message || 'Registration failed.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-8 shadow-premium space-y-6 bg-white/95 backdrop-blur-md">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-roseGold-500 to-blush-400 flex items-center justify-center text-white mx-auto shadow-soft">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-mauve-900">Create Your Account</h1>
          <p className="text-xs text-mauve-500">Join MarryOn to plan or showcase weddings</p>
        </div>

        {/* Role Selection Tabs */}
        <div className="grid grid-cols-2 p-1 bg-blush-100/70 rounded-2xl border border-blush-200">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`py-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all ${
              role === 'customer'
                ? 'bg-white text-mauve-900 shadow-xs'
                : 'text-mauve-600 hover:text-mauve-900'
            }`}
          >
            <User className="w-3.5 h-3.5 text-roseGold-600" />
            Engaged Couple
          </button>
          <button
            type="button"
            onClick={() => setRole('vendor')}
            className={`py-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all ${
              role === 'vendor'
                ? 'bg-white text-mauve-900 shadow-xs'
                : 'text-mauve-600 hover:text-mauve-900'
            }`}
          >
            <Store className="w-3.5 h-3.5 text-roseGold-600" />
            Wedding Vendor
          </button>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={role === 'vendor' ? 'Business / Studio Name' : 'Couple / Full Name'}
            placeholder={role === 'vendor' ? 'e.g. DreamShots Photography' : 'e.g. Aarav & Meera'}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="contact@marryon.app"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <Input
            label="Phone Number"
            placeholder="+91 98220 12345"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            leftIcon={<Phone className="w-4 h-4" />}
          />

          <Input
            label="Password"
            type="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            required
          />

          <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isLoading}>
            Continue to Setup →
          </Button>
        </form>

        <div className="text-center text-xs text-mauve-500 pt-2 border-t border-blush-100">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-roseGold-700 hover:underline">
            Sign In Here
          </Link>
        </div>
      </Card>
    </div>
  );
};
