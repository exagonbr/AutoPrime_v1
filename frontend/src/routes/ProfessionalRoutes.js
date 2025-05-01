import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Professional Pages
import Dashboard from '../pages/professional/Dashboard';
import Schedule from '../pages/professional/Schedule';
import Services from '../pages/professional/Services';
import Profile from '../pages/professional/Profile';

function ProfessionalRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="schedule" element={<Schedule />} />
      <Route path="services" element={<Services />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  );
}

export default ProfessionalRoutes;
