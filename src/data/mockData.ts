import type { 
  User, 
  Plan, 
  Subscription, 
  TrainerAvailability, 
  AvailabilityException, 
  Booking, 
  Notification,
  DashboardStats 
} from '../types';

// ============================================
// USERS
// ============================================
export const users: User[] = [
  {
    id: 'admin-001',
    email: 'armando@armandofitness.com',
    name: 'Luis Armando Incio',
    phone: '+1 555 123 4567',
    role: 'admin',
    avatarUrl: null,
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'user-001',
    email: 'maria@email.com',
    name: 'María López',
    phone: '+1 555 234 5678',
    role: 'client',
    avatarUrl: null,
    isActive: true,
    createdAt: '2024-06-15T10:30:00.000Z',
    updatedAt: '2024-06-15T10:30:00.000Z'
  },
  {
    id: 'user-002',
    email: 'carlos@email.com',
    name: 'Carlos Rodríguez',
    phone: '+1 555 345 6789',
    role: 'client',
    avatarUrl: null,
    isActive: true,
    createdAt: '2024-07-20T14:00:00.000Z',
    updatedAt: '2024-07-20T14:00:00.000Z'
  },
  {
    id: 'user-003',
    email: 'ana@email.com',
    name: 'Ana Martínez',
    phone: '+1 555 456 7890',
    role: 'client',
    avatarUrl: null,
    isActive: true,
    createdAt: '2024-08-10T09:15:00.000Z',
    updatedAt: '2024-08-10T09:15:00.000Z'
  },
  {
    id: 'user-004',
    email: 'pedro@email.com',
    name: 'Pedro Sánchez',
    phone: '+1 555 567 8901',
    role: 'client',
    avatarUrl: null,
    isActive: true,
    createdAt: '2024-09-05T11:45:00.000Z',
    updatedAt: '2024-09-05T11:45:00.000Z'
  },
  {
    id: 'user-005',
    email: 'lucia@email.com',
    name: 'Lucía Fernández',
    phone: '+1 555 678 9012',
    role: 'client',
    avatarUrl: null,
    isActive: true,
    createdAt: '2024-10-12T16:20:00.000Z',
    updatedAt: '2024-10-12T16:20:00.000Z'
  }
];

// ============================================
// PLANS
// ============================================
export const plans: Plan[] = [
  {
    id: 'plan-basic',
    name: 'Básico',
    description: 'Perfecto para mantenerte activo y aprender la técnica correcta.',
    classesPerMonth: 6,
    price: 60.00,
    features: [
      '6 Clases al mes',
      'Evaluación inicial',
      'Rutina personalizada',
      'Soporte por WhatsApp Lunes-Viernes'
    ],
    isPopular: false,
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'plan-pro',
    name: 'Pro',
    description: 'El equilibrio ideal para ver resultados constantes.',
    classesPerMonth: 9,
    price: 85.00,
    features: [
      '9 Clases al mes',
      'Evaluación mensual',
      'Rutina personalizada + Nutrición básica',
      'Soporte por WhatsApp 24/7',
      'Acceso a comunidad exclusiva'
    ],
    isPopular: true,
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'plan-elite',
    name: 'Élite',
    description: 'Transformación total con acompañamiento intensivo.',
    classesPerMonth: 12,
    price: 110.00,
    features: [
      '12 Clases al mes',
      'Evaluación quincenal',
      'Plan nutricional completo',
      'Soporte prioritario 24/7',
      'Camiseta oficial ArmandoFitness',
      'Descuento en suplementos'
    ],
    isPopular: false,
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z'
  }
];

