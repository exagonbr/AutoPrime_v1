import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>AutoPrime</h3>
            <p>Your trusted auto service partner. Professional mechanics at your service 24/7.</p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/mechanics">Our Mechanics</Link></li>
              <li><Link to="/booking">Book Service</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services">Emergency Repairs</Link></li>
              <li><Link to="/services">Routine Maintenance</Link></li>
              <li><Link to="/services">Diagnostics</Link></li>
              <li><Link to="/services">Custom Solutions</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <ul className="contact-info">
              <li>
                <i className="fas fa-phone"></i>
                <span>+1 234 567 8900</span>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <span>contact@autoprime.com</span>
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>123 Service Street, Auto City, AC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AutoPrime. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
