import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './Admin.css';

function Providers() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    try {
      const response = await api.get('/api/admin/providers');
      setProviders(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar prestadores');
      console.error('Error loading providers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (providerId, currentStatus) => {
    try {
      await api.patch(`/api/admin/providers/${providerId}/toggle-status`, {
        is_active: !currentStatus
      });
      loadProviders();
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Providers;
