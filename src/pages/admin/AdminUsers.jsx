import { useState } from 'react';
import { 
  Search, Plus, MoreVertical, Calendar, Phone, Mail, 
  ChevronDown, ChevronUp, Edit2, Trash2, MessageCircle, X, Check 
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useUsers } from '../../context/UserContext';
import { useBooking } from '../../context/BookingContext';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedUser, setExpandedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  
  const { getClients, createUser, updateUser, deleteUser, getActiveSubscription, updateSubscription, plans } = useUsers();
  const { getUserBookings } = useBooking();

  const clients = getClients();
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openWhatsApp = (phone, name) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const message = encodeURIComponent(`Hola ${name}, te escribo desde Armando Fitness.`);
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const handleCreate = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    const subscription = getActiveSubscription(user.id);
    setEditingUser({ ...user, planId: subscription?.planId || '' });
    setShowModal(true);
  };

  const handleDelete = (userId) => {
    deleteUser(userId);
    setDeleteConfirm(null);
  };

  const toggleExpand = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Clientes</h2>
          <p className="text-gray-500 dark:text-gray-400">{clients.length} clientes activos</p>
        </div>
        <div className="flex gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button 
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            <Plus className="h-4 w-4" />
            Nuevo Cliente
          </button>
        </div>
      </div>

      {/* Clients List */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 dark:bg-zinc-800 border-b border-gray-100 dark:border-zinc-700 text-sm font-medium text-gray-500">
          <div className="col-span-3">Cliente</div>
          <div className="col-span-2">Teléfono</div>
          <div className="col-span-2">Plan</div>
          <div className="col-span-2">Clases</div>
          <div className="col-span-3">Acciones</div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-zinc-800">
          {filteredClients.map((client) => {
            const subscription = getActiveSubscription(client.id);
            const bookings = getUserBookings(client.id);
            const isExpanded = expandedUser === client.id;
            const plan = plans.find(p => p.id === subscription?.planId);

            return (
              <div key={client.id}>
                <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                  {/* Client Info */}
                  <div className="col-span-12 md:col-span-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{client.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{client.email}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="col-span-6 md:col-span-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {client.phone || 'Sin teléfono'}
                    </p>
                  </div>

                  {/* Plan */}
                  <div className="col-span-6 md:col-span-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      subscription?.planId === 'plan-elite' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                      subscription?.planId === 'plan-pro' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      subscription?.planId === 'plan-basic' ? 'bg-gray-100 text-gray-700 dark:bg-zinc-700 dark:text-gray-300' :
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {plan?.name || 'Sin plan'}
                    </span>
                  </div>

                  {/* Remaining Classes */}
                  <div className="col-span-6 md:col-span-2">
                    <div className="flex items-center gap-1">
                      <span className="text-xl font-bold text-primary-600">{subscription?.remainingClasses || 0}</span>
                      <span className="text-xs text-gray-500">/ {plan?.classesPerMonth || 0}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-6 md:col-span-3 flex items-center gap-1 flex-wrap">
                    {client.phone && (
                      <button 
                        onClick={() => openWhatsApp(client.phone, client.name)}
                        className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                        title="WhatsApp"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </button>
                    )}
                    <button 
                      onClick={() => handleEdit(client)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => setDeleteConfirm(client.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => toggleExpand(client.id)}
                      className="p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                    >
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded History */}
                {isExpanded && (
                  <div className="bg-gray-50 dark:bg-zinc-800/50 border-t border-gray-100 dark:border-zinc-700 p-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Historial de Clases</h4>
                    {bookings.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {bookings.slice(0, 8).map((booking) => (
                          <div key={booking.id} className="bg-white dark:bg-zinc-900 p-3 rounded-lg border border-gray-100 dark:border-zinc-700">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {format(new Date(booking.bookingDate), 'd MMM', { locale: es })}
                              </span>
                              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                booking.status === 'confirmed' ? 'bg-yellow-100 text-yellow-700' :
                                booking.status === 'completed' ? 'bg-green-100 text-green-700' :
                                booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {booking.status === 'confirmed' ? 'Pend.' :
                                 booking.status === 'completed' ? '✓' :
                                 booking.status === 'cancelled' ? '✕' : booking.status}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500">{booking.bookingHour}:00</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">Sin historial</p>
                    )}
                  </div>
                )}

                {/* Delete Confirmation */}
                {deleteConfirm === client.id && (
                  <div className="bg-red-50 dark:bg-red-900/20 border-t border-red-100 dark:border-red-800 p-4 flex items-center justify-between">
                    <p className="text-sm text-red-700 dark:text-red-400">¿Eliminar a {client.name}?</p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setDeleteConfirm(null)}
                        className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded"
                      >
                        Cancelar
                      </button>
                      <button 
                        onClick={() => handleDelete(client.id)}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredClients.length === 0 && (
          <div className="p-8 text-center text-gray-500">No se encontraron clientes</div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <UserModal 
          user={editingUser}
          plans={plans}
          onSave={(data) => {
            if (editingUser) {
              const result = updateUser(editingUser.id, data);
              if (result.success && data.planId) {
                updateSubscription(editingUser.id, data.planId);
              }
            } else {
              createUser(data);
            }
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </AdminLayout>
  );
}

// Modal Component
function UserModal({ user, plans, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    planId: user?.planId || ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError('Nombre y email son requeridos');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-zinc-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {user ? 'Editar Cliente' : 'Nuevo Cliente'}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 text-sm rounded-lg">{error}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              placeholder="Nombre completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              placeholder="email@ejemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teléfono (WhatsApp)</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              placeholder="+1 555 123 4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Plan</label>
            <select
              value={formData.planId}
              onChange={(e) => setFormData({ ...formData, planId: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Sin plan</option>
              {plans.map(plan => (
                <option key={plan.id} value={plan.id}>
                  {plan.name} - ${plan.price}/mes ({plan.classesPerMonth} clases)
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              {user ? 'Guardar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
