import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const isPublicPage = !user && location.pathname === '/';
  const isAuthPage = user && (
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/provider') ||
    location.pathname.startsWith('/professional')
  );

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    if (isPublicPage) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isPublicPage, scrolled]);

  const getNavbarClass = () => {
    if (isAuthPage) return 'navbar-side';
    if (isPublicPage) {
      return `navbar-top ${scrolled ? 'scrolled' : ''}`;
    }
    return 'navbar-top with-background';
  };

  const publicLinks = [
    { to: '/', label: 'Início' },
    { to: '/services', label: 'Serviços' },
    { to: '/about', label: 'Sobre' },
    { to: '/contact', label: 'Contato' }
  ];

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: 'fas fa-chart-line' },
    { to: '/admin/providers', label: 'Prestadores', icon: 'fas fa-users' },
    { to: '/admin/plans', label: 'Planos', icon: 'fas fa-list' },
    { to: '/admin/categories', label: 'Categorias', icon: 'fas fa-tags' },
    { to: '/admin/transactions', label: 'Transações', icon: 'fas fa-money-bill' }
  ];

  const providerLinks = [
    { to: '/provider/dashboard', label: 'Dashboard', icon: 'fas fa-chart-line' },
    { to: '/provider/services', label: 'Serviços', icon: 'fas fa-tools' },
    { to: '/provider/professionals', label: 'Profissionais', icon: 'fas fa-user-tie' },
    { to: '/provider/requests', label: 'Solicitações', icon: 'fas fa-clipboard-list' }
  ];

  const professionalLinks = [
    { to: '/professional/dashboard', label: 'Dashboard', icon: 'fas fa-chart-line' },
    { to: '/professional/schedule', label: 'Agenda', icon: 'fas fa-calendar-alt' },
    { to: '/professional/services', label: 'Serviços', icon: 'fas fa-tools' },
    { to: '/professional/profile', label: 'Perfil', icon: 'fas fa-user-circle' }
  ];

  const getLinks = () => {
    switch (user?.role) {
      case 'master':
        return adminLinks;
      case 'provider':
        return providerLinks;
      case 'professional':
        return professionalLinks;
      default:
        return publicLinks;
    }
  };

  return (
    <nav className={getNavbarClass()}>
      {isAuthPage ? (
        // Side Navigation for authenticated pages
        <>
          <div className={`navbar-side-content ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="navbar-side-header">
              <Link to="/" className="navbar-logo">
                {isCollapsed ? 'AP' : 'AutoPrime'}
              </Link>
              <button 
                className="collapse-button"
                onClick={() => setIsCollapsed(!isCollapsed)}
                aria-label={isCollapsed ? 'Expand menu' : 'Collapse menu'}
              >
                <i className={`fas fa-${isCollapsed ? 'chevron-right' : 'chevron-left'}`}></i>
              </button>
            </div>

            <div className="navbar-side-links">
              {getLinks().map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={location.pathname === link.to ? 'active' : ''}
                >
                  <i className={link.icon}></i>
                  {!isCollapsed && <span>{link.label}</span>}
                </Link>
              ))}
            </div>

            <div className="navbar-side-footer">
              <Link to="/profile" className="profile-link">
                <i className="fas fa-user-circle"></i>
                {!isCollapsed && <span>Perfil</span>}
              </Link>
              <button className="logout-button" onClick={logout}>
                <i className="fas fa-sign-out-alt"></i>
                {!isCollapsed && <span>Sair</span>}
              </button>
            </div>
          </div>
        </>
      ) : (
        // Top Navigation for public pages
        <div className="navbar-top-content">
          <Link to="/" className="navbar-logo">
            AutoPrime
          </Link>

          <div className="navbar-top-links">
            {publicLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={location.pathname === link.to ? 'active' : ''}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="navbar-top-actions">
            {user ? (
              <>
                <Link to="/profile" className="profile-button">
                  <i className="fas fa-user-circle"></i>
                  <span>Perfil</span>
                </Link>
                <button className="logout-button" onClick={logout}>
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Sair</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="login-button">
                Entrar
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
