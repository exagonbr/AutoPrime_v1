import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
<<<<<<< HEAD
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
=======
import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    totalProviders: 0,
    activeProviders: 0,
    totalTransactions: 0,
    monthlyRevenue: 0
>>>>>>> b4c6797 (Authentication)
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
<<<<<<< HEAD
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
=======
      const response = await api.get('/api/admin/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
>>>>>>> b4c6797 (Authentication)
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
<<<<<<< HEAD
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
=======
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Painel Administrativo</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Prestadores de Serviço</h3>
          <div className="stat-numbers">
            <div>
              <span className="stat-value">{stats.totalProviders}</span>
              <span className="stat-label">Total</span>
            </div>
            <div>
              <span className="stat-value">{stats.activeProviders}</span>
              <span className="stat-label">Ativos</span>
>>>>>>> b4c6797 (Authentication)
            </div>
          </div>
        </div>

<<<<<<< HEAD
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
=======
        <div className="stat-card">
          <h3>Transações</h3>
          <div className="stat-numbers">
            <div>
              <span className="stat-value">{stats.totalTransactions}</span>
              <span className="stat-label">Total</span>
            </div>
            <div>
              <span className="stat-value">
                R$ {stats.monthlyRevenue.toFixed(2)}
              </span>
              <span className="stat-label">Receita Mensal</span>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-actions">
        <button onClick={() => navigate('/admin/providers')}>
          Gerenciar Prestadores
        </button>
        <button onClick={() => navigate('/admin/plans')}>
          Gerenciar Planos
        </button>
        <button onClick={() => navigate('/admin/categories')}>
          Gerenciar Categorias
        </button>
        <button onClick={() => navigate('/admin/transactions')}>
          Ver Transações
        </button>
>>>>>>> b4c6797 (Authentication)
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default AdminDashboard;
=======
export default Dashboard;
>>>>>>> b4c6797 (Authentication)
