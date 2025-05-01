import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">AutoPrime</h3>
          <p className="footer-description">
            Conectando você aos melhores profissionais automotivos. 
            Assistência 24/7 onde você estiver.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Links Rápidos</h4>
          <ul className="footer-links">
            <li><Link to="/about">Sobre Nós</Link></li>
            <li><Link to="/services">Serviços</Link></li>
            <li><Link to="/request-help">Solicitar Ajuda</Link></li>
            <li><Link to="/contact">Contato</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Serviços</h4>
          <ul className="footer-links">
            <li><Link to="/services#mechanical">Mecânica Geral</Link></li>
            <li><Link to="/services#electrical">Elétrica</Link></li>
            <li><Link to="/services#towing">Guincho</Link></li>
            <li><Link to="/services#tires">Pneus</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Contato</h4>
          <ul className="footer-contact">
            <li>
              <i className="fas fa-phone"></i>
              <span>0800 123 4567</span>
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              <span>contato@autoprime.com</span>
            </li>
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <span>Av. Principal, 1000<br />São Paulo - SP</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} AutoPrime. Todos os direitos reservados.</p>
          <div className="footer-legal">
            <Link to="/privacy">Privacidade</Link>
            <Link to="/terms">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
