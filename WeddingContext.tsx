import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  WeddingDetails,
  Expense,
  WeddingTask,
  Guest,
  Enquiry,
  Notification,
  VendorCategory,
  BookingStatus,
  VendorProfile
} from '../types';
import { storageService } from '../services/storageService';
import { useToast } from './ToastContext';

interface CategorySpend {
  category: VendorCategory;
  allocated: number;
  actual: number;
  count: number;
  isOver: boolean;
  excess: number;
}

interface OverrunAlert {
  category: VendorCategory;
  allocated: number;
  actual: number;
  excess: number;
  cheaperAlternatives: {
    vendor: VendorProfile;
    potentialSavings: number;
  }[];
}

interface WeddingContextType {
  wedding: WeddingDetails;
  updateWedding: (details: Partial<WeddingDetails>) => void;
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => void;
  updateExpense: (id: string, updates: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  tasks: WeddingTask[];
  addTask: (task: Omit<WeddingTask, 'id'>) => void;
  updateTask: (id: string, updates: Partial<WeddingTask>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  guests: Guest[];
  addGuest: (guest: Omit<Guest, 'id'>) => void;
  updateGuest: (id: string, updates: Partial<Guest>) => void;
  deleteGuest: (id: string) => void;
  bookings: Enquiry[];
  createEnquiry: (enquiry: Omit<Enquiry, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => void;
  updateBookingStatus: (id: string, status: BookingStatus, quotationAmount?: number, quotationNotes?: string) => void;
  wishlist: string[];
  toggleWishlist: (vendorId: string) => void;
  isWishlisted: (vendorId: string) => boolean;
  notifications: Notification[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  // Computed budget analytics
  totalBudget: number;
  totalEstimated: number;
  totalActualSpent: number;
  totalPaid: number;
  outstandingBalance: number;
  remainingBudget: number;
  utilizationPercent: number;
  isOverBudget: boolean;
  overrunAmount: number;
  categorySpends: CategorySpend[];
  overrunAlerts: OverrunAlert[];
  guestStats: {
    totalInvited: number;
    confirmed: number;
    pending: number;
    declined: number;
  };
  taskStats: {
    total: number;
    completed: number;
    pending: number;
    percentComplete: number;
  };
}

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

// Suggested category allocation percentages for Indian Weddings
const CATEGORY_DEFAULT_PCT: Record<VendorCategory, number> = {
  'Venue': 0.35, // 35%
  'Catering': 0.25, // 25%
  'Decoration': 0.12, // 12%
  'Photography': 0.08, // 8%
  'Clothing': 0.08, // 8%
  'Makeup': 0.03, // 3%
  'Music & DJ': 0.03, // 3%
  'Invitations': 0.02, // 2%
  'Transportation': 0.02, // 2%
  'Wedding Planner': 0.02, // 2%
};

export const WeddingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [wedding, setWedding] = useState<WeddingDetails>(() => storageService.getWedding());
  const [expenses, setExpenses] = useState<Expense[]>(() => storageService.getExpenses());
  const [tasks, setTasks] = useState<WeddingTask[]>(() => storageService.getTasks());
  const [guests, setGuests] = useState<Guest[]>(() => storageService.getGuests());
  const [bookings, setBookings] = useState<Enquiry[]>(() => storageService.getBookings());
  const [wishlist, setWishlist] = useState<string[]>(() => storageService.getWishlist());
  const [notifications, setNotifications] = useState<Notification[]>(() => storageService.getNotifications());

  const refreshState = () => {
    setWedding(storageService.getWedding());
    setExpenses(storageService.getExpenses());
    setTasks(storageService.getTasks());
    setGuests(storageService.getGuests());
    setBookings(storageService.getBookings());
    setWishlist(storageService.getWishlist());
    setNotifications(storageService.getNotifications());
  };

  useEffect(() => {
    window.addEventListener('marryon_data_updated', refreshState);
    return () => window.removeEventListener('marryon_data_updated', refreshState);
  }, []);

  const updateWedding = (details: Partial<WeddingDetails>) => {
    const updated = storageService.updateWedding(details);
    setWedding(updated);
    showToast('Wedding details updated successfully', 'success');
  };

  const addExpense = (expense: Omit<Expense, 'id' | 'createdAt'>) => {
    storageService.addExpense(expense);
    setExpenses(storageService.getExpenses());
    showToast(`Added expense: ${expense.title}`, 'success');
  };

  const updateExpense = (id: string, updates: Partial<Expense>) => {
    storageService.updateExpense(id, updates);
    setExpenses(storageService.getExpenses());
    showToast('Expense updated', 'info');
  };

  const deleteExpense = (id: string) => {
    storageService.deleteExpense(id);
    setExpenses(storageService.getExpenses());
    showToast('Expense deleted', 'info');
  };

  const addTask = (task: Omit<WeddingTask, 'id'>) => {
    storageService.addTask(task);
    setTasks(storageService.getTasks());
    showToast(`Task created: ${task.title}`, 'success');
  };

  const updateTask = (id: string, updates: Partial<WeddingTask>) => {
    storageService.updateTask(id, updates);
    setTasks(storageService.getTasks());
  };

  const toggleTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const isNowDone = task.status !== 'completed';
    const updated = storageService.updateTask(id, {
      status: isNowDone ? 'completed' : 'todo',
      completedAt: isNowDone ? new Date().toISOString() : undefined
    });
    setTasks(storageService.getTasks());
    showToast(isNowDone ? `Completed: "${task.title}" 🎉` : `Reopened: "${task.title}"`, 'info');
  };

  const deleteTask = (id: string) => {
    storageService.deleteTask(id);
    setTasks(storageService.getTasks());
    showToast('Task removed', 'info');
  };

  const addGuest = (guest: Omit<Guest, 'id'>) => {
    storageService.addGuest(guest);
    setGuests(storageService.getGuests());
    showToast(`Added guest: ${guest.name}`, 'success');
  };

  const updateGuest = (id: string, updates: Partial<Guest>) => {
    storageService.updateGuest(id, updates);
    setGuests(storageService.getGuests());
    showToast('Guest record updated', 'info');
  };

  const deleteGuest = (id: string) => {
    storageService.deleteGuest(id);
    setGuests(storageService.getGuests());
    showToast('Guest removed', 'info');
  };

  const createEnquiry = (enquiry: Omit<Enquiry, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    storageService.createEnquiry(enquiry);
    setBookings(storageService.getBookings());
    showToast(`Enquiry sent to ${enquiry.vendorName}! Check "Bookings" for updates.`, 'success');
  };

  const updateBookingStatus = (id: string, status: BookingStatus, quotationAmount?: number, quotationNotes?: string) => {
    storageService.updateBookingStatus(id, status, quotationAmount, quotationNotes);
    setBookings(storageService.getBookings());
    showToast(`Booking updated to ${status.toUpperCase()}`, 'success');
  };

  const toggleWishlist = (vendorId: string) => {
    const saved = storageService.toggleWishlist(vendorId);
    setWishlist(storageService.getWishlist());
    showToast(saved ? 'Saved vendor to Wishlist ❤️' : 'Removed from Wishlist', 'info');
  };

  const isWishlisted = (vendorId: string) => wishlist.includes(vendorId);

  const markNotificationAsRead = (id: string) => {
    storageService.markNotificationAsRead(id);
    setNotifications(storageService.getNotifications());
  };

  const markAllNotificationsAsRead = () => {
    storageService.markAllNotificationsAsRead();
    setNotifications(storageService.getNotifications());
    showToast('All notifications marked as read', 'info');
  };

  // Budget calculations
  const totalBudget = wedding.totalBudget || 2500000;

  const { totalEstimated, totalActualSpent, totalPaid } = useMemo(() => {
    return expenses.reduce(
      (acc, exp) => ({
        totalEstimated: acc.totalEstimated + (exp.estimatedCost || 0),
        totalActualSpent: acc.totalActualSpent + (exp.actualCost || exp.estimatedCost || 0),
        totalPaid: acc.totalPaid + (exp.paidAmount || 0),
      }),
      { totalEstimated: 0, totalActualSpent: 0, totalPaid: 0 }
    );
  }, [expenses]);

  const outstandingBalance = Math.max(totalActualSpent - totalPaid, 0);
  const remainingBudget = totalBudget - totalActualSpent;
  const utilizationPercent = Math.min(Math.round((totalActualSpent / totalBudget) * 100), 150);
  const isOverBudget = totalActualSpent > totalBudget;
  const overrunAmount = Math.max(totalActualSpent - totalBudget, 0);

  // Category Spend Breakdown
  const categorySpends = useMemo<CategorySpend[]>(() => {
    const allCategories: VendorCategory[] = [
      'Venue', 'Catering', 'Decoration', 'Photography', 'Clothing', 'Makeup', 'Music & DJ', 'Invitations', 'Transportation', 'Wedding Planner'
    ];

    return allCategories.map((cat) => {
      const catExpenses = expenses.filter(e => e.category === cat);
      const actual = catExpenses.reduce((sum, e) => sum + (e.actualCost || e.estimatedCost || 0), 0);
      const allocated = Math.round(totalBudget * (CATEGORY_DEFAULT_PCT[cat] || 0.05));
      const isOver = actual > allocated;
      const excess = Math.max(actual - allocated, 0);

      return {
        category: cat,
        allocated,
        actual,
        count: catExpenses.length,
        isOver,
        excess,
      };
    });
  }, [expenses, totalBudget]);

  // Smart Budget Overrun Detection & Cheaper Alternatives
  const overrunAlerts = useMemo<OverrunAlert[]>(() => {
    const allVendors = storageService.getVendors();

    return categorySpends
      .filter(cs => cs.isOver && cs.excess > 10000)
      .map(cs => {
        // Find comparable alternatives in the same category that cost less
        const currentCategoryExpenses = expenses.filter(e => e.category === cs.category);
        const highestCostVendorExpense = currentCategoryExpenses.sort((a, b) => b.actualCost - a.actualCost)[0];

        const cheaperVendors = allVendors
          .filter(v => v.category === cs.category && v.startingPrice < (highestCostVendorExpense?.actualCost || cs.actual))
          .sort((a, b) => a.startingPrice - b.startingPrice)
          .slice(0, 2)
          .map(vendor => ({
            vendor,
            potentialSavings: Math.max((highestCostVendorExpense?.actualCost || cs.actual) - vendor.startingPrice, 15000),
          }));

        return {
          category: cs.category,
          allocated: cs.allocated,
          actual: cs.actual,
          excess: cs.excess,
          cheaperAlternatives: cheaperVendors,
        };
      });
  }, [categorySpends, expenses]);

  // Guest Statistics
  const guestStats = useMemo(() => {
    const totalInvited = guests.reduce((sum, g) => sum + 1 + (g.plusOnes || 0), 0);
    const confirmed = guests.filter(g => g.rsvpStatus === 'confirmed').reduce((sum, g) => sum + 1 + (g.plusOnes || 0), 0);
    const pending = guests.filter(g => g.rsvpStatus === 'pending').reduce((sum, g) => sum + 1 + (g.plusOnes || 0), 0);
    const declined = guests.filter(g => g.rsvpStatus === 'declined').reduce((sum, g) => sum + 1 + (g.plusOnes || 0), 0);

    return { totalInvited, confirmed, pending, declined };
  }, [guests]);

  // Task Statistics
  const taskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const pending = total - completed;
    const percentComplete = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pending, percentComplete };
  }, [tasks]);

  return (
    <WeddingContext.Provider
      value={{
        wedding,
        updateWedding,
        expenses,
        addExpense,
        updateExpense,
        deleteExpense,
        tasks,
        addTask,
        updateTask,
        toggleTask,
        deleteTask,
        guests,
        addGuest,
        updateGuest,
        deleteGuest,
        bookings,
        createEnquiry,
        updateBookingStatus,
        wishlist,
        toggleWishlist,
        isWishlisted,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        totalBudget,
        totalEstimated,
        totalActualSpent,
        totalPaid,
        outstandingBalance,
        remainingBudget,
        utilizationPercent,
        isOverBudget,
        overrunAmount,
        categorySpends,
        overrunAlerts,
        guestStats,
        taskStats,
      }}
    >
      {children}
    </WeddingContext.Provider>
  );
};

export const useWedding = () => {
  const context = useContext(WeddingContext);
  if (!context) {
    throw new Error('useWedding must be used within a WeddingProvider');
  }
  return context;
};
