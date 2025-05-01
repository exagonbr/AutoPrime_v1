import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import '../../styles/Dashboard.css';

function ProviderDashboard() {
  const [stats, setStats] = useState({
    totalProfessionals: 0,
    activeProfessionals: 0,
    totalServices: 0,
    monthlyRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'provider') {
      navigate('/login');
      return;
    }

    loadDashboardData();
  }, [user, navigate]);

  const loadDashboardData = async () => {
    try {
      const response = await api.get('/api/provider/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error loading provider dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Loading dashboard...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Provider Dashboard</h1>
      </div>
      
      <div className="dashboard-content">
        <div className="stats-overview">
          <div className="stat-card">
            <h3>Total Professionals</h3>
            <div className="stat-value">{stats.totalProfessionals}</div>
          </div>
          <div className="stat-card">
            <h3>Active Professionals</h3>
            <div className="stat-value">{stats.activeProfessionals}</div>
          </div>
          <div className="stat-card">
            <h3>Total Services</h3>
            <div className="stat-value">{stats.totalServices}</div>
          </div>
          <div className="stat-card">
            <h3>Monthly Revenue</h3>
            <div className="stat-value">
              R$ {stats.monthlyRevenue.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <button onClick={() => navigate('/provider/professionals')}>
            Manage Professionals
          </button>
          <button onClick={() => navigate('/provider/analytics')}>
            View Analytics
          </button>
          <button onClick={() => navigate('/provider/services')}>
            Manage Services
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProviderDashboard;
