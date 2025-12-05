import { createContext, useContext, useState } from 'react';
import { bookings as initialBookings, trainerAvailability, availabilityExceptions, subscriptions } from '../data/mockData';

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([...initialBookings]);

  // Obtener disponibilidad del entrenador para una fecha
  const getAvailabilityForDate = (date) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const dateStr = dateObj.toISOString().split('T')[0];
    
    // Verificar excepciones primero
    const exception = availabilityExceptions.find(e => e.exceptionDate === dateStr);
    if (exception) {
      if (!exception.isAvailable) return { available: false, hours: [], reason: exception.reason };
      return { 
        available: true, 
        hours: generateHours(exception.startHour, exception.endHour),
        reason: exception.reason 
      };
    }
    
    // Usar disponibilidad normal
    const dayAvail = trainerAvailability.find(a => a.dayOfWeek === dayOfWeek);
    if (!dayAvail || !dayAvail.isActive) {
      return { available: false, hours: [], reason: 'Día no laborable' };
    }
    
    return { 
      available: true, 
      hours: generateHours(dayAvail.startHour, dayAvail.endHour) 
    };
  };

  // Generar array de horas
  const generateHours = (start, end) => {
    const hours = [];
    for (let h = start; h < end; h++) {
      hours.push(h);
    }
    return hours;
  };

  // Verificar si un slot está ocupado
  const isSlotBooked = (date, hour) => {
    const dateStr = new Date(date).toISOString().split('T')[0];
    return bookings.some(
      b => b.bookingDate === dateStr && 
           b.bookingHour === hour && 
           b.status !== 'cancelled'
    );
  };

  // Obtener reserva de un slot
  const getBookingForSlot = (date, hour) => {
    const dateStr = new Date(date).toISOString().split('T')[0];
    return bookings.find(
      b => b.bookingDate === dateStr && 
           b.bookingHour === hour && 
           b.status !== 'cancelled'
    );
  };

  // Obtener reservas de un usuario
  const getUserBookings = (userId) => {
    return bookings.filter(b => b.userId === userId).sort(
      (a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)
    );
  };

  // Obtener reservas por fecha
  const getBookingsByDate = (date) => {
    const dateStr = new Date(date).toISOString().split('T')[0];
    return bookings.filter(
      b => b.bookingDate === dateStr && b.status !== 'cancelled'
    ).sort((a, b) => a.bookingHour - b.bookingHour);
  };

  // Crear nueva reserva
  const createBooking = (userId, userName, userPhone, subscriptionId, date, hour) => {
    const dateStr = new Date(date).toISOString().split('T')[0];
    
    // Verificar disponibilidad
    if (isSlotBooked(date, hour)) {
      return { success: false, error: 'Este horario ya está ocupado' };
    }

    // Verificar que el día esté disponible
    const availability = getAvailabilityForDate(date);
    if (!availability.available || !availability.hours.includes(hour)) {
      return { success: false, error: 'Horario no disponible' };
    }

    const newBooking = {
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

    // Actualizar clases restantes en suscripción (mock)
    const sub = subscriptions.find(s => s.id === subscriptionId);
    if (sub) {
      sub.remainingClasses -= 1;
    }

    return { success: true, booking: newBooking };
  };

  // Cancelar reserva
  const cancelBooking = (bookingId, reason = '') => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        // Devolver clase a la suscripción
        const sub = subscriptions.find(s => s.id === b.subscriptionId);
        if (sub) {
          sub.remainingClasses += 1;
        }
        
        return {
          ...b,
          status: 'cancelled',
          cancelledAt: new Date().toISOString(),
          cancelReason: reason
        };
      }
      return b;
    }));
  };

  // Completar reserva (para admin)
  const completeBooking = (bookingId) => {
    setBookings(prev => prev.map(b => 
      b.id === bookingId ? { ...b, status: 'completed' } : b
    ));
  };

  // Marcar no-show
  const markNoShow = (bookingId) => {
    setBookings(prev => prev.map(b => 
      b.id === bookingId ? { ...b, status: 'no_show' } : b
    ));
  };

  // Obtener todas las reservas (para admin)
  const getAllBookings = () => bookings;

  // Estadísticas
  const getStats = () => {
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

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
