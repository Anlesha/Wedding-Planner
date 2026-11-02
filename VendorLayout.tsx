import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { DemoBanner } from '../components/layout/DemoBanner';
import { storageService } from '../services/storageService';
import {
  LayoutDashboard,
  UserCheck,
  Briefcase,
  Image as ImageIcon,
  CalendarCheck,
  MessageSquare,
  BarChart3,
  Star,
  ShieldCheck,
  Settings,
  Menu,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const VendorLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const currentVendor = storageService.getVendorById('ven-001');
  const allBookings = storageService.getBookings();
  const vendorEnquiries = allBookings.filter(b => b.vendorId === 'ven-001' && b.status === 'pending');

  const navigation = [
    { name: 'Dashboard', href: '/vendor/dashboard', icon: LayoutDashboard },
    { name: 'Business Profile', href: '/vendor/profile', icon: Briefcase },
    { name: 'Services & Packages', href: '/vendor/services', icon: Briefcase },
    { name: 'Portfolio Gallery', href: '/vendor/portfolio', icon: ImageIcon },
    { name: 'Availability Calendar', href: '/vendor/availability', icon: CalendarCheck },
    { name: 'Enquiries & Bookings', href: '/vendor/enquiries', icon: MessageSquare, count: vendorEnquiries.length },
    { name: 'Business Analytics', href: '/vendor/analytics', icon: BarChart3 },
    { name: 'Client Reviews', href: '/vendor/reviews', icon: Star, count: currentVendor?.reviewCount },
    { name: 'Verification Center', href: '/vendor/verification', icon: ShieldCheck, isVerified: currentVendor?.isVerified },
    { name: 'Vendor Settings', href: '/vendor/settings', icon: Settings },
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
              {currentVendor?.businessName}
            </span>
            <span className="text-xs text-mauve-500">{currentVendor?.category}</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-mauve-700 hover:bg-blush-50 rounded-xl flex items-center gap-1.5 text-xs font-semibold"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span>Vendor Menu</span>
          </button>
        </div>

        {/* Sidebar Navigation */}
        <aside
          className={`w-full lg:w-64 shrink-0 lg:block ${
            sidebarOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="bg-white rounded-3xl border border-blush-200/80 p-4 shadow-soft sticky top-28 space-y-4">
            {/* Vendor Profile Mini Card */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-mauve-900 to-mauve-800 text-white text-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mx-auto border-2 border-roseGold-400 mb-2">
                <img
                  src={currentVendor?.images[0] || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
                  alt={currentVendor?.businessName}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-serif text-sm font-bold text-white line-clamp-1">
                {currentVendor?.businessName}
              </h4>
              <p className="text-[11px] text-roseGold-200 mt-0.5">{currentVendor?.category} • {currentVendor?.city}</p>
              
              <div className="mt-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/10 text-roseGold-200 border border-white/10">
                {currentVendor?.isVerified ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-300">Verified Partner</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3 h-3 text-amber-400" />
                    <span className="text-amber-300">Pending Verification</span>
                  </>
                )}
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
                      {item.count !== undefined && item.count > 0 && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-roseGold-100 text-roseGold-800'
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
