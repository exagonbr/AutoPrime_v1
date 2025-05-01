import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import api from '../../services/api';
import './Admin.css';
=======
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import './Providers.css';
>>>>>>> b4c6797 (Authentication)

function Providers() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProviders();
  }, []);
=======
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    document_number: '',
    vehicle_info: '',
    specialties: '',
    base_price: '',
    price_per_km: '',
    price_per_hour: ''
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'master') {
      navigate('/login');
      return;
    }
    loadProviders();
  }, [user, navigate]);
>>>>>>> b4c6797 (Authentication)

  const loadProviders = async () => {
    try {
      const response = await api.get('/api/admin/providers');
      setProviders(response.data);
<<<<<<< HEAD
      setError(null);
    } catch (err) {
      setError('Erro ao carregar prestadores');
      console.error('Error loading providers:', err);
=======
    } catch (error) {
      console.error('Erro ao carregar prestadores:', error);
>>>>>>> b4c6797 (Authentication)
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  const handleStatusChange = async (providerId, currentStatus) => {
=======
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedProvider) {
        await api.put(`/api/admin/providers/${selectedProvider.id}`, formData);
      } else {
        await api.post('/api/admin/providers', formData);
      }
      loadProviders();
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar prestador:', error);
      alert('Erro ao salvar prestador. Verifique os dados e tente novamente.');
    }
  };

  const handleEdit = (provider) => {
    setSelectedProvider(provider);
    setFormData({
      name: provider.name,
      email: provider.email,
      phone: provider.phone,
      document_number: provider.document_number,
      vehicle_info: provider.vehicle_info,
      specialties: provider.specialties,
      base_price: provider.base_price,
      price_per_km: provider.price_per_km,
      price_per_hour: provider.price_per_hour
    });
  };

  const handleToggleStatus = async (providerId, currentStatus) => {
>>>>>>> b4c6797 (Authentication)
    try {
      await api.patch(`/api/admin/providers/${providerId}/toggle-status`, {
        is_active: !currentStatus
      });
      loadProviders();
<<<<<<< HEAD
    } catch (err) {
      setError('Erro ao atualizar status do prestador');
      console.error('Error updating provider status:', err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Gerenciar Prestadores</h1>
        <div className="header-actions">
          <input 
            type="text" 
            placeholder="Buscar prestador..."
            className="search-input"
          />
          <button className="btn btn-primary">Adicionar Prestador</button>
        </div>
      </div>

      <div className="admin-content">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Categoria</th>
                <th>Data de Registro</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {providers.map(provider => (
                <tr key={provider.id}>
                  <td>{provider.name}</td>
                  <td>{provider.email}</td>
                  <td>{provider.phone}</td>
                  <td>{provider.category}</td>
                  <td>{formatDate(provider.created_at)}</td>
                  <td>
                    <span className={`status-badge ${provider.is_active ? 'active' : 'inactive'}`}>
                      {provider.is_active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-icon"
                      onClick={() => handleStatusChange(provider.id, provider.is_active)}
                    >
                      {provider.is_active ? 'Desativar' : 'Ativar'}
                    </button>
                    <button className="btn btn-icon">Editar</button>
                    <button className="btn btn-icon">Ver Detalhes</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-summary">
          <div className="summary-card">
            <h3>Total de Prestadores</h3>
            <p>{providers.length}</p>
          </div>
          <div className="summary-card">
            <h3>Prestadores Ativos</h3>
            <p>{providers.filter(p => p.is_active).length}</p>
          </div>
          <div className="summary-card">
            <h3>Prestadores Inativos</h3>
            <p>{providers.filter(p => !p.is_active).length}</p>
=======
    } catch (error) {
      console.error('Erro ao alterar status:', error);
      alert('Erro ao alterar status do prestador.');
    }
  };

  const resetForm = () => {
    setSelectedProvider(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      document_number: '',
      vehicle_info: '',
      specialties: '',
      base_price: '',
      price_per_km: '',
      price_per_hour: ''
    });
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="providers-page">
      <div className="providers-header">
        <h1>Gerenciar Prestadores de Serviço</h1>
        <button onClick={() => navigate('/admin/dashboard')}>Voltar</button>
      </div>

      <div className="providers-content">
        <form className="provider-form" onSubmit={handleSubmit}>
          <h2>{selectedProvider ? 'Editar Prestador' : 'Novo Prestador'}</h2>
          
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Telefone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>CPF/CNPJ</label>
            <input
              type="text"
              name="document_number"
              value={formData.document_number}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Informações do Veículo</label>
            <input
              type="text"
              name="vehicle_info"
              value={formData.vehicle_info}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Especialidades</label>
            <input
              type="text"
              name="specialties"
              value={formData.specialties}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Preço Base</label>
              <input
                type="number"
                name="base_price"
                value={formData.base_price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Preço por KM</label>
              <input
                type="number"
                name="price_per_km"
                value={formData.price_per_km}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Preço por Hora</label>
              <input
                type="number"
                name="price_per_hour"
                value={formData.price_per_hour}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit">
              {selectedProvider ? 'Atualizar' : 'Cadastrar'}
            </button>
            {selectedProvider && (
              <button type="button" onClick={resetForm}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className="providers-list">
          <h2>Prestadores Cadastrados</h2>
          <div className="providers-table">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {providers.map(provider => (
                  <tr key={provider.id}>
                    <td>{provider.name}</td>
                    <td>{provider.email}</td>
                    <td>{provider.phone}</td>
                    <td>
                      <span className={`status ${provider.is_active ? 'active' : 'inactive'}`}>
                        {provider.is_active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => handleEdit(provider)}>
                        Editar
                      </button>
                      <button
                        onClick={() => handleToggleStatus(provider.id, provider.is_active)}
                        className={provider.is_active ? 'deactivate' : 'activate'}
                      >
                        {provider.is_active ? 'Desativar' : 'Ativar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
>>>>>>> b4c6797 (Authentication)
          </div>
        </div>
      </div>
    </div>
  );
}

export default Providers;
