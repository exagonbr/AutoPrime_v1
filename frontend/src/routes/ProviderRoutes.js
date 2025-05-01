import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Provider Pages
import Dashboard from '../pages/provider/Dashboard';
import Services from '../pages/provider/Services';
import Professionals from '../pages/provider/Professionals';
import Requests from '../pages/provider/Requests';

function ProviderRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="services" element={<Services />} />
      <Route path="professionals" element={<Professionals />} />
      <Route path="requests" element={<Requests />} />
    </Routes>
  );
}

export default ProviderRoutes;
