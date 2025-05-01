import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    totalProviders: 0,
    activeProviders: 0,
    totalTransactions: 0,
    monthlyRevenue: 0
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
      const response = await api.get('/api/admin/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
            </div>
          </div>
        </div>

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
      </div>
    </div>
  );
}

export default Dashboard;
