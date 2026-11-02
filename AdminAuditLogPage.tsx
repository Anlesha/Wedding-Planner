import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { formatDate } from '../../utils/formatters';
import { AuditLog } from '../../types';
import {
  History,
  Search,
  ShieldAlert,
  Terminal,
  Clock,
  UserCheck
} from 'lucide-react';

export const AdminAuditLogPage: React.FC = () => {
  const [logs] = useState<AuditLog[]>(() => storageService.getAuditLogs());
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.adminName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-roseGold-100 text-roseGold-800 text-xs font-semibold mb-1">
            <History className="w-3.5 h-3.5" />
            <span>Immutable Security Trail</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-mauve-900">
            Security & Compliance Audit Log
          </h1>
          <p className="text-xs text-mauve-500 mt-0.5">
            Trace administrative modifications, vendor approvals, user suspensions, and system settings
          </p>
        </div>
        <Badge variant="roseGold" size="md">
          {logs.length} Recorded Events
        </Badge>
      </div>

      {/* Search Filter */}
      <Card className="p-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search audit trail by action keyword, target, administrator, or notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
          <Search className="w-4 h-4 text-mauve-400 absolute left-3 top-3" />
        </div>
      </Card>

      {/* Timeline of Logs */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-mauve-700">
            <thead className="bg-blush-50/70 border-b border-blush-200/80 uppercase font-semibold text-[11px] text-mauve-600">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Acting Admin</th>
                <th className="py-3 px-4">Action Event</th>
                <th className="py-3 px-4">Target Entity</th>
                <th className="py-3 px-4">Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blush-100 font-mono text-[11px]">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-mauve-400 font-sans text-xs">
                    No audit records matching your search.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-blush-50/40 transition-colors">
                    <td className="py-3 px-4 text-mauve-500 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-mauve-400" />
                        <span>{formatDate(log.timestamp)}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-sans font-semibold text-mauve-900 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-roseGold-600" />
                        <span>{log.adminName}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 rounded bg-mauve-100 text-mauve-900 font-bold uppercase text-[10px]">
                        {log.action}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-sans font-medium text-mauve-900">
                      {log.target}
                    </td>

                    <td className="py-3 px-4 font-sans text-mauve-600 text-xs">
                      {log.details}
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
