import {
  WeddingDetails,
  VendorProfile,
  Expense,
  WeddingTask,
  Guest,
  Enquiry,
  Review,
  Notification,
  VerificationRequest,
  AuditLog,
  User,
  AIChatMessage,
  BookingStatus,
  VerificationStatus,
  ModerationReport,
  PlatformUser,
  PlatformSettings
} from '../types';
import {
  INITIAL_WEDDING,
  MOCK_VENDORS,
  INITIAL_EXPENSES,
  INITIAL_TASKS,
  INITIAL_GUESTS,
  INITIAL_BOOKINGS,
  INITIAL_REVIEWS,
  INITIAL_NOTIFICATIONS,
  INITIAL_VERIFICATIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_PLATFORM_USERS,
  INITIAL_REPORTS,
  INITIAL_PLATFORM_SETTINGS
} from '../data/mockData';

const STORAGE_KEYS = {
  USER: 'marryon_current_user',
  WEDDING: 'marryon_wedding_details',
  VENDORS: 'marryon_vendors',
  EXPENSES: 'marryon_expenses',
  TASKS: 'marryon_tasks',
  GUESTS: 'marryon_guests',
  BOOKINGS: 'marryon_bookings',
  REVIEWS: 'marryon_reviews',
  WISHLIST: 'marryon_wishlist',
  NOTIFICATIONS: 'marryon_notifications',
  VERIFICATIONS: 'marryon_verifications',
  AUDIT_LOGS: 'marryon_audit_logs',
  AI_CHAT: 'marryon_ai_chat',
  PLATFORM_USERS: 'marryon_platform_users',
  REPORTS: 'marryon_reports',
  SETTINGS: 'marryon_settings',
};

// Default customer user
export const DEFAULT_CUSTOMER: User = {
  id: 'cust-001',
  email: 'aarav.meera@marryon.app',
  name: 'Aarav & Meera',
  role: 'customer',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  phone: '+91 98220 99999',
  createdAt: '2026-09-01T10:00:00Z',
};

// Default vendor user
export const DEFAULT_VENDOR: User = {
  id: 'u-ven-001',
  email: 'rohan@deshpandephoto.com',
  name: 'Rohan Deshpande',
  role: 'vendor',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  phone: '+91 98230 45678',
  createdAt: '2026-08-01T10:00:00Z',
};

// Default admin user
export const DEFAULT_ADMIN: User = {
  id: 'adm-001',
  email: 'admin@marryon.app',
  name: 'MarryOn Operations Admin',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  phone: '+91 98000 11223',
  createdAt: '2026-07-01T10:00:00Z',
};

const memoryStore: Record<string, string> = {};

function getStorage<T>(key: string, defaultValue: T): T {
  try {
    let item: string | null = null;
    if (typeof localStorage !== 'undefined') {
      item = localStorage.getItem(key);
    } else {
      item = memoryStore[key] || null;
    }
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return defaultValue;
  }
}

function setStorage<T>(key: string, value: T): void {
  try {
    const serialized = JSON.stringify(value);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, serialized);
    } else {
      memoryStore[key] = serialized;
    }
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new Event('marryon_data_updated'));
    }
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

