import React from 'react';
import ServicesSection from '../components/ServicesSection';
import './Home.css';

function Home() {
  return (
    <main className="home dark-theme">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to AutoPrime</h1>
          <p>Your trusted partner for car repair and mechanic help services.</p>
          <a href="/request-help" className="btn-primary">Request Help Now</a>
        </div>
      </section>

      <ServicesSection />
    </main>
  );
}

export default Home;
