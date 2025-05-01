import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.css';

function Layout({ children }) {
  const location = useLocation();
  const { user } = useAuth();

  // Hide footer on login and authenticated pages
  const hideFooter = location.pathname === '/login' || 
                    location.pathname.startsWith('/admin') ||
                    location.pathname.startsWith('/provider') ||
                    location.pathname.startsWith('/professional');

  // Check if it's an authenticated page
  const isAuthPage = user && (
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/provider') ||
    location.pathname.startsWith('/professional')
  );

  // Check if it's the home page
  const isHomePage = location.pathname === '/';

  const getLayoutClass = () => {
    let className = 'app-layout';
    if (isAuthPage) className += ' auth-layout';
    if (isHomePage) className += ' home-layout';
    return className;
  };

  const getMainClass = () => {
    let className = 'main-content';
    if (isAuthPage) className += ' auth-content';
    if (isHomePage) className += ' home-content';
    if (location.pathname === '/login') className += ' login-content';
    return className;
  };

  return (
    <div className={getLayoutClass()}>
      <Navbar />
      <main className={getMainClass()}>
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default Layout;
