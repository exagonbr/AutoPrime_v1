import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Plans from '../pages/admin/Plans';
import Categories from '../pages/admin/Categories';
import Transactions from '../pages/admin/Transactions';
import Providers from '../pages/admin/Providers';

function AdminRoutes() {
  const { user } = useAuth();

  // Redirect to login if not authenticated or not a master user
  if (!user || user.role !== 'master') {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route path="plans" element={<Plans />} />
      <Route path="categories" element={<Categories />} />
      <Route path="transactions" element={<Transactions />} />
      <Route path="providers" element={<Providers />} />
      <Route path="*" element={<Navigate to="/admin/providers" replace />} />
    </Routes>
  );
}

export default AdminRoutes;
