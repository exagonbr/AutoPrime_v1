import React from 'react';
<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom';

// Admin Pages
import Dashboard from '../pages/admin/Dashboard';
import Providers from '../pages/admin/Providers';
import Plans from '../pages/admin/Plans';
import Categories from '../pages/admin/Categories';
import Transactions from '../pages/admin/Transactions';

function AdminRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="providers" element={<Providers />} />
      <Route path="plans" element={<Plans />} />
      <Route path="categories" element={<Categories />} />
      <Route path="transactions" element={<Transactions />} />
=======
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
>>>>>>> 4c537f1 (Everyt)
    </Routes>
  );
}

export default AdminRoutes;
