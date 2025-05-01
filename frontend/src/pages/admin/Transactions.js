import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './Admin.css';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const response = await api.get('/api/admin/transactions');
      setTransactions(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar transações');
      console.error('Error loading transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Transações</h1>
        <div className="admin-filters">
          <input 
            type="date" 
            className="filter-input"
            placeholder="Data Inicial"
          />
          <input 
            type="date" 
            className="filter-input"
            placeholder="Data Final"
          />
          <button className="btn btn-primary">Filtrar</button>
        </div>
      </div>

      <div className="admin-content">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Data</th>
                <th>Prestador</th>
                <th>Cliente</th>
                <th>Serviço</th>
                <th>Valor</th>
                <th>Taxa</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>#{transaction.id}</td>
                  <td>{formatDate(transaction.created_at)}</td>
                  <td>{transaction.provider_name}</td>
                  <td>{transaction.client_name}</td>
                  <td>{transaction.service_type}</td>
                  <td>{formatCurrency(transaction.amount)}</td>
                  <td>{formatCurrency(transaction.platform_fee)}</td>
                  <td>
                    <span className={`status-badge ${transaction.status.toLowerCase()}`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-summary">
          <div className="summary-card">
            <h3>Total de Transações</h3>
            <p>{transactions.length}</p>
          </div>
          <div className="summary-card">
            <h3>Valor Total</h3>
            <p>{formatCurrency(
              transactions.reduce((sum, t) => sum + t.amount, 0)
            )}</p>
          </div>
          <div className="summary-card">
            <h3>Total em Taxas</h3>
            <p>{formatCurrency(
              transactions.reduce((sum, t) => sum + t.platform_fee, 0)
            )}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
