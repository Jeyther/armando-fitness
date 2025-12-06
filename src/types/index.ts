// ============================================
// USER TYPES
// ============================================
export type UserRole = 'admin' | 'client';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  avatarUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// PLAN TYPES
// ============================================
export interface Plan {
  id: string;
  name: string;
  description: string;
  classesPerMonth: number;
  price: number;
  features: string[];
  isPopular: boolean;
  isActive: boolean;
  createdAt: string;
}

// ============================================
// SUBSCRIPTION TYPES
// ============================================
export type SubscriptionStatus = 'active' | 'expired' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed';

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  startDate: string;
  endDate: string;
  remainingClasses: number;
  status: SubscriptionStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  user?: { id: string; name: string; email: string };
  plan?: { id: string; name: string; classesPerMonth: number };
}

// ============================================
// AVAILABILITY TYPES
// ============================================
export interface TrainerAvailability {
  id: string;
  dayOfWeek: number;
  dayName: string;
  startHour: number | null;
  endHour: number | null;
  isActive: boolean;
}

export interface AvailabilityException {
  id: string;
  exceptionDate: string;
  isAvailable: boolean;
  startHour: number | null;
  endHour: number | null;
  reason: string;
  createdAt: string;
}

export interface DayAvailability {
  available: boolean;
  hours: number[];
  reason?: string;
}

// ============================================
// BOOKING TYPES
// ============================================
export type BookingStatus = 'confirmed' | 'completed' | 'cancelled' | 'no_show';

export interface Booking {
  id: string;
  userId: string;
  subscriptionId: string;
  bookingDate: string;
  bookingHour: number;
  status: BookingStatus;
  notes: string | null;
  cancelledAt: string | null;
  cancelReason: string | null;
  createdAt: string;
  user?: { id: string; name: string; phone: string };
}

// ============================================
// NOTIFICATION TYPES
// ============================================
export type NotificationType = 'reminder_24h' | 'reminder_1h' | 'booking_confirmed' | 'booking_cancelled';
export type NotificationChannel = 'whatsapp' | 'email' | 'push';
export type NotificationStatus = 'pending' | 'sent' | 'failed';

export interface Notification {
  id: string;
  userId: string;
  bookingId: string;
  type: NotificationType;
  channel: NotificationChannel;
  status: NotificationStatus;
  scheduledAt: string;
  sentAt: string | null;
  errorMessage: string | null;
  createdAt: string;
}

// ============================================
// AUTH TYPES
// ============================================
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  subscription: {
    id: string;
    planId: string;
    planName: string;
    remainingClasses: number;
    endDate: string;
  } | null;
}

export interface LoginResult {
  success: boolean;
  user?: AuthUser;
  error?: string;
}

// ============================================
// STATS TYPES
// ============================================
export interface DashboardStats {
  totalClients: number;
  activeSubscriptions: number;
  classesThisMonth: number;
  classesToday: number;
  revenue: {
    thisMonth: number;
    lastMonth: number;
    percentChange: number;
  };
  upcomingClasses: { date: string; count: number }[];
  popularHours: { hour: number; count: number }[];
}

export interface BookingStats {
  total: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  today: number;
  thisMonth: number;
}
