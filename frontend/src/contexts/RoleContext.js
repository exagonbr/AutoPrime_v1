import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';

const RoleContext = createContext({});

export function RoleProvider({ children }) {
  const { user } = useAuth();
  const [currentRole, setCurrentRole] = useState(user?.role || null);

  const hasRole = useCallback((requiredRole) => {
    if (!currentRole) return false;
    
    // Master role has access to everything
    if (currentRole === 'master') return true;
    
    // Check if current role matches required role
    return currentRole === requiredRole;
  }, [currentRole]);

  const getRoleBasePath = useCallback(() => {
    switch (currentRole) {
      case 'master':
        return '/admin';
      case 'provider':
        return '/provider';
      case 'professional':
        return '/professional';
      default:
        return '/';
    }
  }, [currentRole]);

  const updateRole = useCallback((newRole) => {
    setCurrentRole(newRole);
  }, []);

  return (
    <RoleContext.Provider 
      value={{ 
        currentRole, 
        hasRole, 
        getRoleBasePath,
        updateRole 
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);

  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }

  return context;
}
