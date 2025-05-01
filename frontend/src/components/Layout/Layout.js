import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  const location = useLocation();
  
  // Hide footer on login and admin pages
  const hideFooter = location.pathname === '/login' || location.pathname.startsWith('/admin');
  
  // Add white background to navbar on admin pages
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="app-layout">
      <Navbar className={isAdminPage ? 'white-bg' : ''} />
      <main className="main-content">
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default Layout;
