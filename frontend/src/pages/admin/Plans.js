import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import api from '../../services/api';
import './Admin.css';
=======
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import './Plans.css';
>>>>>>> b4c6797 (Authentication)

function Plans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPlans();
  }, []);
=======
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    monthly_fee: '',
    commission_rate: '',
    max_active_providers: '',
    features: {
      dispatch_priority: 'normal',
      payment_terms: 'D+2',
      support_level: 'basic'
    }
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'master') {
      navigate('/login');
      return;
    }
    loadPlans();
  }, [user, navigate]);
>>>>>>> b4c6797 (Authentication)

  const loadPlans = async () => {
    try {
      const response = await api.get('/api/admin/plans');
      setPlans(response.data);
<<<<<<< HEAD
      setError(null);
    } catch (err) {
      setError('Erro ao carregar planos');
      console.error('Error loading plans:', err);
=======
    } catch (error) {
      console.error('Erro ao carregar planos:', error);
>>>>>>> b4c6797 (Authentication)
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  const togglePlanStatus = async (planId, currentStatus) => {
=======
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('features.')) {
      const featureName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        features: {
          ...prev.features,
          [featureName]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const planData = {
        ...formData,
        monthly_fee: parseFloat(formData.monthly_fee),
        commission_rate: parseFloat(formData.commission_rate),
        max_active_providers: parseInt(formData.max_active_providers)
      };

      if (selectedPlan) {
        await api.put(`/api/admin/plans/${selectedPlan.id}`, planData);
      } else {
        await api.post('/api/admin/plans', planData);
      }
      loadPlans();
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar plano:', error);
      alert('Erro ao salvar plano. Verifique os dados e tente novamente.');
    }
  };

  const handleEdit = (plan) => {
    setSelectedPlan(plan);
    setFormData({
      name: plan.name,
      description: plan.description,
      monthly_fee: plan.monthly_fee.toString(),
      commission_rate: plan.commission_rate.toString(),
      max_active_providers: plan.max_active_providers.toString(),
      features: plan.features
    });
  };

  const handleToggleStatus = async (planId, currentStatus) => {
>>>>>>> b4c6797 (Authentication)
    try {
      await api.patch(`/api/admin/plans/${planId}/toggle-status`, {
        is_active: !currentStatus
      });
      loadPlans();
<<<<<<< HEAD
    } catch (err) {
      setError('Erro ao atualizar status do plano');
      console.error('Error updating plan status:', err);
    }
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Gerenciar Planos</h1>
        <button className="btn btn-primary">Adicionar Plano</button>
      </div>

      <div className="admin-content">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Valor Mensal</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {plans.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.name}</td>
                  <td>{plan.description}</td>
                  <td>R$ {plan.monthly_fee.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${plan.is_active ? 'active' : 'inactive'}`}>
                      {plan.is_active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-icon"
                      onClick={() => togglePlanStatus(plan.id, plan.is_active)}
                    >
                      {plan.is_active ? 'Desativar' : 'Ativar'}
                    </button>
                    <button className="btn btn-icon">Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
=======
    } catch (error) {
      console.error('Erro ao alterar status:', error);
      alert('Erro ao alterar status do plano.');
    }
  };

  const resetForm = () => {
    setSelectedPlan(null);
    setFormData({
      name: '',
      description: '',
      monthly_fee: '',
      commission_rate: '',
      max_active_providers: '',
      features: {
        dispatch_priority: 'normal',
        payment_terms: 'D+2',
        support_level: 'basic'
      }
    });
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="plans-page">
      <div className="plans-header">
        <h1>Gerenciar Planos de Serviço</h1>
        <button onClick={() => navigate('/admin/dashboard')}>Voltar</button>
      </div>

      <div className="plans-content">
        <form className="plan-form" onSubmit={handleSubmit}>
          <h2>{selectedPlan ? 'Editar Plano' : 'Novo Plano'}</h2>
          
          <div className="form-group">
            <label>Nome do Plano</label>
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
              <label>Mensalidade (R$)</label>
              <input
                type="number"
                name="monthly_fee"
                value={formData.monthly_fee}
                onChange={handleInputChange}
                required
                step="0.01"
              />
            </div>
            <div className="form-group">
              <label>Comissão (%)</label>
              <input
                type="number"
                name="commission_rate"
                value={formData.commission_rate}
                onChange={handleInputChange}
                required
                step="0.01"
              />
            </div>
            <div className="form-group">
              <label>Máx. Prestadores</label>
              <input
                type="number"
                name="max_active_providers"
                value={formData.max_active_providers}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <h3>Recursos do Plano</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Prioridade</label>
              <select
                name="features.dispatch_priority"
                value={formData.features.dispatch_priority}
                onChange={handleInputChange}
              >
                <option value="normal">Normal</option>
                <option value="high">Alta</option>
                <option value="highest">Máxima</option>
              </select>
            </div>
            <div className="form-group">
              <label>Prazo de Pagamento</label>
              <select
                name="features.payment_terms"
                value={formData.features.payment_terms}
                onChange={handleInputChange}
              >
                <option value="D+2">D+2</option>
                <option value="D+1">D+1</option>
                <option value="same_day">Mesmo dia</option>
              </select>
            </div>
            <div className="form-group">
              <label>Nível de Suporte</label>
              <select
                name="features.support_level"
                value={formData.features.support_level}
                onChange={handleInputChange}
              >
                <option value="basic">Básico</option>
                <option value="priority">Prioritário</option>
                <option value="dedicated">Dedicado</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit">
              {selectedPlan ? 'Atualizar' : 'Cadastrar'}
            </button>
            {selectedPlan && (
              <button type="button" onClick={resetForm}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className="plans-list">
          <h2>Planos Disponíveis</h2>
          <div className="plans-table">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Mensalidade</th>
                  <th>Comissão</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {plans.map(plan => (
                  <tr key={plan.id}>
                    <td>{plan.name}</td>
                    <td>R$ {plan.monthly_fee.toFixed(2)}</td>
                    <td>{plan.commission_rate}%</td>
                    <td>
                      <span className={`status ${plan.is_active ? 'active' : 'inactive'}`}>
                        {plan.is_active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => handleEdit(plan)}>
                        Editar
                      </button>
                      <button
                        onClick={() => handleToggleStatus(plan.id, plan.is_active)}
                        className={plan.is_active ? 'deactivate' : 'activate'}
                      >
                        {plan.is_active ? 'Desativar' : 'Ativar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
>>>>>>> b4c6797 (Authentication)
        </div>
      </div>
    </div>
  );
}

export default Plans;
