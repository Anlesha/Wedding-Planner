import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { useToast } from '../../contexts/ToastContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { formatDate } from '../../utils/formatters';
import { PlatformUser, UserRole } from '../../types';
import {
  Users,
  Search,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  Building,
  Heart
} from 'lucide-react';

export const AdminUsersPage: React.FC = () => {
  const { showToast } = useToast();
  const [users, setUsers] = useState<PlatformUser[]>(() => storageService.getPlatformUsers());
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.city && u.city.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleToggleStatus = (user: PlatformUser) => {
    const newStatus = user.status === 'active' ? 'suspended' : 'active';
    try {
      storageService.updateUserStatus(user.id, newStatus, 'SuperAdmin');
      setUsers(storageService.getPlatformUsers());
      showToast(
        `User ${user.name} has been ${newStatus === 'active' ? 'reactivated' : 'suspended'}.`,
        newStatus === 'active' ? 'success' : 'warning'
      );
    } catch {
      showToast('Failed to update user status', 'error');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-roseGold-100 text-roseGold-800 text-xs font-semibold mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>Platform User Directory</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-mauve-900">
            User Accounts & Permissions
          </h1>
          <p className="text-xs text-mauve-500 mt-0.5">
            Manage couples, vendors, and privileged administrative access
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="roseGold" size="md">
            Total Users: {users.length}
          </Badge>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 sm:p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by name, email, city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
            <Search className="w-4 h-4 text-mauve-400 absolute left-3 top-3" />
          </div>

          <div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-white border border-blush-200 rounded-xl text-mauve-800 focus:outline-none focus:ring-2 focus:ring-roseGold-400 font-medium"
            >
              <option value="all">All Roles (Customer, Vendor, Admin)</option>
              <option value="customer">Customers (Couples)</option>
              <option value="vendor">Wedding Vendors</option>
              <option value="admin">Administrators</option>
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-white border border-blush-200 rounded-xl text-mauve-800 focus:outline-none focus:ring-2 focus:ring-roseGold-400 font-medium"
            >
              <option value="all">All Statuses (Active & Suspended)</option>
              <option value="active">Active Only</option>
              <option value="suspended">Suspended Only</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Users Table / Grid */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-mauve-700">
            <thead className="bg-blush-50/70 border-b border-blush-200/80 uppercase font-semibold text-[11px] text-mauve-600">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Activity</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blush-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-mauve-400">
                    No users found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-blush-50/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-roseGold-100 text-roseGold-800 flex items-center justify-center font-serif font-bold text-xs uppercase border border-roseGold-200">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-mauve-900">{user.name}</p>
                          <p className="text-[11px] text-mauve-400">{user.city || 'Location unset'}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {user.role === 'customer' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                          <Heart className="w-3 h-3 text-rose-500" /> Couple
                        </span>
                      )}
                      {user.role === 'vendor' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          <Building className="w-3 h-3 text-indigo-500" /> Vendor
                        </span>
                      )}
                      {user.role === 'admin' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                          <ShieldCheck className="w-3 h-3 text-amber-600" /> Operations
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 space-y-0.5">
                      <div className="flex items-center gap-1 text-[11px] text-mauve-700">
                        <Mail className="w-3 h-3 text-mauve-400" /> {user.email}
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-1 text-[11px] text-mauve-500">
                          <Phone className="w-3 h-3 text-mauve-400" /> {user.phone}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 text-[11px] text-mauve-600">
                        <Calendar className="w-3 h-3 text-mauve-400" /> Joined {formatDate(user.createdAt)}
                      </div>
                      {user.lastLogin && (
                        <div className="text-[10px] text-mauve-400 mt-0.5">
                          Active {formatDate(user.lastLogin)}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {user.status === 'active' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          <UserCheck className="w-3 h-3" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                          <UserX className="w-3 h-3" /> Suspended
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {user.role !== 'admin' && (
                        <Button
                          variant={user.status === 'active' ? 'outline' : 'primary'}
                          size="sm"
                          onClick={() => handleToggleStatus(user)}
                          className={user.status === 'active' ? 'text-rose-600 border-rose-300 hover:bg-rose-50' : ''}
                        >
                          {user.status === 'active' ? 'Suspend' : 'Reactivate'}
                        </Button>
                      )}
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
