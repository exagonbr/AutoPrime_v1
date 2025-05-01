import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar dark-theme">
      <div className="navbar-container">
        <Link to="/" className="logo">AutoPrime</Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/mechanics">Mechanics</Link></li>
          <li><Link to="/request-help">Request Help</Link></li>
          <li><Link to="/booking">Booking</Link></li>
          <li><Link to="/admin">Admin</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
