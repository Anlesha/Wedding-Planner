import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { useToast } from '../../contexts/ToastContext';
import { formatDate } from '../../utils/formatters';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { ShieldCheck, FileCheck2, AlertCircle, Clock, Upload, ArrowRight } from 'lucide-react';

export const VendorVerificationPage: React.FC = () => {
  const { showToast } = useToast();
  const vendor = storageService.getVendorById('ven-001')!;
  const verifications = storageService.getVerifications().filter((v) => v.vendorId === vendor.id);
  const latestVerification = verifications[0];

  const [docType, setDocType] = useState<any>('GST_Certificate');
  const [docName, setDocName] = useState('GSTIN_27AAAPD9876Q1Z5.pdf');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitNewDoc = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      storageService.submitVerificationRequest({
        vendorId: vendor.id,
        businessName: vendor.businessName,
        category: vendor.category,
        documentType: docType,
        documentName: docName,
      });

      setSubmitting(false);
      showToast('Document submitted for admin verification audit!', 'success');
    }, 600);
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      <div>
        <Badge variant="roseGold">Trust & Credentials</Badge>
        <h1 className="font-serif text-3xl font-bold text-mauve-900 mt-1">
          Vendor Verification Center
        </h1>
        <p className="text-xs text-mauve-500 mt-0.5">
          Verified partners receive marketplace trust badges and up to 3x higher booking volume
        </p>
      </div>

      {/* Current Status Banner */}
      <Card className="p-6 bg-gradient-to-r from-white to-blush-50/50 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-blush-100">
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
              vendor.isVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {vendor.isVerified ? <ShieldCheck className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold text-mauve-900">
                  {vendor.isVerified ? 'Verified Partner Active' : 'Verification Under Review'}
                </h3>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  vendor.isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {vendor.verificationStatus}
                </span>
              </div>
              <p className="text-xs text-mauve-500 mt-0.5">
                {vendor.isVerified
                  ? 'Your GST and business registration credentials are confirmed by MarryOn operations.'
                  : 'Your submitted business documents are currently queued in the admin audit desk.'}
              </p>
            </div>
          </div>
        </div>

        {latestVerification?.reviewerNotes && (
          <div className="p-4 rounded-xl bg-white border border-blush-200 text-xs text-mauve-700 space-y-1">
            <span className="font-bold text-mauve-900 uppercase tracking-wider text-[10px]">
              Reviewer Auditor Comments
            </span>
            <p>{latestVerification.reviewerNotes}</p>
            <p className="text-[10px] text-mauve-400 pt-1">
              Reviewed by {latestVerification.reviewedBy || 'MarryOn Compliance'} on {formatDate(latestVerification.reviewedAt || '')}
            </p>
          </div>
        )}
      </Card>

      {/* Submit / Re-submit Document */}
      <Card className="p-6 space-y-4">
        <h3 className="font-serif text-lg font-bold text-mauve-900 flex items-center gap-2">
          <FileCheck2 className="w-5 h-5 text-roseGold-600" /> Submit Official Business Verification
        </h3>
        <p className="text-xs text-mauve-500">
          Supported documents: Valid Maharashtra GST Certificate, Shop & Establishment Act License, or PAN Card.
        </p>

        <form onSubmit={handleSubmitNewDoc} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Document Type"
              value={docType}
              onChange={(e) => setDocType(e.target.value as any)}
              options={[
                { value: 'GST_Certificate', label: 'GSTIN Registration Certificate' },
                { value: 'Business_License', label: 'Shop & Establishment / Trade License' },
                { value: 'PAN_Card', label: 'Business Enterprise PAN' },
              ]}
            />
            <Input
              label="Document Filename / Registration Number"
              placeholder="e.g. GSTIN_27AAAPD9876Q1Z5.pdf"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              required
            />
          </div>

          <div className="p-6 border-2 border-dashed border-blush-300 rounded-2xl text-center space-y-2 bg-blush-50/30">
            <Upload className="w-8 h-8 text-roseGold-500 mx-auto" />
            <p className="text-xs font-semibold text-mauve-800">
              Selected Document: <span className="text-roseGold-700 font-bold">{docName}</span>
            </p>
            <p className="text-[11px] text-mauve-400">PDF, JPG, or PNG up to 10MB</p>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" variant="primary" size="md" isLoading={submitting}>
              Submit for Admin Review
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
