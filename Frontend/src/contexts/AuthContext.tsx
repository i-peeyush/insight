import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, role?: 'ADMIN' | 'STAFF') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check saved session
    const savedUser = localStorage.getItem('insight_admin_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setAuthState({
          user: parsed,
          isAuthenticated: true,
          isLoading: false
        });
        return;
      } catch (e) {
        localStorage.removeItem('insight_admin_user');
      }
    }
    setAuthState((prev) => ({ ...prev, isLoading: false }));
  }, []);

  const login = async (email: string, role: 'ADMIN' | 'STAFF' = 'ADMIN') => {
    const demoUser: User = {
      id: 'usr-admin-01',
      username: email.split('@')[0],
      email: email,
      fullName: 'Insight Operations Manager',
      role: role,
      token: 'demo_jwt_token_insight_admin_123'
    };
    localStorage.setItem('insight_admin_user', JSON.stringify(demoUser));
    localStorage.setItem('insight_auth_token', demoUser.token!);
    setAuthState({
      user: demoUser,
      isAuthenticated: true,
      isLoading: false
    });
  };

  const logout = () => {
    localStorage.removeItem('insight_admin_user');
    localStorage.removeItem('insight_auth_token');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
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
