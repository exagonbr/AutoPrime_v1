import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
import { Link, useLocation } from 'react-router-dom';
=======
import { Link, useNavigate, useLocation } from 'react-router-dom';
>>>>>>> 4c537f1 (Everyt)
=======
import { Link, useNavigate } from 'react-router-dom';
>>>>>>> b4c6797 (Authentication)
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

function Navbar() {
<<<<<<< HEAD
  const { user, logout } = useAuth();
<<<<<<< HEAD
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const isPublicPage = !user && location.pathname === '/';
  const isAuthPage = user && (
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/provider') ||
    location.pathname.startsWith('/professional')
  );
=======
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if current page is an admin page
  const isAdminPage = location.pathname.startsWith('/admin');
>>>>>>> 4c537f1 (Everyt)
=======
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
>>>>>>> b4c6797 (Authentication)

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

  const getLinks = () => {
    if (user?.role === 'master') return adminLinks;
    if (user?.role === 'provider') return providerLinks;
    return publicLinks;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
<<<<<<< HEAD
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
=======
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''} ${isAdminPage ? 'white-bg' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          AutoPrime
        </Link>
>>>>>>> 4c537f1 (Everyt)

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

<<<<<<< HEAD
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
=======
        <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {user?.role === 'master' ? (
            <>
              <Link to="/admin/providers" onClick={() => setIsMobileMenuOpen(false)}>Prestadores</Link>
              <Link to="/admin/plans" onClick={() => setIsMobileMenuOpen(false)}>Planos</Link>
              <Link to="/admin/categories" onClick={() => setIsMobileMenuOpen(false)}>Categorias</Link>
              <Link to="/admin/transactions" onClick={() => setIsMobileMenuOpen(false)}>Transações</Link>
            </>
          ) : (
            <>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Início</Link>
              <Link to="/mechanics" onClick={() => setIsMobileMenuOpen(false)}>Mecânicos</Link>
              <Link to="/request-help" onClick={() => setIsMobileMenuOpen(false)}>Solicitar Ajuda</Link>
              <Link to="/booking" onClick={() => setIsMobileMenuOpen(false)}>Agendamento</Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>Sobre</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contato</Link>
            </>
          )}
        </div>

        {user ? (
          <button onClick={handleLogout} className="login-button">
            SAIR
          </button>
        ) : (
          <Link to="/login" className="login-button" onClick={() => setIsMobileMenuOpen(false)}>
            ENTRAR
<<<<<<< HEAD
>>>>>>> 4c537f1 (Everyt)
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
=======
          </Link>
        )}
      </div>
>>>>>>> b4c6797 (Authentication)
    </nav>
  );
}

export default Navbar;
