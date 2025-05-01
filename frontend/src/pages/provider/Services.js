import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './Services.css';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    duration: ''
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await api.get('/api/provider/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error loading services:', error);
      setError('Erro ao carregar serviços');
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
      if (editingService) {
        await api.put(`/api/provider/services/${editingService.id}`, formData);
      } else {
        await api.post('/api/provider/services', formData);
      }
      loadServices();
      setEditingService(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        duration: ''
      });
    } catch (error) {
      console.error('Error saving service:', error);
      setError('Erro ao salvar serviço');
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      category: service.category,
      duration: service.duration
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
      try {
        await api.delete(`/api/provider/services/${id}`);
        loadServices();
      } catch (error) {
        console.error('Error deleting service:', error);
        setError('Erro ao excluir serviço');
      }
    }
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="services-container">
      <h1>Gerenciar Serviços</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="service-form">
        <h2>{editingService ? 'Editar Serviço' : 'Novo Serviço'}</h2>
        
        <div className="form-group">
          <label>Nome do Serviço</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Descrição</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Preço</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Categoria</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione...</option>
              <option value="mechanical">Mecânica</option>
              <option value="electrical">Elétrica</option>
              <option value="towing">Guincho</option>
              <option value="tires">Pneus</option>
            </select>
          </div>

          <div className="form-group">
            <label>Duração (minutos)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {editingService ? 'Atualizar' : 'Adicionar'} Serviço
          </button>
          {editingService && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setEditingService(null);
                setFormData({
                  name: '',
                  description: '',
                  price: '',
                  category: '',
                  duration: ''
                });
              }}
            >
              Cancelar Edição
            </button>
          )}
        </div>
      </form>

      <div className="services-list">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-header">
              <h3>{service.name}</h3>
              <div className="service-actions">
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(service)}
                >
                  Editar
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(service.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
            <p className="service-description">{service.description}</p>
            <div className="service-details">
              <span>Preço: R$ {service.price}</span>
              <span>Categoria: {service.category}</span>
              <span>Duração: {service.duration} min</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
