import { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay, addWeeks, subWeeks } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Check, X, Clock, User } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useBooking } from '../../context/BookingContext';

export default function AdminSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { getAvailabilityForDate, getBookingsByDate, completeBooking, markNoShow } = useBooking();

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const nextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
  const prevWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  const handleComplete = (bookingId) => {
    completeBooking(bookingId);
  };

  const handleNoShow = (bookingId) => {
    markNoShow(bookingId);
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Calendario de Clases</h2>
          <p className="text-gray-500 dark:text-gray-400">Gestiona las reservas y disponibilidad</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={goToToday}
            className="px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
          >
            Hoy
          </button>
          <div className="flex items-center gap-1 bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700">
            <button onClick={prevWeek} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-l-lg transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="px-3 text-sm font-medium text-gray-900 dark:text-white capitalize min-w-[120px] text-center">
              {format(currentDate, 'MMMM yyyy', { locale: es })}
            </span>
            <button onClick={nextWeek} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-r-lg transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {weekDays.map((day) => {
          const isToday = isSameDay(day, new Date());
          const availability = getAvailabilityForDate(day);
          const bookings = getBookingsByDate(day);

          return (
            <div 
              key={day.toString()} 
              className={`bg-white dark:bg-zinc-900 rounded-xl shadow-sm border overflow-hidden ${
                isToday 
                  ? 'border-primary-500 ring-2 ring-primary-500/20' 
                  : 'border-gray-100 dark:border-zinc-800'
              }`}
            >
              {/* Day Header */}
              <div className={`p-3 border-b border-gray-100 dark:border-zinc-800 ${
                isToday ? 'bg-primary-50 dark:bg-primary-900/20' : 'bg-gray-50 dark:bg-zinc-800'
              }`}>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">
                  {format(day, 'EEEE', { locale: es })}
                </p>
                <p className={`text-2xl font-bold ${isToday ? 'text-primary-600' : 'text-gray-900 dark:text-white'}`}>
                  {format(day, 'd')}
                </p>
                {!availability.available && (
                  <span className="mt-1 inline-block px-2 py-0.5 text-xs bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded">
                    {availability.reason || 'No disponible'}
                  </span>
                )}
              </div>

              {/* Bookings */}
              <div className="p-3 space-y-2 min-h-[200px]">
                {availability.available ? (
                  bookings.length > 0 ? (
                    bookings.map((booking) => (
                      <div 
                        key={booking.id} 
                        className={`p-2 rounded-lg border ${
                          booking.status === 'completed' 
                            ? 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800' 
                            : booking.status === 'no_show'
                            ? 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800'
                            : 'bg-primary-50 border-primary-200 dark:bg-primary-900/10 dark:border-primary-800'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {booking.bookingHour}:00
                          </span>
                          {booking.status === 'confirmed' && (
                            <div className="flex gap-1">
                              <button 
                                onClick={() => handleComplete(booking.id)}
                                className="p-1 hover:bg-green-200 dark:hover:bg-green-800 rounded transition-colors"
                                title="Marcar completada"
                              >
                                <Check className="h-3.5 w-3.5 text-green-600" />
                              </button>
                              <button 
                                onClick={() => handleNoShow(booking.id)}
                                className="p-1 hover:bg-red-200 dark:hover:bg-red-800 rounded transition-colors"
                                title="No asistió"
                              >
                                <X className="h-3.5 w-3.5 text-red-600" />
                              </button>
                            </div>
                          )}
                          {booking.status === 'completed' && (
                            <Check className="h-4 w-4 text-green-600" />
                          )}
                          {booking.status === 'no_show' && (
                            <X className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {booking.user?.name}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
                      <div className="text-center">
                        <Clock className="h-8 w-8 mx-auto mb-1 opacity-50" />
                        <p className="text-xs">Sin reservas</p>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
                    <div className="text-center">
                      <X className="h-8 w-8 mx-auto mb-1 opacity-50" />
                      <p className="text-xs">Día cerrado</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary-100 border border-primary-200"></div>
          <span className="text-gray-600 dark:text-gray-400">Confirmada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-100 border border-green-200"></div>
          <span className="text-gray-600 dark:text-gray-400">Completada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-100 border border-red-200"></div>
          <span className="text-gray-600 dark:text-gray-400">No asistió</span>
        </div>
      </div>
    </AdminLayout>
  );
}
