import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  const location = useLocation();
  
  // Hide footer on login and dashboard pages
  const hideFooter = location.pathname === '/login' || 
                    location.pathname.startsWith('/admin') ||
                    location.pathname.startsWith('/provider') ||
                    location.pathname.startsWith('/professional');

  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default Layout;
