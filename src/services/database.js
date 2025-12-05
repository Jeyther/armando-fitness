/**
 * DATABASE SERVICE - Armando Fitness
 * 
 * Servicio central que simula operaciones de base de datos.
 * Mantiene el estado en memoria y proporciona métodos CRUD.
 */

import mockData from '../data/mockData';

// Estado en memoria (simula la base de datos)
let db = {
  users: [...mockData.users],
  plans: [...mockData.plans],
  subscriptions: [...mockData.subscriptions],
  trainerAvailability: [...mockData.trainerAvailability],
  availabilityExceptions: [...mockData.availabilityExceptions],
  bookings: [...mockData.bookings],
  notifications: [...mockData.notifications]
};

// Generar ID único
const generateId = (prefix = 'id') => `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// ============================================
// USERS SERVICE
// ============================================
export const usersService = {
  getAll: () => db.users.filter(u => u.isActive),
  
  getById: (id) => db.users.find(u => u.id === id),
  
  getByEmail: (email) => db.users.find(u => u.email === email),
  
  create: (userData) => {
    const newUser = {
      id: generateId('user'),
      ...userData,
      role: userData.role || 'client',
      isActive: true,
      createdAt: new Date()
    };
    db.users.push(newUser);
    return newUser;
  },
  
  update: (id, updates) => {
    const index = db.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    db.users[index] = { ...db.users[index], ...updates, updatedAt: new Date() };
    return db.users[index];
  },
  
  delete: (id) => {
    const index = db.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    db.users[index].isActive = false;
    return true;
  },

  authenticate: (email, password) => {
    const user = db.users.find(u => u.email === email && u.password === password && u.isActive);
    if (!user) return null;
    // No devolver password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
};

// ============================================
// PLANS SERVICE
// ============================================
export const plansService = {
  getAll: () => db.plans.filter(p => p.isActive),
  
  getById: (id) => db.plans.find(p => p.id === id),
  
  create: (planData) => {
    const newPlan = {
      id: generateId('plan'),
      ...planData,
      isActive: true,
      createdAt: new Date()
    };
    db.plans.push(newPlan);
    return newPlan;
  },
  
  update: (id, updates) => {
    const index = db.plans.findIndex(p => p.id === id);
    if (index === -1) return null;
    db.plans[index] = { ...db.plans[index], ...updates };
    return db.plans[index];
  }
};

// ============================================
// SUBSCRIPTIONS SERVICE
// ============================================
export const subscriptionsService = {
  getAll: () => db.subscriptions,
  
  getById: (id) => db.subscriptions.find(s => s.id === id),
  
  getByUserId: (userId) => db.subscriptions.filter(s => s.userId === userId),
  
  getActiveByUserId: (userId) => db.subscriptions.find(
    s => s.userId === userId && s.status === 'active'
  ),
  
  create: (subscriptionData) => {
    const plan = plansService.getById(subscriptionData.planId);
    if (!plan) return null;
    
    const newSubscription = {
      id: generateId('sub'),
      ...subscriptionData,
      remainingClasses: plan.classesPerMonth,
      status: 'active',
      paymentStatus: 'pending',
      createdAt: new Date()
    };
    db.subscriptions.push(newSubscription);
    return newSubscription;
  },
  
  update: (id, updates) => {
    const index = db.subscriptions.findIndex(s => s.id === id);
    if (index === -1) return null;
    db.subscriptions[index] = { ...db.subscriptions[index], ...updates };
    return db.subscriptions[index];
  },
  
  decrementClasses: (id) => {
    const subscription = db.subscriptions.find(s => s.id === id);
    if (!subscription || subscription.remainingClasses <= 0) return null;
    subscription.remainingClasses -= 1;
    return subscription;
  }
};

// ============================================
// TRAINER AVAILABILITY SERVICE
// ============================================
export const availabilityService = {
  getAll: () => db.trainerAvailability,
  
  getByDay: (dayOfWeek) => db.trainerAvailability.find(a => a.dayOfWeek === dayOfWeek),
  
  update: (dayOfWeek, updates) => {
    const index = db.trainerAvailability.findIndex(a => a.dayOfWeek === dayOfWeek);
    if (index === -1) return null;
    db.trainerAvailability[index] = { ...db.trainerAvailability[index], ...updates };
    return db.trainerAvailability[index];
  },
  
  // Obtener horas disponibles para un día específico
  getAvailableHoursForDate: (date) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    
    // Verificar si hay una excepción para esta fecha
    const exception = db.availabilityExceptions.find(
      e => e.date.toDateString() === dateObj.toDateString()
    );
    
    if (exception) {
      if (!exception.isAvailable) return [];
      return generateHourSlots(exception.startHour, exception.endHour);
    }
    
    // Usar disponibilidad normal del día
    const dayAvailability = db.trainerAvailability.find(a => a.dayOfWeek === dayOfWeek);
    if (!dayAvailability || !dayAvailability.isActive) return [];
    
    return generateHourSlots(dayAvailability.startHour, dayAvailability.endHour);
  }
};

// Helper para generar slots de horas
const generateHourSlots = (startHour, endHour) => {
  const slots = [];
  for (let h = startHour; h < endHour; h++) {
    slots.push(h);
  }
  return slots;
};

// ============================================
// AVAILABILITY EXCEPTIONS SERVICE
// ============================================
export const exceptionsService = {
  getAll: () => db.availabilityExceptions,
  
  getByDate: (date) => {
    const dateObj = new Date(date);
    return db.availabilityExceptions.find(
      e => e.date.toDateString() === dateObj.toDateString()
    );
  },
  
  create: (exceptionData) => {
    const newException = {
      id: generateId('exc'),
      ...exceptionData,
      date: new Date(exceptionData.date),
      createdAt: new Date()
    };
    db.availabilityExceptions.push(newException);
    return newException;
  },
  
  delete: (id) => {
    const index = db.availabilityExceptions.findIndex(e => e.id === id);
    if (index === -1) return false;
    db.availabilityExceptions.splice(index, 1);
    return true;
  }
};

// ============================================
// BOOKINGS SERVICE
// ============================================
export const bookingsService = {
  getAll: () => db.bookings,
  
  getById: (id) => db.bookings.find(b => b.id === id),
  
  getByUserId: (userId) => db.bookings.filter(b => b.userId === userId),
  
  getByDate: (date) => {
    const dateObj = new Date(date);
    return db.bookings.filter(
      b => new Date(b.date).toDateString() === dateObj.toDateString() && b.status !== 'cancelled'
    );
  },
  
  getByDateAndHour: (date, hour) => {
    const dateObj = new Date(date);
    return db.bookings.find(
      b => new Date(b.date).toDateString() === dateObj.toDateString() && 
           b.hour === hour && 
           b.status !== 'cancelled'
    );
  },
  
  isSlotAvailable: (date, hour) => {
    // Verificar si el entrenador está disponible
    const availableHours = availabilityService.getAvailableHoursForDate(date);
    if (!availableHours.includes(hour)) return false;
    
    // Verificar si ya hay una reserva
    const existingBooking = bookingsService.getByDateAndHour(date, hour);
    return !existingBooking;
  },
  
  create: (bookingData) => {
    // Verificar disponibilidad
    if (!bookingsService.isSlotAvailable(bookingData.date, bookingData.hour)) {
      return { error: 'Slot no disponible' };
    }
    
    // Verificar que el usuario tiene clases disponibles
    const subscription = subscriptionsService.getActiveByUserId(bookingData.userId);
    if (!subscription || subscription.remainingClasses <= 0) {
      return { error: 'No tienes clases disponibles' };
    }
    
    const newBooking = {
      id: generateId('book'),
      ...bookingData,
      date: new Date(bookingData.date),
      subscriptionId: subscription.id,
      status: 'confirmed',
      createdAt: new Date()
    };
    
    db.bookings.push(newBooking);
    subscriptionsService.decrementClasses(subscription.id);
    
    return newBooking;
  },
  
  cancel: (id, reason = '') => {
    const booking = db.bookings.find(b => b.id === id);
    if (!booking) return null;
    
    booking.status = 'cancelled';
    booking.cancelledAt = new Date();
    booking.cancelReason = reason;
    
    // Devolver la clase al usuario
    const subscription = subscriptionsService.getById(booking.subscriptionId);
    if (subscription) {
      subscription.remainingClasses += 1;
    }
    
    return booking;
  },
  
  complete: (id) => {
    const booking = db.bookings.find(b => b.id === id);
    if (!booking) return null;
    booking.status = 'completed';
    return booking;
  },
  
  markNoShow: (id) => {
    const booking = db.bookings.find(b => b.id === id);
    if (!booking) return null;
    booking.status = 'no_show';
    return booking;
  }
};

// ============================================
// RESET DATABASE (Para testing)
// ============================================
export const resetDatabase = () => {
  db = {
    users: [...mockData.users],
    plans: [...mockData.plans],
    subscriptions: [...mockData.subscriptions],
    trainerAvailability: [...mockData.trainerAvailability],
    availabilityExceptions: [...mockData.availabilityExceptions],
    bookings: [...mockData.bookings],
    notifications: [...mockData.notifications]
  };
};

export default {
  users: usersService,
  plans: plansService,
  subscriptions: subscriptionsService,
  availability: availabilityService,
  exceptions: exceptionsService,
  bookings: bookingsService,
  reset: resetDatabase
};
