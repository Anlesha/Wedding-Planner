import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { DemoBanner } from '../components/layout/DemoBanner';
import { storageService } from '../services/storageService';
import {
  ShieldAlert,
  Users,
  Store,
  FileCheck2,
  CalendarDays,
  Flag,
  History,
  Sliders,
  Menu,
  X
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const verifications = storageService.getVerifications();
  const pendingVerifications = verifications.filter(v => v.status === 'pending').length;

  const navigation = [
    { name: 'Admin Dashboard', href: '/admin/dashboard', icon: ShieldAlert },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Vendor Directory', href: '/admin/vendors', icon: Store },
    { name: 'Verification Queue', href: '/admin/verifications', icon: FileCheck2, count: pendingVerifications },
    { name: 'Bookings Overview', href: '/admin/bookings', icon: CalendarDays },
    { name: 'Content Moderation', href: '/admin/reports', icon: Flag },
    { name: 'Security Audit Log', href: '/admin/audit-log', icon: History },
    { name: 'Platform Settings', href: '/admin/settings', icon: Sliders },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-warmBg">
      <DemoBanner />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col lg:flex-row gap-6">
        {/* Mobile Toggle Button */}
        <div className="lg:hidden flex items-center justify-between bg-white p-3.5 rounded-2xl border border-blush-200/80 shadow-xs">
          <div>
            <span className="font-serif font-bold text-mauve-900 text-sm block">
              MarryOn Operations
            </span>
            <span className="text-xs text-rose-600 font-semibold">Administrator Console</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-mauve-700 hover:bg-blush-50 rounded-xl flex items-center gap-1.5 text-xs font-semibold"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span>Admin Menu</span>
          </button>
        </div>

        {/* Sidebar Navigation */}
        <aside
          className={`w-full lg:w-64 shrink-0 lg:block ${
            sidebarOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="bg-white rounded-3xl border border-blush-200/80 p-4 shadow-soft sticky top-28 space-y-4">
            {/* Admin Badge Card */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-mauve-900 via-roseGold-950 to-mauve-950 text-white text-center">
              <div className="w-10 h-10 rounded-xl bg-roseGold-500/20 border border-roseGold-400/30 flex items-center justify-center mx-auto mb-2 text-roseGold-300">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-sm font-bold text-white">
                Admin Control Room
              </h4>
              <p className="text-[11px] text-roseGold-200 mt-0.5">Role-Based Access Guard</p>
            </div>

            {/* Nav list */}
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                      isActive
                        ? 'bg-roseGold-500 text-white shadow-xs font-semibold'
                        : 'text-mauve-700 hover:bg-blush-50 hover:text-roseGold-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-white' : 'text-mauve-400 group-hover:text-roseGold-600'
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.count !== undefined && item.count > 0 && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {item.count} pending
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Workspace Area */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
