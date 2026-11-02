import React, { useState } from 'react';
import { useWedding } from '../../contexts/WeddingContext';
import { formatINR, formatDate, calculatePercentage } from '../../utils/formatters';
import { Expense, VendorCategory, PaymentStatus } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Link } from 'react-router-dom';
import {
  Wallet,
  TrendingDown,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  PieChart,
  Sliders,
  DollarSign
} from 'lucide-react';

export const BudgetPage: React.FC = () => {
  const {
    wedding,
    updateWedding,
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    totalBudget,
    totalActualSpent,
    totalPaid,
    outstandingBalance,
    remainingBudget,
    utilizationPercent,
    isOverBudget,
    overrunAmount,
    categorySpends,
    overrunAlerts,
  } = useWedding();

  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // Add / Edit Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
  const [budgetModalOpen, setBudgetModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<VendorCategory>('Photography');
  const [vendorName, setVendorName] = useState('');
  const [estimatedCost, setEstimatedCost] = useState(50000);
  const [actualCost, setActualCost] = useState(50000);
  const [paidAmount, setPaidAmount] = useState(20000);
  const [dueDate, setDueDate] = useState('2026-11-30');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('partially_paid');
  const [notes, setNotes] = useState('');

  // Total budget edit state
  const [newBudgetAmount, setNewBudgetAmount] = useState(totalBudget);

  const openAddModal = () => {
    setEditingExpenseId(null);
    setTitle('');
    setCategory('Photography');
    setVendorName('');
    setEstimatedCost(50000);
    setActualCost(50000);
    setPaidAmount(20000);
    setDueDate('2026-11-30');
    setPaymentStatus('partially_paid');
    setNotes('');
    setModalOpen(true);
  };

  const openEditModal = (exp: Expense) => {
    setEditingExpenseId(exp.id);
    setTitle(exp.title);
    setCategory(exp.category);
    setVendorName(exp.vendorName || '');
    setEstimatedCost(exp.estimatedCost);
    setActualCost(exp.actualCost);
    setPaidAmount(exp.paidAmount);
    setDueDate(exp.dueDate);
    setPaymentStatus(exp.paymentStatus);
    setNotes(exp.notes || '');
    setModalOpen(true);
  };

  const handleSaveExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingExpenseId) {
      updateExpense(editingExpenseId, {
        title,
        category,
        vendorName,
        estimatedCost: Number(estimatedCost),
        actualCost: Number(actualCost),
        paidAmount: Number(paidAmount),
        dueDate,
        paymentStatus,
        notes,
      });
    } else {
      addExpense({
        weddingId: wedding.id,
        title,
        category,
        vendorName,
        estimatedCost: Number(estimatedCost),
        actualCost: Number(actualCost),
        paidAmount: Number(paidAmount),
        dueDate,
        paymentStatus,
        notes,
      });
    }
    setModalOpen(false);
  };

  const handleUpdateBudget = (e: React.FormEvent) => {
    e.preventDefault();
    updateWedding({ totalBudget: Number(newBudgetAmount) });
    setBudgetModalOpen(false);
  };

  const filteredExpenses = expenses.filter((e) => {
    if (filterCategory !== 'All' && e.category !== filterCategory) return false;
    if (filterStatus !== 'All' && e.paymentStatus !== filterStatus) return false;
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="roseGold">Financial Governance</Badge>
          <h1 className="font-serif text-3xl font-bold text-mauve-900 mt-1">
            Smart Wedding Budget & Overrun Engine
          </h1>
          <p className="text-xs text-mauve-500 mt-0.5">
            Real-time INR expense tracking with automated cheaper alternative suggestions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-white"
            onClick={() => {
              setNewBudgetAmount(totalBudget);
              setBudgetModalOpen(true);
            }}
            leftIcon={<Sliders className="w-3.5 h-3.5" />}
          >
            Adjust Target Budget
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={openAddModal}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Expense
          </Button>
        </div>
      </div>

      {/* Flagship Automatic Overrun Detection Alert */}
      {isOverBudget && overrunAlerts.length > 0 && (
        <div className="p-6 rounded-3xl bg-amber-50/90 border border-amber-300 shadow-soft space-y-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-amber-950">
                Budget Overrun Detected (+{formatINR(overrunAmount)} over target)
              </h2>
              <p className="text-xs text-amber-800">
                MarryOn analyzed your city’s vendor marketplace to find high-rated comparable specialists to keep you on track.
              </p>
            </div>
          </div>

          {/* Alternatives List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {overrunAlerts.map((alert, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 border border-amber-200/80 shadow-xs space-y-3"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-mauve-900 uppercase tracking-wider">
                    {alert.category} Overrun
                  </span>
                  <span className="text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded">
                    +{formatINR(alert.excess)}
                  </span>
                </div>

                <div className="text-xs text-mauve-600">
                  Current Actual Spend: <strong>{formatINR(alert.actual)}</strong> vs Suggested Allocation: <strong>{formatINR(alert.allocated)}</strong>
                </div>

                {alert.cheaperAlternatives.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-blush-100">
                    <p className="text-[11px] font-bold text-emerald-800 uppercase flex items-center gap-1">
                      💡 Recommended Affordable Alternatives
                    </p>
                    {alert.cheaperAlternatives.map(({ vendor, potentialSavings }) => (
                      <div
                        key={vendor.id}
                        className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-200 flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <p className="font-bold text-emerald-950">{vendor.businessName}</p>
                          <p className="text-[11px] text-emerald-700">
                            Starts {formatINR(vendor.startingPrice)} • {vendor.rating}★ ({vendor.city})
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[11px] font-bold text-emerald-800 block">
                            Save ~{formatINR(potentialSavings)}
                          </span>
                          <Link to={`/vendors/${vendor.id}`}>
                            <span className="text-[11px] text-roseGold-700 hover:underline font-semibold">
                              View Profile →
                            </span>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Financial KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4 space-y-1.5">
          <span className="text-xs font-semibold text-mauve-500 uppercase">Target Budget</span>
          <p className="font-serif text-2xl font-bold text-mauve-900">{formatINR(totalBudget)}</p>
          <div className="text-[10px] text-mauve-400">Fixed target</div>
        </Card>

        <Card className="p-4 space-y-1.5">
          <span className="text-xs font-semibold text-mauve-500 uppercase">Total Committed</span>
          <p className="font-serif text-2xl font-bold text-mauve-900">{formatINR(totalActualSpent)}</p>
          <div className={`text-[10px] font-bold ${isOverBudget ? 'text-rose-600' : 'text-emerald-700'}`}>
            {utilizationPercent}% allocated
          </div>
        </Card>

        <Card className="p-4 space-y-1.5">
          <span className="text-xs font-semibold text-mauve-500 uppercase">Total Paid</span>
          <p className="font-serif text-2xl font-bold text-emerald-700">{formatINR(totalPaid)}</p>
          <div className="text-[10px] text-mauve-400">Settled advances</div>
        </Card>

        <Card className="p-4 space-y-1.5">
          <span className="text-xs font-semibold text-mauve-500 uppercase">Outstanding Due</span>
          <p className="font-serif text-2xl font-bold text-rose-700">{formatINR(outstandingBalance)}</p>
          <div className="text-[10px] text-mauve-400">Balance to pay</div>
        </Card>

        <Card className="p-4 space-y-1.5 col-span-2 lg:col-span-1">
          <span className="text-xs font-semibold text-mauve-500 uppercase">Remaining Buffer</span>
          <p className={`font-serif text-2xl font-bold ${remainingBudget < 0 ? 'text-rose-600' : 'text-emerald-800'}`}>
            {formatINR(remainingBudget)}
          </p>
          <div className="text-[10px] text-mauve-400">
            {remainingBudget < 0 ? 'Over budget' : 'Safe reserve'}
          </div>
        </Card>
      </div>

      {/* Category Breakdown Progress Bars */}
      <Card className="p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-blush-100">
          <h3 className="font-serif text-lg font-bold text-mauve-900">
            Category Allocation & Utilization
          </h3>
          <span className="text-xs text-mauve-500">Based on standard Indian wedding norms</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {categorySpends.map((cs) => {
            const pct = calculatePercentage(cs.actual, cs.allocated);

            return (
              <div key={cs.category} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-mauve-800 flex items-center gap-1.5">
                    {cs.category}
                    {cs.isOver && (
                      <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-1.5 py-0.2 rounded">
                        +{formatINR(cs.excess)}
                      </span>
                    )}
                  </span>
                  <span className="text-mauve-500">
                    <strong className="text-mauve-900">{formatINR(cs.actual)}</strong> / {formatINR(cs.allocated)}
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-blush-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      cs.isOver ? 'bg-rose-500' : pct > 80 ? 'bg-amber-500' : 'bg-roseGold-500'
                    }`}
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Expenses Table */}
      <Card className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-blush-100">
          <div>
            <h3 className="font-serif text-lg font-bold text-mauve-900">
              Itemized Expenses & Invoices ({filteredExpenses.length})
            </h3>
            <p className="text-xs text-mauve-500">Track contracts, token advances, and upcoming milestones</p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <Select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              options={['All', 'Venue', 'Photography', 'Catering', 'Decoration', 'Clothing', 'Makeup', 'Music & DJ'].map(
                (c) => ({ value: c, label: c })
              )}
              className="text-xs py-1.5"
            />
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              options={[
                { value: 'All', label: 'All Statuses' },
                { value: 'paid', label: 'Paid' },
                { value: 'partially_paid', label: 'Partially Paid' },
                { value: 'pending', label: 'Pending' },
              ]}
              className="text-xs py-1.5"
            />
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-mauve-800">
            <thead className="bg-blush-50/60 uppercase tracking-wider text-[11px] text-mauve-500 font-semibold border-b border-blush-100">
              <tr>
                <th className="py-3 px-4">Title / Item</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Vendor</th>
                <th className="py-3 px-4">Actual Cost</th>
                <th className="py-3 px-4">Paid</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blush-100">
              {filteredExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-blush-50/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-mauve-900">{exp.title}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant="roseGold" size="sm">{exp.category}</Badge>
                  </td>
                  <td className="py-3.5 px-4 text-mauve-600">{exp.vendorName || '—'}</td>
                  <td className="py-3.5 px-4 font-bold text-mauve-900">{formatINR(exp.actualCost)}</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-semibold">{formatINR(exp.paidAmount)}</td>
                  <td className="py-3.5 px-4 text-mauve-500">{formatDate(exp.dueDate)}</td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      exp.paymentStatus === 'paid'
                        ? 'bg-emerald-100 text-emerald-800'
                        : exp.paymentStatus === 'partially_paid'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {exp.paymentStatus.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1">
                    <button
                      onClick={() => openEditModal(exp)}
                      className="p-1.5 text-mauve-400 hover:text-roseGold-700 transition-colors rounded-lg hover:bg-blush-100"
                      title="Edit expense"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete expense "${exp.title}"?`)) {
                          deleteExpense(exp.id);
                        }
                      }}
                      className="p-1.5 text-mauve-400 hover:text-rose-600 transition-colors rounded-lg hover:bg-rose-50"
                      title="Delete expense"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add / Edit Expense Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingExpenseId ? 'Edit Wedding Expense' : 'Add New Expense'}
        subtitle="Manage cost, deposits, and payment deadlines"
      >
        <form onSubmit={handleSaveExpense} className="space-y-4">
          <Input
            label="Title / Item Name"
            placeholder="e.g. Photography Advance / Paithani Saree"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value as VendorCategory)}
              options={[
                { value: 'Venue', label: 'Venue' },
                { value: 'Photography', label: 'Photography' },
                { value: 'Catering', label: 'Catering' },
                { value: 'Decoration', label: 'Decoration & Mandap' },
                { value: 'Makeup', label: 'Bridal Makeup' },
                { value: 'Clothing', label: 'Clothing & Jewelry' },
                { value: 'Music & DJ', label: 'Music & DJ' },
                { value: 'Invitations', label: 'Invitations' },
                { value: 'Transportation', label: 'Transportation' },
              ]}
            />
            <Input
              label="Vendor / Payee Name"
              placeholder="e.g. Rohan Deshpande Photo"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Estimated Cost (₹)"
              type="number"
              value={estimatedCost}
              onChange={(e) => setEstimatedCost(Number(e.target.value))}
              required
            />
            <Input
              label="Actual / Contract Cost (₹)"
              type="number"
              value={actualCost}
              onChange={(e) => setActualCost(Number(e.target.value))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Amount Paid So Far (₹)"
              type="number"
              value={paidAmount}
              onChange={(e) => setPaidAmount(Number(e.target.value))}
            />
            <Input
              label="Payment Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <Select
            label="Payment Status"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
            options={[
              { value: 'paid', label: 'Fully Paid' },
              { value: 'partially_paid', label: 'Partially Paid (Advance Given)' },
              { value: 'pending', label: 'Payment Pending' },
              { value: 'overdue', label: 'Overdue' },
            ]}
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-mauve-700">
              Notes / Inclusions
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Balance due 2 days before wedding event."
              className="w-full bg-white border border-blush-300 rounded-xl p-3 text-sm text-mauve-900 outline-none focus:border-roseGold-400"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingExpenseId ? 'Update Expense' : 'Save Expense'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Adjust Target Budget Modal */}
      <Modal
        isOpen={budgetModalOpen}
        onClose={() => setBudgetModalOpen(false)}
        title="Adjust Total Wedding Budget"
        subtitle="Update your overall financial target in INR"
      >
        <form onSubmit={handleUpdateBudget} className="space-y-4">
          <Input
            label="Total Wedding Budget (₹)"
            type="number"
            value={newBudgetAmount}
            onChange={(e) => setNewBudgetAmount(Number(e.target.value))}
            required
          />

          <p className="text-xs text-mauve-500">
            Current: {formatINR(totalBudget)} → New: {formatINR(newBudgetAmount)}
          </p>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setBudgetModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Target Budget
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
