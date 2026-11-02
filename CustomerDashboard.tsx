import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWedding } from '../../contexts/WeddingContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatINR, formatDate, getDaysRemaining } from '../../utils/formatters';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import {
  Sparkles,
  Wallet,
  CheckSquare,
  Users,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Plus,
  TrendingDown,
  CheckCircle2,
  Clock,
  Heart,
  Store,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const {
    wedding,
    expenses,
    tasks,
    guests,
    bookings,
    totalBudget,
    totalActualSpent,
    remainingBudget,
    utilizationPercent,
    isOverBudget,
    overrunAmount,
    overrunAlerts,
    toggleTask,
    addExpense,
    addTask,
    guestStats,
    taskStats,
  } = useWedding();

  const daysInfo = getDaysRemaining(wedding.weddingDate);

  // Quick Action Modals
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  // New Expense State
  const [expTitle, setExpTitle] = useState('');
  const [expCategory, setExpCategory] = useState<any>('Photography');
  const [expActual, setExpActual] = useState(50000);
  const [expPaid, setExpPaid] = useState(20000);
  const [expDue, setExpDue] = useState('2026-11-30');

  // New Task State
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCategory, setTaskCategory] = useState<any>('General');
  const [taskDue, setTaskDue] = useState('2026-11-20');
  const [taskPriority, setTaskPriority] = useState<any>('high');

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    addExpense({
      weddingId: wedding.id,
      title: expTitle,
      category: expCategory,
      estimatedCost: Number(expActual),
      actualCost: Number(expActual),
      paidAmount: Number(expPaid),
      dueDate: expDue,
      paymentStatus: Number(expPaid) >= Number(expActual) ? 'paid' : 'partially_paid',
    });
    setExpTitle('');
    setExpenseModalOpen(false);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({
      weddingId: wedding.id,
      title: taskTitle,
      category: taskCategory,
      dueDate: taskDue,
      priority: taskPriority,
      status: 'todo',
    });
    setTaskTitle('');
    setTaskModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Welcome & Countdown Hero */}
      <div className="bg-gradient-to-r from-roseGold-700 via-roseGold-600 to-mauve-800 rounded-3xl p-6 sm:p-8 text-white shadow-premium relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-roseGold-100 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-roseGold-300" />
              <span>{wedding.weddingStyle}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              Welcome, {wedding.coupleNames}!
            </h1>
            <p className="text-sm text-roseGold-100/90 flex items-center gap-2">
              <span>{formatDate(wedding.weddingDate)}</span>
              <span>•</span>
              <span>{wedding.venueName}, {wedding.city}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/15 shrink-0 text-center">
            <div>
              <p className="font-serif text-3xl sm:text-4xl font-bold text-white">
                {daysInfo.days}
              </p>
              <p className="text-[11px] uppercase tracking-wider text-roseGold-200 font-semibold mt-0.5">
                Days to Go
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Budget Alert Banner (If Over Budget) */}
      {isOverBudget && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-700 shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-900">
                Budget Alert: Expenses Exceed Plan by {formatINR(overrunAmount)}
              </h3>
              <p className="text-xs text-amber-700">
                MarryOn has identified {overrunAlerts.length} verified lower-cost vendor alternatives to help balance your plan.
              </p>
            </div>
          </div>
          <Link to="/app/budget" className="shrink-0">
            <Button variant="outline" size="sm" className="bg-white border-amber-300 text-amber-900">
              View Savings Suggestions →
            </Button>
          </Link>
        </div>
      )}

      {/* 3. Core Financial & Planning KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 space-y-2">
          <div className="flex justify-between items-center text-xs text-mauve-500 font-medium">
            <span>Total Budget</span>
            <Wallet className="w-4 h-4 text-roseGold-500" />
          </div>
          <p className="font-serif text-2xl font-bold text-mauve-900">{formatINR(totalBudget)}</p>
          <div className="text-[11px] text-mauve-400">Target allocation</div>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="flex justify-between items-center text-xs text-mauve-500 font-medium">
            <span>Actual Committed</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
              isOverBudget ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
            }`}>
              {utilizationPercent}%
            </span>
          </div>
          <p className="font-serif text-2xl font-bold text-mauve-900">{formatINR(totalActualSpent)}</p>
          <div className="w-full h-1.5 rounded-full bg-blush-100 overflow-hidden">
            <div
              className={`h-full rounded-full ${isOverBudget ? 'bg-rose-500' : 'bg-roseGold-500'}`}
              style={{ width: `${Math.min(utilizationPercent, 100)}%` }}
            />
          </div>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="flex justify-between items-center text-xs text-mauve-500 font-medium">
            <span>Remaining Budget</span>
            <TrendingDown className="w-4 h-4 text-emerald-500" />
          </div>
          <p className={`font-serif text-2xl font-bold ${remainingBudget < 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
            {formatINR(remainingBudget)}
          </p>
          <div className="text-[11px] text-mauve-400">
            {remainingBudget < 0 ? 'Over target' : 'Available buffer'}
          </div>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="flex justify-between items-center text-xs text-mauve-500 font-medium">
            <span>Checklist Progress</span>
            <CheckSquare className="w-4 h-4 text-roseGold-500" />
          </div>
          <p className="font-serif text-2xl font-bold text-mauve-900">
            {taskStats.completed} / {taskStats.total}
          </p>
          <div className="text-[11px] text-mauve-400">{taskStats.percentComplete}% tasks complete</div>
        </Card>
      </div>

      {/* 4. Quick Actions Bar */}
      <div className="flex flex-wrap gap-2.5">
        <Link to="/app/ai-planner">
          <Button variant="primary" size="sm" leftIcon={<Sparkles className="w-3.5 h-3.5" />}>
            Ask AI Planner
          </Button>
        </Link>
        <Button
          variant="outline"
          size="sm"
          className="bg-white"
          leftIcon={<Plus className="w-3.5 h-3.5" />}
          onClick={() => setExpenseModalOpen(true)}
        >
          Add Expense
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-white"
          leftIcon={<Plus className="w-3.5 h-3.5" />}
          onClick={() => setTaskModalOpen(true)}
        >
          Add Task
        </Button>
        <Link to="/vendors">
          <Button variant="secondary" size="sm" leftIcon={<Store className="w-3.5 h-3.5" />}>
            Find Vendors
          </Button>
        </Link>
        <Link to="/app/guests">
          <Button variant="ghost" size="sm" leftIcon={<Users className="w-3.5 h-3.5" />}>
            Manage Guests ({guestStats.confirmed} Confirmed)
          </Button>
        </Link>
      </div>

      {/* 5. Main Content Grid: Checklist & Active Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Upcoming Tasks */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-blush-100">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-roseGold-600" />
                <h3 className="font-serif text-lg font-bold text-mauve-900">
                  Priority Checklist
                </h3>
              </div>
              <Link to="/app/tasks" className="text-xs text-roseGold-700 font-bold hover:underline">
                View All ({tasks.length}) →
              </Link>
            </div>

            <div className="space-y-2.5">
              {tasks.slice(0, 5).map((task) => (
                <div
                  key={task.id}
                  className={`p-3 rounded-xl border transition-all flex items-start gap-3 ${
                    task.status === 'completed'
                      ? 'bg-mauve-50/60 border-mauve-200/50 opacity-60'
                      : 'bg-white border-blush-200 hover:border-roseGold-300 shadow-xs'
                  }`}
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="mt-0.5 text-mauve-400 hover:text-roseGold-600 transition-colors"
                  >
                    {task.status === 'completed' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <div className="w-4 h-4 rounded border-2 border-mauve-300 hover:border-roseGold-500" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold text-mauve-900 ${task.status === 'completed' ? 'line-through' : ''}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-mauve-400">
                      <span className="text-roseGold-600 font-medium">{task.category}</span>
                      <span>•</span>
                      <span>Due: {formatDate(task.dueDate)}</span>
                      {task.priority === 'high' && (
                        <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded">
                          High Priority
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Guest RSVP Summary Card */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-blush-100">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-roseGold-600" />
                <h3 className="font-serif text-lg font-bold text-mauve-900">
                  Guest RSVP Breakdown
                </h3>
              </div>
              <Link to="/app/guests" className="text-xs text-roseGold-700 font-bold hover:underline">
                Manage Guest List →
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                <p className="font-serif text-2xl font-bold text-emerald-800">{guestStats.confirmed}</p>
                <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">Confirmed Attending</p>
              </div>
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200">
                <p className="font-serif text-2xl font-bold text-amber-800">{guestStats.pending}</p>
                <p className="text-[11px] text-amber-700 font-semibold mt-0.5">Pending Response</p>
              </div>
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200">
                <p className="font-serif text-2xl font-bold text-rose-800">{guestStats.declined}</p>
                <p className="text-[11px] text-rose-700 font-semibold mt-0.5">Declined</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Vendor Bookings & Inquiries */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-blush-100">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-roseGold-600" />
                <h3 className="font-serif text-lg font-bold text-mauve-900">
                  Confirmed Bookings & Quotes
                </h3>
              </div>
              <Link to="/app/bookings" className="text-xs text-roseGold-700 font-bold hover:underline">
                View All ({bookings.length}) →
              </Link>
            </div>

            <div className="space-y-3">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-3.5 rounded-2xl bg-blush-50/50 border border-blush-200/80 space-y-2 hover:bg-blush-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-mauve-900">{booking.vendorName}</h4>
                      <p className="text-[11px] text-mauve-500">{booking.vendorCategory}</p>
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      booking.status === 'confirmed'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : booking.status === 'accepted'
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {booking.status}
                    </span>
                  </div>

                  {booking.quotationAmount && (
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-blush-200/50">
                      <span className="text-mauve-500">Agreed Quote</span>
                      <span className="font-bold text-roseGold-800">{formatINR(booking.quotationAmount)}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Link to="/vendors">
              <Button variant="outline" size="sm" className="w-full bg-white mt-2">
                Discover More Vendors
              </Button>
            </Link>
          </Card>
        </div>
      </div>

      {/* Add Expense Modal */}
      <Modal
        isOpen={expenseModalOpen}
        onClose={() => setExpenseModalOpen(false)}
        title="Add Wedding Expense"
        subtitle="Record vendor advance, invoice, or estimated allocation."
      >
        <form onSubmit={handleCreateExpense} className="space-y-4">
          <Input
            label="Expense Title / Description"
            placeholder="e.g. Wedding Hall Advance / Bridal Saree"
            value={expTitle}
            onChange={(e) => setExpTitle(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Category"
              value={expCategory}
              onChange={(e) => setExpCategory(e.target.value)}
              options={[
                { value: 'Venue', label: 'Venue' },
                { value: 'Photography', label: 'Photography' },
                { value: 'Catering', label: 'Catering' },
                { value: 'Decoration', label: 'Decoration & Mandap' },
                { value: 'Makeup', label: 'Bridal Makeup' },
                { value: 'Clothing', label: 'Attire & Jewelry' },
                { value: 'Music & DJ', label: 'Music & DJ' },
                { value: 'Invitations', label: 'Invitations' },
                { value: 'Transportation', label: 'Transportation' },
              ]}
            />
            <Input
              label="Actual / Quoted Cost (₹)"
              type="number"
              value={expActual}
              onChange={(e) => setExpActual(Number(e.target.value))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Amount Paid So Far (₹)"
              type="number"
              value={expPaid}
              onChange={(e) => setExpPaid(Number(e.target.value))}
            />
            <Input
              label="Next Payment Due Date"
              type="date"
              value={expDue}
              onChange={(e) => setExpDue(e.target.value)}
              required
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setExpenseModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Record Expense
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Task Modal */}
      <Modal
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        title="Add Wedding Checklist Task"
        subtitle="Keep track of rituals, legal appointments, and vendor confirmations."
      >
        <form onSubmit={handleCreateTask} className="space-y-4">
          <Input
            label="Task Title"
            placeholder="e.g. Confirm wedding cake flavours"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Category"
              value={taskCategory}
              onChange={(e) => setTaskCategory(e.target.value)}
              options={[
                { value: 'General', label: 'General Planning' },
                { value: 'Venue', label: 'Venue' },
                { value: 'Photography', label: 'Photography' },
                { value: 'Catering', label: 'Catering' },
                { value: 'Decoration', label: 'Decoration' },
                { value: 'Makeup', label: 'Makeup' },
                { value: 'Clothing', label: 'Clothing' },
                { value: 'Ceremony', label: 'Rituals / Muhurat' },
                { value: 'Legal', label: 'Marriage Registration' },
              ]}
            />
            <Select
              label="Priority"
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              options={[
                { value: 'high', label: 'High Priority' },
                { value: 'medium', label: 'Medium' },
                { value: 'low', label: 'Low' },
              ]}
            />
          </div>

          <Input
            label="Due Date"
            type="date"
            value={taskDue}
            onChange={(e) => setTaskDue(e.target.value)}
            required
          />

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setTaskModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Task
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
