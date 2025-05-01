import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>AutoPrime</h1>
          <p>Your One-Stop Auto Solutions for Whitelabel Cars, Motors &amp; Mechanic Help</p>
          <Link to="/request-help" className="btn-primary">Get Started</Link>
        </div>
      </section>

      <section className="services">
        <h2>Our Services</h2>
        <div className="service-cards">
          <article className="service-card">
            <img src="https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1600" alt="Whitelabel Vehicles" />
            <h3>Whitelabel Vehicles</h3>
            <p>Premium whitelabel cars tailored to your needs, offering flexibility and style.</p>
            <button className="btn-secondary" disabled>Learn More</button>
          </article>
          <article className="service-card">
            <img src="https://images.pexels.com/photos/305070/pexels-photo-305070.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1600" alt="Motors" />
            <h3>Motors</h3>
            <p>Wide range of motorcycles and motors for every rider, from beginner to pro.</p>
            <button className="btn-secondary" disabled>Learn More</button>
          </article>
          <article className="service-card">
            <img src="https://images.pexels.com/photos/3951850/pexels-photo-3951850.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1600" alt="Mechanic Help" />
            <h3>Mechanic Help</h3>
            <p>Expert mechanic support to keep your vehicles running smoothly and safely.</p>
            <button className="btn-secondary" disabled>Learn More</button>
          </article>
        </div>
      </section>
    </>
  );
}

export default Home;
