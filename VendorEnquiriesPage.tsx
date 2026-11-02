import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { useToast } from '../../contexts/ToastContext';
import { formatINR, formatDate } from '../../utils/formatters';
import { BookingStatus } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { MessageSquare, Send, CheckCircle2, XCircle, Phone, Mail, Calendar } from 'lucide-react';

export const VendorEnquiriesPage: React.FC = () => {
  const { showToast } = useToast();
  const vendor = storageService.getVendorById('ven-001')!;
  const allBookings = storageService.getBookings();
  const vendorBookings = allBookings.filter((b) => b.vendorId === vendor.id);

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [activeEnquiry, setActiveEnquiry] = useState<any>(null);
  const [quotationAmount, setQuotationAmount] = useState<number>(150000);
  const [quotationNotes, setQuotationNotes] = useState('');

  const openQuoteModal = (enq: any) => {
    setActiveEnquiry(enq);
    setQuotationAmount(enq.quotationAmount || enq.estimatedBudget || 150000);
    setQuotationNotes(enq.quotationNotes || `Coverage for ${enq.customerName} on ${formatDate(enq.proposedDate)}.`);
    setQuoteModalOpen(true);
  };

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEnquiry) return;

    storageService.updateBookingStatus(
      activeEnquiry.id,
      'accepted',
      Number(quotationAmount),
      quotationNotes
    );

    showToast(`Quotation of ${formatINR(quotationAmount)} sent to ${activeEnquiry.customerName}!`, 'success');
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
      <div>
        <Badge variant="roseGold">Lead Pipeline</Badge>
        <h1 className="font-serif text-3xl font-bold text-mauve-900 mt-1">
          Wedding Enquiries & Bookings ({vendorBookings.length})
        </h1>
        <p className="text-xs text-mauve-500 mt-0.5">
          Respond to prospective couples with itemized quotes and confirm reservations
        </p>
      </div>

      <div className="space-y-4">
        {vendorBookings.map((b) => (
          <Card key={b.id} className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-blush-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-lg font-bold text-mauve-900">{b.customerName}</h3>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    b.status === 'confirmed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : b.status === 'accepted'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {b.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-mauve-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-roseGold-500" /> Wedding: {formatDate(b.proposedDate)}
                  </span>
                  <span>•</span>
                  <span>Guests: {b.guestCount || '350'}</span>
                </div>
              </div>

              {b.quotationAmount && (
                <div className="sm:text-right">
                  <span className="text-[10px] text-mauve-400 uppercase font-semibold">Active Quote</span>
                  <p className="font-serif text-2xl font-bold text-roseGold-700">{formatINR(b.quotationAmount)}</p>
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-blush-50/60 border border-blush-100 text-xs space-y-2">
              <p className="text-mauve-800">
                <strong>Couple Requirements:</strong> "{b.message}"
              </p>
              {b.quotationNotes && (
                <p className="text-emerald-900 border-t border-blush-200/50 pt-2">
                  <strong>Your Proposed Quotation Notes:</strong> {b.quotationNotes}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-4 text-xs text-mauve-500">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-roseGold-600" /> {b.customerPhone}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-roseGold-600" /> {b.customerEmail}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {b.status !== 'confirmed' && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDecline(b.id, b.customerName)}
                      className="text-rose-600 border-rose-200 hover:bg-rose-50"
                    >
                      Decline
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => openQuoteModal(b)}
                      leftIcon={<Send className="w-3.5 h-3.5" />}
                    >
                      {b.status === 'accepted' ? 'Revise Quotation' : 'Send Quotation'}
                    </Button>
                  </>
                )}
                {b.status === 'confirmed' && (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-800 font-bold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Booking Confirmed
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quote Modal */}
      <Modal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        title={`Quotation for ${activeEnquiry?.customerName}`}
        subtitle="Set pricing and deliverable specifications"
      >
        <form onSubmit={handleSendQuote} className="space-y-4">
          <Input
            label="Total Quotation Amount (₹ INR)"
            type="number"
            value={quotationAmount}
            onChange={(e) => setQuotationAmount(Number(e.target.value))}
            required
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-mauve-700">
              Quotation Inclusions & Deliverables
            </label>
            <textarea
              rows={3}
              value={quotationNotes}
              onChange={(e) => setQuotationNotes(e.target.value)}
              placeholder="e.g. 2 Candid photographers, 1 traditional videographer, 4K teaser, 2 photo albums."
              required
              className="w-full bg-white border border-blush-300 rounded-xl p-3 text-sm text-mauve-900 outline-none focus:border-roseGold-400"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setQuoteModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Send Quotation
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
