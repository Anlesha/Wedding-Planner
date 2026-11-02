import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { useToast } from '../../contexts/ToastContext';
import { formatINR } from '../../utils/formatters';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Briefcase, MapPin, Phone, Mail, Globe, Save, ShieldCheck } from 'lucide-react';

export const VendorProfilePage: React.FC = () => {
  const { showToast } = useToast();
  const vendor = storageService.getVendorById('ven-001')!;

  const [businessName, setBusinessName] = useState(vendor.businessName);
  const [tagline, setTagline] = useState(vendor.tagline);
  const [description, setDescription] = useState(vendor.description);
  const [city, setCity] = useState(vendor.city);
  const [address, setAddress] = useState(vendor.address);
  const [serviceArea, setServiceArea] = useState(vendor.serviceArea);
  const [startingPrice, setStartingPrice] = useState(vendor.startingPrice);
  const [phone, setPhone] = useState(vendor.phone);
  const [email, setEmail] = useState(vendor.email);
  const [website, setWebsite] = useState(vendor.website || '');
  const [experienceYears, setExperienceYears] = useState(vendor.experienceYears);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.updateVendor('ven-001', {
      businessName,
      tagline,
      description,
      city,
      address,
      serviceArea,
      startingPrice: Number(startingPrice),
      phone,
      email,
      website,
      experienceYears: Number(experienceYears),
    });
    showToast('Business profile updated successfully!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <Badge variant="roseGold">Vendor Management</Badge>
        <h1 className="font-serif text-3xl font-bold text-mauve-900 mt-1">
          Business Profile & Public Listing
        </h1>
        <p className="text-xs text-mauve-500 mt-0.5">
          Information displayed on your public storefront across the marketplace
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold text-mauve-900 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-roseGold-600" /> Core Studio Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Business / Studio Name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
            />
            <Input
              label="Starting Base Package Price (₹)"
              type="number"
              value={startingPrice}
              onChange={(e) => setStartingPrice(Number(e.target.value))}
              required
            />
          </div>

          <Input
            label="Tagline / Hero Hook"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            required
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-mauve-700">
              Comprehensive Bio & Philosophy
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full bg-white border border-blush-300 rounded-xl p-3 text-sm text-mauve-900 outline-none focus:border-roseGold-400"
            />
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold text-mauve-900 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-roseGold-600" /> Location & Service Area
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Base City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <Input
              label="Service Coverage Areas"
              value={serviceArea}
              onChange={(e) => setServiceArea(e.target.value)}
              placeholder="e.g. Pune, Mumbai, Goa, Destination"
              required
            />
          </div>

          <Input
            label="Studio / Office Street Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold text-mauve-900 flex items-center gap-2">
            <Phone className="w-4 h-4 text-roseGold-600" /> Contact & Web Presence
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Direct Phone / WhatsApp"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <Input
              label="Business Inquiries Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Website or Portfolio Link"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="lg" leftIcon={<Save className="w-4 h-4" />}>
            Save Profile Updates
          </Button>
        </div>
      </form>
    </div>
  );
};
