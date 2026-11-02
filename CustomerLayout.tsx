import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { DemoBanner } from '../components/layout/DemoBanner';
import { useWedding } from '../contexts/WeddingContext';
import { getDaysRemaining } from '../utils/formatters';
import {
  LayoutDashboard,
  Sparkles,
  Search,
  Scale,
  Wallet,
  CheckSquare,
  Calendar,
  BookOpen,
  Users,
  Heart,
  Bell,
  Settings,
  ChevronRight,
  Menu,
  X,
  AlertTriangle
} from 'lucide-react';

export const CustomerLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { wedding, isOverBudget, notifications, tasks, guests } = useWedding();

  const daysInfo = getDaysRemaining(wedding.weddingDate);
  const unreadCount = notifications.filter(n => !n.read).length;
  const pendingTasksCount = tasks.filter(t => t.status !== 'completed').length;

  const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
    { name: 'AI Wedding Planner', href: '/app/ai-planner', icon: Sparkles, badge: 'Smart' },
    { name: 'Find Vendors', href: '/vendors', icon: Search },
    { name: 'Compare Vendors', href: '/app/compare', icon: Scale },
    { name: 'My Budget & Overrun', href: '/app/budget', icon: Wallet, alert: isOverBudget },
    { name: 'Tasks & Checklist', href: '/app/tasks', icon: CheckSquare, count: pendingTasksCount },
    { name: 'Wedding Calendar', href: '/app/calendar', icon: Calendar },
    { name: 'Bookings & Quotes', href: '/app/bookings', icon: BookOpen },
    { name: 'Guest List & RSVP', href: '/app/guests', icon: Users, count: guests.length },
    { name: 'Saved Wishlist', href: '/app/wishlist', icon: Heart },
    { name: 'Notifications', href: '/app/notifications', icon: Bell, count: unreadCount },
    { name: 'Wedding Settings', href: '/app/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-warmBg">
      <DemoBanner />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col lg:flex-row gap-6">
        {/* Mobile Toggle Button */}
        <div className="lg:hidden flex items-center justify-between bg-white p-3.5 rounded-2xl border border-blush-200/80 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-mauve-900 text-sm">{wedding.coupleNames}</span>
            <span className="text-xs bg-roseGold-100 text-roseGold-800 px-2 py-0.5 rounded-full font-medium">
              {daysInfo.label}
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-mauve-700 hover:bg-blush-50 rounded-xl flex items-center gap-1.5 text-xs font-semibold"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span>Planner Menu</span>
          </button>
        </div>

        {/* Sidebar Navigation */}
        <aside
          className={`w-full lg:w-64 shrink-0 lg:block ${
            sidebarOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="bg-white rounded-3xl border border-blush-200/80 p-4 shadow-soft sticky top-28 space-y-4">
            {/* Wedding Countdown Mini Card */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-roseGold-50 via-blush-50 to-ivory-100 border border-roseGold-200/60 text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-roseGold-700">
                {wedding.city} Wedding
              </span>
              <h4 className="font-serif text-base font-bold text-mauve-900 mt-0.5">
                {wedding.coupleNames}
              </h4>
              <div className="mt-2 inline-flex items-center justify-center px-3 py-1 bg-white/90 rounded-full text-xs font-semibold text-roseGold-800 shadow-xs">
                💍 {daysInfo.label}
              </div>
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
                      {item.alert && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" title="Over budget alert" />
                      )}
                      {item.badge && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-roseGold-100 text-roseGold-800'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                      {item.count !== undefined && item.count > 0 && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-blush-200 text-mauve-800'
                        }`}>
                          {item.count}
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
