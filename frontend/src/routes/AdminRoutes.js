import React from 'react';
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
    </Routes>
  );
}

export default AdminRoutes;