// ============================================
// SUBSCRIPTIONS
// ============================================
export const subscriptions: Subscription[] = [
  {
    id: 'sub-001',
    userId: 'user-001',
    planId: 'plan-pro',
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    remainingClasses: 7,
    status: 'active',
    paymentStatus: 'paid',
    createdAt: '2024-12-01T08:00:00.000Z',
    user: { id: 'user-001', name: 'María López', email: 'maria@email.com' },
    plan: { id: 'plan-pro', name: 'Pro', classesPerMonth: 9 }
  },
  {
    id: 'sub-002',
    userId: 'user-002',
    planId: 'plan-basic',
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    remainingClasses: 4,
    status: 'active',
    paymentStatus: 'paid',
    createdAt: '2024-12-01T09:30:00.000Z',
    user: { id: 'user-002', name: 'Carlos Rodríguez', email: 'carlos@email.com' },
    plan: { id: 'plan-basic', name: 'Básico', classesPerMonth: 6 }
  },
  {
    id: 'sub-003',
    userId: 'user-003',
    planId: 'plan-elite',
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    remainingClasses: 10,
    status: 'active',
    paymentStatus: 'paid',
    createdAt: '2024-12-01T10:15:00.000Z',
    user: { id: 'user-003', name: 'Ana Martínez', email: 'ana@email.com' },
    plan: { id: 'plan-elite', name: 'Élite', classesPerMonth: 12 }
  },
  {
    id: 'sub-004',
    userId: 'user-004',
    planId: 'plan-pro',
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    remainingClasses: 5,
    status: 'active',
    paymentStatus: 'paid',
    createdAt: '2024-12-01T11:00:00.000Z',
    user: { id: 'user-004', name: 'Pedro Sánchez', email: 'pedro@email.com' },
    plan: { id: 'plan-pro', name: 'Pro', classesPerMonth: 9 }
  },
  {
    id: 'sub-005',
    userId: 'user-005',
    planId: 'plan-basic',
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    remainingClasses: 6,
    status: 'active',
    paymentStatus: 'paid',
    createdAt: '2024-12-01T12:30:00.000Z',
    user: { id: 'user-005', name: 'Lucía Fernández', email: 'lucia@email.com' },
    plan: { id: 'plan-basic', name: 'Básico', classesPerMonth: 6 }
  }
];

// ============================================
// TRAINER AVAILABILITY
// ============================================
export const trainerAvailability: TrainerAvailability[] = [
  { id: 'avail-0', dayOfWeek: 0, dayName: 'Domingo', startHour: null, endHour: null, isActive: false },
  { id: 'avail-1', dayOfWeek: 1, dayName: 'Lunes', startHour: 6, endHour: 21, isActive: true },
  { id: 'avail-2', dayOfWeek: 2, dayName: 'Martes', startHour: 6, endHour: 21, isActive: true },
  { id: 'avail-3', dayOfWeek: 3, dayName: 'Miércoles', startHour: 6, endHour: 21, isActive: true },
  { id: 'avail-4', dayOfWeek: 4, dayName: 'Jueves', startHour: 6, endHour: 21, isActive: true },
  { id: 'avail-5', dayOfWeek: 5, dayName: 'Viernes', startHour: 6, endHour: 21, isActive: true },
  { id: 'avail-6', dayOfWeek: 6, dayName: 'Sábado', startHour: 8, endHour: 14, isActive: true }
];

// ============================================
// AVAILABILITY EXCEPTIONS
// ============================================
export const availabilityExceptions: AvailabilityException[] = [
  {
    id: 'exc-001',
    exceptionDate: '2024-12-25',
    isAvailable: false,
    startHour: null,
    endHour: null,
    reason: 'Navidad',
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'exc-002',
    exceptionDate: '2024-12-31',
    isAvailable: false,
    startHour: null,
    endHour: null,
    reason: 'Fin de Año',
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'exc-003',
    exceptionDate: '2025-01-01',
    isAvailable: false,
    startHour: null,
    endHour: null,
    reason: 'Año Nuevo',
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'exc-004',
    exceptionDate: '2024-12-24',
    isAvailable: true,
    startHour: 8,
    endHour: 12,
    reason: 'Nochebuena - Horario reducido',
    createdAt: '2024-01-01T00:00:00.000Z'
  }
];

