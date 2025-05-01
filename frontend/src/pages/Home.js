import React from 'react';
import { Link } from 'react-router-dom';
import ServicesSection from '../components/ServicesSection';
import './Home.css';

function Home() {
  const features = [
    {
      icon: 'wrench',
      title: 'Expert Mechanics',
      description: 'Certified professionals with years of experience'
    },
    {
      icon: 'clock',
      title: '24/7 Service',
      description: 'Round-the-clock support whenever you need us'
    },
    {
      icon: 'shield',
      title: 'Guaranteed Work',
      description: '100% satisfaction guarantee on all services'
    },
    {
      icon: 'dollar-sign',
      title: 'Competitive Rates',
      description: 'Competitive rates with no hidden charges'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1>Your Trusted Auto Service Partner</h1>
            <p>Professional mechanics at your service 24/7. Quality repairs and maintenance for all vehicle types.</p>
            <div className="hero-buttons">
              <Link to="/request-help" className="btn btn-primary">
                REQUEST HELP NOW
              </Link>
              <Link to="/services" className="btn btn-outline">
                LEARN MORE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features section">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">
            Experience the best in automotive care with our premium services
          </p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div className="feature-card" key={index}>
                <div className="feature-icon">
                  <i className={`fas fa-${feature.icon}`}></i>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>
            Experience premium auto care services with our expert mechanics.
            Book your appointment today and enjoy peace of mind.
          </p>
          <Link to="/booking" className="btn btn-primary">
            BOOK AN APPOINTMENT
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
