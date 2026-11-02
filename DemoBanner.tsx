import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useWedding } from '../../contexts/WeddingContext';
import { storageService } from '../../services/storageService';
import { isSupabaseConfigured } from '../../services/supabase';
import { Sparkles, RefreshCw, UserCheck, ShieldCheck, Store, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DemoBanner: React.FC = () => {
  const { role, switchRole, user } = useAuth();
  const { isOverBudget, overrunAlerts } = useWedding();
  const supabaseConnected = isSupabaseConfigured();

  const handleReset = () => {
    if (window.confirm('Reset all demo data back to default Aarav & Meera wedding scenario?')) {
      storageService.resetDemoData();
      window.location.reload();
    }
  };

  return (
    <div className="bg-mauve-900 text-roseGold-100 text-xs py-1.5 px-4 border-b border-mauve-800 flex flex-wrap items-center justify-between gap-2 z-50">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1 font-semibold text-roseGold-300">
          <Sparkles className="w-3.5 h-3.5 text-roseGold-400" />
          {supabaseConnected ? 'Supabase Connected' : 'MarryOn Demo Mode'}
        </span>
        <span className="text-mauve-400 hidden sm:inline">•</span>
        <span className="text-mauve-300 hidden md:inline">
          Active Persona: <strong className="text-white capitalize">{user?.name} ({role})</strong>
        </span>
        {isOverBudget && (
          <Link
            to="/app/budget"
            className="ml-2 inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 hover:bg-amber-500/30 transition-colors"
          >
            ⚠️ Budget Alert: {overrunAlerts.length} savings suggestions
          </Link>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-mauve-400 text-[11px] hidden lg:inline">Switch Persona:</span>
        <div className="inline-flex rounded-lg bg-mauve-800/80 p-0.5 border border-mauve-700/60">
          <button
            onClick={() => switchRole('customer')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1 transition-all ${
              role === 'customer'
                ? 'bg-roseGold-500 text-white shadow-sm'
                : 'text-mauve-300 hover:text-white'
            }`}
            title="Customer: Aarav & Meera"
          >
            <User className="w-3 h-3" />
            Couple
          </button>
          <button
            onClick={() => switchRole('vendor')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1 transition-all ${
              role === 'vendor'
                ? 'bg-roseGold-500 text-white shadow-sm'
                : 'text-mauve-300 hover:text-white'
            }`}
            title="Vendor: Rohan Deshpande Photography"
          >
            <Store className="w-3 h-3" />
            Vendor
          </button>
          <button
            onClick={() => switchRole('admin')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1 transition-all ${
              role === 'admin'
                ? 'bg-roseGold-500 text-white shadow-sm'
                : 'text-mauve-300 hover:text-white'
            }`}
            title="Admin: Operations Manager"
          >
            <ShieldCheck className="w-3 h-3" />
            Admin
          </button>
        </div>

        <button
          onClick={handleReset}
          className="text-mauve-400 hover:text-roseGold-300 transition-colors p-1 flex items-center gap-1 text-[11px]"
          title="Reset sample data"
        >
          <RefreshCw className="w-3 h-3" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </div>
  );
};
