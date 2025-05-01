import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

function Services() {
  const services = [
    {
      id: 1,
      title: 'Mecânica Geral',
      description: 'Diagnóstico e reparo de problemas mecânicos em geral.',
      icon: '🔧'
    },
    {
      id: 2,
      title: 'Elétrica',
      description: 'Serviços de diagnóstico e reparo elétrico automotivo.',
      icon: '⚡'
    },
    {
      id: 3,
      title: 'Guincho',
      description: 'Serviço de reboque 24 horas para veículos.',
      icon: '🚛'
    },
    {
      id: 4,
      title: 'Pneus',
      description: 'Troca, reparo e alinhamento de pneus.',
      icon: '🛞'
    },
    {
      id: 5,
      title: 'Bateria',
      description: 'Troca e manutenção de baterias.',
      icon: '🔋'
    },
    {
      id: 6,
      title: 'Emergências',
      description: 'Atendimento rápido para emergências automotivas.',
      icon: '🚨'
    }
  ];

  return (
    <div className="services-page">
      <div className="services-hero">
        <h1>Nossos Serviços</h1>
        <p>Soluções automotivas profissionais para todas as suas necessidades</p>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>

      <div className="services-cta">
        <h2>Precisa de ajuda agora?</h2>
        <p>Encontre o profissional mais próximo de você</p>
        <Link to="/request-help" className="cta-button">
          Solicitar Ajuda
        </Link>
      </div>

      <div className="services-features">
        <div className="feature">
          <h3>24/7 Disponível</h3>
          <p>Atendimento 24 horas por dia, 7 dias por semana</p>
        </div>
        <div className="feature">
          <h3>Profissionais Verificados</h3>
          <p>Todos os profissionais são verificados e qualificados</p>
        </div>
        <div className="feature">
          <h3>Preços Transparentes</h3>
          <p>Sem surpresas, preços claros e justos</p>
        </div>
      </div>
    </div>
  );
}

export default Services;
