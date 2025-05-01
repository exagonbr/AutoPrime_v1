import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';

const RoleContext = createContext();

export const ROLES = {
  MASTER: 'master',
  PROVIDER: 'provider',
  PROFESSIONAL: 'professional'
};

export const ROLE_PERMISSIONS = {
  [ROLES.MASTER]: {
    routes: ['/admin/*'],
    capabilities: ['manage_providers', 'manage_plans', 'view_analytics', 'manage_categories']
  },
  [ROLES.PROVIDER]: {
    routes: ['/provider/*'],
    capabilities: ['manage_professionals', 'view_provider_analytics', 'manage_services']
  },
  [ROLES.PROFESSIONAL]: {
    routes: ['/professional/*'],
    capabilities: ['view_schedule', 'manage_profile', 'view_earnings']
  }
};

export function RoleProvider({ children }) {
  const { user } = useAuth();

  const hasPermission = (capability) => {
    if (!user || !user.role) return false;
    return ROLE_PERMISSIONS[user.role]?.capabilities.includes(capability);
  };

  const hasRouteAccess = (path) => {
    if (!user || !user.role) return false;
    const allowedRoutes = ROLE_PERMISSIONS[user.role]?.routes || [];
    return allowedRoutes.some(route => {
      const routeRegex = new RegExp('^' + route.replace('*', '.*') + '$');
      return routeRegex.test(path);
    });
  };

  return (
    <RoleContext.Provider value={{ hasPermission, hasRouteAccess, userRole: user?.role }}>
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
