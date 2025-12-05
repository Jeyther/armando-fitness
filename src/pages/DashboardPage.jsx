import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import Calendar from '../components/dashboard/Calendar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon, Clock, X, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { getUserBookings, cancelBooking } = useBooking();
  const navigate = useNavigate();

  const myBookings = getUserBookings(user?.id);
  const upcomingBookings = myBookings
    .filter(b => b.status === 'confirmed' && new Date(b.bookingDate) >= new Date())
    .slice(0, 3);

  const handleCancel = (bookingId) => {
    if (confirm('¿Estás seguro de cancelar esta reserva?')) {
      cancelBooking(bookingId, 'Cancelado por el cliente');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl">
            Hola, {user?.name?.split(' ')[0]} 👋
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Gestiona tus clases y reservas
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-zinc-800">
            <p className="text-xs text-gray-500 dark:text-gray-400">Plan {user?.subscription?.planName}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-primary-600">{user?.subscription?.remainingClasses || 0}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">clases restantes</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="Cerrar sesión"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 shadow-sm rounded-xl p-6 border border-gray-100 dark:border-zinc-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary-600" />
            Reservar Clase
          </h3>
          <Calendar />
        </div>

        {/* Upcoming Classes */}
        <div className="bg-white dark:bg-zinc-900 shadow-sm rounded-xl p-6 border border-gray-100 dark:border-zinc-800 h-fit">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary-600" />
            Próximas Clases
          </h3>
          
          {upcomingBookings.length > 0 ? (
            <div className="space-y-3">
              {upcomingBookings.map((booking) => (
                <div 
                  key={booking.id} 
                  className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-100 dark:border-primary-800"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-primary-700 dark:text-primary-300 capitalize">
                      {format(new Date(booking.bookingDate), 'EEEE d MMMM', { locale: es })}
                    </span>
                    <button 
                      onClick={() => handleCancel(booking.id)}
                      className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                      title="Cancelar"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {booking.bookingHour}:00
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Duración: 1 hora
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No tienes clases programadas</p>
              <p className="text-sm">Selecciona un horario en el calendario</p>
            </div>
          )}

          {/* Recent History */}
          {myBookings.filter(b => b.status === 'completed').length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-zinc-800">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Clases completadas</h4>
              <div className="space-y-2">
                {myBookings
                  .filter(b => b.status === 'completed')
                  .slice(0, 3)
                  .map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {format(new Date(booking.bookingDate), 'd MMM', { locale: es })}
                      </span>
                      <span className="text-green-600 dark:text-green-400">✓ Completada</span>
                    </div>
                  ))
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
