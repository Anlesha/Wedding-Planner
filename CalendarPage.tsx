import React, { useState } from 'react';
import { useWedding } from '../../contexts/WeddingContext';
import { formatDate } from '../../utils/formatters';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  AlertCircle,
  CheckCircle2,
  Wallet,
  Sparkles,
  MapPin
} from 'lucide-react';

interface CustomEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: 'milestone' | 'task' | 'payment' | 'meeting';
  notes?: string;
}

export const CalendarPage: React.FC = () => {
  const { wedding, tasks, expenses, bookings } = useWedding();

  const [customEvents, setCustomEvents] = useState<CustomEvent[]>([
    {
      id: 'evt-1',
      title: 'Grand Wedding & Reception (Aarav & Meera)',
      date: wedding.weddingDate || '2026-12-18',
      time: '10:00 AM - 11:00 PM',
      type: 'milestone',
      notes: `${wedding.venueName}, ${wedding.city}`,
    },
    {
      id: 'evt-2',
      title: 'Sangeet & Cocktail Night',
      date: '2026-12-17',
      time: '07:00 PM onwards',
      type: 'milestone',
      notes: 'Colosseum Ballroom, Corinthians Resort',
    },
    {
      id: 'evt-3',
      title: 'Haldi & Phoolon Ki Holi Ceremony',
      date: '2026-12-17',
      time: '11:00 AM',
      type: 'milestone',
      notes: 'Alexandria Poolside Lawn',
    },
    {
      id: 'evt-4',
      title: 'Venue Interim Payment Due (Corinthians)',
      date: '2026-11-15',
      time: 'All day',
      type: 'payment',
      notes: '₹5,50,000 balance installment',
    },
    {
      id: 'evt-5',
      title: 'Bridal Airbrush Trial with Ananya',
      date: '2026-11-10',
      time: '03:00 PM',
      type: 'meeting',
      notes: 'Aundh studio consultation',
    }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('2026-12-01');
  const [eventTime, setEventTime] = useState('04:00 PM');
  const [eventType, setEventType] = useState<'milestone' | 'task' | 'payment' | 'meeting'>('meeting');
  const [eventNotes, setEventNotes] = useState('');

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvt: CustomEvent = {
      id: `evt-${Date.now()}`,
      title: eventTitle,
      date: eventDate,
      time: eventTime,
      type: eventType,
      notes: eventNotes,
    };
    setCustomEvents([...customEvents, newEvt]);
    setEventTitle('');
    setEventNotes('');
    setModalOpen(false);
  };

  // Compile all calendar items (custom events + task deadlines + expense dues)
  const allTimelineItems = [
    ...customEvents,
    ...tasks.map(t => ({
      id: t.id,
      title: `Task Due: ${t.title}`,
      date: t.dueDate,
      time: undefined as string | undefined,
      type: 'task' as const,
      notes: `Category: ${t.category}`,
    })),
    ...expenses.filter(e => e.paymentStatus !== 'paid').map(e => ({
      id: e.id,
      title: `Payment Due: ${e.title}`,
      date: e.dueDate,
      time: undefined as string | undefined,
      type: 'payment' as const,
      notes: `Unpaid: ₹${(e.actualCost - e.paidAmount).toLocaleString('en-IN')}`,
    }))
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="roseGold">Schedule & Reminders</Badge>
          <h1 className="font-serif text-3xl font-bold text-mauve-900 mt-1">
            Wedding Calendar & Milestones
          </h1>
          <p className="text-xs text-mauve-500 mt-0.5">
            Key rituals, appointments, task deadlines, and payment due dates
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Add Custom Event
        </Button>
      </div>

      {/* Main Agenda Timeline Card */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-blush-100">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-roseGold-600" />
            <h3 className="font-serif text-lg font-bold text-mauve-900">
              Upcoming Chronological Agenda
            </h3>
          </div>
          <span className="text-xs text-mauve-500">{allTimelineItems.length} scheduled events</span>
        </div>

        <div className="space-y-3">
          {allTimelineItems.map((item) => {
            const isMilestone = item.type === 'milestone';
            const isPayment = item.type === 'payment';
            const isTask = item.type === 'task';

            const borderClass = isMilestone
              ? 'border-roseGold-400 bg-roseGold-50/50'
              : isPayment
              ? 'border-amber-300 bg-amber-50/40'
              : isTask
              ? 'border-blue-200 bg-blue-50/30'
              : 'border-blush-200 bg-white';

            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${borderClass}`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                    isMilestone
                      ? 'bg-roseGold-500 text-white shadow-xs'
                      : isPayment
                      ? 'bg-amber-500 text-white'
                      : 'bg-mauve-200 text-mauve-800'
                  }`}>
                    {new Date(item.date).getDate() || '—'}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif text-sm font-bold text-mauve-900">{item.title}</h4>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.2 rounded-full ${
                        isMilestone
                          ? 'bg-roseGold-200 text-roseGold-900'
                          : isPayment
                          ? 'bg-amber-200 text-amber-900'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    {item.notes && <p className="text-xs text-mauve-600">{item.notes}</p>}
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0 text-xs text-mauve-500 font-medium">
                  <p className="font-semibold text-mauve-900">{formatDate(item.date)}</p>
                  {item.time && <p className="text-[11px] text-mauve-400 flex items-center sm:justify-end gap-1">
                    <Clock className="w-3 h-3 text-roseGold-500" /> {item.time}
                  </p>}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Add Custom Event Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Schedule Wedding Event"
        subtitle="Add vendor fittings, ritual timings, or parent meetings"
      >
        <form onSubmit={handleAddEvent} className="space-y-4">
          <Input
            label="Event Title"
            placeholder="e.g. Sangeet Dance Rehearsal / Food Tasting"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Date"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
            <Input
              label="Time"
              placeholder="e.g. 05:00 PM"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
            />
          </div>

          <Select
            label="Event Category"
            value={eventType}
            onChange={(e) => setEventType(e.target.value as any)}
            options={[
              { value: 'meeting', label: 'Vendor Meeting / Fitting' },
              { value: 'milestone', label: 'Ceremony / Ritual Milestone' },
              { value: 'payment', label: 'Payment Due Date' },
              { value: 'task', label: 'Planning To-Do' },
            ]}
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-mauve-700">
              Location or Notes
            </label>
            <textarea
              rows={2}
              value={eventNotes}
              onChange={(e) => setEventNotes(e.target.value)}
              placeholder="e.g. Meeting with Rohan Deshpande at Corinthians"
              className="w-full bg-white border border-blush-300 rounded-xl p-3 text-sm text-mauve-900 outline-none focus:border-roseGold-400"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add to Calendar
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
