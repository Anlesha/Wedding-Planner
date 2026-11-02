import React from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../../services/storageService';
import { useToast } from '../../contexts/ToastContext';
import { formatINR, formatDate } from '../../utils/formatters';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  ShieldAlert,
  Users,
  Store,
  FileCheck2,
  CalendarCheck,
  CheckCircle2,
  XCircle,
  TrendingUp,
  History,
  AlertTriangle
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { showToast } = useToast();
  const allVendors = storageService.getVendors();
  const allBookings = storageService.getBookings();
  const verifications = storageService.getVerifications();
  const auditLogs = storageService.getAuditLogs();

  const pendingVerifications = verifications.filter((v) => v.status === 'pending');
  const verifiedVendors = allVendors.filter((v) => v.isVerified);
  const totalGmv = allBookings.reduce((sum, b) => sum + (b.quotationAmount || 0), 0);

  const handleApprove = (vReq: any) => {
    storageService.reviewVerification(
      vReq.id,
      'verified',
      'Audited GST and trade registration. Approved Verified Partner status.',
      'SuperAdmin'
    );
    showToast(`Approved verification for ${vReq.businessName}!`, 'success');
  };

  const handleReject = (vReq: any) => {
    const reason = prompt('Specify rejection or document correction reason:');
    if (reason) {
      storageService.reviewVerification(vReq.id, 'action_required', reason, 'SuperAdmin');
      showToast(`Requested action from ${vReq.businessName}`, 'info');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-mauve-950 via-mauve-900 to-roseGold-950 rounded-3xl p-6 sm:p-8 text-white shadow-premium flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-roseGold-500/20 text-roseGold-300 text-xs font-semibold border border-roseGold-400/30">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Platform Operations & Compliance</span>
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">
            Administrator Command Center
          </h1>
          <p className="text-sm text-mauve-300">
            Governing {allVendors.length} registered specialists, marketplace transactions, and compliance audits
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/admin/verifications">
            <Button variant="primary" size="sm" leftIcon={<FileCheck2 className="w-4 h-4" />}>
              Review Queue ({pendingVerifications.length})
            </Button>
          </Link>
          <Link to="/admin/audit-log">
            <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/10" leftIcon={<History className="w-4 h-4" />}>
              Audit Trail
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 space-y-1">
          <div className="flex justify-between items-center text-xs text-mauve-500 font-semibold uppercase">
            <span>Pending Verifications</span>
            <FileCheck2 className="w-4 h-4 text-amber-600" />
          </div>
          <p className="font-serif text-2xl font-bold text-mauve-900">{pendingVerifications.length}</p>
          <div className="text-[11px] text-amber-700 font-semibold">Requires document audit</div>
        </Card>

        <Card className="p-4 space-y-1">
          <div className="flex justify-between items-center text-xs text-mauve-500 font-semibold uppercase">
            <span>Verified Partners</span>
            <Store className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="font-serif text-2xl font-bold text-mauve-900">{verifiedVendors.length} / {allVendors.length}</p>
          <div className="text-[11px] text-emerald-700 font-semibold">Audited credentials</div>
        </Card>

        <Card className="p-4 space-y-1">
          <div className="flex justify-between items-center text-xs text-mauve-500 font-semibold uppercase">
            <span>Platform Pipeline</span>
            <TrendingUp className="w-4 h-4 text-roseGold-600" />
          </div>
          <p className="font-serif text-2xl font-bold text-roseGold-700">{formatINR(totalGmv)}</p>
          <div className="text-[11px] text-mauve-400">Total bookings volume</div>
        </Card>

        <Card className="p-4 space-y-1">
          <div className="flex justify-between items-center text-xs text-mauve-500 font-semibold uppercase">
            <span>Compliance Events</span>
            <History className="w-4 h-4 text-mauve-600" />
          </div>
          <p className="font-serif text-2xl font-bold text-mauve-900">{auditLogs.length}</p>
          <div className="text-[11px] text-mauve-400">Recorded audit events</div>
        </Card>
      </div>

      {/* Main Grid: Pending Verifications Queue & Recent Audit Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Pending Verifications Queue */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-blush-100">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-roseGold-600" />
                <h3 className="font-serif text-lg font-bold text-mauve-900">
                  Verification Queue ({pendingVerifications.length})
                </h3>
              </div>
              <Link to="/admin/verifications" className="text-xs text-roseGold-700 font-bold hover:underline">
                View Full Queue →
              </Link>
            </div>

            {pendingVerifications.length === 0 ? (
              <p className="text-xs text-mauve-500 text-center py-6">
                All vendor verification requests have been audited and resolved!
              </p>
            ) : (
              <div className="space-y-3">
                {pendingVerifications.map((v) => (
                  <div
                    key={v.id}
                    className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-mauve-900">{v.businessName}</h4>
                          <Badge variant="roseGold" size="sm">{v.category}</Badge>
                        </div>
                        <p className="text-xs text-mauve-600 mt-1">
                          Document: <strong className="text-mauve-900">{v.documentName}</strong> ({v.documentType.replace('_', ' ')})
                        </p>
                        <p className="text-[11px] text-mauve-400 mt-0.5">
                          Submitted on {formatDate(v.submittedAt)}
                        </p>
                      </div>

                      <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
                        Pending Audit
                      </span>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-amber-200/60">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReject(v)}
                        className="text-rose-600 border-rose-300 hover:bg-rose-50"
                      >
                        Request Changes
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleApprove(v)}
                        leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                      >
                        Approve Verified Badge
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Right: Security Audit Log Summary */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-blush-100">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-roseGold-600" />
                <h3 className="font-serif text-lg font-bold text-mauve-900">
                  Recent Audit Events
                </h3>
              </div>
              <Link to="/admin/audit-log" className="text-xs text-roseGold-700 font-bold hover:underline">
                All Logs →
              </Link>
            </div>

            <div className="space-y-3">
              {auditLogs.slice(0, 4).map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-blush-50/50 border border-blush-100 text-xs space-y-1"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-mauve-900 uppercase tracking-wider text-[10px]">
                      {log.action}
                    </span>
                    <span className="text-[10px] text-mauve-400">{formatDate(log.timestamp)}</span>
                  </div>
                  <p className="text-mauve-800 font-medium">{log.target}</p>
                  <p className="text-[11px] text-mauve-500 italic">{log.details}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
