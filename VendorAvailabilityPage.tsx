import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { useToast } from '../../contexts/ToastContext';
import { formatDate } from '../../utils/formatters';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { CalendarCheck, AlertCircle, Plus, CheckCircle2, XCircle } from 'lucide-react';

export const VendorAvailabilityPage: React.FC = () => {
  const { showToast } = useToast();
  const vendor = storageService.getVendorById('ven-001')!;
  const allBookings = storageService.getBookings().filter(b => b.vendorId === vendor.id);

  const [availableDates, setAvailableDates] = useState<string[]>(vendor.availableDates);
  const [unavailableDates, setUnavailableDates] = useState<string[]>(vendor.unavailableDates);
  const [newDate, setNewDate] = useState('2026-12-24');
  const [dateType, setDateType] = useState<'available' | 'blocked'>('blocked');

  const handleAddDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate) return;

    if (dateType === 'available') {
      if (availableDates.includes(newDate)) return;
      const updated = [...availableDates, newDate];
      setAvailableDates(updated);
      storageService.updateVendor(vendor.id, { availableDates: updated });
      showToast(`Marked ${formatDate(newDate)} as Available!`, 'success');
    } else {
      if (unavailableDates.includes(newDate)) return;
      const updated = [...unavailableDates, newDate];
      setUnavailableDates(updated);
      storageService.updateVendor(vendor.id, { unavailableDates: updated });
      showToast(`Blocked ${formatDate(newDate)} (Unavailable)`, 'info');
    }
  };

  const handleRemoveDate = (date: string, type: 'available' | 'blocked') => {
    if (type === 'available') {
      const updated = availableDates.filter(d => d !== date);
      setAvailableDates(updated);
      storageService.updateVendor(vendor.id, { availableDates: updated });
    } else {
      const updated = unavailableDates.filter(d => d !== date);
      setUnavailableDates(updated);
      storageService.updateVendor(vendor.id, { unavailableDates: updated });
    }
    showToast('Date entry removed', 'info');
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      <div>
        <Badge variant="roseGold">Calendar Management</Badge>
        <h1 className="font-serif text-3xl font-bold text-mauve-900 mt-1">
          Availability & Blackout Dates
        </h1>
        <p className="text-xs text-mauve-500 mt-0.5">
          Couples cannot submit booking enquiries for dates marked blocked or booked
        </p>
      </div>

      {/* Date Add Form */}
      <Card className="p-6">
        <form onSubmit={handleAddDate} className="flex flex-col sm:flex-row items-end gap-4">
          <div className="flex-1 w-full">
            <Input
              label="Select Date"
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              required
            />
          </div>

          <div className="w-full sm:w-48">
            <label className="block text-xs font-semibold uppercase tracking-wider text-mauve-700 mb-1.5">
              Status
            </label>
            <div className="grid grid-cols-2 gap-1 p-1 bg-blush-100 rounded-xl border border-blush-200">
              <button
                type="button"
                onClick={() => setDateType('available')}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  dateType === 'available' ? 'bg-white text-emerald-800 shadow-xs' : 'text-mauve-600'
                }`}
              >
                Available
              </button>
              <button
                type="button"
                onClick={() => setDateType('blocked')}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  dateType === 'blocked' ? 'bg-white text-rose-800 shadow-xs' : 'text-mauve-600'
                }`}
              >
                Blocked
              </button>
            </div>
          </div>

          <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto" leftIcon={<Plus className="w-4 h-4" />}>
            Add Date Entry
          </Button>
        </form>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Confirmed Bookings & Available Dates */}
        <Card className="p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold text-mauve-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Confirmed Wedding Dates
          </h3>

          <div className="space-y-2">
            {allBookings.filter(b => b.status === 'confirmed').map((b) => (
              <div
                key={b.id}
                className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs flex justify-between items-center"
              >
                <div>
                  <strong className="text-emerald-950 block">{formatDate(b.proposedDate)}</strong>
                  <span className="text-emerald-700">{b.customerName} (Corinthians Resort)</span>
                </div>
                <Badge variant="success" size="sm">Confirmed</Badge>
              </div>
            ))}

            {availableDates.map((date) => (
              <div
                key={date}
                className="p-3 rounded-xl bg-white border border-blush-200 text-xs flex justify-between items-center"
              >
                <div>
                  <strong className="text-mauve-900 block">{formatDate(date)}</strong>
                  <span className="text-emerald-600 font-semibold">Open for New Bookings</span>
                </div>
                <button
                  onClick={() => handleRemoveDate(date, 'available')}
                  className="text-xs text-mauve-400 hover:text-rose-600 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Blackout / Unavailable Dates */}
        <Card className="p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold text-mauve-900 flex items-center gap-2">
            <XCircle className="w-4 h-4 text-rose-600" /> Blocked / Blackout Dates
          </h3>

          <div className="space-y-2">
            {unavailableDates.map((date) => (
              <div
                key={date}
                className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs flex justify-between items-center"
              >
                <div>
                  <strong className="text-rose-950 block">{formatDate(date)}</strong>
                  <span className="text-rose-700">Blocked / Personal Leave</span>
                </div>
                <button
                  onClick={() => handleRemoveDate(date, 'blocked')}
                  className="text-xs text-rose-400 hover:text-rose-800 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
