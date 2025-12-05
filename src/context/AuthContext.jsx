import { createContext, useContext, useState } from 'react';
import { users, subscriptions } from '../data/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Buscar usuario en mockData
    const foundUser = users.find(u => u.email === email && u.isActive);
    
    if (foundUser) {
      // Buscar suscripción activa si es cliente
      let subscription = null;
      if (foundUser.role === 'client') {
        subscription = subscriptions.find(
          s => s.userId === foundUser.id && s.status === 'active'
        );
      }

      const loggedUser = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        phone: foundUser.phone,
        role: foundUser.role,
        subscription: subscription ? {
          id: subscription.id,
          planId: subscription.planId,
          planName: subscription.plan?.name || 'Plan',
          remainingClasses: subscription.remainingClasses,
          endDate: subscription.endDate
        } : null
      };

      setUser(loggedUser);
      return { success: true, user: loggedUser };
    }

    return { success: false, error: 'Credenciales inválidas' };
  };

  const logout = () => {
    setUser(null);
  };

  const updateRemainingClasses = (delta) => {
    if (user && user.subscription) {
      setUser(prev => ({
        ...prev,
        subscription: {
          ...prev.subscription,
          remainingClasses: prev.subscription.remainingClasses + delta
        }
      }));
    }
  };

  const isAdmin = user?.role === 'admin';
  const isClient = user?.role === 'client';

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAdmin, 
      isClient,
      updateRemainingClasses 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
