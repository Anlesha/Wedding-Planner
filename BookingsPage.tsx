import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWedding } from '../../contexts/WeddingContext';
import { formatINR, formatDate } from '../../utils/formatters';
import { BookingStatus } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  MessageSquare,
  FileText,
  Store,
  ArrowRight
} from 'lucide-react';

export const BookingsPage: React.FC = () => {
  const { bookings, updateBookingStatus } = useWedding();
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredBookings = bookings.filter((b) => {
    if (filterStatus !== 'All' && b.status !== filterStatus) return false;
    return true;
  });

  const handleConfirm = (id: string, vendorName: string) => {
    if (window.confirm(`Confirm booking with ${vendorName}? This locks in the vendor for your wedding date.`)) {
      updateBookingStatus(id, 'confirmed');
    }
  };

  const handleCancel = (id: string, vendorName: string) => {
    if (window.confirm(`Are you sure you want to cancel the enquiry with ${vendorName}?`)) {
      updateBookingStatus(id, 'cancelled');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="roseGold">Enquiries & Contracts</Badge>
          <h1 className="font-serif text-3xl font-bold text-mauve-900 mt-1">
            Bookings & Quotations
          </h1>
          <p className="text-xs text-mauve-500 mt-0.5">
            Manage vendor communications, proposals, and signed reservations
          </p>
        </div>

        <Link to="/vendors">
          <Button variant="primary" size="sm" leftIcon={<Store className="w-4 h-4" />}>
            Explore More Vendors
          </Button>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-blush-100/70 p-1 rounded-2xl border border-blush-200 overflow-x-auto">
        {['All', 'confirmed', 'accepted', 'pending', 'cancelled'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
              filterStatus === st
                ? 'bg-white text-mauve-900 shadow-xs'
                : 'text-mauve-600 hover:text-mauve-900'
            }`}
          >
            {st} ({st === 'All' ? bookings.length : bookings.filter((b) => b.status === st).length})
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="w-8 h-8" />}
          title="No bookings in this category"
          description="Send direct enquiries to photographers, decorators, and caterers to receive custom quotations."
          actionLabel="Find Vendors"
          onAction={() => {}}
        />
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b) => {
            const isConfirmed = b.status === 'confirmed';
            const isAccepted = b.status === 'accepted';
            const isPending = b.status === 'pending';
            const isCancelled = b.status === 'cancelled';

            const statusColors = {
              confirmed: 'bg-emerald-100 text-emerald-800 border-emerald-300',
              accepted: 'bg-blue-100 text-blue-800 border-blue-300',
              pending: 'bg-amber-100 text-amber-800 border-amber-300',
              cancelled: 'bg-rose-100 text-rose-800 border-rose-300',
              responded: 'bg-purple-100 text-purple-800 border-purple-300',
              completed: 'bg-emerald-100 text-emerald-800 border-emerald-300',
              rejected: 'bg-rose-100 text-rose-800 border-rose-300',
            };

            return (
              <Card key={b.id} className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-blush-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="roseGold" size="sm">{b.vendorCategory}</Badge>
                      <span className={`text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${statusColors[b.status] || 'bg-mauve-100'}`}>
                        {b.status}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-mauve-900">
                      {b.vendorName}
                    </h3>
                    <p className="text-xs text-mauve-500">
                      Wedding Date: <strong className="text-mauve-800">{formatDate(b.proposedDate)}</strong> • Guest Count: {b.guestCount || '—'}
                    </p>
                  </div>

                  {b.quotationAmount && (
                    <div className="sm:text-right">
                      <span className="text-[10px] text-mauve-400 uppercase font-semibold">Agreed Quotation</span>
                      <p className="font-serif text-2xl font-bold text-roseGold-700">
                        {formatINR(b.quotationAmount)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Requirements / Quotation Notes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-blush-50/50 p-4 rounded-2xl border border-blush-100">
                  <div className="space-y-1">
                    <span className="font-bold text-mauve-700 uppercase tracking-wider text-[10px]">
                      Your Requirements
                    </span>
                    <p className="text-mauve-800 italic">"{b.message}"</p>
                    {b.selectedPackage && (
                      <p className="text-roseGold-700 font-semibold pt-1">
                        Package: {b.selectedPackage}
                      </p>
                    )}
                  </div>

                  {b.quotationNotes && (
                    <div className="space-y-1 md:border-l md:border-blush-200 md:pl-4">
                      <span className="font-bold text-mauve-700 uppercase tracking-wider text-[10px]">
                        Vendor Inclusions & Notes
                      </span>
                      <p className="text-mauve-800">{b.quotationNotes}</p>
                    </div>
                  )}
                </div>

                {/* Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <span className="text-[11px] text-mauve-400">
                    Updated {formatDate(b.updatedAt)}
                  </span>

                  <div className="flex items-center gap-2">
                    <Link to={`/vendors/${b.vendorId}`}>
                      <Button variant="ghost" size="sm">
                        View Profile
                      </Button>
                    </Link>

                    {isAccepted && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleConfirm(b.id, b.vendorName)}
                        leftIcon={<CheckCircle2 className="w-4 h-4" />}
                      >
                        Confirm Booking
                      </Button>
                    )}

                    {!isConfirmed && !isCancelled && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-rose-600 hover:bg-rose-50 border-rose-200"
                        onClick={() => handleCancel(b.id, b.vendorName)}
                      >
                        Cancel Request
                      </Button>
                    )}

                    {isConfirmed && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-800 font-bold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Reservation Confirmed
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
