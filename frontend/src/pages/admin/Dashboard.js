import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import RevenueChart from '../../components/charts/RevenueChart';
import ProviderStatusChart from '../../components/charts/ProviderStatusChart';
import ServiceCategoryChart from '../../components/charts/ServiceCategoryChart';
import '../../styles/Dashboard.css';

function AdminDashboard() {
  const [analyticsData, setAnalyticsData] = useState({
    stats: {
      totalProviders: 0,
      activeProviders: 0,
      totalTransactions: 0,
      monthlyRevenue: 0,
      onlineProviders: 0,
      totalServices: 0,
      completedServices: 0,
      pendingServices: 0
    },
    revenue: [],
    providers: {},
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
      const [statsRes, analyticsRes] = await Promise.all([
        api.get('/api/admin/dashboard/stats'),
        api.get('/api/admin/dashboard/analytics')
      ]);
      
      setAnalyticsData({
        stats: statsRes.data,
        ...analyticsRes.data
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
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

  const { stats, revenue, providers, services } = analyticsData;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
      </div>
      
      <div className="dashboard-content">
        <div className="stats-overview">
          <div className="stat-card">
            <h3>Total Providers</h3>
            <div className="stat-value">{stats.totalProviders}</div>
          </div>
          <div className="stat-card">
            <h3>Active Providers</h3>
            <div className="stat-value">{stats.activeProviders}</div>
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

        <div className="charts-grid">
          <div className="chart-container chart-full-width">
            <h2>Revenue Trends</h2>
            <RevenueChart data={revenue} />
          </div>
          <div className="chart-container">
            <h2>Provider Status Distribution</h2>
            <ProviderStatusChart data={providers} />
          </div>
          <div className="chart-container">
            <h2>Service Categories Performance</h2>
            <ServiceCategoryChart data={services} />
          </div>
        </div>

        <div className="quick-actions">
          <button onClick={() => navigate('/admin/providers')}>
            Manage Providers
          </button>
          <button onClick={() => navigate('/admin/plans')}>
            Manage Plans
          </button>
          <button onClick={() => navigate('/admin/categories')}>
            Manage Categories
          </button>
          <button onClick={() => navigate('/admin/transactions')}>
            View Transactions
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
