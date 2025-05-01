import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './RequestStatus.css';

function RequestStatus() {
  const [status, setStatus] = useState({
    state: 'searching', // searching, provider_found, professional_assigned, on_way, arrived, completed
    provider: null,
    professional: null,
    estimatedTime: null,
    currentLocation: null
  });
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const requestId = location.state?.requestId;

  useEffect(() => {
    if (!requestId) {
      navigate('/request-help');
      return;
    }

    // Set up WebSocket connection for real-time updates
    const ws = new WebSocket(`${process.env.REACT_APP_WS_URL}/request-status/${requestId}`);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStatus(data);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('Erro na conexão. Atualizações em tempo real indisponíveis.');
    };

    // Initial status fetch
    fetchStatus();

    return () => {
      ws.close();
    };
  }, [requestId, navigate]);

  const fetchStatus = async () => {
    try {
      const response = await api.get(`/api/request-status/${requestId}`);
      setStatus(response.data);
    } catch (error) {
      console.error('Error fetching status:', error);
      setError('Erro ao carregar status da solicitação.');
    }
  };

  const cancelRequest = async () => {
    try {
      await api.post(`/api/cancel-request/${requestId}`);
      navigate('/');
    } catch (error) {
      console.error('Error canceling request:', error);
      setError('Erro ao cancelar solicitação.');
    }
  };

  const renderStatusContent = () => {
    switch (status.state) {
      case 'searching':
        return (
          <div className="status-searching">
            <div className="loading-animation">
              <div className="pulse"></div>
            </div>
            <h2>Procurando prestador próximo...</h2>
            <p>Aguarde enquanto encontramos o melhor prestador para você.</p>
            <button 
              onClick={cancelRequest}
              className="cancel-button"
            >
              Cancelar Solicitação
            </button>
          </div>
        );

      case 'provider_found':
        return (
          <div className="status-provider-found">
            <h2>Prestador Encontrado!</h2>
            <div className="provider-info">
              <img 
                src={status.provider.logo} 
                alt={status.provider.name}
                className="provider-logo" 
              />
              <div className="provider-details">
                <h3>{status.provider.name}</h3>
                <p>{status.provider.rating} ⭐</p>
              </div>
            </div>
            <p>Aguarde enquanto um profissional é designado...</p>
          </div>
        );

      case 'professional_assigned':
        return (
          <div className="status-professional-assigned">
            <h2>Profissional Designado</h2>
            <div className="professional-info">
              <img 
                src={status.professional.photo} 
                alt={status.professional.name}
                className="professional-photo" 
              />
              <div className="professional-details">
                <h3>{status.professional.name}</h3>
                <p>{status.professional.rating} ⭐</p>
                <p>{status.professional.specialization}</p>
              </div>
            </div>
          </div>
        );

      case 'on_way':
        return (
          <div className="status-on-way">
            <h2>Profissional a Caminho</h2>
            <div className="eta-info">
              <p>Tempo estimado de chegada:</p>
              <h3>{status.estimatedTime} minutos</h3>
            </div>
            <div className="map-container">
              {/* Add map component showing professional's location */}
            </div>
          </div>
        );

      case 'arrived':
        return (
          <div className="status-arrived">
            <h2>Profissional Chegou!</h2>
            <p>O profissional está no local para atender sua solicitação.</p>
          </div>
        );

      case 'completed':
        return (
          <div className="status-completed">
            <h2>Serviço Concluído</h2>
            <p>Como você avalia o serviço?</p>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star}
                  className="star-button"
                  onClick={() => submitRating(star)}
                >
                  ⭐
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const submitRating = async (rating) => {
    try {
      await api.post(`/api/submit-rating/${requestId}`, { rating });
      navigate('/');
    } catch (error) {
      console.error('Error submitting rating:', error);
      setError('Erro ao enviar avaliação.');
    }
  };

  if (error) {
    return (
      <div className="request-status-container error">
        <div className="error-message">
          {error}
          <button 
            onClick={() => navigate('/request-help')}
            className="primary-button"
          >
            Nova Solicitação
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="request-status-container">
      {renderStatusContent()}
    </div>
  );
}

export default RequestStatus;
