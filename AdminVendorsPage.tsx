import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../../services/storageService';
import { useToast } from '../../contexts/ToastContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { formatINR } from '../../utils/formatters';
import { VendorProfile, VendorCategory } from '../../types';
import {
  Store,
  Search,
  CheckCircle2,
  XCircle,
  Star,
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const AdminVendorsPage: React.FC = () => {
  const { showToast } = useToast();
  const [vendors, setVendors] = useState<VendorProfile[]>(() => storageService.getVendors());
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | VendorCategory>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'unverified'>('all');

  const filteredVendors = vendors.filter((v) => {
    const matchesSearch =
      v.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || v.category === categoryFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'verified' ? v.isVerified : !v.isVerified);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleToggleVerified = (vendor: VendorProfile) => {
    const newVerified = !vendor.isVerified;
    const newStatus = newVerified ? 'verified' : 'rejected';
    try {
      storageService.updateVendor(vendor.id, {
        isVerified: newVerified,
        verificationStatus: newStatus
      });
      storageService.addAuditLog({
        adminId: 'adm-001',
        adminName: 'SuperAdmin',
        action: `VENDOR_${newVerified ? 'VERIFIED' : 'UNVERIFIED'}`,
        target: `${vendor.businessName} (${vendor.id})`,
        details: `Badge status manually toggled to ${newVerified ? 'Verified Partner' : 'Unverified'}`
      });
      setVendors(storageService.getVendors());
      showToast(
        `${vendor.businessName} is now ${newVerified ? 'a Verified Partner' : 'unverified'}.`,
        newVerified ? 'success' : 'info'
      );
    } catch {
      showToast('Failed to update vendor badge', 'error');
    }
  };

  const handleToggleFeatured = (vendor: VendorProfile) => {
    const newFeatured = !vendor.featured;
    try {
      storageService.updateVendor(vendor.id, { featured: newFeatured });
      setVendors(storageService.getVendors());
      showToast(
        `${vendor.businessName} ${newFeatured ? 'featured on homepage' : 'removed from featured'}.`,
        'success'
      );
    } catch {
      showToast('Failed to update featured flag', 'error');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-roseGold-100 text-roseGold-800 text-xs font-semibold mb-1">
            <Store className="w-3.5 h-3.5" />
            <span>Marketplace Catalog</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-mauve-900">
            Vendor Directory & Moderation
          </h1>
          <p className="text-xs text-mauve-500 mt-0.5">
            Audit partner listings, manage verification credentials, and control catalog visibility
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="roseGold" size="md">
            Total Vendors: {vendors.length}
          </Badge>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 sm:p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by vendor name, city, specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
            <Search className="w-4 h-4 text-mauve-400 absolute left-3 top-3" />
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-white border border-blush-200 rounded-xl text-mauve-800 focus:outline-none focus:ring-2 focus:ring-roseGold-400 font-medium"
            >
              <option value="all">All Service Categories</option>
              <option value="Venue">Venue</option>
              <option value="Photography">Photography</option>
              <option value="Catering">Catering</option>
              <option value="Decoration">Decoration</option>
              <option value="Makeup">Makeup</option>
              <option value="Clothing">Clothing</option>
              <option value="Music & DJ">Music & DJ</option>
              <option value="Wedding Planner">Wedding Planner</option>
              <option value="Invitations">Invitations</option>
              <option value="Transportation">Transportation</option>
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-white border border-blush-200 rounded-xl text-mauve-800 focus:outline-none focus:ring-2 focus:ring-roseGold-400 font-medium"
            >
              <option value="all">All Verification Statuses</option>
              <option value="verified">Verified Partners Only</option>
              <option value="unverified">Pending / Unverified Only</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Vendors Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-mauve-700">
            <thead className="bg-blush-50/70 border-b border-blush-200/80 uppercase font-semibold text-[11px] text-mauve-600">
              <tr>
                <th className="py-3 px-4">Vendor Business</th>
                <th className="py-3 px-4">Category & City</th>
                <th className="py-3 px-4">Pricing</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Status & Badges</th>
                <th className="py-3 px-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blush-100">
              {filteredVendors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-mauve-400">
                    No vendor profiles found matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-blush-50/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={vendor.images[0] || vendor.coverImage}
                          alt={vendor.businessName}
                          className="w-10 h-10 rounded-xl object-cover border border-blush-200"
                        />
                        <div>
                          <p className="font-semibold text-mauve-900">{vendor.businessName}</p>
                          <p className="text-[11px] text-mauve-400 line-clamp-1">{vendor.tagline}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge variant="roseGold" size="sm">{vendor.category}</Badge>
                      <p className="text-[11px] text-mauve-500 mt-1">{vendor.city}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-roseGold-700">
                        {formatINR(vendor.startingPrice)}
                      </p>
                      <span className="text-[10px] text-mauve-400">starting price</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-mauve-900">{vendor.rating}</span>
                        <span className="text-[11px] text-mauve-400">({vendor.reviewCount})</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 space-y-1">
                      <div>
                        {vendor.isVerified ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                            Unverified
                          </span>
                        )}
                      </div>
                      {vendor.featured && (
                        <div>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-roseGold-100 text-roseGold-800">
                            <Sparkles className="w-3 h-3 text-roseGold-600" /> Featured
                          </span>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link to={`/vendors/${vendor.id}`} target="_blank">
                          <Button variant="ghost" size="sm" className="p-1.5 text-mauve-600 hover:text-mauve-900" title="View Listing">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Button>
                        </Link>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleFeatured(vendor)}
                          className={vendor.featured ? 'text-roseGold-700 border-roseGold-300' : 'text-mauve-600'}
                          title="Toggle Featured on homepage"
                        >
                          {vendor.featured ? 'Unfeature' : 'Feature'}
                        </Button>

                        <Button
                          variant={vendor.isVerified ? 'outline' : 'primary'}
                          size="sm"
                          onClick={() => handleToggleVerified(vendor)}
                          className={vendor.isVerified ? 'text-rose-600 border-rose-300 hover:bg-rose-50' : ''}
                        >
                          {vendor.isVerified ? 'Revoke Badge' : 'Verify Badge'}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
