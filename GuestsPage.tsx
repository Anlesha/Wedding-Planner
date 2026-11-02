import React, { useState, useMemo } from 'react';
import { useWedding } from '../../contexts/WeddingContext';
import { useToast } from '../../contexts/ToastContext';
import { Guest, GuestGroup, RsvpStatus } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { EmptyState } from '../../components/ui/EmptyState';
import {
  Users,
  Plus,
  Search,
  Download,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  XCircle,
  Phone,
  Mail,
  Utensils
} from 'lucide-react';

export const GuestsPage: React.FC = () => {
  const { wedding, guests, addGuest, updateGuest, deleteGuest, guestStats } = useWedding();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterRsvp, setFilterRsvp] = useState<string>('All');
  const [filterGroup, setFilterGroup] = useState<string>('All');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingGuestId, setEditingGuestId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [group, setGroup] = useState<GuestGroup>('Friends');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState<RsvpStatus>('pending');
  const [plusOnes, setPlusOnes] = useState(0);
  const [dietary, setDietary] = useState('Vegetarian');
  const [tableNumber, setTableNumber] = useState('');

  const openAddModal = () => {
    setEditingGuestId(null);
    setName('');
    setGroup('Friends');
    setPhone('');
    setEmail('');
    setRsvpStatus('pending');
    setPlusOnes(0);
    setDietary('Vegetarian');
    setTableNumber('');
    setModalOpen(true);
  };

  const openEditModal = (g: Guest) => {
    setEditingGuestId(g.id);
    setName(g.name);
    setGroup(g.group);
    setPhone(g.phone || '');
    setEmail(g.email || '');
    setRsvpStatus(g.rsvpStatus);
    setPlusOnes(g.plusOnes || 0);
    setDietary(g.dietaryRestrictions || '');
    setTableNumber(g.tableNumber || '');
    setModalOpen(true);
  };

  const handleSaveGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGuestId) {
      updateGuest(editingGuestId, {
        name,
        group,
        phone,
        email,
        rsvpStatus,
        plusOnes: Number(plusOnes),
        dietaryRestrictions: dietary,
        tableNumber,
      });
    } else {
      addGuest({
        weddingId: wedding.id,
        name,
        group,
        phone,
        email,
        rsvpStatus,
        plusOnes: Number(plusOnes),
        dietaryRestrictions: dietary,
        tableNumber,
      });
    }
    setModalOpen(false);
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Group', 'RSVP Status', 'Plus Ones', 'Phone', 'Email', 'Dietary Notes', 'Table'];
    const rows = guests.map(g => [
      `"${g.name}"`,
      `"${g.group}"`,
      `"${g.rsvpStatus}"`,
      g.plusOnes,
      `"${g.phone || ''}"`,
      `"${g.email || ''}"`,
      `"${g.dietaryRestrictions || ''}"`,
      `"${g.tableNumber || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MarryOn_Guest_List_${wedding.coupleNames.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Guest list exported to CSV successfully!', 'success');
  };

  const filteredGuests = useMemo(() => {
    return guests.filter((g) => {
      if (filterRsvp !== 'All' && g.rsvpStatus !== filterRsvp) return false;
      if (filterGroup !== 'All' && g.group !== filterGroup) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = g.name.toLowerCase().includes(q);
        const matchPhone = g.phone?.includes(q);
        const matchTable = g.tableNumber?.toLowerCase().includes(q);
        if (!matchName && !matchPhone && !matchTable) return false;
      }
      return true;
    });
  }, [guests, filterRsvp, filterGroup, searchQuery]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="roseGold">Attendee Management</Badge>
          <h1 className="font-serif text-3xl font-bold text-mauve-900 mt-1">
            Guest List & RSVP Tracking
          </h1>
          <p className="text-xs text-mauve-500 mt-0.5">
            Target headcount: {wedding.estimatedGuests} guests for catering planning
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-white"
            onClick={handleExportCSV}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export CSV
          </Button>
          <Button variant="primary" size="sm" onClick={openAddModal} leftIcon={<Plus className="w-4 h-4" />}>
            Add Guest
          </Button>
        </div>
      </div>

      {/* Stats KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 space-y-1">
          <span className="text-xs font-semibold text-mauve-500 uppercase">Total Headcount</span>
          <p className="font-serif text-2xl font-bold text-mauve-900">{guestStats.totalInvited}</p>
          <div className="text-[10px] text-mauve-400">{guests.length} invitation entries</div>
        </Card>

        <Card className="p-4 space-y-1 bg-emerald-50/50 border-emerald-200">
          <span className="text-xs font-semibold text-emerald-700 uppercase">Confirmed RSVP</span>
          <p className="font-serif text-2xl font-bold text-emerald-800">{guestStats.confirmed}</p>
          <div className="text-[10px] text-emerald-600 font-medium">Ready for catering plates</div>
        </Card>

        <Card className="p-4 space-y-1 bg-amber-50/50 border-amber-200">
          <span className="text-xs font-semibold text-amber-700 uppercase">Awaiting Response</span>
          <p className="font-serif text-2xl font-bold text-amber-800">{guestStats.pending}</p>
          <div className="text-[10px] text-amber-600 font-medium">Follow-ups needed</div>
        </Card>

        <Card className="p-4 space-y-1 bg-rose-50/50 border-rose-200">
          <span className="text-xs font-semibold text-rose-700 uppercase">Declined</span>
          <p className="font-serif text-2xl font-bold text-rose-800">{guestStats.declined}</p>
          <div className="text-[10px] text-rose-600 font-medium">Cannot attend</div>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search by guest name, phone, table number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>

        <div className="w-full sm:w-44">
          <Select
            value={filterRsvp}
            onChange={(e) => setFilterRsvp(e.target.value)}
            options={[
              { value: 'All', label: 'All RSVPs' },
              { value: 'confirmed', label: 'Confirmed' },
              { value: 'pending', label: 'Pending' },
              { value: 'declined', label: 'Declined' },
            ]}
          />
        </div>

        <div className="w-full sm:w-48">
          <Select
            value={filterGroup}
            onChange={(e) => setFilterGroup(e.target.value)}
            options={[
              { value: 'All', label: 'All Groups' },
              { value: 'Bride Family', label: 'Bride Family' },
              { value: 'Groom Family', label: 'Groom Family' },
              { value: 'Friends', label: 'Friends' },
              { value: 'Colleagues', label: 'Colleagues' },
              { value: 'VIP', label: 'VIP Guests' },
            ]}
          />
        </div>
      </div>

      {/* Guest Table */}
      <Card className="p-0 overflow-hidden">
        {filteredGuests.length === 0 ? (
          <EmptyState
            icon={<Users className="w-8 h-8" />}
            title="No guests found"
            description="No entries match your search query or RSVP filter."
            actionLabel="Add Guest"
            onAction={openAddModal}
            className="my-8"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-mauve-800">
              <thead className="bg-blush-50/70 uppercase tracking-wider text-[11px] text-mauve-500 font-semibold border-b border-blush-100">
                <tr>
                  <th className="py-3 px-4">Guest Name</th>
                  <th className="py-3 px-4">Family / Group</th>
                  <th className="py-3 px-4">Headcount (+Ones)</th>
                  <th className="py-3 px-4">RSVP Status</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Dietary Notes</th>
                  <th className="py-3 px-4">Table</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blush-100">
                {filteredGuests.map((g) => (
                  <tr key={g.id} className="hover:bg-blush-50/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-mauve-900">{g.name}</td>
                    <td className="py-3.5 px-4">
                      <Badge variant="blush" size="sm">{g.group}</Badge>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-mauve-700">
                      {1 + (g.plusOnes || 0)} {g.plusOnes > 0 ? `(1 + ${g.plusOnes})` : ''}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        g.rsvpStatus === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : g.rsvpStatus === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {g.rsvpStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-mauve-500">
                      {g.phone || g.email || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-mauve-600">
                      {g.dietaryRestrictions || 'Standard'}
                    </td>
                    <td className="py-3.5 px-4 text-roseGold-700 font-semibold">
                      {g.tableNumber || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      <button
                        onClick={() => openEditModal(g)}
                        className="p-1.5 text-mauve-400 hover:text-roseGold-700 hover:bg-blush-100 rounded-lg transition-colors"
                        title="Edit guest"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete guest record for "${g.name}"?`)) {
                            deleteGuest(g.id);
                          }
                        }}
                        className="p-1.5 text-mauve-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete guest"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Add / Edit Guest Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingGuestId ? 'Edit Guest' : 'Add Guest to List'}
        subtitle="Manage RSVP confirmations, seating, and food preferences"
      >
        <form onSubmit={handleSaveGuest} className="space-y-4">
          <Input
            label="Guest Full Name / Family Head"
            placeholder="e.g. Suresh & Sunita Kulkarni"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Group / Affiliation"
              value={group}
              onChange={(e) => setGroup(e.target.value as GuestGroup)}
              options={[
                { value: 'Bride Family', label: 'Bride Family' },
                { value: 'Groom Family', label: 'Groom Family' },
                { value: 'Friends', label: 'Friends' },
                { value: 'Colleagues', label: 'Colleagues' },
                { value: 'VIP', label: 'VIP Guests' },
              ]}
            />
            <Select
              label="RSVP Status"
              value={rsvpStatus}
              onChange={(e) => setRsvpStatus(e.target.value as RsvpStatus)}
              options={[
                { value: 'confirmed', label: 'Confirmed Attending' },
                { value: 'pending', label: 'Pending Response' },
                { value: 'declined', label: 'Declined' },
              ]}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Plus-Ones / Family Members"
              type="number"
              min="0"
              value={plusOnes}
              onChange={(e) => setPlusOnes(Number(e.target.value))}
              helperText="E.g., 2 if coming with spouse & child"
            />
            <Input
              label="Assigned Table / Seating"
              placeholder="e.g. Table 1 - VIP"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Phone Number"
              placeholder="+91 98220 12345"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="guest@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Input
            label="Dietary Restrictions / Preferences"
            placeholder="e.g. Jain Vegetarian / Pure Veg / No Onion Garlic"
            value={dietary}
            onChange={(e) => setDietary(e.target.value)}
          />

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingGuestId ? 'Update Guest' : 'Save Guest'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
