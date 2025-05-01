import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useRole } from '../contexts/RoleContext';

function PrivateRoute({ children, requiredRole }) {
  const { user } = useAuth();
  const { hasRole } = useRole();
  const location = useLocation();

  // Check if user is authenticated
  if (!user) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If requiredRole is specified, check if user has the required role
  if (requiredRole && !hasRole(requiredRole)) {
    // Redirect to home page if user doesn't have required role
    return <Navigate to="/" replace />;
  }

  // Render children if all checks pass
  return children;
}

export default PrivateRoute;
