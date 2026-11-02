import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { useToast } from '../../contexts/ToastContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { formatDate } from '../../utils/formatters';
import { VerificationRequest, VerificationStatus } from '../../types';
import {
  FileCheck2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  Clock,
  ShieldCheck,
  Building,
  Eye
} from 'lucide-react';

export const AdminVerificationsPage: React.FC = () => {
  const { showToast } = useToast();
  const [verifications, setVerifications] = useState<VerificationRequest[]>(() =>
    storageService.getVerifications()
  );
  const [statusFilter, setStatusFilter] = useState<'all' | VerificationStatus>('all');
  const [selectedReq, setSelectedReq] = useState<VerificationRequest | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<'verified' | 'action_required' | 'rejected'>('verified');

  const filteredRequests = verifications.filter((v) =>
    statusFilter === 'all' ? true : v.status === statusFilter
  );

  const openActionModal = (
    req: VerificationRequest,
    action: 'verified' | 'action_required' | 'rejected'
  ) => {
    setSelectedReq(req);
    setCurrentAction(action);
    setReviewNotes(
      action === 'verified'
        ? 'Verified GST and business registrations successfully against national registry.'
        : ''
    );
    setActionModalOpen(true);
  };

  const submitReview = () => {
    if (!selectedReq) return;
    try {
      storageService.reviewVerification(
        selectedReq.id,
        currentAction,
        reviewNotes || 'Verification audited by administration',
        'SuperAdmin'
      );
      setVerifications(storageService.getVerifications());
      setActionModalOpen(false);
      showToast(
        `Verification status updated to ${currentAction.toUpperCase()} for ${selectedReq.businessName}`,
        currentAction === 'verified' ? 'success' : 'info'
      );
    } catch {
      showToast('Error reviewing verification submission', 'error');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-roseGold-100 text-roseGold-800 text-xs font-semibold mb-1">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Compliance & Trust Guard</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-mauve-900">
            Vendor Verification Queue
          </h1>
          <p className="text-xs text-mauve-500 mt-0.5">
            Audit submitted business registrations, GST certificates, and assign official Verified badges
          </p>
        </div>

        <div className="flex gap-2">
          {(['all', 'pending', 'verified', 'action_required'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all capitalize ${
                statusFilter === st
                  ? 'bg-roseGold-500 text-white shadow-xs'
                  : 'bg-white border border-blush-200 text-mauve-700 hover:bg-blush-50'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <Card className="p-12 text-center text-mauve-400">
            <ShieldCheck className="w-12 h-12 text-roseGold-300 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-mauve-900">Queue is Clear</h3>
            <p className="text-xs text-mauve-500 mt-1">
              No verification requests matching "{statusFilter}"
            </p>
          </Card>
        ) : (
          filteredRequests.map((req) => (
            <Card key={req.id} className="p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-base font-bold text-mauve-900">
                      {req.businessName}
                    </h3>
                    <Badge variant="roseGold" size="sm">{req.category}</Badge>
                  </div>
                  <p className="text-xs text-mauve-500 flex items-center gap-2">
                    <span>Submitted on {formatDate(req.submittedAt)}</span>
                    <span>•</span>
                    <span>Vendor ID: <code className="bg-blush-50 px-1 py-0.5 rounded text-[11px]">{req.vendorId}</code></span>
                  </p>
                </div>

                <div>
                  {req.status === 'pending' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                      <Clock className="w-3.5 h-3.5" /> Pending Audit
                    </span>
                  )}
                  {req.status === 'verified' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Partner
                    </span>
                  )}
                  {req.status === 'action_required' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                      <AlertCircle className="w-3.5 h-3.5" /> Action Required
                    </span>
                  )}
                  {req.status === 'rejected' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                      <XCircle className="w-3.5 h-3.5" /> Rejected
                    </span>
                  )}
                </div>
              </div>

              {/* Document details box */}
              <div className="p-3.5 rounded-2xl bg-blush-50/70 border border-blush-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-blush-200 flex items-center justify-center text-roseGold-600 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-mauve-900">{req.documentName}</h4>
                    <p className="text-[11px] text-mauve-500">
                      Document Type: {req.documentType.replace('_', ' ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-medium">
                    ✓ Mock File Attached (PDF Verified)
                  </span>
                </div>
              </div>

              {/* Reviewer notes if present */}
              {req.reviewerNotes && (
                <div className="p-3 rounded-xl bg-white border border-blush-200 text-xs space-y-0.5">
                  <span className="text-[10px] font-bold text-mauve-400 uppercase tracking-wider">
                    Audit Decision Notes:
                  </span>
                  <p className="text-mauve-700 italic">{req.reviewerNotes}</p>
                  {req.reviewedBy && (
                    <p className="text-[10px] text-mauve-400">
                      Reviewed by {req.reviewedBy} on {req.reviewedAt ? formatDate(req.reviewedAt) : ''}
                    </p>
                  )}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-blush-100">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openActionModal(req, 'action_required')}
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  Request Resubmission
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openActionModal(req, 'rejected')}
                  className="text-rose-600 border-rose-200 hover:bg-rose-50"
                >
                  Reject
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => openActionModal(req, 'verified')}
                  leftIcon={<CheckCircle2 className="w-4 h-4" />}
                >
                  Approve Verified Badge
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Review Dialog */}
      <Modal
        isOpen={actionModalOpen}
        onClose={() => setActionModalOpen(false)}
        title={`Audit Verification: ${selectedReq?.businessName}`}
      >
        <div className="space-y-4">
          <p className="text-xs text-mauve-600">
            Selected Action:{' '}
            <strong className="text-mauve-900 uppercase">{currentAction.replace('_', ' ')}</strong>
          </p>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-mauve-700">
              Auditor Compliance Notes:
            </label>
            <textarea
              rows={3}
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              placeholder="Enter reasons for verification approval, document rejection, or specific changes required..."
              className="w-full px-3 py-2 text-xs bg-warmBg border border-blush-200 rounded-xl text-mauve-800 focus:outline-none focus:ring-2 focus:ring-roseGold-400"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setActionModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={submitReview}>
              Confirm Audit Decision
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
