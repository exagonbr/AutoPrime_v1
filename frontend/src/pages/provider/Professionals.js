import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './Professionals.css';

function Professionals() {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProfessional, setEditingProfessional] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    status: 'active'
  });

  useEffect(() => {
    loadProfessionals();
  }, []);

  const loadProfessionals = async () => {
    try {
      const response = await api.get('/api/provider/professionals');
      setProfessionals(response.data);
    } catch (error) {
      console.error('Error loading professionals:', error);
      setError('Erro ao carregar profissionais');
    } finally {
      setLoading(false);
    }
  };

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
      if (editingProfessional) {
        await api.put(`/api/provider/professionals/${editingProfessional.id}`, formData);
      } else {
        await api.post('/api/provider/professionals', formData);
      }
      loadProfessionals();
      setEditingProfessional(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        specialization: '',
        status: 'active'
      });
    } catch (error) {
      console.error('Error saving professional:', error);
      setError('Erro ao salvar profissional');
    }
  };

  const handleEdit = (professional) => {
    setEditingProfessional(professional);
    setFormData({
      name: professional.name,
      email: professional.email,
      phone: professional.phone,
      specialization: professional.specialization,
      status: professional.status
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este profissional?')) {
      try {
        await api.delete(`/api/provider/professionals/${id}`);
        loadProfessionals();
      } catch (error) {
        console.error('Error deleting professional:', error);
        setError('Erro ao excluir profissional');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/api/provider/professionals/${id}/status`, { status: newStatus });
      loadProfessionals();
    } catch (error) {
      console.error('Error updating professional status:', error);
      setError('Erro ao atualizar status do profissional');
    }
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="professionals-container">
      <h1>Gerenciar Profissionais</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="professional-form">
        <h2>{editingProfessional ? 'Editar Profissional' : 'Novo Profissional'}</h2>
        
        <div className="form-row">
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
        </div>

        <div className="form-row">
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

          <div className="form-group">
            <label>Especialização</label>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione...</option>
              <option value="mechanic">Mecânico</option>
              <option value="electrician">Eletricista</option>
              <option value="towing">Guincho</option>
              <option value="tires">Pneus</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
              <option value="vacation">Férias</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {editingProfessional ? 'Atualizar' : 'Adicionar'} Profissional
          </button>
          {editingProfessional && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setEditingProfessional(null);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  specialization: '',
                  status: 'active'
                });
              }}
            >
              Cancelar Edição
            </button>
          )}
        </div>
      </form>

      <div className="professionals-list">
        {professionals.map((professional) => (
          <div key={professional.id} className="professional-card">
            <div className="professional-header">
              <h3>{professional.name}</h3>
              <div className="professional-actions">
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(professional)}
                >
                  Editar
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(professional.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
            <div className="professional-details">
              <p><strong>Email:</strong> {professional.email}</p>
              <p><strong>Telefone:</strong> {professional.phone}</p>
              <p><strong>Especialização:</strong> {professional.specialization}</p>
              <div className="status-control">
                <span className={`status-badge ${professional.status}`}>
                  {professional.status}
                </span>
                <select
                  value={professional.status}
                  onChange={(e) => handleStatusChange(professional.id, e.target.value)}
                  className="status-select"
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                  <option value="vacation">Férias</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Professionals;
