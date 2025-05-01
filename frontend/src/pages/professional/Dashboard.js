import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    totalServices: 0,
    completedServices: 0,
    pendingServices: 0,
    monthlyEarnings: 0,
    upcomingServices: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await api.get('/api/professional/dashboard/stats');
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
      <h1>Dashboard do Profissional</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Serviços</h3>
          <div className="stat-numbers">
            <div>
              <span className="stat-value">{stats.totalServices}</span>
              <span className="stat-label">Total</span>
            </div>
            <div>
              <span className="stat-value">{stats.completedServices}</span>
              <span className="stat-label">Concluídos</span>
            </div>
            <div>
              <span className="stat-value">{stats.pendingServices}</span>
              <span className="stat-label">Pendentes</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <h3>Ganhos do Mês</h3>
          <div className="stat-value earnings">
            R$ {stats.monthlyEarnings.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="upcoming-services">
        <h2>Próximos Serviços</h2>
        {stats.upcomingServices.length > 0 ? (
          <div className="services-list">
            {stats.upcomingServices.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-header">
                  <h3>{service.serviceName}</h3>
                  <span className="service-date">
                    {new Date(service.scheduledDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="service-details">
                  <p><strong>Cliente:</strong> {service.customerName}</p>
                  <p><strong>Localização:</strong> {service.location}</p>
                  <p><strong>Horário:</strong> {new Date(service.scheduledDate).toLocaleTimeString()}</p>
                  <p><strong>Status:</strong> {service.status}</p>
                </div>
                <button 
                  className="btn-primary"
                  onClick={() => window.location.href = `/professional/services/${service.id}`}
                >
                  Ver Detalhes
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-services">Nenhum serviço agendado para os próximos dias.</p>
        )}
      </div>

      <div className="quick-actions">
        <button onClick={() => window.location.href = '/professional/schedule'}>
          Ver Agenda
        </button>
        <button onClick={() => window.location.href = '/professional/services'}>
          Histórico de Serviços
        </button>
        <button onClick={() => window.location.href = '/professional/profile'}>
          Meu Perfil
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