// ============================================
// BOOKINGS
// ============================================
export const bookings: Booking[] = [
  {
    id: 'book-001',
    userId: 'user-001',
    subscriptionId: 'sub-001',
    bookingDate: '2024-12-06',
    bookingHour: 9,
    status: 'confirmed',
    notes: null,
    cancelledAt: null,
    cancelReason: null,
    createdAt: '2024-12-01T08:30:00.000Z',
    user: { id: 'user-001', name: 'María López', phone: '+1 555 234 5678' }
  },
  {
    id: 'book-002',
    userId: 'user-002',
    subscriptionId: 'sub-002',
    bookingDate: '2024-12-06',
    bookingHour: 10,
    status: 'confirmed',
    notes: null,
    cancelledAt: null,
    cancelReason: null,
    createdAt: '2024-12-02T09:00:00.000Z',
    user: { id: 'user-002', name: 'Carlos Rodríguez', phone: '+1 555 345 6789' }
  },
  {
    id: 'book-003',
    userId: 'user-003',
    subscriptionId: 'sub-003',
    bookingDate: '2024-12-06',
    bookingHour: 11,
    status: 'confirmed',
    notes: 'Primera clase del mes',
    cancelledAt: null,
    cancelReason: null,
    createdAt: '2024-12-03T10:15:00.000Z',
    user: { id: 'user-003', name: 'Ana Martínez', phone: '+1 555 456 7890' }
  },
  {
    id: 'book-004',
    userId: 'user-001',
    subscriptionId: 'sub-001',
    bookingDate: '2024-12-09',
    bookingHour: 8,
    status: 'confirmed',
    notes: null,
    cancelledAt: null,
    cancelReason: null,
    createdAt: '2024-12-04T14:00:00.000Z',
    user: { id: 'user-001', name: 'María López', phone: '+1 555 234 5678' }
  },
  {
    id: 'book-005',
    userId: 'user-004',
    subscriptionId: 'sub-004',
    bookingDate: '2024-12-09',
    bookingHour: 10,
    status: 'confirmed',
    notes: 'Enfocarse en piernas',
    cancelledAt: null,
    cancelReason: null,
    createdAt: '2024-12-04T15:30:00.000Z',
    user: { id: 'user-004', name: 'Pedro Sánchez', phone: '+1 555 567 8901' }
  },
  {
    id: 'book-006',
    userId: 'user-005',
    subscriptionId: 'sub-005',
    bookingDate: '2024-12-10',
    bookingHour: 7,
    status: 'confirmed',
    notes: null,
    cancelledAt: null,
    cancelReason: null,
    createdAt: '2024-12-05T08:00:00.000Z',
    user: { id: 'user-005', name: 'Lucía Fernández', phone: '+1 555 678 9012' }
  },
  {
    id: 'book-007',
    userId: 'user-003',
    subscriptionId: 'sub-003',
    bookingDate: '2024-12-10',
    bookingHour: 16,
    status: 'confirmed',
    notes: null,
    cancelledAt: null,
    cancelReason: null,
    createdAt: '2024-12-05T09:30:00.000Z',
    user: { id: 'user-003', name: 'Ana Martínez', phone: '+1 555 456 7890' }
  },
  {
    id: 'book-008',
    userId: 'user-002',
    subscriptionId: 'sub-002',
    bookingDate: '2024-12-05',
    bookingHour: 14,
    status: 'cancelled',
    notes: null,
    cancelledAt: '2024-12-04T18:00:00.000Z',
    cancelReason: 'Emergencia personal',
    createdAt: '2024-12-03T11:00:00.000Z',
    user: { id: 'user-002', name: 'Carlos Rodríguez', phone: '+1 555 345 6789' }
  },
  {
    id: 'book-009',
    userId: 'user-001',
    subscriptionId: 'sub-001',
    bookingDate: '2024-12-04',
    bookingHour: 9,
    status: 'completed',
    notes: 'Excelente sesión',
    cancelledAt: null,
    cancelReason: null,
    createdAt: '2024-12-01T10:00:00.000Z',
    user: { id: 'user-001', name: 'María López', phone: '+1 555 234 5678' }
  }
];

// ============================================
// NOTIFICATIONS
// ============================================
export const notifications: Notification[] = [
  {
    id: 'notif-001',
    userId: 'user-001',
    bookingId: 'book-001',
    type: 'reminder_24h',
    channel: 'whatsapp',
    status: 'pending',
    scheduledAt: '2024-12-05T09:00:00.000Z',
    sentAt: null,
    errorMessage: null,
    createdAt: '2024-12-01T08:30:00.000Z'
  },
  {
    id: 'notif-002',
    userId: 'user-002',
    bookingId: 'book-002',
    type: 'reminder_24h',
    channel: 'whatsapp',
    status: 'pending',
    scheduledAt: '2024-12-05T10:00:00.000Z',
    sentAt: null,
    errorMessage: null,
    createdAt: '2024-12-02T09:00:00.000Z'
  },
  {
    id: 'notif-003',
    userId: 'user-001',
    bookingId: 'book-009',
    type: 'booking_confirmed',
    channel: 'whatsapp',
    status: 'sent',
    scheduledAt: '2024-12-01T10:00:00.000Z',
    sentAt: '2024-12-01T10:01:00.000Z',
    errorMessage: null,
    createdAt: '2024-12-01T10:00:00.000Z'
  }
];

// ============================================
// DASHBOARD STATS
// ============================================
export const dashboardStats: DashboardStats = {
  totalClients: 5,
  activeSubscriptions: 5,
  classesThisMonth: 42,
  classesToday: 3,
  revenue: {
    thisMonth: 400.00,
    lastMonth: 380.00,
    percentChange: 5.26
  },
  upcomingClasses: [
    { date: '2024-12-06', count: 3 },
    { date: '2024-12-09', count: 2 },
    { date: '2024-12-10', count: 2 }
  ],
  popularHours: [
    { hour: 9, count: 15 },
    { hour: 10, count: 12 },
    { hour: 16, count: 10 },
    { hour: 7, count: 8 }
  ]
};

export default {
  users,
  plans,
  subscriptions,
  trainerAvailability,
  availabilityExceptions,
  bookings,
  notifications,
  dashboardStats
};
