import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useRole } from '../contexts/RoleContext';

// Provider Pages (to be created)
const ProviderDashboard = () => (
  <div className="provider-dashboard">
    <h1>Provider Dashboard</h1>
    {/* Add provider-specific content */}
  </div>
);

const ManageProfessionals = () => (
  <div className="manage-professionals">
    <h1>Manage Professionals</h1>
    {/* Add professional management content */}
  </div>
);

const ProviderAnalytics = () => (
  <div className="provider-analytics">
    <h1>Provider Analytics</h1>
    {/* Add provider analytics content */}
  </div>
);

function ProviderRoutes() {
  const { hasPermission } = useRole();

  return (
    <Routes>
      <Route path="/" element={<ProviderDashboard />} />
      {hasPermission('manage_professionals') && (
        <Route path="/professionals" element={<ManageProfessionals />} />
      )}
      {hasPermission('view_provider_analytics') && (
        <Route path="/analytics" element={<ProviderAnalytics />} />
      )}
    </Routes>
  );
}

export default ProviderRoutes;
