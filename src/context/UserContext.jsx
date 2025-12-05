import { createContext, useContext, useState } from 'react';
import { users as initialUsers, subscriptions as initialSubscriptions, plans } from '../data/mockData';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([...initialUsers]);
  const [subscriptions, setSubscriptions] = useState([...initialSubscriptions]);

  // Obtener todos los clientes
  const getClients = () => users.filter(u => u.role === 'client' && u.isActive);

  // Obtener usuario por ID
  const getUserById = (id) => users.find(u => u.id === id);

  // Crear nuevo cliente
  const createUser = (userData) => {
    const newUser = {
      id: `user-${Date.now()}`,
      email: userData.email,
      name: userData.name,
      phone: userData.phone || '',
      role: 'client',
      avatarUrl: null,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Verificar email único
    if (users.some(u => u.email === userData.email)) {
      return { success: false, error: 'El email ya está registrado' };
    }

    setUsers(prev => [...prev, newUser]);

    // Crear suscripción si se especifica plan
    if (userData.planId) {
      const plan = plans.find(p => p.id === userData.planId);
      if (plan) {
        const newSub = {
          id: `sub-${Date.now()}`,
          userId: newUser.id,
          planId: userData.planId,
          startDate: new Date().toISOString().split('T')[0],
          endDate: getEndOfMonth(),
          remainingClasses: plan.classesPerMonth,
          status: 'active',
          paymentStatus: 'paid',
          createdAt: new Date().toISOString(),
          user: { id: newUser.id, name: newUser.name, email: newUser.email },
          plan: { id: plan.id, name: plan.name, classesPerMonth: plan.classesPerMonth }
        };
        setSubscriptions(prev => [...prev, newSub]);
      }
    }

    return { success: true, user: newUser };
  };

  // Actualizar cliente
  const updateUser = (id, updates) => {
    // Verificar email único si se está cambiando
    if (updates.email) {
      const existingUser = users.find(u => u.email === updates.email && u.id !== id);
      if (existingUser) {
        return { success: false, error: 'El email ya está registrado' };
      }
    }

    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const updated = { ...u, ...updates, updatedAt: new Date().toISOString() };
        // Actualizar nombre en suscripciones
        setSubscriptions(subs => subs.map(s => 
          s.userId === id ? { ...s, user: { ...s.user, name: updated.name, email: updated.email } } : s
        ));
        return updated;
      }
      return u;
    }));

    return { success: true };
  };

  // Eliminar cliente (soft delete)
  const deleteUser = (id) => {
    setUsers(prev => prev.map(u => 
      u.id === id ? { ...u, isActive: false, updatedAt: new Date().toISOString() } : u
    ));
    // Cancelar suscripciones activas
    setSubscriptions(prev => prev.map(s => 
      s.userId === id && s.status === 'active' ? { ...s, status: 'cancelled' } : s
    ));
    return { success: true };
  };

  // Obtener suscripción activa de un usuario
  const getActiveSubscription = (userId) => {
    return subscriptions.find(s => s.userId === userId && s.status === 'active');
  };

  // Actualizar suscripción (cambiar plan)
  const updateSubscription = (userId, planId) => {
    const plan = plans.find(p => p.id === planId);
    if (!plan) return { success: false, error: 'Plan no encontrado' };

    const existingSub = subscriptions.find(s => s.userId === userId && s.status === 'active');
    
    if (existingSub) {
      // Actualizar suscripción existente
      setSubscriptions(prev => prev.map(s => 
        s.id === existingSub.id ? {
          ...s,
          planId,
          remainingClasses: plan.classesPerMonth,
          plan: { id: plan.id, name: plan.name, classesPerMonth: plan.classesPerMonth }
        } : s
      ));
    } else {
      // Crear nueva suscripción
      const user = users.find(u => u.id === userId);
      const newSub = {
        id: `sub-${Date.now()}`,
        userId,
        planId,
        startDate: new Date().toISOString().split('T')[0],
        endDate: getEndOfMonth(),
        remainingClasses: plan.classesPerMonth,
        status: 'active',
        paymentStatus: 'paid',
        createdAt: new Date().toISOString(),
        user: { id: userId, name: user?.name, email: user?.email },
        plan: { id: plan.id, name: plan.name, classesPerMonth: plan.classesPerMonth }
      };
      setSubscriptions(prev => [...prev, newSub]);
    }

    return { success: true };
  };

  // Helper para obtener fin del mes
  const getEndOfMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
  };

  return (
    <UserContext.Provider value={{
      users,
      subscriptions,
      getClients,
      getUserById,
      createUser,
      updateUser,
      deleteUser,
      getActiveSubscription,
      updateSubscription,
      plans
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};
