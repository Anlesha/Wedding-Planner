import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Settings, Lock, Bell, Store, Save } from 'lucide-react';

export const VendorSettingsPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(user?.name || 'Rohan Deshpande');
  const [email] = useState(user?.email || 'rohan@deshpandephoto.com');
  const [phone, setPhone] = useState(user?.phone || '+91 98230 45678');
  const [notifyOnEnquiry, setNotifyOnEnquiry] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, phone });
    showToast('Vendor account preferences updated!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <Badge variant="roseGold">Security & Alerts</Badge>
        <h1 className="font-serif text-3xl font-bold text-mauve-900 mt-1">
          Vendor Account Settings
        </h1>
        <p className="text-xs text-mauve-500 mt-0.5">
          Manage your login credentials, notifications, and security
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold text-mauve-900 flex items-center gap-2">
            <Store className="w-4 h-4 text-roseGold-600" /> Account Owner Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Primary Contact Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Account Email"
              value={email}
              disabled
              helperText="Verified vendor login email"
            />
          </div>

          <Input
            label="Direct Mobile / WhatsApp"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold text-mauve-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-roseGold-600" /> Notification Channels
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-2.5 text-mauve-800 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyOnEnquiry}
                onChange={(e) => setNotifyOnEnquiry(e.target.checked)}
                className="accent-roseGold-500 rounded"
              />
              <span>Send instant notification banner when a couple sends a new wedding enquiry</span>
            </label>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="lg" leftIcon={<Save className="w-4 h-4" />}>
            Save Account Settings
          </Button>
        </div>
      </form>
    </div>
  );
};
