import { createContext, useContext, useState, ReactNode } from 'react';
import { bookings as initialBookings, trainerAvailability, availabilityExceptions, subscriptions } from '../data/mockData';
import type { Booking, DayAvailability, BookingStats } from '../types';

interface BookingResult {
  success: boolean;
  booking?: Booking;
  error?: string;
}

interface BookingContextType {
  bookings: Booking[];
  getAvailabilityForDate: (date: Date) => DayAvailability;
  isSlotBooked: (date: Date, hour: number) => boolean;
  getBookingForSlot: (date: Date, hour: number) => Booking | undefined;
  getUserBookings: (userId: string) => Booking[];
  getBookingsByDate: (date: Date) => Booking[];
  createBooking: (userId: string, userName: string, userPhone: string, subscriptionId: string, date: Date, hour: number) => BookingResult;
  cancelBooking: (bookingId: string, reason?: string) => void;
  completeBooking: (bookingId: string) => void;
  markNoShow: (bookingId: string) => void;
  getAllBookings: () => Booking[];
  getStats: () => BookingStats;
}

const BookingContext = createContext<BookingContextType | null>(null);

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider = ({ children }: BookingProviderProps) => {
  const [bookings, setBookings] = useState<Booking[]>([...initialBookings]);

  const generateHours = (start: number, end: number): number[] => {
    const hours: number[] = [];
    for (let h = start; h < end; h++) {
      hours.push(h);
    }
    return hours;
  };

  const getAvailabilityForDate = (date: Date): DayAvailability => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const dateStr = dateObj.toISOString().split('T')[0];
    
    const exception = availabilityExceptions.find(e => e.exceptionDate === dateStr);
    if (exception) {
      if (!exception.isAvailable) return { available: false, hours: [], reason: exception.reason };
      return { 
        available: true, 
        hours: generateHours(exception.startHour!, exception.endHour!),
        reason: exception.reason 
      };
    }
    
    const dayAvail = trainerAvailability.find(a => a.dayOfWeek === dayOfWeek);
    if (!dayAvail || !dayAvail.isActive) {
      return { available: false, hours: [], reason: 'Día no laborable' };
    }
    
    return { 
      available: true, 
      hours: generateHours(dayAvail.startHour!, dayAvail.endHour!) 
    };
  };

  const isSlotBooked = (date: Date, hour: number): boolean => {
    const dateStr = new Date(date).toISOString().split('T')[0];
    return bookings.some(
      b => b.bookingDate === dateStr && 
           b.bookingHour === hour && 
           b.status !== 'cancelled'
    );
  };

  const getBookingForSlot = (date: Date, hour: number): Booking | undefined => {
    const dateStr = new Date(date).toISOString().split('T')[0];
    return bookings.find(
      b => b.bookingDate === dateStr && 
           b.bookingHour === hour && 
           b.status !== 'cancelled'
    );
  };

  const getUserBookings = (userId: string): Booking[] => {
    return bookings.filter(b => b.userId === userId).sort(
      (a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime()
    );
  };

  const getBookingsByDate = (date: Date): Booking[] => {
    const dateStr = new Date(date).toISOString().split('T')[0];
    return bookings.filter(
      b => b.bookingDate === dateStr && b.status !== 'cancelled'
    ).sort((a, b) => a.bookingHour - b.bookingHour);
  };

  const createBooking = (userId: string, userName: string, userPhone: string, subscriptionId: string, date: Date, hour: number): BookingResult => {
    const dateStr = new Date(date).toISOString().split('T')[0];
    
    if (isSlotBooked(date, hour)) {
      return { success: false, error: 'Este horario ya está ocupado' };
    }

    const availability = getAvailabilityForDate(date);
    if (!availability.available || !availability.hours.includes(hour)) {
      return { success: false, error: 'Horario no disponible' };
    }

    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      userId,
      subscriptionId,
      bookingDate: dateStr,
      bookingHour: hour,
      status: 'confirmed',
      notes: null,
      cancelledAt: null,
      cancelReason: null,
      createdAt: new Date().toISOString(),
      user: { id: userId, name: userName, phone: userPhone }
    };

    setBookings(prev => [...prev, newBooking]);

    const sub = subscriptions.find(s => s.id === subscriptionId);
    if (sub) {
      sub.remainingClasses -= 1;
    }

    return { success: true, booking: newBooking };
  };

  const cancelBooking = (bookingId: string, reason = '') => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        const sub = subscriptions.find(s => s.id === b.subscriptionId);
        if (sub) {
          sub.remainingClasses += 1;
        }
        
        return {
          ...b,
          status: 'cancelled' as const,
          cancelledAt: new Date().toISOString(),
          cancelReason: reason
        };
      }
      return b;
    }));
  };

  const completeBooking = (bookingId: string) => {
    setBookings(prev => prev.map(b => 
      b.id === bookingId ? { ...b, status: 'completed' as const } : b
    ));
  };

  const markNoShow = (bookingId: string) => {
    setBookings(prev => prev.map(b => 
      b.id === bookingId ? { ...b, status: 'no_show' as const } : b
    ));
  };

  const getAllBookings = (): Booking[] => bookings;

  const getStats = (): BookingStats => {
    const today = new Date().toISOString().split('T')[0];
    const thisMonth = new Date().toISOString().slice(0, 7);
    
    return {
      total: bookings.length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      completed: bookings.filter(b => b.status === 'completed').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
      today: bookings.filter(b => b.bookingDate === today && b.status === 'confirmed').length,
      thisMonth: bookings.filter(b => b.bookingDate.startsWith(thisMonth) && b.status !== 'cancelled').length
    };
  };

  return (
    <BookingContext.Provider value={{
      bookings,
      getAvailabilityForDate,
      isSlotBooked,
      getBookingForSlot,
      getUserBookings,
      getBookingsByDate,
      createBooking,
      cancelBooking,
      completeBooking,
      markNoShow,
      getAllBookings,
      getStats
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
