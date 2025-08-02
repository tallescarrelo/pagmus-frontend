import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import apiService from '../services/api';

// Tipos
interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; user: User }>;
  logout: () => void;
  register: (userData: any) => Promise<{ success: boolean; user: User }>;
  updateUser: (userData: Partial<User>) => void;
  getUserId: () => number | null;
  getUserRole: () => string | null;
  isAdmin: () => boolean;
  getToken: () => string | null;
  saveToken: (token: string) => void;
  clearAuthData: () => void;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Verificação de autenticação
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Verificar se há token e dados de usuário no localStorage
        const token = localStorage.getItem('auth_token');
        const savedUser = localStorage.getItem('user_data');
        
        if (token && savedUser) {
          const userData: User = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        // Limpar dados inválidos
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; user: User }> => {
    try {
      const response = await apiService.post('/api/auth/login', {
        email,
        password
      });

      if (response.data.success) {
        const { token, user } = response.data;
        
        // Salvar dados
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(user));

        setUser(user);
        setIsAuthenticated(true);

        return { success: true, user };
      } else {
        throw new Error(response.data.message || 'Erro no login');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  const logout = (): void => {
    // Limpar dados
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (userData: any): Promise<{ success: boolean; user: User }> => {
    try {
      const response = await apiService.post('/api/auth/register', userData);

      if (response.data.success) {
        const { token, user } = response.data;
        
        // Salvar dados
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(user));

        setUser(user);
        setIsAuthenticated(true);

        return { success: true, user };
      } else {
        throw new Error(response.data.message || 'Erro no registro');
      }
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  };

  const updateUser = (userData: Partial<User>): void => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user_data', JSON.stringify(updatedUser));
    }
  };

  const getUserId = (): number | null => {
    return user?.id || null;
  };

  const getUserRole = (): string | null => {
    return user?.role || null;
  };

  const isAdmin = (): boolean => {
    return user?.role === 'admin';
  };

  const getToken = (): string | null => {
    return localStorage.getItem('auth_token');
  };

  const saveToken = (token: string): void => {
    localStorage.setItem('auth_token', token);
  };

  const clearAuthData = (): void => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
    setIsAuthenticated(false);
  };

  const checkAuth = (): boolean => {
    const token = localStorage.getItem('auth_token');
    return !!token;
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    register,
    updateUser,
    getUserId,
    getUserRole,
    isAdmin,
    getToken,
    saveToken,
    clearAuthData,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 