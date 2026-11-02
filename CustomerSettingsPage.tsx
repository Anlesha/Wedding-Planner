import React, { useState } from 'react';
import { useWedding } from '../../contexts/WeddingContext';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { User, Calendar, MapPin, Wallet, Users, Save, Lock } from 'lucide-react';

export const CustomerSettingsPage: React.FC = () => {
  const { wedding, updateWedding } = useWedding();
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();

  const [partner1, setPartner1] = useState(wedding.partner1Name || 'Aarav Sharma');
  const [partner2, setPartner2] = useState(wedding.partner2Name || 'Meera Kulkarni');
  const [weddingDate, setWeddingDate] = useState(wedding.weddingDate || '2026-12-18');
  const [city, setCity] = useState(wedding.city || 'Pune');
  const [venueName, setVenueName] = useState(wedding.venueName || 'The Corinthians Resort & Club');
  const [totalBudget, setTotalBudget] = useState(wedding.totalBudget || 2500000);
  const [estimatedGuests, setEstimatedGuests] = useState(wedding.estimatedGuests || 350);
  const [weddingStyle, setWeddingStyle] = useState(wedding.weddingStyle || 'Royal Maharashtrian Elegance');

  const [userName, setUserName] = useState(user?.name || 'Aarav & Meera');
  const [userEmail, setUserEmail] = useState(user?.email || 'aarav.meera@marryon.app');
  const [userPhone, setUserPhone] = useState(user?.phone || '+91 98220 99999');

  const handleSaveWedding = (e: React.FormEvent) => {
    e.preventDefault();
    updateWedding({
      partner1Name: partner1,
      partner2Name: partner2,
      coupleNames: `${partner1.split(' ')[0]} & ${partner2.split(' ')[0]}`,
      weddingDate,
      city,
      venueName,
      totalBudget: Number(totalBudget),
      estimatedGuests: Number(estimatedGuests),
      weddingStyle,
    });
    updateUser({ name: userName, phone: userPhone });
    showToast('Wedding settings and profile updated!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <Badge variant="roseGold">Workspace Configuration</Badge>
        <h1 className="font-serif text-3xl font-bold text-mauve-900 mt-1">
          Wedding Settings & Profile
        </h1>
        <p className="text-xs text-mauve-500 mt-0.5">
          Update event dates, location, target budget, and contact info
        </p>
      </div>

      <form onSubmit={handleSaveWedding} className="space-y-6">
        {/* Couple & Date */}
        <Card className="p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold text-mauve-900 flex items-center gap-2">
            <User className="w-4 h-4 text-roseGold-600" /> Couple Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Partner 1 Name"
              value={partner1}
              onChange={(e) => setPartner1(e.target.value)}
              required
            />
            <Input
              label="Partner 2 Name"
              value={partner2}
              onChange={(e) => setPartner2(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Wedding Date"
              type="date"
              value={weddingDate}
              onChange={(e) => setWeddingDate(e.target.value)}
              required
            />
            <Select
              label="Wedding Theme / Aesthetic"
              value={weddingStyle}
              onChange={(e) => setWeddingStyle(e.target.value)}
              options={[
                { value: 'Royal Maharashtrian Elegance', label: 'Royal Maharashtrian Elegance' },
                { value: 'Palace Heritage Regal', label: 'Palace Heritage Regal' },
                { value: 'Tropical Beach Sunset', label: 'Tropical Beach Sunset' },
                { value: 'Modern Minimalist Intimate', label: 'Modern Minimalist Intimate' },
              ]}
            />
          </div>
        </Card>

        {/* Location & Budget */}
        <Card className="p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold text-mauve-900 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-roseGold-600" /> Venue & Budget Targets
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              options={[
                { value: 'Pune', label: 'Pune, Maharashtra' },
                { value: 'Mumbai', label: 'Mumbai, Maharashtra' },
                { value: 'Goa', label: 'Goa' },
                { value: 'Jaipur', label: 'Jaipur, Rajasthan' },
                { value: 'Udaipur', label: 'Udaipur, Rajasthan' },
              ]}
            />
            <Input
              label="Venue Name"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Total Wedding Budget (₹ INR)"
              type="number"
              value={totalBudget}
              onChange={(e) => setTotalBudget(Number(e.target.value))}
              required
            />
            <Input
              label="Estimated Guest Count"
              type="number"
              value={estimatedGuests}
              onChange={(e) => setEstimatedGuests(Number(e.target.value))}
              required
            />
          </div>
        </Card>

        {/* Contact info */}
        <Card className="p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold text-mauve-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-roseGold-600" /> Account & Contact Info
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Display Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <Input
              label="Email Address"
              value={userEmail}
              disabled
              helperText="Managed by account authentication"
            />
          </div>

          <Input
            label="Phone Number"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
          />
        </Card>

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="primary" size="lg" leftIcon={<Save className="w-4 h-4" />}>
            Save All Settings
          </Button>
        </div>
      </form>
    </div>
  );
};
