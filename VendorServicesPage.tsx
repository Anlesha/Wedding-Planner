import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { useToast } from '../../contexts/ToastContext';
import { formatINR } from '../../utils/formatters';
import { VendorPackage, VendorService } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Plus, CheckCircle2, Trash2, Edit2, Package as PackageIcon } from 'lucide-react';

export const VendorServicesPage: React.FC = () => {
  const { showToast } = useToast();
  const vendor = storageService.getVendorById('ven-001')!;
  const [packages, setPackages] = useState<VendorPackage[]>(vendor.packages);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPkgId, setEditingPkgId] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(85000);
  const [description, setDescription] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [isPopular, setIsPopular] = useState(false);

  const openAddModal = () => {
    setEditingPkgId(null);
    setName('');
    setPrice(95000);
    setDescription('');
    setFeaturesText('1 Candid + 1 Traditional Photographer\nPre-wedding shoot\nOnline Gallery\nPrinted Hardcover Album');
    setIsPopular(false);
    setModalOpen(true);
  };

  const openEditModal = (pkg: VendorPackage) => {
    setEditingPkgId(pkg.id);
    setName(pkg.name);
    setPrice(pkg.price);
    setDescription(pkg.description);
    setFeaturesText(pkg.features.join('\n'));
    setIsPopular(!!pkg.isPopular);
    setModalOpen(true);
  };

  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    const featuresList = featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    let updatedPackages: VendorPackage[];

    if (editingPkgId) {
      updatedPackages = packages.map((p) =>
        p.id === editingPkgId
          ? { ...p, name, price: Number(price), description, features: featuresList, isPopular }
          : p
      );
    } else {
      const newPkg: VendorPackage = {
        id: `pkg-${Date.now()}`,
        vendorId: vendor.id,
        name,
        price: Number(price),
        description,
        features: featuresList,
        isPopular,
      };
      updatedPackages = [...packages, newPkg];
    }

    setPackages(updatedPackages);
    storageService.updateVendor(vendor.id, { packages: updatedPackages });
    showToast('Package saved successfully!', 'success');
    setModalOpen(false);
  };

  const handleDeletePackage = (id: string) => {
    if (window.confirm('Delete this service package?')) {
      const updated = packages.filter((p) => p.id !== id);
      setPackages(updated);
      storageService.updateVendor(vendor.id, { packages: updated });
      showToast('Package removed', 'info');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="roseGold">Service Catalog</Badge>
          <h1 className="font-serif text-3xl font-bold text-mauve-900 mt-1">
            Packages & Offerings
          </h1>
          <p className="text-xs text-mauve-500 mt-0.5">
            Create transparent tiered packages for prospective couples
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={openAddModal} leftIcon={<Plus className="w-4 h-4" />}>
          Add New Package
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-serif text-lg font-bold text-mauve-900">{pkg.name}</h3>
                {pkg.isPopular && (
                  <span className="text-[10px] font-bold uppercase bg-roseGold-500 text-white px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
              </div>

              <p className="font-serif text-2xl font-bold text-roseGold-700">
                {formatINR(pkg.price)}
              </p>
              <p className="text-xs text-mauve-600 leading-relaxed">{pkg.description}</p>

              <ul className="space-y-2 text-xs text-mauve-700 border-t border-blush-100 pt-3">
                {pkg.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-blush-100">
              <Button variant="outline" size="sm" onClick={() => openEditModal(pkg)}>
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-rose-600 hover:bg-rose-50"
                onClick={() => handleDeletePackage(pkg.id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add / Edit Package Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingPkgId ? 'Edit Package' : 'Create New Package'}
        subtitle="Define package inclusions, deliverables, and rates"
      >
        <form onSubmit={handleSavePackage} className="space-y-4">
          <Input
            label="Package Title"
            placeholder="e.g. Royal Heritage 2-Day Cinema"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Package Price (₹ INR)"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />

          <Input
            label="Short Description"
            placeholder="e.g. Ideal for Sangeet + Wedding full coverage"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-mauve-700">
              Features & Inclusions (One per line)
            </label>
            <textarea
              rows={4}
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder="e.g. 2 Photographers&#10;Drone Coverage&#10;4K Cinematic Teaser"
              required
              className="w-full bg-white border border-blush-300 rounded-xl p-3 text-sm text-mauve-900 outline-none focus:border-roseGold-400"
            />
          </div>

          <label className="flex items-center gap-2 text-xs font-semibold text-mauve-800 cursor-pointer">
            <input
              type="checkbox"
              checked={isPopular}
              onChange={(e) => setIsPopular(e.target.checked)}
              className="accent-roseGold-500 rounded"
            />
            <span>Mark as "Most Popular" badge on storefront</span>
          </label>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Package
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
