import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import './Profile.css';

function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    vehicles: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await api.get('/api/profile');
      setProfile(response.data);
      setEditedProfile(response.data);
    } catch (error) {
      console.error('Error loading profile:', error);
      setError('Erro ao carregar perfil.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.put('/api/profile', editedProfile);
      setProfile(editedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Erro ao atualizar perfil.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddVehicle = () => {
    setEditedProfile(prev => ({
      ...prev,
      vehicles: [
        ...prev.vehicles,
        { type: '', brand: '', model: '', year: '', plate: '' }
      ]
    }));
  };

  const handleVehicleChange = (index, field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      vehicles: prev.vehicles.map((vehicle, i) => 
        i === index ? { ...vehicle, [field]: value } : vehicle
      )
    }));
  };

  const handleRemoveVehicle = (index) => {
    setEditedProfile(prev => ({
      ...prev,
      vehicles: prev.vehicles.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return <div className="profile-loading">Carregando...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Meu Perfil</h1>
        <button
          className="edit-button"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancelar' : 'Editar'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-section">
          <h2>Informações Pessoais</h2>
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              name="name"
              value={isEditing ? editedProfile.name : profile.name}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={isEditing ? editedProfile.email : profile.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Telefone</label>
            <input
              type="tel"
              name="phone"
              value={isEditing ? editedProfile.phone : profile.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Endereço</label>
            <input
              type="text"
              name="address"
              value={isEditing ? editedProfile.address : profile.address}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="form-section">
          <div className="section-header">
            <h2>Meus Veículos</h2>
            {isEditing && (
              <button
                type="button"
                className="add-vehicle-button"
                onClick={handleAddVehicle}
              >
                Adicionar Veículo
              </button>
            )}
          </div>

          <div className="vehicles-list">
            {(isEditing ? editedProfile.vehicles : profile.vehicles).map((vehicle, index) => (
              <div key={index} className="vehicle-card">
                <div className="vehicle-form">
                  <div className="form-group">
                    <label>Tipo</label>
                    <select
                      value={vehicle.type}
                      onChange={(e) => handleVehicleChange(index, 'type', e.target.value)}
                      disabled={!isEditing}
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
                      value={vehicle.brand}
                      onChange={(e) => handleVehicleChange(index, 'brand', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="form-group">
                    <label>Modelo</label>
                    <input
                      type="text"
                      value={vehicle.model}
                      onChange={(e) => handleVehicleChange(index, 'model', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="form-group">
                    <label>Ano</label>
                    <input
                      type="number"
                      value={vehicle.year}
                      onChange={(e) => handleVehicleChange(index, 'year', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="form-group">
                    <label>Placa</label>
                    <input
                      type="text"
                      value={vehicle.plate}
                      onChange={(e) => handleVehicleChange(index, 'plate', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {isEditing && (
                  <button
                    type="button"
                    className="remove-vehicle-button"
                    onClick={() => handleRemoveVehicle(index)}
                  >
                    Remover
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {isEditing && (
          <div className="form-actions">
            <button type="submit" className="save-button">
              Salvar Alterações
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Profile;
