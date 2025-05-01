import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('@AutoPrime:user');
    const storedToken = localStorage.getItem('@AutoPrime:token');
    
    if (storedUser && storedToken) {
      api.defaults.headers.authorization = `Bearer ${storedToken}`;
      return JSON.parse(storedUser);
    }

    return null;
  });

  const navigate = useNavigate();

  const login = useCallback(async (username, password) => {
    try {
<<<<<<< HEAD
      const response = await api.post('/api/auth/login', {
        username,
        password,
      });

      const { user, token } = response.data;

      localStorage.setItem('@AutoPrime:user', JSON.stringify(user));
      localStorage.setItem('@AutoPrime:token', token);

      api.defaults.headers.authorization = `Bearer ${token}`;

      setUser(user);

      return { success: true, role: user.role };
=======
      const { data } = await api.post('/api/login', { username, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      setUser({ role: data.role });
      return { success: true, role: data.role };
>>>>>>> 4c537f1 (Everyt)
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao fazer login'
      };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('@AutoPrime:user');
    localStorage.removeItem('@AutoPrime:token');
    delete api.defaults.headers.authorization;
    setUser(null);
    navigate('/');
  }, [navigate]);

  const updateUser = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('@AutoPrime:user', JSON.stringify(userData));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
