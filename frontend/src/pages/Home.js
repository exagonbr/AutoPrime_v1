import React from 'react';
import ServicesSection from '../components/ServicesSection';
import './Home.css';

function Home() {
  return (
    <main className="home">
      <section className="hero-section">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="/assets/video/hero-bg-video.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Seu Parceiro Confiável em Serviços Automotivos</h1>
          <p>Mecânicos profissionais à sua disposição 24/7. Reparos e manutenção de qualidade para todos os tipos de veículos.</p>
          <div className="hero-buttons">
            <a href="/request-help" className="btn btn-primary">Solicitar Ajuda Agora</a>
            <a href="/about" className="btn btn-outline">Saiba Mais</a>
          </div>
        </div>
      </section>

      <ServicesSection />
    </main>
  );
}

export default Home;
