import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificação de autenticação
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Verificar se há token e dados de usuário no localStorage
        const token = localStorage.getItem('auth_token');
        const savedUser = localStorage.getItem('user_data');
        
        if (token && savedUser) {
          const userData = JSON.parse(savedUser);
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

  const login = async (email, password) => {
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

  const logout = () => {
    // Limpar dados
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (userData) => {
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

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user_data', JSON.stringify(updatedUser));
  };

  const getUserId = () => {
    return user?.id || null;
  };

  const getUserRole = () => {
    return user?.role || 'guest';
  };

  const isAdmin = () => {
    return getUserRole() === 'admin';
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    register,
    updateUser,
    getUserId,
    getUserRole,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 