import React from 'react';
import { storageService } from '../../services/storageService';
import { formatINR } from '../../utils/formatters';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { BarChart3, TrendingUp, Users, CalendarCheck, Star } from 'lucide-react';

export const VendorAnalyticsPage: React.FC = () => {
  const vendor = storageService.getVendorById('ven-001')!;
  const allBookings = storageService.getBookings().filter(b => b.vendorId === vendor.id);

  const months = [
    { month: 'Oct 2026', views: 340, enquiries: 4, revenue: 0 },
    { month: 'Nov 2026', views: 820, enquiries: 12, revenue: 150000 },
    { month: 'Dec 2026', views: 1450, enquiries: 18, revenue: 300000 },
    { month: 'Jan 2027', views: 980, enquiries: 14, revenue: 200000 },
    { month: 'Feb 2027', views: 1120, enquiries: 16, revenue: 250000 },
  ];

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      <div>
        <Badge variant="roseGold">Business Intelligence</Badge>
        <h1 className="font-serif text-3xl font-bold text-mauve-900 mt-1">
          Storefront Analytics & Conversion
        </h1>
        <p className="text-xs text-mauve-500 mt-0.5">
          Track enquiry volume, profile impressions, and confirmed revenue
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 space-y-1">
          <span className="text-xs font-semibold text-mauve-500 uppercase">Monthly Profile Views</span>
          <p className="font-serif text-2xl font-bold text-mauve-900">1,450</p>
          <div className="text-[10px] text-emerald-600 font-bold">+28% vs last month</div>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-xs font-semibold text-mauve-500 uppercase">Enquiry Conversion</span>
          <p className="font-serif text-2xl font-bold text-roseGold-700">33.4%</p>
          <div className="text-[10px] text-mauve-400">Quotes accepted</div>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-xs font-semibold text-mauve-500 uppercase">Total Revenue</span>
          <p className="font-serif text-2xl font-bold text-mauve-900">₹9,00,000</p>
          <div className="text-[10px] text-emerald-600 font-bold">2026-27 Season</div>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-xs font-semibold text-mauve-500 uppercase">Review Score</span>
          <p className="font-serif text-2xl font-bold text-amber-600">4.9 ★</p>
          <div className="text-[10px] text-mauve-400">42 verified couples</div>
        </Card>
      </div>

      {/* Monthly Seasonal Demand Table */}
      <Card className="p-6 space-y-4">
        <h3 className="font-serif text-lg font-bold text-mauve-900 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-roseGold-600" /> Wedding Season Demand Curve (India)
        </h3>
        <p className="text-xs text-mauve-500">
          Peak muhurat months show 4x surge in direct bridal enquiries across Maharashtra.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-blush-50 uppercase tracking-wider text-[11px] text-mauve-500 font-semibold border-b border-blush-100">
              <tr>
                <th className="py-3 px-4">Period</th>
                <th className="py-3 px-4">Storefront Views</th>
                <th className="py-3 px-4">Direct Enquiries</th>
                <th className="py-3 px-4">Confirmed Bookings Value</th>
                <th className="py-3 px-4">Demand Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blush-100 text-mauve-800">
              {months.map((m, i) => (
                <tr key={i} className="hover:bg-blush-50/40">
                  <td className="py-3.5 px-4 font-bold text-mauve-900">{m.month}</td>
                  <td className="py-3.5 px-4">{m.views} views</td>
                  <td className="py-3.5 px-4 font-semibold text-roseGold-700">{m.enquiries} enquiries</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-700">{formatINR(m.revenue)}</td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      m.views > 1000 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {m.views > 1000 ? 'Peak Season' : 'Steady'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
