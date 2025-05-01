import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useRole, ROLES } from '../../contexts/RoleContext';
import './Navbar.css';

function Navbar({ className }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { userRole } = useRole();

  const isLoggedIn = !!user;

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const getNavLinks = () => {
    if (!isLoggedIn) {
      return (
        <>
          <Link to="/about" onClick={closeMobileMenu}>Sobre</Link>
          <Link to="/services" onClick={closeMobileMenu}>Serviços</Link>
          <Link to="/request-help" onClick={closeMobileMenu}>Solicitar Ajuda</Link>
          <Link to="/contact" onClick={closeMobileMenu}>Contato</Link>
          <Link to="/login" className="login-button" onClick={closeMobileMenu}>Login</Link>
        </>
      );
    }

    switch (userRole) {
      case ROLES.MASTER:
        return (
          <>
            <Link to="/admin/dashboard" onClick={closeMobileMenu}>Dashboard</Link>
            <Link to="/admin/providers" onClick={closeMobileMenu}>Prestadores</Link>
            <Link to="/admin/plans" onClick={closeMobileMenu}>Planos</Link>
            <Link to="/admin/categories" onClick={closeMobileMenu}>Categorias</Link>
            <button onClick={handleLogout} className="login-button">Logout</button>
          </>
        );
      case ROLES.PROVIDER:
        return (
          <>
            <Link to="/provider" onClick={closeMobileMenu}>Dashboard</Link>
            <Link to="/provider/professionals" onClick={closeMobileMenu}>Profissionais</Link>
            <Link to="/provider/requests" onClick={closeMobileMenu}>Solicitações</Link>
            <Link to="/provider/analytics" onClick={closeMobileMenu}>Analytics</Link>
            <button onClick={handleLogout} className="login-button">Logout</button>
          </>
        );
      case ROLES.PROFESSIONAL:
        return (
          <>
            <Link to="/professional" onClick={closeMobileMenu}>Dashboard</Link>
            <Link to="/professional/requests" onClick={closeMobileMenu}>Solicitações</Link>
            <Link to="/professional/schedule" onClick={closeMobileMenu}>Agenda</Link>
            <Link to="/professional/profile" onClick={closeMobileMenu}>Perfil</Link>
            <button onClick={handleLogout} className="login-button">Logout</button>
          </>
        );
      default:
        return (
          <>
            <Link to="/request-help" onClick={closeMobileMenu}>Solicitar Ajuda</Link>
            <Link to="/my-requests" onClick={closeMobileMenu}>Minhas Solicitações</Link>
            <Link to="/profile" onClick={closeMobileMenu}>Perfil</Link>
            <button onClick={handleLogout} className="login-button">Logout</button>
          </>
        );
    }
  };

  return (
    <nav className={`navbar ${className} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="navbar-container">
        <Link 
          to={isLoggedIn ? getDashboardLink() : '/'} 
          className="navbar-logo"
          onClick={closeMobileMenu}
        >
          AutoPrime
        </Link>
        
        <button 
          className="mobile-menu-button" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="menu-icon"></span>
        </button>

        <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {getNavLinks()}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
