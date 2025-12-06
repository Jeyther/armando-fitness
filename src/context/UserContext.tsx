import { createContext, useContext, useState, ReactNode } from 'react';
import { users as initialUsers, subscriptions as initialSubscriptions, plans } from '../data/mockData';
import type { User, Subscription, Plan } from '../types';

interface CreateUserData {
  name: string;
  email: string;
  phone?: string;
  planId?: string;
}

interface UserResult {
  success: boolean;
  user?: User;
  error?: string;
}

interface SubscriptionResult {
  success: boolean;
  error?: string;
}

interface UserContextType {
  users: User[];
  subscriptions: Subscription[];
  getClients: () => User[];
  getUserById: (id: string) => User | undefined;
  createUser: (userData: CreateUserData) => UserResult;
  updateUser: (id: string, updates: Partial<User>) => UserResult;
  deleteUser: (id: string) => UserResult;
  getActiveSubscription: (userId: string) => Subscription | undefined;
  updateSubscription: (userId: string, planId: string) => SubscriptionResult;
  plans: Plan[];
}

const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [users, setUsers] = useState<User[]>([...initialUsers]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([...initialSubscriptions]);

  const getClients = (): User[] => users.filter(u => u.role === 'client' && u.isActive);

  const getUserById = (id: string): User | undefined => users.find(u => u.id === id);

  const getEndOfMonth = (): string => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
  };

  const createUser = (userData: CreateUserData): UserResult => {
    const newUser: User = {
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

    if (users.some(u => u.email === userData.email)) {
      return { success: false, error: 'El email ya está registrado' };
    }

    setUsers(prev => [...prev, newUser]);

    if (userData.planId) {
      const plan = plans.find(p => p.id === userData.planId);
      if (plan) {
        const newSub: Subscription = {
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

  const updateUser = (id: string, updates: Partial<User>): UserResult => {
    if (updates.email) {
      const existingUser = users.find(u => u.email === updates.email && u.id !== id);
      if (existingUser) {
        return { success: false, error: 'El email ya está registrado' };
      }
    }

    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const updated = { ...u, ...updates, updatedAt: new Date().toISOString() };
        setSubscriptions(subs => subs.map(s => 
          s.userId === id ? { ...s, user: { ...s.user!, name: updated.name, email: updated.email } } : s
        ));
        return updated;
      }
      return u;
    }));

    return { success: true };
  };

  const deleteUser = (id: string): UserResult => {
    setUsers(prev => prev.map(u => 
      u.id === id ? { ...u, isActive: false, updatedAt: new Date().toISOString() } : u
    ));
    setSubscriptions(prev => prev.map(s => 
      s.userId === id && s.status === 'active' ? { ...s, status: 'cancelled' as const } : s
    ));
    return { success: true };
  };

  const getActiveSubscription = (userId: string): Subscription | undefined => {
    return subscriptions.find(s => s.userId === userId && s.status === 'active');
  };

  const updateSubscription = (userId: string, planId: string): SubscriptionResult => {
    const plan = plans.find(p => p.id === planId);
    if (!plan) return { success: false, error: 'Plan no encontrado' };

    const existingSub = subscriptions.find(s => s.userId === userId && s.status === 'active');
    
    if (existingSub) {
      setSubscriptions(prev => prev.map(s => 
        s.id === existingSub.id ? {
          ...s,
          planId,
          remainingClasses: plan.classesPerMonth,
          plan: { id: plan.id, name: plan.name, classesPerMonth: plan.classesPerMonth }
        } : s
      ));
    } else {
      const user = users.find(u => u.id === userId);
      const newSub: Subscription = {
        id: `sub-${Date.now()}`,
        userId,
        planId,
        startDate: new Date().toISOString().split('T')[0],
        endDate: getEndOfMonth(),
        remainingClasses: plan.classesPerMonth,
        status: 'active',
        paymentStatus: 'paid',
        createdAt: new Date().toISOString(),
        user: { id: userId, name: user?.name || '', email: user?.email || '' },
        plan: { id: plan.id, name: plan.name, classesPerMonth: plan.classesPerMonth }
      };
      setSubscriptions(prev => [...prev, newSub]);
    }

    return { success: true };
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

export const useUsers = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};
