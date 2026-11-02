import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { storageService, DEFAULT_CUSTOMER, DEFAULT_VENDOR, DEFAULT_ADMIN } from '../services/storageService';
import { isSupabaseConfigured, supabase } from '../services/supabase';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  isCustomer: boolean;
  isVendor: boolean;
  isAdmin: boolean;
  login: (email: string, password?: string, preferredRole?: UserRole) => Promise<boolean>;
  register: (name: string, email: string, role: UserRole, password?: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => storageService.getCurrentUser());

  useEffect(() => {
    // If Supabase is configured, listen to real session
    if (isSupabaseConfigured() && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const u: User = {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.full_name || 'Wedding Planner',
            role: (session.user.user_metadata?.role as UserRole) || 'customer',
            createdAt: session.user.created_at,
          };
          setUser(u);
          storageService.setCurrentUser(u);
        }
      });
    }

    const handleUpdate = () => {
      setUser(storageService.getCurrentUser());
    };
    window.addEventListener('marryon_data_updated', handleUpdate);
    return () => window.removeEventListener('marryon_data_updated', handleUpdate);
  }, []);

  const login = async (email: string, password?: string, preferredRole: UserRole = 'customer'): Promise<boolean> => {
    if (isSupabaseConfigured() && supabase && password) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.user) {
        const u: User = {
          id: data.user.id,
          email: data.user.email || email,
          name: data.user.user_metadata?.full_name || 'Wedding Planner',
          role: (data.user.user_metadata?.role as UserRole) || preferredRole,
          createdAt: data.user.created_at,
        };
        setUser(u);
        storageService.setCurrentUser(u);
        return true;
      }
    }

    // Local Demo Mode login
    let targetUser: User;
    if (preferredRole === 'vendor' || email.toLowerCase().includes('vendor') || email.toLowerCase().includes('rohan')) {
      targetUser = { ...DEFAULT_VENDOR, email };
    } else if (preferredRole === 'admin' || email.toLowerCase().includes('admin')) {
      targetUser = { ...DEFAULT_ADMIN, email };
    } else {
      targetUser = { ...DEFAULT_CUSTOMER, email };
    }

    setUser(targetUser);
    storageService.setCurrentUser(targetUser);
    return true;
  };

  const register = async (name: string, email: string, role: UserRole, password?: string): Promise<boolean> => {
    if (isSupabaseConfigured() && supabase && password) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name, role }
        }
      });
      if (error) throw error;
      if (data.user) {
        const u: User = {
          id: data.user.id,
          email,
          name,
          role,
          createdAt: new Date().toISOString()
        };
        setUser(u);
        storageService.setCurrentUser(u);
        return true;
      }
    }

    // Local Demo registration
    const newUser: User = {
      id: `u-${Date.now()}`,
      email,
      name,
      role,
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    storageService.setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    if (isSupabaseConfigured() && supabase) {
      supabase.auth.signOut();
    }
    // In demo mode, reset to unauthenticated or guest
    setUser(null);
    localStorage.removeItem('marryon_current_user');
  };

  const switchRole = (role: UserRole) => {
    storageService.switchRole(role);
    setUser(storageService.getCurrentUser());
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    storageService.setCurrentUser(updated);
  };

  const role = user?.role || 'customer';

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        isCustomer: role === 'customer',
        isVendor: role === 'vendor',
        isAdmin: role === 'admin',
        login,
        register,
        logout,
        switchRole,
        updateUser,
      }}
    >
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
