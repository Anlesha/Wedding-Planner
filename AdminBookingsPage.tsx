import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { formatINR, formatDate } from '../../utils/formatters';
import { Enquiry, BookingStatus } from '../../types';
import {
  CalendarDays,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Building,
  User,
  TrendingUp
} from 'lucide-react';

export const AdminBookingsPage: React.FC = () => {
  const [bookings] = useState<Enquiry[]>(() => storageService.getBookings());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | BookingStatus>('all');

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.vendorCategory.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalValue = bookings.reduce((sum, b) => sum + (b.quotationAmount || 0), 0);
  const confirmedCount = bookings.filter((b) => b.status === 'confirmed' || b.status === 'completed').length;
  const pendingCount = bookings.filter((b) => b.status === 'pending').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-roseGold-100 text-roseGold-800 text-xs font-semibold mb-1">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Platform Pipeline</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-mauve-900">
            Bookings & Enquiry Transactions
          </h1>
          <p className="text-xs text-mauve-500 mt-0.5">
            Real-time ledger of quotations, confirmed contracts, and vendor reservations
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 space-y-1">
          <span className="text-xs text-mauve-500 uppercase font-semibold">Total Pipeline Value</span>
          <p className="font-serif text-2xl font-bold text-roseGold-700">{formatINR(totalValue)}</p>
          <p className="text-[11px] text-mauve-400">Sum of all negotiated quotes</p>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-xs text-mauve-500 uppercase font-semibold">Confirmed Bookings</span>
          <p className="font-serif text-2xl font-bold text-emerald-700">{confirmedCount} confirmed</p>
          <p className="text-[11px] text-emerald-600 font-medium">Secured with advance deposits</p>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-xs text-mauve-500 uppercase font-semibold">Pending Enquiries</span>
          <p className="font-serif text-2xl font-bold text-amber-700">{pendingCount} pending</p>
          <p className="text-[11px] text-amber-600 font-medium">Awaiting vendor quotation</p>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by couple, vendor name, or service category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
            <Search className="w-4 h-4 text-mauve-400 absolute left-3 top-3" />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-white border border-blush-200 rounded-xl text-mauve-800 focus:outline-none focus:ring-2 focus:ring-roseGold-400 font-medium"
            >
              <option value="all">All Booking Statuses</option>
              <option value="pending">Pending</option>
              <option value="responded">Responded</option>
              <option value="accepted">Accepted</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Bookings Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-mauve-700">
            <thead className="bg-blush-50/70 border-b border-blush-200/80 uppercase font-semibold text-[11px] text-mauve-600">
              <tr>
                <th className="py-3 px-4">Booking Ref</th>
                <th className="py-3 px-4">Couple (Client)</th>
                <th className="py-3 px-4">Vendor Partner</th>
                <th className="py-3 px-4">Wedding Date</th>
                <th className="py-3 px-4">Quotation</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blush-100">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-mauve-400">
                    No booking records found.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-blush-50/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[11px] font-bold text-mauve-900">
                      #{b.id}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-rose-500" />
                        <span className="font-semibold text-mauve-900">{b.customerName}</span>
                      </div>
                      <span className="text-[10px] text-mauve-400">{b.customerEmail || 'Guest Account'}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <Building className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="font-semibold text-mauve-900">{b.vendorName}</span>
                      </div>
                      <Badge variant="roseGold" size="sm">{b.vendorCategory}</Badge>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-mauve-900">{formatDate(b.proposedDate)}</span>
                      {b.guestCount && (
                        <p className="text-[10px] text-mauve-400">{b.guestCount} guests expected</p>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {b.quotationAmount ? (
                        <span className="font-bold text-roseGold-700">
                          {formatINR(b.quotationAmount)}
                        </span>
                      ) : (
                        <span className="text-[11px] text-mauve-400 italic">Quote Pending</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {b.status === 'confirmed' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3" /> Confirmed
                        </span>
                      )}
                      {b.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                      {b.status === 'responded' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                          Responded
                        </span>
                      )}
                      {b.status === 'completed' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                          Completed
                        </span>
                      )}
                      {b.status === 'cancelled' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                          <XCircle className="w-3 h-3" /> Cancelled
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
