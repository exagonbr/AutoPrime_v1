import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useRole } from '../contexts/RoleContext';

// Professional Pages (to be created)
const ProfessionalDashboard = () => (
  <div className="professional-dashboard">
    <h1>Professional Dashboard</h1>
    {/* Add professional-specific content */}
  </div>
);

const Schedule = () => (
  <div className="schedule">
    <h1>My Schedule</h1>
    {/* Add schedule management content */}
  </div>
);

const Profile = () => (
  <div className="profile">
    <h1>My Profile</h1>
    {/* Add profile management content */}
  </div>
);

const Earnings = () => (
  <div className="earnings">
    <h1>My Earnings</h1>
    {/* Add earnings tracking content */}
  </div>
);

function ProfessionalRoutes() {
  const { hasPermission } = useRole();

  return (
    <Routes>
      <Route path="/" element={<ProfessionalDashboard />} />
      {hasPermission('view_schedule') && (
        <Route path="/schedule" element={<Schedule />} />
      )}
      {hasPermission('manage_profile') && (
        <Route path="/profile" element={<Profile />} />
      )}
      {hasPermission('view_earnings') && (
        <Route path="/earnings" element={<Earnings />} />
      )}
    </Routes>
  );
}

export default ProfessionalRoutes;
