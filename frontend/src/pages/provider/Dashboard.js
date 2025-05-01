import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    totalProfessionals: 0,
    activeProfessionals: 0,
    totalRequests: 0,
    completedRequests: 0,
    monthlyRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await api.get('/api/provider/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setError('Erro ao carregar dados do dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Dashboard do Prestador</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Profissionais</h3>
          <div className="stat-numbers">
            <div>
              <span className="stat-value">{stats.totalProfessionals}</span>
              <span className="stat-label">Total</span>
            </div>
            <div>
              <span className="stat-value">{stats.activeProfessionals}</span>
              <span className="stat-label">Ativos</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <h3>Solicitações</h3>
          <div className="stat-numbers">
            <div>
              <span className="stat-value">{stats.totalRequests}</span>
              <span className="stat-label">Total</span>
            </div>
            <div>
              <span className="stat-value">{stats.completedRequests}</span>
              <span className="stat-label">Concluídas</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <h3>Receita Mensal</h3>
          <div className="stat-value">
            R$ {stats.monthlyRevenue.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <button onClick={() => window.location.href = '/provider/requests'}>
          Ver Solicitações
        </button>
        <button onClick={() => window.location.href = '/provider/professionals'}>
          Gerenciar Profissionais
        </button>
        <button onClick={() => window.location.href = '/provider/services'}>
          Gerenciar Serviços
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
