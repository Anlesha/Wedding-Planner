import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../../services/storageService';
import { useToast } from '../../contexts/ToastContext';
import { formatINR, formatDate } from '../../utils/formatters';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import {
  Store,
  MessageSquare,
  CalendarCheck,
  Star,
  ShieldCheck,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  Send,
  Eye
} from 'lucide-react';

export const VendorDashboardPage: React.FC = () => {
  const { showToast } = useToast();
  const vendor = storageService.getVendorById('ven-001')!;
  const allBookings = storageService.getBookings();
  const vendorBookings = allBookings.filter((b) => b.vendorId === vendor.id);

  const pendingEnquiries = vendorBookings.filter((b) => b.status === 'pending');
  const confirmedBookings = vendorBookings.filter((b) => b.status === 'confirmed');

  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + (b.quotationAmount || 0), 0);

  // Quote Modal State
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  const [quotationAmount, setQuotationAmount] = useState<number>(150000);
  const [quotationNotes, setQuotationNotes] = useState('');

  const openQuoteModal = (enquiry: any) => {
    setSelectedEnquiry(enquiry);
    setQuotationAmount(enquiry.estimatedBudget || vendor.startingPrice);
    setQuotationNotes(`Includes full coverage with lead photographer ${vendor.businessName} and high-res deliverables.`);
    setQuoteModalOpen(true);
  };

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;

    storageService.updateBookingStatus(
      selectedEnquiry.id,
      'accepted',
      Number(quotationAmount),
      quotationNotes
    );

    showToast(`Quotation of ${formatINR(quotationAmount)} sent to ${selectedEnquiry.customerName}!`, 'success');
    setQuoteModalOpen(false);
  };

  const handleDecline = (id: string, customerName: string) => {
    if (window.confirm(`Decline enquiry from ${customerName}?`)) {
      storageService.updateBookingStatus(id, 'rejected');
      showToast('Enquiry declined', 'info');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-mauve-900 via-mauve-800 to-roseGold-900 rounded-3xl p-6 sm:p-8 text-white shadow-premium flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-roseGold-200 text-xs font-semibold">
            {vendor.isVerified ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Verified Partner</span>
              </>
            ) : (
              <span>Verification Pending</span>
            )}
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">
            Welcome, {vendor.businessName}
          </h1>
          <p className="text-sm text-mauve-200">
            {vendor.category} • {vendor.city} • Rating {vendor.rating}★ ({vendor.reviewCount} client reviews)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to={`/vendors/${vendor.id}`}>
            <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/10" leftIcon={<Eye className="w-4 h-4" />}>
              Preview Public Listing
            </Button>
          </Link>
          <Link to="/vendor/availability">
            <Button variant="secondary" size="sm" leftIcon={<CalendarCheck className="w-4 h-4" />}>
              Update Dates
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 space-y-1">
          <div className="flex justify-between items-center text-xs text-mauve-500 font-semibold uppercase">
            <span>Pending Enquiries</span>
            <MessageSquare className="w-4 h-4 text-roseGold-600" />
          </div>
          <p className="font-serif text-2xl font-bold text-mauve-900">{pendingEnquiries.length}</p>
          <div className="text-[11px] text-amber-700 font-semibold">Requires response</div>
        </Card>

        <Card className="p-4 space-y-1">
          <div className="flex justify-between items-center text-xs text-mauve-500 font-semibold uppercase">
            <span>Confirmed Bookings</span>
            <CalendarCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="font-serif text-2xl font-bold text-mauve-900">{confirmedBookings.length}</p>
          <div className="text-[11px] text-emerald-700 font-semibold">Upcoming events</div>
        </Card>

        <Card className="p-4 space-y-1">
          <div className="flex justify-between items-center text-xs text-mauve-500 font-semibold uppercase">
            <span>Recorded Revenue</span>
            <TrendingUp className="w-4 h-4 text-roseGold-600" />
          </div>
          <p className="font-serif text-2xl font-bold text-roseGold-700">{formatINR(totalRevenue)}</p>
          <div className="text-[11px] text-mauve-400">Confirmed contract value</div>
        </Card>

        <Card className="p-4 space-y-1">
          <div className="flex justify-between items-center text-xs text-mauve-500 font-semibold uppercase">
            <span>Overall Rating</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <p className="font-serif text-2xl font-bold text-mauve-900">{vendor.rating} / 5.0</p>
          <div className="text-[11px] text-mauve-400">{vendor.reviewCount} customer reviews</div>
        </Card>
      </div>

      {/* Main Grid: Pending Enquiries & Confirmed Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Pending Enquiries */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-blush-100">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-roseGold-600" />
                <h3 className="font-serif text-lg font-bold text-mauve-900">
                  New Wedding Enquiries ({pendingEnquiries.length})
                </h3>
              </div>
              <Link to="/vendor/enquiries" className="text-xs text-roseGold-700 font-bold hover:underline">
                View All Enquiries →
              </Link>
            </div>

            {pendingEnquiries.length === 0 ? (
              <p className="text-xs text-mauve-500 text-center py-8">
                No pending customer enquiries at the moment.
              </p>
            ) : (
              <div className="space-y-3">
                {pendingEnquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="p-4 rounded-2xl bg-blush-50/60 border border-blush-200/80 space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-bold text-mauve-900">{enq.customerName}</h4>
                        <p className="text-xs text-mauve-500">
                          Date: <strong className="text-mauve-800">{formatDate(enq.proposedDate)}</strong> • {enq.guestCount || '—'} Guests
                        </p>
                        <p className="text-xs text-mauve-600 italic mt-1">"{enq.message}"</p>
                      </div>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        Pending
                      </span>
                    </div>

                    <div className="flex justify-end gap-2 pt-1 border-t border-blush-200/50">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDecline(enq.id, enq.customerName)}
                        className="text-rose-600 border-rose-200 hover:bg-rose-50"
                      >
                        Decline
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => openQuoteModal(enq)}
                        leftIcon={<Send className="w-3.5 h-3.5" />}
                      >
                        Send Quotation
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Right: Confirmed Bookings */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-blush-100">
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-emerald-600" />
                <h3 className="font-serif text-lg font-bold text-mauve-900">
                  Confirmed Dates ({confirmedBookings.length})
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              {confirmedBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-1.5"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-emerald-950">{b.customerName}</h4>
                    <span className="text-xs font-bold text-emerald-800">{formatINR(b.quotationAmount || 0)}</span>
                  </div>
                  <p className="text-xs text-emerald-800">
                    Wedding Day: <strong>{formatDate(b.proposedDate)}</strong>
                  </p>
                  <p className="text-[11px] text-emerald-600">
                    Phone: {b.customerPhone} • Package: {b.selectedPackage}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Quotation Proposal Modal */}
      <Modal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        title={`Send Quotation to ${selectedEnquiry?.customerName}`}
        subtitle="Provide customized pricing and service deliverables"
      >
        <form onSubmit={handleSendQuote} className="space-y-4">
          <div className="p-3 rounded-xl bg-blush-50 text-xs text-mauve-700 space-y-1">
            <p><strong>Proposed Wedding Date:</strong> {formatDate(selectedEnquiry?.proposedDate)}</p>
            <p><strong>Customer Note:</strong> "{selectedEnquiry?.message}"</p>
          </div>

          <Input
            label="Total Quotation Amount (₹ INR)"
            type="number"
            value={quotationAmount}
            onChange={(e) => setQuotationAmount(Number(e.target.value))}
            required
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-mauve-700">
              Quotation Inclusions & Terms
            </label>
            <textarea
              rows={3}
              value={quotationNotes}
              onChange={(e) => setQuotationNotes(e.target.value)}
              placeholder="e.g. Includes 2 candid photographers, full 4K cinema reel, and 2 luxury photo albums."
              required
              className="w-full bg-white border border-blush-300 rounded-xl p-3 text-sm text-mauve-900 outline-none focus:border-roseGold-400"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setQuoteModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Send Quotation Proposal
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
