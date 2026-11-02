import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../../services/storageService';
import { useToast } from '../../contexts/ToastContext';
import { VendorCategory } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Sparkles, Store, MapPin, Briefcase, FileCheck, ArrowRight } from 'lucide-react';

export const VendorOnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [businessName, setBusinessName] = useState('ShutterCraft Pune');
  const [category, setCategory] = useState<VendorCategory>('Photography');
  const [tagline, setTagline] = useState('Candid wedding moments captured with heart');
  const [description, setDescription] = useState('Experienced wedding photography crew providing traditional, candid, and cinematic films.');
  const [city, setCity] = useState('Pune');
  const [serviceArea, setServiceArea] = useState('Pune, Mumbai, Lonavala');
  const [startingPrice, setStartingPrice] = useState(50000);
  const [phone, setPhone] = useState('+91 98220 54321');
  const [gstNumber, setGstNumber] = useState('27AAACR1234F1Z9');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // Save new vendor profile into mock database
      const newVendorId = `ven-${Date.now()}`;
      storageService.updateVendor('ven-001', {
        businessName,
        category,
        tagline,
        description,
        city,
        serviceArea,
        startingPrice: Number(startingPrice),
        phone,
      });

      // Submit verification request
      storageService.submitVerificationRequest({
        vendorId: 'ven-001',
        businessName,
        category,
        documentType: 'GST_Certificate',
        documentName: `GSTIN_${gstNumber}.pdf`,
      });

      setIsLoading(false);
      showToast('Vendor profile created & verification document submitted!', 'success');
      navigate('/vendor/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-warmBg py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-roseGold-100 flex items-center justify-center text-roseGold-600 mx-auto">
            <Store className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-mauve-900">Vendor Partner Onboarding</h1>
          <p className="text-xs text-mauve-500">Set up your business listing on the MarryOn platform</p>
        </div>

        <Card className="p-8 shadow-premium space-y-5 bg-white/95">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Business / Studio Name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />
              <Select
                label="Primary Category"
                value={category}
                onChange={(e) => setCategory(e.target.value as VendorCategory)}
                options={[
                  { value: 'Photography', label: 'Photography' },
                  { value: 'Venue', label: 'Venue' },
                  { value: 'Catering', label: 'Catering' },
                  { value: 'Decoration', label: 'Decoration & Mandap' },
                  { value: 'Makeup', label: 'Bridal Makeup' },
                  { value: 'Clothing', label: 'Attire & Jewelry' },
                  { value: 'Music & DJ', label: 'Music & DJ' },
                  { value: 'Wedding Planner', label: 'Wedding Planner' },
                ]}
              />
            </div>

            <Input
              label="Tagline / Catchphrase"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Authentic Maharashtrian Feasts"
              required
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-mauve-700">
                Detailed Business Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full bg-white border border-blush-300 rounded-xl p-3 text-sm text-mauve-900 outline-none focus:border-roseGold-400 focus:ring-2 focus:ring-roseGold-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Base City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                leftIcon={<MapPin className="w-4 h-4" />}
                required
              />
              <Input
                label="Starting Price (₹ INR)"
                type="number"
                value={startingPrice}
                onChange={(e) => setStartingPrice(Number(e.target.value))}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Direct WhatsApp / Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <Input
                label="GSTIN or Business Registration"
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value)}
                leftIcon={<FileCheck className="w-4 h-4" />}
                helperText="Required for Verified Badge review"
                required
              />
            </div>

            <div className="pt-3">
              <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isLoading} rightIcon={<ArrowRight className="w-4 h-4" />}>
                Complete Profile & Open Vendor Console
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
