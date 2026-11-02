import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { useToast } from '../../contexts/ToastContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { formatDate } from '../../utils/formatters';
import { ModerationReport } from '../../types';
import {
  Flag,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  MessageSquare,
  Store,
  User,
  ShieldAlert
} from 'lucide-react';

export const AdminReportsPage: React.FC = () => {
  const { showToast } = useToast();
  const [reports, setReports] = useState<ModerationReport[]>(() => storageService.getReports());
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'resolved' | 'dismissed'>('all');

  const filteredReports = reports.filter((r) =>
    statusFilter === 'all' ? true : r.status === statusFilter
  );

  const handleResolve = (report: ModerationReport, status: 'resolved' | 'dismissed') => {
    const notes = prompt(
      status === 'resolved'
        ? 'Enter moderation action taken (e.g. Content censored, vendor warned):'
        : 'Enter dismissal justification (e.g. No policy violation detected):'
    );
    if (notes !== null) {
      try {
        storageService.resolveReport(report.id, status, notes || 'Resolved by admin', 'SuperAdmin');
        setReports(storageService.getReports());
        showToast(`Report marked as ${status}.`, 'success');
      } catch {
        showToast('Failed to resolve report', 'error');
      }
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-roseGold-100 text-roseGold-800 text-xs font-semibold mb-1">
            <Flag className="w-3.5 h-3.5" />
            <span>Community Safety</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-mauve-900">
            Content Moderation & Reports
          </h1>
          <p className="text-xs text-mauve-500 mt-0.5">
            Investigate reported reviews, suspected copyright infringements, and fraudulent listings
          </p>
        </div>

        <div className="flex gap-2">
          {(['all', 'pending', 'resolved', 'dismissed'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all capitalize ${
                statusFilter === st
                  ? 'bg-roseGold-500 text-white shadow-xs'
                  : 'bg-white border border-blush-200 text-mauve-700 hover:bg-blush-50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <Card className="p-12 text-center text-mauve-400">
            <ShieldAlert className="w-12 h-12 text-roseGold-300 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-mauve-900">Moderation Inbox Clear</h3>
            <p className="text-xs text-mauve-500 mt-1">
              No reports currently matching "{statusFilter}".
            </p>
          </Card>
        ) : (
          filteredReports.map((report) => (
            <Card key={report.id} className="p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {report.type === 'review' && <MessageSquare className="w-4 h-4 text-roseGold-600" />}
                  {report.type === 'vendor' && <Store className="w-4 h-4 text-indigo-600" />}
                  {report.type === 'user' && <User className="w-4 h-4 text-mauve-600" />}
                  <h3 className="font-serif text-base font-bold text-mauve-900">
                    {report.targetTitle}
                  </h3>
                  <Badge variant="roseGold" size="sm">{report.type.toUpperCase()}</Badge>
                </div>

                <div>
                  {report.status === 'pending' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                      <AlertTriangle className="w-3.5 h-3.5" /> Pending Review
                    </span>
                  )}
                  {report.status === 'resolved' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                    </span>
                  )}
                  {report.status === 'dismissed' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-mauve-100 text-mauve-800">
                      <XCircle className="w-3.5 h-3.5" /> Dismissed
                    </span>
                  )}
                </div>
              </div>

              {/* Report Reason */}
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/70 text-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-900 tracking-wider">
                  Reported by {report.reporterName} ({formatDate(report.createdAt)}):
                </span>
                <p className="text-mauve-900 font-medium">{report.reason}</p>
              </div>

              {/* Resolution Notes */}
              {report.resolutionNotes && (
                <div className="p-3 rounded-xl bg-blush-50 border border-blush-200 text-xs">
                  <span className="text-[10px] uppercase font-bold text-mauve-500 block">
                    Admin Resolution Notes:
                  </span>
                  <p className="text-mauve-800 italic mt-0.5">{report.resolutionNotes}</p>
                  {report.resolvedAt && (
                    <p className="text-[10px] text-mauve-400 mt-1">
                      Resolved on {formatDate(report.resolvedAt)}
                    </p>
                  )}
                </div>
              )}

              {/* Action buttons */}
              {report.status === 'pending' && (
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-blush-100">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleResolve(report, 'dismissed')}
                    className="text-mauve-600 hover:bg-blush-50"
                  >
                    Dismiss Report
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleResolve(report, 'resolved')}
                    leftIcon={<CheckCircle2 className="w-4 h-4" />}
                  >
                    Enforce Action & Resolve
                  </Button>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
