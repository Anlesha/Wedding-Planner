export type UserRole = 'customer' | 'vendor' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  createdAt: string;
}

export interface WeddingDetails {
  id: string;
  customerId: string;
  coupleNames: string;
  partner1Name: string;
  partner2Name: string;
  weddingDate: string;
  city: string;
  venueName?: string;
  totalBudget: number;
  estimatedGuests: number;
  weddingStyle: string; // e.g., 'Royal Heritage', 'Intimate Minimalist', 'Modern Elegance', 'Destination Beach'
  priorities: string[]; // e.g., ['Photography', 'Catering', 'Decor']
  createdAt: string;
}

export type VendorCategory = 
  | 'Venue' 
  | 'Photography' 
  | 'Catering' 
  | 'Decoration' 
  | 'Makeup' 
  | 'Clothing' 
  | 'Music & DJ' 
  | 'Wedding Planner' 
  | 'Invitations' 
  | 'Transportation';

export interface VendorService {
  id: string;
  vendorId: string;
  title: string;
  description: string;
  startingPrice: number;
  inclusions: string[];
  active: boolean;
}

export interface VendorPackage {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}

export type VerificationStatus = 'not_submitted' | 'pending' | 'verified' | 'rejected' | 'action_required';

export interface VendorProfile {
  id: string;
  userId: string;
  businessName: string;
  category: VendorCategory;
  tagline: string;
  description: string;
  city: string;
  address: string;
  serviceArea: string;
  startingPrice: number;
  phone: string;
  email: string;
  website?: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  verificationStatus: VerificationStatus;
  verificationNotes?: string;
  images: string[];
  coverImage: string;
  services: VendorService[];
  packages: VendorPackage[];
  availableDates: string[]; // YYYY-MM-DD
  unavailableDates: string[]; // YYYY-MM-DD
  featured?: boolean;
}

export interface VerificationRequest {
  id: string;
  vendorId: string;
  businessName: string;
  category: VendorCategory;
  submittedAt: string;
  documentType: 'GST_Certificate' | 'Business_License' | 'PAN_Card' | 'Trade_Certificate';
  documentName: string;
  documentUrl?: string;
  status: VerificationStatus;
  reviewerNotes?: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export type PaymentStatus = 'pending' | 'partially_paid' | 'paid' | 'overdue';

export interface Expense {
  id: string;
  weddingId: string;
  title: string;
  category: VendorCategory;
  vendorId?: string;
  vendorName?: string;
  estimatedCost: number;
  actualCost: number;
  paidAmount: number;
  dueDate: string;
  paymentStatus: PaymentStatus;
  notes?: string;
  createdAt: string;
}

export interface BudgetAllocation {
  category: VendorCategory;
  percentage: number;
  allocatedAmount: number;
}

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in_progress' | 'completed';

export interface WeddingTask {
  id: string;
  weddingId: string;
  title: string;
  description?: string;
  category: VendorCategory | 'General' | 'Ceremony' | 'Legal';
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  completedAt?: string;
  isCustom?: boolean;
}

export type CalendarEventType = 'task' | 'meeting' | 'booking' | 'payment' | 'ceremony';

export interface CalendarEvent {
  id: string;
  weddingId: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string;
  type: CalendarEventType;
  notes?: string;
  relatedId?: string;
}

export type GuestGroup = 'Bride Family' | 'Groom Family' | 'Friends' | 'Colleagues' | 'VIP';
export type RsvpStatus = 'confirmed' | 'pending' | 'declined';

export interface Guest {
  id: string;
  weddingId: string;
  name: string;
  group: GuestGroup;
  phone?: string;
  email?: string;
  rsvpStatus: RsvpStatus;
  plusOnes: number;
  dietaryRestrictions?: string;
  tableNumber?: string;
}

export type BookingStatus = 
  | 'pending' 
  | 'responded' 
  | 'accepted' 
  | 'confirmed' 
  | 'completed' 
  | 'rejected' 
  | 'cancelled';

export interface Enquiry {
  id: string;
  weddingId: string;
  customerId: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  vendorId: string;
  vendorName: string;
  vendorCategory: VendorCategory;
  proposedDate: string;
  guestCount?: number;
  estimatedBudget?: number;
  selectedPackage?: string;
  message: string;
  quotationAmount?: number;
  quotationNotes?: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  vendorId: string;
  customerId: string;
  customerName: string;
  bookingId?: string;
  rating: number; // 1 to 5
  comment: string;
  eventDate: string;
  createdAt: string;
  reported?: boolean;
  reportReason?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'booking' | 'budget' | 'task' | 'verification' | 'system';
  link?: string;
  read: boolean;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  target: string;
  details: string;
  timestamp: string;
}

export interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  recommendedVendors?: string[]; // vendor IDs
  actionSuggestions?: {
    label: string;
    route: string;
  }[];
}

export interface ModerationReport {
  id: string;
  type: 'review' | 'vendor' | 'user';
  targetId: string;
  targetTitle: string;
  reporterName: string;
  reporterEmail?: string;
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
  resolutionNotes?: string;
  resolvedAt?: string;
}

export interface PlatformUser extends User {
  status: 'active' | 'suspended';
  city?: string;
  bookingsCount?: number;
  lastLogin?: string;
}

export interface PlatformSettings {
  platformName: string;
  supportEmail: string;
  commissionRate: number; // e.g. 5%
  enableAiPlanner: boolean;
  autoApproveReviews: boolean;
  requireVendorGst: boolean;
  maintenanceMode: boolean;
  currency: string;
}

