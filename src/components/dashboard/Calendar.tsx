import { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay, isBefore } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';

interface SelectedSlot {
  day: Date;
  hour: number;
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);
  const { user, updateRemainingClasses } = useAuth();
  const { getAvailabilityForDate, isSlotBooked, getBookingForSlot, createBooking } = useBooking();

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const handleSlotClick = (day: Date, hour: number) => {
    const slotDate = new Date(day);
    slotDate.setHours(hour, 0, 0, 0);
    if (isBefore(slotDate, new Date())) return;

    const availability = getAvailabilityForDate(day);
    if (!availability.available || !availability.hours.includes(hour)) return;

    if (isSlotBooked(day, hour)) return;

    if (!user?.subscription || user.subscription.remainingClasses <= 0) {
      alert('No tienes clases disponibles en tu plan');
      return;
    }

    setSelectedSlot({ day, hour });
  };

  const handleConfirmBooking = () => {
    if (!selectedSlot || !user?.subscription) return;

    const result = createBooking(
      user.id,
      user.name,
      user.phone,
      user.subscription.id,
      selectedSlot.day,
      selectedSlot.hour
    );

    if (result.success) {
      updateRemainingClasses(-1);
      alert(`¡Clase reservada para el ${format(selectedSlot.day, 'EEEE d MMMM', { locale: es })} a las ${selectedSlot.hour}:00!`);
    } else {
      alert(result.error);
    }

    setSelectedSlot(null);
  };

  const nextWeek = () => setCurrentDate(addDays(currentDate, 7));
  const prevWeek = () => setCurrentDate(addDays(currentDate, -7));

  const renderSlot = (day: Date, hour: number) => {
    const availability = getAvailabilityForDate(day);
    const isAvailable = availability.available && availability.hours.includes(hour);
    const booked = isSlotBooked(day, hour);
    const booking = booked ? getBookingForSlot(day, hour) : null;
    const isMyBooking = booking?.userId === user?.id;
    
    const slotDate = new Date(day);
    slotDate.setHours(hour, 0, 0, 0);
    const isPast = isBefore(slotDate, new Date());

    let bgClass = 'hover:bg-primary-50 dark:hover:bg-primary-900/10';
    let content = <span className="opacity-0 group-hover:opacity-100 text-xs text-primary-600 font-bold">+</span>;
    let cursor = 'cursor-pointer';

    if (!isAvailable || isPast) {
      bgClass = 'bg-gray-100 dark:bg-zinc-800/50';
      content = <span className="text-transparent">.</span>;
      cursor = 'cursor-not-allowed';
    } else if (booked) {
      if (isMyBooking) {
        bgClass = 'bg-primary-100 dark:bg-primary-900/30';
        content = (
          <div className="flex flex-col items-center">
            <span className="text-xs text-primary-700 dark:text-primary-300 font-semibold">Tu clase</span>
          </div>
        );
      } else {
        bgClass = 'bg-red-50 dark:bg-red-900/10';
        content = <span className="text-xs text-red-400 font-medium">Ocupado</span>;
      }
      cursor = 'cursor-not-allowed';
    }

    return (
      <div 
        key={`${day}-${hour}`} 
        onClick={() => !booked && isAvailable && !isPast && handleSlotClick(day, hour)}
        className={`h-14 border-b border-gray-100 dark:border-zinc-800 transition-colors ${cursor} flex items-center justify-center group ${bgClass}`}
      >
        {content}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[550px] relative">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
            {format(currentDate, 'MMMM yyyy', { locale: es })}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Clases disponibles: <span className="font-bold text-primary-600">{user?.subscription?.remainingClasses || 0}</span>
          </p>
        </div>
        <div className="flex space-x-2">
          <button onClick={prevWeek} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={nextWeek} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto border rounded-lg border-gray-200 dark:border-zinc-700">
        <div className="min-w-[700px]">
          <div className="grid grid-cols-8 border-b border-gray-200 dark:border-zinc-700 sticky top-0 bg-white dark:bg-zinc-900 z-10">
            <div className="p-3 text-center font-semibold text-gray-500 border-r dark:border-zinc-800 text-sm">
              <Clock className="h-4 w-4 mx-auto" />
            </div>
            {weekDays.map((day) => {
              const isToday = isSameDay(day, new Date());
              return (
                <div key={day.toString()} className={`p-3 text-center border-r last:border-r-0 dark:border-zinc-800 ${isToday ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`}>
                  <div className="font-semibold text-gray-900 dark:text-white capitalize text-sm">{format(day, 'EEE', { locale: es })}</div>
                  <div className={`text-lg ${isToday ? 'text-primary-600 font-bold' : 'text-gray-500'}`}>{format(day, 'd')}</div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-8">
            <div className="col-span-1">
              {Array.from({ length: 15 }, (_, i) => i + 6).map((hour) => (
                <div key={hour} className="h-14 flex items-center justify-center border-b border-r border-gray-100 dark:border-zinc-800 text-xs text-gray-500 font-medium">
                  {hour}:00
                </div>
              ))}
            </div>

            {weekDays.map((day) => (
              <div key={day.toString()} className="col-span-1 border-r last:border-r-0 border-gray-200 dark:border-zinc-800">
                {Array.from({ length: 15 }, (_, i) => i + 6).map((hour) => renderSlot(day, hour))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedSlot && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-2xl max-w-sm w-full mx-4 border border-gray-200 dark:border-zinc-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Confirmar Reserva</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              ¿Reservar clase el <strong className="text-primary-600">{format(selectedSlot.day, 'EEEE d MMMM', { locale: es })}</strong> a las <strong className="text-primary-600">{selectedSlot.hour}:00</strong>?
            </p>
            <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-3 mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Te quedarán <span className="font-bold text-primary-600">{(user?.subscription?.remainingClasses || 1) - 1}</span> clases después de esta reserva.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setSelectedSlot(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleConfirmBooking}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-lg shadow-primary-600/20 transition-all"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