export const storageService = {
  // Reset all to clean initial demo data
  resetDemoData: () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    } else {
      Object.keys(memoryStore).forEach(k => delete memoryStore[k]);
    }
    setStorage(STORAGE_KEYS.USER, DEFAULT_CUSTOMER);
    setStorage(STORAGE_KEYS.WEDDING, INITIAL_WEDDING);
    setStorage(STORAGE_KEYS.VENDORS, MOCK_VENDORS);
    setStorage(STORAGE_KEYS.EXPENSES, INITIAL_EXPENSES);
    setStorage(STORAGE_KEYS.TASKS, INITIAL_TASKS);
    setStorage(STORAGE_KEYS.GUESTS, INITIAL_GUESTS);
    setStorage(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
    setStorage(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
    setStorage(STORAGE_KEYS.WISHLIST, ['ven-001', 'ven-004']);
    setStorage(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    setStorage(STORAGE_KEYS.VERIFICATIONS, INITIAL_VERIFICATIONS);
    setStorage(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
    setStorage(STORAGE_KEYS.PLATFORM_USERS, INITIAL_PLATFORM_USERS);
    setStorage(STORAGE_KEYS.REPORTS, INITIAL_REPORTS);
    setStorage(STORAGE_KEYS.SETTINGS, INITIAL_PLATFORM_SETTINGS);
    setStorage(STORAGE_KEYS.AI_CHAT, [
      {
        id: 'msg-1',
        role: 'assistant',
        content: 'Namaste Aarav & Meera! Welcome to your personal MarryOn AI Planner. I am synced with your wedding date (18 Dec 2026), your ₹25 Lakh budget, and your saved vendors in Pune. How can I help you today?',
        timestamp: new Date().toISOString(),
        actionSuggestions: [
          { label: 'Analyze my budget & savings', route: '/app/budget' },
          { label: 'Check photographer availability', route: '/vendors/ven-001' },
          { label: 'Review pending checklist tasks', route: '/app/tasks' }
        ]
      }
    ]);
  },

  // Auth User
  getCurrentUser: (): User => {
    return getStorage<User>(STORAGE_KEYS.USER, DEFAULT_CUSTOMER);
  },
  setCurrentUser: (user: User) => {
    setStorage(STORAGE_KEYS.USER, user);
  },
  switchRole: (role: 'customer' | 'vendor' | 'admin') => {
    if (role === 'customer') storageService.setCurrentUser(DEFAULT_CUSTOMER);
    else if (role === 'vendor') storageService.setCurrentUser(DEFAULT_VENDOR);
    else storageService.setCurrentUser(DEFAULT_ADMIN);
  },

  // Wedding Details
  getWedding: (): WeddingDetails => {
    return getStorage<WeddingDetails>(STORAGE_KEYS.WEDDING, INITIAL_WEDDING);
  },
  updateWedding: (details: Partial<WeddingDetails>): WeddingDetails => {
    const current = storageService.getWedding();
    const updated = { ...current, ...details };
    setStorage(STORAGE_KEYS.WEDDING, updated);
    return updated;
  },

  // Vendors
  getVendors: (): VendorProfile[] => {
    return getStorage<VendorProfile[]>(STORAGE_KEYS.VENDORS, MOCK_VENDORS);
  },
  getVendorById: (id: string): VendorProfile | undefined => {
    return storageService.getVendors().find(v => v.id === id);
  },
  updateVendor: (id: string, updates: Partial<VendorProfile>): VendorProfile => {
    const list = storageService.getVendors();
    const idx = list.findIndex(v => v.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      setStorage(STORAGE_KEYS.VENDORS, list);
      return list[idx];
    }
    throw new Error('Vendor not found');
  },

  // Wishlist
  getWishlist: (): string[] => {
    return getStorage<string[]>(STORAGE_KEYS.WISHLIST, ['ven-001', 'ven-004']);
  },
  toggleWishlist: (vendorId: string): boolean => {
    const list = storageService.getWishlist();
    const exists = list.includes(vendorId);
    const updated = exists ? list.filter(id => id !== vendorId) : [...list, vendorId];
    setStorage(STORAGE_KEYS.WISHLIST, updated);
    return !exists;
  },
  isWishlisted: (vendorId: string): boolean => {
    return storageService.getWishlist().includes(vendorId);
  },

  // Expenses & Budget
  getExpenses: (): Expense[] => {
    return getStorage<Expense[]>(STORAGE_KEYS.EXPENSES, INITIAL_EXPENSES);
  },
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt'>): Expense => {
    const list = storageService.getExpenses();
    const newExp: Expense = {
      ...expense,
      id: `exp-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setStorage(STORAGE_KEYS.EXPENSES, [newExp, ...list]);
    return newExp;
  },
  updateExpense: (id: string, updates: Partial<Expense>): Expense => {
    const list = storageService.getExpenses();
    const idx = list.findIndex(e => e.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      setStorage(STORAGE_KEYS.EXPENSES, list);
      return list[idx];
    }
    throw new Error('Expense not found');
  },
  deleteExpense: (id: string): void => {
    const list = storageService.getExpenses().filter(e => e.id !== id);
    setStorage(STORAGE_KEYS.EXPENSES, list);
  },

  // Tasks
  getTasks: (): WeddingTask[] => {
    return getStorage<WeddingTask[]>(STORAGE_KEYS.TASKS, INITIAL_TASKS);
  },
  addTask: (task: Omit<WeddingTask, 'id'>): WeddingTask => {
    const list = storageService.getTasks();
    const newTask: WeddingTask = {
      ...task,
      id: `tsk-${Date.now()}`,
    };
    setStorage(STORAGE_KEYS.TASKS, [...list, newTask]);
    return newTask;
  },
  updateTask: (id: string, updates: Partial<WeddingTask>): WeddingTask => {
    const list = storageService.getTasks();
    const idx = list.findIndex(t => t.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      setStorage(STORAGE_KEYS.TASKS, list);
      return list[idx];
    }
    throw new Error('Task not found');
  },
  deleteTask: (id: string): void => {
    const list = storageService.getTasks().filter(t => t.id !== id);
    setStorage(STORAGE_KEYS.TASKS, list);
  },

  // Guests
  getGuests: (): Guest[] => {
    return getStorage<Guest[]>(STORAGE_KEYS.GUESTS, INITIAL_GUESTS);
  },
  addGuest: (guest: Omit<Guest, 'id'>): Guest => {
    const list = storageService.getGuests();
    const newGuest: Guest = {
      ...guest,
      id: `gst-${Date.now()}`,
    };
    setStorage(STORAGE_KEYS.GUESTS, [newGuest, ...list]);
    return newGuest;
  },
  updateGuest: (id: string, updates: Partial<Guest>): Guest => {
    const list = storageService.getGuests();
    const idx = list.findIndex(g => g.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      setStorage(STORAGE_KEYS.GUESTS, list);
      return list[idx];
    }
    throw new Error('Guest not found');
  },
  deleteGuest: (id: string): void => {
    const list = storageService.getGuests().filter(g => g.id !== id);
    setStorage(STORAGE_KEYS.GUESTS, list);
  },

  // Bookings & Enquiries
  getBookings: (): Enquiry[] => {
    return getStorage<Enquiry[]>(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
  },
  createEnquiry: (enquiry: Omit<Enquiry, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Enquiry => {
    const list = storageService.getBookings();
    const newEnq: Enquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setStorage(STORAGE_KEYS.BOOKINGS, [newEnq, ...list]);

    // Also trigger notification to vendor
    storageService.addNotification({
      userId: enquiry.vendorId,
      title: 'New Wedding Enquiry!',
      message: `${enquiry.customerName} sent an enquiry for ${enquiry.proposedDate}`,
      type: 'booking',
      link: '/vendor/enquiries'
    });

    return newEnq;
  },
  updateBookingStatus: (id: string, status: BookingStatus, quotationAmount?: number, quotationNotes?: string): Enquiry => {
    const list = storageService.getBookings();
    const idx = list.findIndex(b => b.id === id);
    if (idx !== -1) {
      list[idx] = {
        ...list[idx],
        status,
        ...(quotationAmount !== undefined ? { quotationAmount } : {}),
        ...(quotationNotes !== undefined ? { quotationNotes } : {}),
        updatedAt: new Date().toISOString(),
      };
      setStorage(STORAGE_KEYS.BOOKINGS, list);

      // Notify customer of update
      storageService.addNotification({
        userId: list[idx].customerId,
        title: `Booking update: ${list[idx].vendorName}`,
        message: `Status updated to ${status.toUpperCase()}${quotationAmount ? `. Quote: ₹${quotationAmount.toLocaleString('en-IN')}` : ''}`,
        type: 'booking',
        link: '/app/bookings'
      });

      return list[idx];
    }
    throw new Error('Booking not found');
  },

  // Reviews
  getReviews: (): Review[] => {
    return getStorage<Review[]>(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
  },
  addReview: (review: Omit<Review, 'id' | 'createdAt'>): Review => {
    const list = storageService.getReviews();
    const newRev: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setStorage(STORAGE_KEYS.REVIEWS, [newRev, ...list]);

    // Recalculate vendor rating
    const vendorReviews = [newRev, ...list].filter(r => r.vendorId === review.vendorId && !r.reported);
    const avg = vendorReviews.reduce((sum, r) => sum + r.rating, 0) / vendorReviews.length;
    storageService.updateVendor(review.vendorId, {
      rating: parseFloat(avg.toFixed(1)),
      reviewCount: vendorReviews.length
    });

    return newRev;
  },
  reportReview: (id: string, reason: string): void => {
    const list = storageService.getReviews();
    const idx = list.findIndex(r => r.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], reported: true, reportReason: reason };
      setStorage(STORAGE_KEYS.REVIEWS, list);
    }
  },

  // Notifications
  getNotifications: (): Notification[] => {
    return getStorage<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  },
  addNotification: (notif: Omit<Notification, 'id' | 'read' | 'createdAt'>): Notification => {
    const list = storageService.getNotifications();
    const newN: Notification = {
      ...notif,
      id: `notif-${Date.now()}`,
      read: false,
      createdAt: new Date().toISOString(),
    };
    setStorage(STORAGE_KEYS.NOTIFICATIONS, [newN, ...list]);
    return newN;
  },
  markNotificationAsRead: (id: string): void => {
    const list = storageService.getNotifications();
    const idx = list.findIndex(n => n.id === id);
    if (idx !== -1) {
      list[idx].read = true;
      setStorage(STORAGE_KEYS.NOTIFICATIONS, list);
    }
  },
  markAllNotificationsAsRead: (): void => {
    const list = storageService.getNotifications().map(n => ({ ...n, read: true }));
    setStorage(STORAGE_KEYS.NOTIFICATIONS, list);
  },

  // Verifications (Admin & Vendor)
  getVerifications: (): VerificationRequest[] => {
    return getStorage<VerificationRequest[]>(STORAGE_KEYS.VERIFICATIONS, INITIAL_VERIFICATIONS);
  },
  submitVerificationRequest: (req: Omit<VerificationRequest, 'id' | 'submittedAt' | 'status'>): VerificationRequest => {
    const list = storageService.getVerifications();
    const newReq: VerificationRequest = {
      ...req,
      id: `ver-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'pending',
    };
    setStorage(STORAGE_KEYS.VERIFICATIONS, [newReq, ...list]);
    storageService.updateVendor(req.vendorId, {
      verificationStatus: 'pending'
    });
    return newReq;
  },
  reviewVerification: (id: string, status: VerificationStatus, reviewerNotes: string, adminName: string): VerificationRequest => {
    const list = storageService.getVerifications();
    const idx = list.findIndex(v => v.id === id);
    if (idx !== -1) {
      list[idx] = {
        ...list[idx],
        status,
        reviewerNotes,
        reviewedAt: new Date().toISOString(),
        reviewedBy: adminName
      };
      setStorage(STORAGE_KEYS.VERIFICATIONS, list);

      // Update actual vendor
      storageService.updateVendor(list[idx].vendorId, {
        isVerified: status === 'verified',
        verificationStatus: status,
        verificationNotes: reviewerNotes
      });

      // Audit Log
      storageService.addAuditLog({
        adminId: 'adm-001',
        adminName,
        action: `VENDOR_VERIFICATION_${status.toUpperCase()}`,
        target: `${list[idx].businessName} (${list[idx].vendorId})`,
        details: reviewerNotes
      });

      return list[idx];
    }
    throw new Error('Verification request not found');
  },

  // Audit Logs
  getAuditLogs: (): AuditLog[] => {
    return getStorage<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  },
  addAuditLog: (log: Omit<AuditLog, 'id' | 'timestamp'>): AuditLog => {
    const list = storageService.getAuditLogs();
    const newLog: AuditLog = {
      ...log,
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setStorage(STORAGE_KEYS.AUDIT_LOGS, [newLog, ...list]);
    return newLog;
  },

  // AI Chat
  getAIChatMessages: (): AIChatMessage[] => {
    return getStorage<AIChatMessage[]>(STORAGE_KEYS.AI_CHAT, [
      {
        id: 'msg-1',
        role: 'assistant',
        content: 'Namaste Aarav & Meera! Welcome to your personal MarryOn AI Planner. I am synced with your wedding date (18 Dec 2026), your ₹25 Lakh budget, and your saved vendors in Pune. How can I help you today?',
        timestamp: new Date().toISOString(),
        actionSuggestions: [
          { label: 'Analyze my budget & savings', route: '/app/budget' },
          { label: 'Check photographer availability', route: '/vendors/ven-001' },
          { label: 'Review pending checklist tasks', route: '/app/tasks' }
        ]
      }
    ]);
  },
  addAIChatMessage: (message: AIChatMessage): void => {
    const list = storageService.getAIChatMessages();
    setStorage(STORAGE_KEYS.AI_CHAT, [...list, message]);
  },
  clearAIChat: (): void => {
    setStorage(STORAGE_KEYS.AI_CHAT, []);
  },

  // Platform User Administration
  getPlatformUsers: (): PlatformUser[] => {
    return getStorage<PlatformUser[]>(STORAGE_KEYS.PLATFORM_USERS, INITIAL_PLATFORM_USERS);
  },
  updateUserStatus: (id: string, status: 'active' | 'suspended', adminName: string = 'SuperAdmin'): PlatformUser => {
    const list = storageService.getPlatformUsers();
    const idx = list.findIndex(u => u.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], status };
      setStorage(STORAGE_KEYS.PLATFORM_USERS, list);

      storageService.addAuditLog({
        adminId: 'adm-001',
        adminName,
        action: `USER_STATUS_${status.toUpperCase()}`,
        target: `${list[idx].name} (${list[idx].email})`,
        details: `Account status updated to ${status}`
      });

      return list[idx];
    }
    throw new Error('User not found');
  },

  // Content Moderation Reports
  getReports: (): ModerationReport[] => {
    return getStorage<ModerationReport[]>(STORAGE_KEYS.REPORTS, INITIAL_REPORTS);
  },
  createReport: (report: Omit<ModerationReport, 'id' | 'createdAt' | 'status'>): ModerationReport => {
    const list = storageService.getReports();
    const newRep: ModerationReport = {
      ...report,
      id: `rep-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setStorage(STORAGE_KEYS.REPORTS, [newRep, ...list]);
    return newRep;
  },
  resolveReport: (id: string, status: 'resolved' | 'dismissed', notes: string, adminName: string = 'SuperAdmin'): ModerationReport => {
    const list = storageService.getReports();
    const idx = list.findIndex(r => r.id === id);
    if (idx !== -1) {
      list[idx] = {
        ...list[idx],
        status,
        resolutionNotes: notes,
        resolvedAt: new Date().toISOString()
      };
      setStorage(STORAGE_KEYS.REPORTS, list);

      storageService.addAuditLog({
        adminId: 'adm-001',
        adminName,
        action: `REPORT_${status.toUpperCase()}`,
        target: `${list[idx].targetTitle} (${list[idx].targetId})`,
        details: notes
      });

      return list[idx];
    }
    throw new Error('Report not found');
  },

  // Platform Global Settings
  getPlatformSettings: (): PlatformSettings => {
    return getStorage<PlatformSettings>(STORAGE_KEYS.SETTINGS, INITIAL_PLATFORM_SETTINGS);
  },
  updatePlatformSettings: (updates: Partial<PlatformSettings>, adminName: string = 'SuperAdmin'): PlatformSettings => {
    const current = storageService.getPlatformSettings();
    const updated = { ...current, ...updates };
    setStorage(STORAGE_KEYS.SETTINGS, updated);

    storageService.addAuditLog({
      adminId: 'adm-001',
      adminName,
      action: 'PLATFORM_SETTINGS_UPDATED',
      target: 'System Configuration',
      details: `Updated: ${Object.keys(updates).join(', ')}`
    });

    return updated;
  }
};
