import React from 'react';
import { Link } from 'react-router-dom';
import './ServicesSection.css';

function ServicesSection() {
  const services = [
    {
      title: "Reparos de Emergência",
      description: "Serviços de reparo de emergência 24/7 para todos os tipos de veículos. Resposta rápida e soluções profissionais.",
      image: "https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg",
      icon: "wrench",
      color: "#FF4D4D"
    },
    {
      title: "Manutenção de Rotina",
      description: "Serviços de manutenção regular para manter seu veículo funcionando perfeitamente e prevenir problemas futuros.",
      image: "https://images.pexels.com/photos/3807175/pexels-photo-3807175.jpeg",
      icon: "tools",
      color: "#4CAF50"
    },
    {
      title: "Diagnósticos",
      description: "Serviços avançados de diagnóstico para identificar e resolver problemas complexos do veículo com precisão.",
      image: "https://images.pexels.com/photos/3807495/pexels-photo-3807495.jpeg",
      icon: "search",
      color: "#2196F3"
    },
    {
      title: "Soluções Personalizadas",
      description: "Soluções automotivas sob medida para requisitos únicos e veículos especializados.",
      image: "https://images.pexels.com/photos/3807516/pexels-photo-3807516.jpeg",
      icon: "cog",
      color: "#9C27B0"
    }
  ];

  return (
    <section className="services section">
      <div className="container">
        <h2 className="section-title">Nossos Serviços</h2>
        <p className="section-subtitle">
          Soluções completas de cuidados automotivos adaptadas às suas necessidades. Experimente a excelência em cada serviço.
        </p>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-image">
                <img src={service.image} alt={service.title} loading="lazy" />
                <div className="service-overlay"></div>
              </div>
              <div className="service-content">
                <div className="service-icon" style={{ backgroundColor: service.color }}>
                  <i className={`fas fa-${service.icon}`}></i>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to="/booking" className="btn">
                  Agendar Agora
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="services-cta">
          <h3>Pronto para experimentar nossos serviços premium?</h3>
          <p>Agende um horário hoje e deixe nossos mecânicos especialistas cuidarem do seu veículo.</p>
          <Link to="/booking" className="btn btn-primary">
            Agendar Serviço
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
