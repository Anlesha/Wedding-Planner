import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { storageService } from '../../services/storageService';
import { formatINR } from '../../utils/formatters';
import { VendorProfile } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Select } from '../../components/ui/Select';
import {
  Scale,
  Star,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Send,
  AlertCircle
} from 'lucide-react';

export const ComparePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const allVendors = storageService.getVendors();

  const initialV1 = searchParams.get('v1') || 'ven-001'; // Rohan Deshpande Photography
  const initialV2 = searchParams.get('v2') || 'ven-006'; // ShutterMoments Studios

  const [vendor1Id, setVendor1Id] = useState<string>(initialV1);
  const [vendor2Id, setVendor2Id] = useState<string>(initialV2);

  const vendor1 = storageService.getVendorById(vendor1Id) || allVendors[0];
  const vendor2 = storageService.getVendorById(vendor2Id) || allVendors[5] || allVendors[1];

  const isSameCategory = vendor1.category === vendor2.category;

  const vendorOptions = allVendors.map((v) => ({
    value: v.id,
    label: `${v.businessName} (${v.category} • ${formatINR(v.startingPrice)})`,
  }));

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="roseGold">Vendor Evaluation</Badge>
          <h1 className="font-serif text-3xl font-bold text-mauve-900 mt-1">
            Compare Specialists Side-by-Side
          </h1>
          <p className="text-xs text-mauve-500 mt-0.5">
            Evaluate deliverables, verified status, and package inclusions before committing deposits
          </p>
        </div>
      </div>

      {/* Selectors Bar */}
      <Card className="p-5 bg-gradient-to-r from-white via-roseGold-50/20 to-blush-50/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-mauve-700 uppercase tracking-wider block mb-1.5">
              Select Vendor 1
            </label>
            <Select
              value={vendor1Id}
              onChange={(e) => setVendor1Id(e.target.value)}
              options={vendorOptions}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-mauve-700 uppercase tracking-wider block mb-1.5">
              Select Vendor 2
            </label>
            <Select
              value={vendor2Id}
              onChange={(e) => setVendor2Id(e.target.value)}
              options={vendorOptions}
            />
          </div>
        </div>

        {!isSameCategory && (
          <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Note:</strong> You are comparing a <strong>{vendor1.category}</strong> with a <strong>{vendor2.category}</strong>. For accurate deliverable benchmarks, comparing vendors in the same category is recommended.
            </span>
          </div>
        )}
      </Card>

      {/* Comparison Matrix Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-blush-100 bg-blush-50/60">
                <th className="py-4 px-6 w-1/4 text-xs font-bold uppercase tracking-wider text-mauve-500">
                  Feature / Deliverable
                </th>
                <th className="py-4 px-6 w-3/8">
                  <div className="flex items-center gap-3">
                    <img
                      src={vendor1.coverImage}
                      alt={vendor1.businessName}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 shadow-xs"
                    />
                    <div>
                      <h3 className="font-serif text-base font-bold text-mauve-900">{vendor1.businessName}</h3>
                      <p className="text-[11px] text-mauve-500">{vendor1.category} • {vendor1.city}</p>
                    </div>
                  </div>
                </th>
                <th className="py-4 px-6 w-3/8 border-l border-blush-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={vendor2.coverImage}
                      alt={vendor2.businessName}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 shadow-xs"
                    />
                    <div>
                      <h3 className="font-serif text-base font-bold text-mauve-900">{vendor2.businessName}</h3>
                      <p className="text-[11px] text-mauve-500">{vendor2.category} • {vendor2.city}</p>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blush-100 text-mauve-800">
              <tr>
                <td className="py-3.5 px-6 font-semibold text-mauve-600 bg-blush-50/30">Starting Price</td>
                <td className="py-3.5 px-6 font-serif text-base font-bold text-roseGold-700">
                  {formatINR(vendor1.startingPrice)}
                </td>
                <td className="py-3.5 px-6 font-serif text-base font-bold text-roseGold-700 border-l border-blush-100">
                  {formatINR(vendor2.startingPrice)}
                </td>
              </tr>

              <tr>
                <td className="py-3.5 px-6 font-semibold text-mauve-600 bg-blush-50/30">Verification Status</td>
                <td className="py-3.5 px-6">
                  {vendor1.isVerified ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified Partner
                    </span>
                  ) : (
                    <span className="text-amber-700">Pending Review</span>
                  )}
                </td>
                <td className="py-3.5 px-6 border-l border-blush-100">
                  {vendor2.isVerified ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified Partner
                    </span>
                  ) : (
                    <span className="text-amber-700">Pending Review</span>
                  )}
                </td>
              </tr>

              <tr>
                <td className="py-3.5 px-6 font-semibold text-mauve-600 bg-blush-50/30">Rating & Reviews</td>
                <td className="py-3.5 px-6 font-bold flex items-center gap-1 text-mauve-900">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>{vendor1.rating}</span>
                  <span className="text-mauve-400 font-normal">({vendor1.reviewCount} verified reviews)</span>
                </td>
                <td className="py-3.5 px-6 font-bold flex items-center gap-1 text-mauve-900 border-l border-blush-100">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>{vendor2.rating}</span>
                  <span className="text-mauve-400 font-normal">({vendor2.reviewCount} verified reviews)</span>
                </td>
              </tr>

              <tr>
                <td className="py-3.5 px-6 font-semibold text-mauve-600 bg-blush-50/30">Experience</td>
                <td className="py-3.5 px-6 font-medium">{vendor1.experienceYears} Years (150+ weddings)</td>
                <td className="py-3.5 px-6 font-medium border-l border-blush-100">{vendor2.experienceYears} Years</td>
              </tr>

              <tr>
                <td className="py-3.5 px-6 font-semibold text-mauve-600 bg-blush-50/30">Top Package</td>
                <td className="py-3.5 px-6 space-y-1">
                  <p className="font-bold text-mauve-900">{vendor1.packages[0]?.name || 'Standard Service'}</p>
                  <p className="font-serif text-sm font-bold text-roseGold-700">
                    {vendor1.packages[0] ? formatINR(vendor1.packages[0].price) : '—'}
                  </p>
                  <p className="text-[11px] text-mauve-500">{vendor1.packages[0]?.description}</p>
                </td>
                <td className="py-3.5 px-6 space-y-1 border-l border-blush-100">
                  <p className="font-bold text-mauve-900">{vendor2.packages[0]?.name || 'Standard Service'}</p>
                  <p className="font-serif text-sm font-bold text-roseGold-700">
                    {vendor2.packages[0] ? formatINR(vendor2.packages[0].price) : '—'}
                  </p>
                  <p className="text-[11px] text-mauve-500">{vendor2.packages[0]?.description}</p>
                </td>
              </tr>

              <tr>
                <td className="py-3.5 px-6 font-semibold text-mauve-600 bg-blush-50/30">Key Inclusions</td>
                <td className="py-3.5 px-6">
                  <ul className="space-y-1">
                    {vendor1.packages[0]?.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-mauve-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="py-3.5 px-6 border-l border-blush-100">
                  <ul className="space-y-1">
                    {vendor2.packages[0]?.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-mauve-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>

              {/* Action buttons */}
              <tr>
                <td className="py-4 px-6 font-semibold text-mauve-600 bg-blush-50/30">Actions</td>
                <td className="py-4 px-6 space-x-2">
                  <Link to={`/vendors/${vendor1.id}`}>
                    <Button variant="primary" size="sm">
                      View Profile & Enquire
                    </Button>
                  </Link>
                </td>
                <td className="py-4 px-6 space-x-2 border-l border-blush-100">
                  <Link to={`/vendors/${vendor2.id}`}>
                    <Button variant="primary" size="sm">
                      View Profile & Enquire
                    </Button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
