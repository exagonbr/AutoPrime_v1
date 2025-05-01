import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer dark-theme">
      <div className="footer-container">
        <div className="footer-about">
          <h3>AutoPrime</h3>
          <p>Your trusted partner for car repair and mechanic help services.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/mechanics">Mechanics</a></li>
            <li><a href="/request-help">Request Help</a></li>
            <li><a href="/booking">Booking</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Phone: +1 234 567 890</p>
          <p>Email: support@autoprime.com</p>
          <p>123 Auto Street, Car City, USA</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 AutoPrime. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
