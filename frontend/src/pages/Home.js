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
          <h1>Your Trusted Auto Service Partner</h1>
          <p>Professional mechanics at your service 24/7. Quality repairs and maintenance for all vehicle types.</p>
          <div className="hero-buttons">
            <a href="/request-help" className="btn btn-primary">Request Help Now</a>
            <a href="/about" className="btn btn-outline">Learn More</a>
          </div>
        </div>
      </section>

      <ServicesSection />
    </main>
  );
}

export default Home;
