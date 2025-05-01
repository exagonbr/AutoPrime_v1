import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './Admin.css';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await api.get('/api/admin/categories');
      setCategories(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar categorias');
      console.error('Error loading categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (categoryId, currentStatus) => {
    try {
      await api.patch(`/api/admin/categories/${categoryId}/toggle-status`, {
        is_active: !currentStatus
      });
      loadCategories();
    } catch (err) {
      setError('Erro ao atualizar status da categoria');
      console.error('Error updating category status:', err);
    }
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Gerenciar Categorias</h1>
        <button className="btn btn-primary">Adicionar Categoria</button>
      </div>

      <div className="admin-content">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Ícone</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <i className={`fas fa-${category.icon}`}></i>
                  </td>
                  <td>
                    <span className={`status-badge ${category.is_active ? 'active' : 'inactive'}`}>
                      {category.is_active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-icon"
                      onClick={() => handleStatusChange(category.id, category.is_active)}
                    >
                      {category.is_active ? 'Desativar' : 'Ativar'}
                    </button>
                    <button className="btn btn-icon">Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Categories;
