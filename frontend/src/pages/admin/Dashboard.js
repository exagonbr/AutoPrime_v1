import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import RevenueChart from '../../components/charts/RevenueChart';
import ProviderStatusChart from '../../components/charts/ProviderStatusChart';
import ServiceCategoryChart from '../../components/charts/ServiceCategoryChart';
import './Dashboard.css';

function Dashboard() {
  const [analyticsData, setAnalyticsData] = useState({
    revenue: [],
    providers: null,
    services: []
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'master') {
      navigate('/login');
      return;
    }

    loadDashboardData();
  }, [user, navigate]);

  const loadDashboardData = async () => {
    try {
      const response = await api.get('/api/admin/dashboard/analytics');
      setAnalyticsData(response.data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h1>Loading dashboard...</h1>
        </div>
      </div>
    );
  }

  const { revenue, providers, services } = analyticsData;

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Analytics</h1>
      </div>
      
      <div className="dashboard-content">
        <div className="stats-overview">
          <div className="stat-card">
            <h3>Total Providers</h3>
            <div className="stat-value">{providers?.total_providers || 0}</div>
          </div>
          <div className="stat-card">
            <h3>Active Providers</h3>
            <div className="stat-value">{providers?.active_providers || 0}</div>
          </div>
          <div className="stat-card">
            <h3>Online Providers</h3>
            <div className="stat-value">{providers?.online_providers || 0}</div>
          </div>
          <div className="stat-card">
            <h3>Total Services</h3>
            <div className="stat-value">
              {services.reduce((acc, curr) => acc + curr.total_services, 0)}
            </div>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-full-width">
            <RevenueChart data={revenue} />
          </div>
          <div>
            <ProviderStatusChart data={providers || {}} />
          </div>
          <div>
            <ServiceCategoryChart data={services} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
