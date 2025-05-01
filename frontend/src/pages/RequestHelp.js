import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import './RequestHelp.css';

function RequestHelp() {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState(null);
  const [serviceType, setServiceType] = useState('');
  const [vehicleInfo, setVehicleInfo] = useState({
    type: '',
    brand: '',
    model: '',
    year: '',
    issue: ''
  });
  const [loading, setLoading] = useState(false);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Por favor, habilite a localização para continuar.');
        }
      );
    }

    // Load service types
    loadServiceTypes();
  }, []);

  const loadServiceTypes = async () => {
    try {
      const response = await api.get('/api/service-types');
      setServiceTypes(response.data);
    } catch (error) {
      console.error('Error loading service types:', error);
      setError('Erro ao carregar tipos de serviço.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const requestData = {
        location,
        serviceType,
        vehicleInfo,
        userId: user?.id
      };

      const response = await api.post('/api/request-help', requestData);
      
      if (response.data.success) {
        navigate('/request-status', { 
          state: { requestId: response.data.requestId }
        });
      } else {
        setError('Erro ao processar sua solicitação. Tente novamente.');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      setError('Erro ao enviar solicitação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="request-step location-step">
            <h2>Sua Localização</h2>
            {location ? (
              <div className="location-confirmed">
                <div className="map-preview">
                  {/* Add map component here */}
                </div>
                <button 
                  className="primary-button"
                  onClick={() => setStep(2)}
                >
                  Confirmar Localização
                </button>
              </div>
            ) : (
              <div className="location-loading">
                <p>Obtendo sua localização...</p>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="request-step service-step">
            <h2>Tipo de Serviço</h2>
            <div className="service-types">
              {serviceTypes.map((type) => (
                <button
                  key={type.id}
                  className={`service-type-button ${serviceType === type.id ? 'selected' : ''}`}
                  onClick={() => {
                    setServiceType(type.id);
                    setStep(3);
                  }}
                >
                  <img src={type.icon} alt={type.name} />
                  <span>{type.name}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="request-step vehicle-step">
            <h2>Informações do Veículo</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              setStep(4);
            }}>
              <div className="form-group">
                <label>Tipo de Veículo</label>
                <select
                  value={vehicleInfo.type}
                  onChange={(e) => setVehicleInfo({
                    ...vehicleInfo,
                    type: e.target.value
                  })}
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="car">Carro</option>
                  <option value="motorcycle">Moto</option>
                  <option value="truck">Caminhão</option>
                </select>
              </div>

              <div className="form-group">
                <label>Marca</label>
                <input
                  type="text"
                  value={vehicleInfo.brand}
                  onChange={(e) => setVehicleInfo({
                    ...vehicleInfo,
                    brand: e.target.value
                  })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Modelo</label>
                <input
                  type="text"
                  value={vehicleInfo.model}
                  onChange={(e) => setVehicleInfo({
                    ...vehicleInfo,
                    model: e.target.value
                  })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Ano</label>
                <input
                  type="number"
                  value={vehicleInfo.year}
                  onChange={(e) => setVehicleInfo({
                    ...vehicleInfo,
                    year: e.target.value
                  })}
                  required
                />
              </div>

              <button type="submit" className="primary-button">
                Próximo
              </button>
            </form>
          </div>
        );

      case 4:
        return (
          <div className="request-step issue-step">
            <h2>Descreva o Problema</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <textarea
                  value={vehicleInfo.issue}
                  onChange={(e) => setVehicleInfo({
                    ...vehicleInfo,
                    issue: e.target.value
                  })}
                  placeholder="Descreva o problema que está enfrentando..."
                  required
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <button 
                type="submit" 
                className="primary-button"
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Solicitar Ajuda'}
              </button>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="request-help-container">
      <div className="request-help-progress">
        <div 
          className="progress-bar"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>
      {renderStep()}
    </div>
  );
}

export default RequestHelp;
