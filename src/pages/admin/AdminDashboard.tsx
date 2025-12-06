import { Users, Calendar, TrendingUp, Clock } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useBooking } from '../../context/BookingContext';
import { users, subscriptions } from '../../data/mockData';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface StatCard {
  label: string;
  value: number;
  icon: typeof Users;
  color: string;
}

export default function AdminDashboard() {
  const { getStats, getBookingsByDate, getAllBookings } = useBooking();
  const stats = getStats();
  const todayBookings = getBookingsByDate(new Date());
  const allBookings = getAllBookings();

  const activeClients = users.filter(u => u.role === 'client' && u.isActive).length;
  const activeSubs = subscriptions.filter(s => s.status === 'active').length;
  
  const upcomingBookings = allBookings
    .filter(b => b.status === 'confirmed' && new Date(b.bookingDate) >= new Date())
    .sort((a, b) => new Date(a.bookingDate).getTime() - new Date(b.bookingDate).getTime())
    .slice(0, 5);

  const statCards: StatCard[] = [
    { label: 'Clientes Activos', value: activeClients, icon: Users, color: 'bg-blue-500' },
    { label: 'Suscripciones', value: activeSubs, icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Clases Hoy', value: stats.today, icon: Calendar, color: 'bg-purple-500' },
    { label: 'Este Mes', value: stats.thisMonth, icon: Clock, color: 'bg-orange-500' },
  ];

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
          <div className="p-6 border-b border-gray-100 dark:border-zinc-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Clases de Hoy</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{format(new Date(), 'EEEE d MMMM', { locale: es })}</p>
          </div>
          <div className="p-6">
            {todayBookings.length > 0 ? (
              <div className="space-y-4">
                {todayBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                    <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                      <span className="text-xl font-bold text-primary-600">{booking.bookingHour}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{booking.user?.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{booking.bookingHour}:00 - {booking.bookingHour + 1}:00</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      booking.status === 'completed' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-gray-100 text-gray-700 dark:bg-zinc-700 dark:text-gray-300'
                    }`}>
                      {booking.status === 'confirmed' ? 'Confirmada' : 
                       booking.status === 'completed' ? 'Completada' : booking.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No hay clases programadas para hoy</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
          <div className="p-6 border-b border-gray-100 dark:border-zinc-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Próximas Clases</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Reservas confirmadas</p>
          </div>
          <div className="p-6">
            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                    <div className="text-center min-w-[50px]">
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                        {format(new Date(booking.bookingDate), 'EEE', { locale: es })}
                      </p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {format(new Date(booking.bookingDate), 'd')}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{booking.user?.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{booking.bookingHour}:00</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No hay próximas clases</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
