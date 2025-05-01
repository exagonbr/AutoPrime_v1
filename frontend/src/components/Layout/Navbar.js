import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          AutoPrime
        </Link>

        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <span className="menu-icon"></span>
        </button>

        <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Início</Link>
          <Link to="/mechanics" onClick={() => setIsMobileMenuOpen(false)}>Mecânicos</Link>
          <Link to="/request-help" onClick={() => setIsMobileMenuOpen(false)}>Solicitar Ajuda</Link>
          <Link to="/booking" onClick={() => setIsMobileMenuOpen(false)}>Agendamento</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>Sobre</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contato</Link>
        </div>

        {user ? (
          <button onClick={handleLogout} className="login-button">
            SAIR
          </button>
        ) : (
          <Link to="/login" className="login-button" onClick={() => setIsMobileMenuOpen(false)}>
            ENTRAR
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
