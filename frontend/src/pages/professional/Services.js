import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './Services.css';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    loadServices();
  }, [filter, dateRange]);

  const loadServices = async () => {
    try {
      const response = await api.get('/api/professional/services/history', {
        params: {
          status: filter !== 'all' ? filter : undefined,
          startDate: dateRange.start,
          endDate: dateRange.end
        }
      });
      setServices(response.data);
    } catch (error) {
      console.error('Error loading services:', error);
      setError('Erro ao carregar histórico de serviços');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'var(--warning)';
      case 'in_progress': return 'var(--primary-color)';
      case 'completed': return 'var(--success)';
      case 'cancelled': return 'var(--error)';
      default: return 'var(--neutral-400)';
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      scheduled: 'Agendado',
      in_progress: 'Em Andamento',
      completed: 'Concluído',
      cancelled: 'Cancelado'
    };
    return labels[status] || status;
  };

  const calculateEarnings = () => {
    return services
      .filter(service => service.status === 'completed')
      .reduce((total, service) => total + service.price, 0);
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="services-container">
      <h1>Histórico de Serviços</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="services-filters">
        <div className="filter-group">
          <label>Status:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Todos</option>
            <option value="scheduled">Agendados</option>
            <option value="in_progress">Em Andamento</option>
            <option value="completed">Concluídos</option>
            <option value="cancelled">Cancelados</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Período:</label>
          <div className="date-inputs">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
            />
            <span>até</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
            />
          </div>
        </div>
      </div>

      <div className="services-summary">
        <div className="summary-card">
          <h3>Total de Serviços</h3>
          <span className="summary-value">{services.length}</span>
        </div>
        <div className="summary-card">
          <h3>Serviços Concluídos</h3>
          <span className="summary-value">
            {services.filter(service => service.status === 'completed').length}
          </span>
        </div>
        <div className="summary-card">
          <h3>Ganhos no Período</h3>
          <span className="summary-value">R$ {calculateEarnings().toFixed(2)}</span>
        </div>
      </div>

      <div className="services-list">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-header">
              <div className="service-info">
                <h3>{service.serviceName}</h3>
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(service.status) }}
                >
                  {getStatusLabel(service.status)}
                </span>
              </div>
              <div className="service-date">
                {new Date(service.date).toLocaleDateString()}
              </div>
            </div>

            <div className="service-details">
              <p><strong>Cliente:</strong> {service.customerName}</p>
              <p><strong>Local:</strong> {service.location}</p>
              <p><strong>Valor:</strong> R$ {service.price.toFixed(2)}</p>
              {service.rating && (
                <p>
                  <strong>Avaliação:</strong>
                  <span className="rating">
                    {'★'.repeat(service.rating)}
                    {'☆'.repeat(5 - service.rating)}
                  </span>
                </p>
              )}
              {service.feedback && (
                <p><strong>Feedback:</strong> {service.feedback}</p>
              )}
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <div className="no-services">
            Nenhum serviço encontrado para o período selecionado.
          </div>
        )}
      </div>
    </div>
  );
}

export default Services;
