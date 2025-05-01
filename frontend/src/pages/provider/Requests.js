import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './Requests.css';

function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [professionals, setProfessionals] = useState([]);

  useEffect(() => {
    loadRequests();
    loadProfessionals();
  }, []);

  const loadRequests = async () => {
    try {
      const response = await api.get('/api/provider/requests');
      setRequests(response.data);
    } catch (error) {
      console.error('Error loading requests:', error);
      setError('Erro ao carregar solicitações');
    } finally {
      setLoading(false);
    }
  };

  const loadProfessionals = async () => {
    try {
      const response = await api.get('/api/provider/professionals');
      setProfessionals(response.data);
    } catch (error) {
      console.error('Error loading professionals:', error);
    }
  };

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await api.patch(`/api/provider/requests/${requestId}/status`, {
        status: newStatus
      });
      loadRequests();
    } catch (error) {
      console.error('Error updating request status:', error);
      setError('Erro ao atualizar status da solicitação');
    }
  };

  const handleAssignProfessional = async (requestId, professionalId) => {
    try {
      await api.patch(`/api/provider/requests/${requestId}/assign`, {
        professionalId
      });
      loadRequests();
    } catch (error) {
      console.error('Error assigning professional:', error);
      setError('Erro ao atribuir profissional');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'var(--warning)';
      case 'accepted': return 'var(--info)';
      case 'in_progress': return 'var(--primary-color)';
      case 'completed': return 'var(--success)';
      case 'cancelled': return 'var(--error)';
      default: return 'var(--neutral-400)';
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Pendente',
      accepted: 'Aceito',
      in_progress: 'Em Andamento',
      completed: 'Concluído',
      cancelled: 'Cancelado'
    };
    return labels[status] || status;
  };

  const filteredRequests = requests.filter(request => {
    if (filter === 'all') return true;
    return request.status === filter;
  });

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="requests-container">
      <h1>Solicitações de Serviço</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="requests-filters">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="status-filter"
        >
          <option value="all">Todos os Status</option>
          <option value="pending">Pendentes</option>
          <option value="accepted">Aceitos</option>
          <option value="in_progress">Em Andamento</option>
          <option value="completed">Concluídos</option>
          <option value="cancelled">Cancelados</option>
        </select>
      </div>

      <div className="requests-list">
        {filteredRequests.map((request) => (
          <div key={request.id} className="request-card">
            <div className="request-header">
              <div className="request-info">
                <h3>Solicitação #{request.id}</h3>
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(request.status) }}
                >
                  {getStatusLabel(request.status)}
                </span>
              </div>
              <div className="request-date">
                {new Date(request.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="request-details">
              <p><strong>Cliente:</strong> {request.customerName}</p>
              <p><strong>Serviço:</strong> {request.serviceName}</p>
              <p><strong>Localização:</strong> {request.location}</p>
              <p><strong>Descrição:</strong> {request.description}</p>
            </div>

            {request.status !== 'completed' && request.status !== 'cancelled' && (
              <div className="request-actions">
                {!request.professionalId && request.status === 'pending' && (
                  <div className="assign-professional">
                    <select
                      onChange={(e) => handleAssignProfessional(request.id, e.target.value)}
                      defaultValue=""
                    >
                      <option value="" disabled>Atribuir Profissional</option>
                      {professionals.map(prof => (
                        <option key={prof.id} value={prof.id}>
                          {prof.name} - {prof.specialization}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="status-actions">
                  {request.status === 'pending' && (
                    <>
                      <button
                        className="btn-success"
                        onClick={() => handleStatusChange(request.id, 'accepted')}
                      >
                        Aceitar
                      </button>
                      <button
                        className="btn-error"
                        onClick={() => handleStatusChange(request.id, 'cancelled')}
                      >
                        Recusar
                      </button>
                    </>
                  )}
                  {request.status === 'accepted' && (
                    <button
                      className="btn-primary"
                      onClick={() => handleStatusChange(request.id, 'in_progress')}
                    >
                      Iniciar Serviço
                    </button>
                  )}
                  {request.status === 'in_progress' && (
                    <button
                      className="btn-success"
                      onClick={() => handleStatusChange(request.id, 'completed')}
                    >
                      Concluir Serviço
                    </button>
                  )}
                </div>
              </div>
            )}

            {request.professionalId && (
              <div className="assigned-professional">
                <strong>Profissional Atribuído:</strong>{' '}
                {professionals.find(p => p.id === request.professionalId)?.name || 'Não encontrado'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Requests;
