import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { useToast } from '../../contexts/ToastContext';
import { Sparkles, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      showToast('Password reset link sent! Check your inbox.', 'success');
    }, 500);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-8 shadow-premium space-y-6 bg-white/95">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-roseGold-100 flex items-center justify-center text-roseGold-600 mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-mauve-900">Reset Password</h1>
          <p className="text-xs text-mauve-500">
            Enter your account email to receive recovery instructions.
          </p>
        </div>

        {submitted ? (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="text-sm font-bold text-emerald-900">Check Your Email</h3>
            <p className="text-xs text-emerald-700 leading-relaxed">
              We've dispatched a secure reset link to <strong>{email}</strong>. Follow the instructions to choose a new password.
            </p>
            <div className="pt-2">
              <Link to="/login">
                <Button variant="outline" size="sm" className="bg-white">
                  Return to Login
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Account Email"
              type="email"
              placeholder="aarav.meera@marryon.app"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isLoading}>
              Send Recovery Link
            </Button>
          </form>
        )}

        <div className="text-center pt-2 border-t border-blush-100">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-mauve-600 hover:text-roseGold-600"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
};
