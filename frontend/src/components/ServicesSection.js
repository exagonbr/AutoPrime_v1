import React from 'react';
import { Link } from 'react-router-dom';
import './ServicesSection.css';

function ServicesSection() {
  const services = [
    {
      title: "Emergency Repairs",
      description: "24/7 emergency repair services for all types of vehicles. Quick response and professional solutions.",
      image: "https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg",
      icon: "wrench",
      color: "#FF4D4D"
    },
    {
      title: "Routine Maintenance",
      description: "Regular maintenance services to keep your vehicle running smoothly and prevent future issues.",
      image: "https://images.pexels.com/photos/3807175/pexels-photo-3807175.jpeg",
      icon: "tools",
      color: "#4CAF50"
    },
    {
      title: "Diagnostics",
      description: "Advanced diagnostic services to identify and resolve complex vehicle issues accurately.",
      image: "https://images.pexels.com/photos/3807495/pexels-photo-3807495.jpeg",
      icon: "search",
      color: "#2196F3"
    },
    {
      title: "Custom Solutions",
      description: "Tailored automotive solutions for unique requirements and specialized vehicles.",
      image: "https://images.pexels.com/photos/3807516/pexels-photo-3807516.jpeg",
      icon: "cog",
      color: "#9C27B0"
    }
  ];

  return (
    <section className="services section">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          Comprehensive auto care solutions tailored to your needs. Experience excellence in every service.
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
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="services-cta">
          <h3>Ready to experience our premium services?</h3>
          <p>Book an appointment today and let our expert mechanics take care of your vehicle.</p>
          <Link to="/booking" className="btn btn-primary">
            Schedule Service
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
