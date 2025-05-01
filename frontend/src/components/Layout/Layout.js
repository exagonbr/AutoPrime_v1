import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.css';

function Layout({ children }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  // Hide footer on login and authenticated pages
  const hideFooter = location.pathname === '/login' || 
                    location.pathname.startsWith('/admin') ||
                    location.pathname.startsWith('/provider') ||
                    location.pathname.startsWith('/professional');
  
  // Add transparent navbar on home page
  const isHomePage = location.pathname === '/';
  
  // Add white background to navbar on authenticated pages
  const isAuthPage = location.pathname.startsWith('/admin') ||
                    location.pathname.startsWith('/provider') ||
                    location.pathname.startsWith('/professional');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const getNavbarClassName = () => {
    if (isAuthPage) return 'white-bg';
    if (isHomePage) {
      return scrolled ? 'scrolled' : 'transparent';
    }
    return '';
  };

  const getMainClassName = () => {
    let className = 'main-content';
    if (isAuthPage) className += ' auth-content';
    return className;
  };

  return (
    <div className="app-layout">
      <Navbar className={getNavbarClassName()} />
      <main className={getMainClassName()}>
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default Layout;
