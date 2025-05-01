import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './MyRequests.css';

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, active, completed

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const response = await api.get('/api/my-requests');
      setRequests(response.data);
    } catch (error) {
      console.error('Error loading requests:', error);
      setError('Erro ao carregar solicitações.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'searching':
        return 'status-searching';
      case 'provider_found':
        return 'status-provider-found';
      case 'professional_assigned':
        return 'status-assigned';
      case 'on_way':
        return 'status-on-way';
      case 'arrived':
        return 'status-arrived';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'searching':
        return 'Procurando prestador';
      case 'provider_found':
        return 'Prestador encontrado';
      case 'professional_assigned':
        return 'Profissional designado';
      case 'on_way':
        return 'A caminho';
      case 'arrived':
        return 'Profissional no local';
      case 'completed':
        return 'Concluído';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const filteredRequests = requests.filter(request => {
    if (filter === 'active') {
      return !['completed', 'cancelled'].includes(request.status);
    }
    if (filter === 'completed') {
      return ['completed', 'cancelled'].includes(request.status);
    }
    return true;
  });

  if (loading) {
    return <div className="requests-loading">Carregando...</div>;
  }

  return (
    <div className="my-requests-container">
      <div className="requests-header">
        <h1>Minhas Solicitações</h1>
        <div className="filter-buttons">
          <button
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todas
          </button>
          <button
            className={`filter-button ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Ativas
          </button>
          <button
            className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Concluídas
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {filteredRequests.length === 0 ? (
        <div className="no-requests">
          <p>Nenhuma solicitação encontrada.</p>
          <Link to="/request-help" className="request-button">
            Solicitar Ajuda
          </Link>
        </div>
      ) : (
        <div className="requests-list">
          {filteredRequests.map((request) => (
            <div key={request.id} className="request-card">
              <div className="request-header">
                <div className="service-type">{request.serviceType}</div>
                <div className={`status-badge ${getStatusColor(request.status)}`}>
                  {getStatusText(request.status)}
                </div>
              </div>

              <div className="request-details">
                <div className="detail-group">
                  <label>Veículo</label>
                  <p>{`${request.vehicle.brand} ${request.vehicle.model} (${request.vehicle.year})`}</p>
                </div>

                <div className="detail-group">
                  <label>Data</label>
                  <p>{new Date(request.createdAt).toLocaleDateString()}</p>
                </div>

                {request.provider && (
                  <div className="detail-group">
                    <label>Prestador</label>
                    <p>{request.provider.name}</p>
                  </div>
                )}

                {request.professional && (
                  <div className="detail-group">
                    <label>Profissional</label>
                    <p>{request.professional.name}</p>
                  </div>
                )}

                {request.rating && (
                  <div className="detail-group">
                    <label>Avaliação</label>
                    <div className="rating">
                      {'⭐'.repeat(request.rating)}
                    </div>
                  </div>
                )}
              </div>

              {['searching', 'provider_found'].includes(request.status) && (
                <div className="request-actions">
                  <Link 
                    to="/request-status" 
                    state={{ requestId: request.id }}
                    className="track-button"
                  >
                    Acompanhar
                  </Link>
                  <button 
                    className="cancel-button"
                    onClick={() => handleCancel(request.id)}
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRequests;
