import { createContext, useContext, useState, ReactNode } from 'react';
import { users, subscriptions } from '../data/mockData';
import type { AuthUser, LoginResult } from '../types';

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => LoginResult;
  logout: () => void;
  isAdmin: boolean;
  isClient: boolean;
  updateRemainingClasses: (delta: number) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (email: string, _password: string): LoginResult => {
    const foundUser = users.find(u => u.email === email && u.isActive);
    
    if (foundUser) {
      let subscription = null;
      if (foundUser.role === 'client') {
        const sub = subscriptions.find(
          s => s.userId === foundUser.id && s.status === 'active'
        );
        if (sub) {
          subscription = {
            id: sub.id,
            planId: sub.planId,
            planName: sub.plan?.name || 'Plan',
            remainingClasses: sub.remainingClasses,
            endDate: sub.endDate
          };
        }
      }

      const loggedUser: AuthUser = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        phone: foundUser.phone,
        role: foundUser.role,
        subscription
      };

      setUser(loggedUser);
      return { success: true, user: loggedUser };
    }

    return { success: false, error: 'Credenciales inválidas' };
  };

  const logout = () => {
    setUser(null);
  };

  const updateRemainingClasses = (delta: number) => {
    if (user && user.subscription) {
      setUser(prev => prev ? ({
        ...prev,
        subscription: prev.subscription ? {
          ...prev.subscription,
          remainingClasses: prev.subscription.remainingClasses + delta
        } : null
      }) : null);
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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
