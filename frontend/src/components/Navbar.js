import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <Link to="/" onClick={closeMobileMenu}>AutoPrime</Link>
      </div>
      <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <li><NavLink to="/" onClick={closeMobileMenu} end>Home</NavLink></li>
        <li><NavLink to="/mechanics" onClick={closeMobileMenu}>Mechanics</NavLink></li>
        <li><NavLink to="/request-help" onClick={closeMobileMenu}>Request Help</NavLink></li>
        <li><NavLink to="/booking" onClick={closeMobileMenu}>Booking</NavLink></li>
        <li><NavLink to="/about" onClick={closeMobileMenu}>About</NavLink></li>
        <li><NavLink to="/contact" onClick={closeMobileMenu}>Contact</NavLink></li>
      </ul>
      <div className="hamburger" onClick={toggleMobileMenu} aria-label="Toggle menu" role="button" tabIndex={0}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}

export default Navbar;
