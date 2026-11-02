import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { useToast } from '../../contexts/ToastContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { PlatformSettings } from '../../types';
import {
  Sliders,
  Save,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Percent,
  Mail,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { showToast } = useToast();
  const [settings, setSettings] = useState<PlatformSettings>(() =>
    storageService.getPlatformSettings()
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      storageService.updatePlatformSettings(settings, 'SuperAdmin');
      showToast('Platform settings saved successfully!', 'success');
    } catch {
      showToast('Failed to save settings', 'error');
    }
  };

  const handleResetData = () => {
    if (
      window.confirm(
        'Are you sure you want to restore all platform demo data? This will reset all sample vendors, bookings, expenses, and logs to initial state.'
      )
    ) {
      storageService.resetDemoData();
      showToast('All demo records reset to initial factory configuration!', 'info');
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-roseGold-100 text-roseGold-800 text-xs font-semibold mb-1">
          <Sliders className="w-3.5 h-3.5" />
          <span>Operations Control</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-mauve-900">
          Platform Configuration & Policies
        </h1>
        <p className="text-xs text-mauve-500 mt-0.5">
          Tune global marketplace rules, financial commission percentages, AI engine toggles, and demo parameters
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings */}
        <Card className="p-6 space-y-4">
          <h3 className="font-serif text-base font-bold text-mauve-900 pb-2 border-b border-blush-100">
            Marketplace Identity & Support
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-mauve-700">Platform Brand Name</label>
              <Input
                type="text"
                value={settings.platformName}
                onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-mauve-700">Support Desk Email</label>
              <Input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                required
              />
            </div>
          </div>
        </Card>

        {/* Financial & Commission Rules */}
        <Card className="p-6 space-y-4">
          <h3 className="font-serif text-base font-bold text-mauve-900 pb-2 border-b border-blush-100">
            Financial & Monetization Rules
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-mauve-700">
                Platform Marketplace Fee (%)
              </label>
              <div className="relative">
                <Input
                  type="number"
                  step="0.5"
                  min="0"
                  max="25"
                  value={settings.commissionRate}
                  onChange={(e) =>
                    setSettings({ ...settings, commissionRate: parseFloat(e.target.value) || 0 })
                  }
                  required
                />
                <Percent className="w-4 h-4 text-mauve-400 absolute right-3 top-3" />
              </div>
              <p className="text-[11px] text-mauve-400">
                Calculated on confirmed quotations for vendor escrow billing
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-mauve-700">Base Currency Display</label>
              <Input type="text" value={settings.currency} disabled className="bg-blush-50/50" />
              <p className="text-[11px] text-mauve-400">Fixed to Indian Rupee (INR ₹) standard</p>
            </div>
          </div>
        </Card>

        {/* Feature Toggles */}
        <Card className="p-6 space-y-4">
          <h3 className="font-serif text-base font-bold text-mauve-900 pb-2 border-b border-blush-100">
            Feature Toggles & Engine Controls
          </h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-warmBg border border-blush-200 cursor-pointer hover:bg-blush-50/50">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-mauve-900 block">
                  AI Smart Wedding Planner Engine
                </span>
                <span className="text-[11px] text-mauve-500">
                  Enables couples to access conversational budget advice and cheaper alternatives discovery
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.enableAiPlanner}
                onChange={(e) => setSettings({ ...settings, enableAiPlanner: e.target.checked })}
                className="w-4 h-4 text-roseGold-600 rounded focus:ring-roseGold-400"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-warmBg border border-blush-200 cursor-pointer hover:bg-blush-50/50">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-mauve-900 block">
                  Require Business Registration / GST for Partner Badge
                </span>
                <span className="text-[11px] text-mauve-500">
                  Enforces manual administrative document audit before assigning green verification checkmark
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.requireVendorGst}
                onChange={(e) => setSettings({ ...settings, requireVendorGst: e.target.checked })}
                className="w-4 h-4 text-roseGold-600 rounded focus:ring-roseGold-400"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-warmBg border border-blush-200 cursor-pointer hover:bg-blush-50/50">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-mauve-900 block">
                  Auto-publish Client Reviews
                </span>
                <span className="text-[11px] text-mauve-500">
                  If disabled, reviews submitted by couples must pass automated keyword audit before appearing publicly
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.autoApproveReviews}
                onChange={(e) => setSettings({ ...settings, autoApproveReviews: e.target.checked })}
                className="w-4 h-4 text-roseGold-600 rounded focus:ring-roseGold-400"
              />
            </label>
          </div>
        </Card>

        {/* Save button */}
        <div className="flex justify-end gap-3">
          <Button type="submit" variant="primary" leftIcon={<Save className="w-4 h-4" />}>
            Save Platform Changes
          </Button>
        </div>
      </form>

      {/* Danger Zone */}
      <Card className="p-6 border-rose-200 bg-rose-50/30 space-y-4 mt-8">
        <div className="flex items-center gap-2 text-rose-800">
          <AlertTriangle className="w-5 h-5 text-rose-600" />
          <h3 className="font-serif text-base font-bold">Local Demo Environment Reset</h3>
        </div>
        <p className="text-xs text-mauve-600">
          Resetting clears all custom expenses, tasks, guests, and verification submissions created during testing, restoring MarryOn to pristine Indian wedding demo dataset (₹25 Lakh budget, Aarav & Meera Pune wedding).
        </p>

        <Button
          variant="outline"
          size="sm"
          onClick={handleResetData}
          className="text-rose-700 border-rose-300 hover:bg-rose-100"
          leftIcon={<RotateCcw className="w-4 h-4" />}
        >
          Reset Demo Data to Initial State
        </Button>
      </Card>
    </div>
  );
};
