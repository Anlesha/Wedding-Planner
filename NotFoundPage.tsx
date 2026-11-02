import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { HeartHandshake, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-warmBg flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-roseGold-100 to-blush-100 border border-roseGold-200 flex items-center justify-center mx-auto text-roseGold-600 shadow-soft">
          <HeartHandshake className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-roseGold-700">
            Error 404 • Page Not Found
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-mauve-900">
            Lost on the Wedding Path?
          </h1>
          <p className="text-xs sm:text-sm text-mauve-600 max-w-sm mx-auto">
            The page you are looking for might have been relocated, renamed, or is currently reserved for another celebration.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full" leftIcon={<Home className="w-4 h-4" />}>
              Return to Homepage
            </Button>
          </Link>
          <Link to="/app/dashboard" className="w-full sm:w-auto">
            <Button variant="outline" size="md" className="w-full" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Open Planner Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
