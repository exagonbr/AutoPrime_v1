import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (formData.name && formData.email && formData.message) {
      alert('Thank you for contacting AutoPrime! We will get back to you shortly.');
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(true);
    } else {
      alert('Please fill out all required fields correctly.');
    }
  };

  return (
    <section className="contact">
      <h2>Contact Us</h2>
      <form id="contact-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required placeholder="Your Name" value={formData.name} onChange={handleChange} />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required placeholder="Your Email" value={formData.email} onChange={handleChange} />
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required placeholder="Your Message" value={formData.message} onChange={handleChange}></textarea>
        <button type="submit" className="btn-primary">Send Message</button>
      </form>
      <div className="contact-info">
        <p>Phone: +1 234 567 890</p>
        <p>Email: support@autoprime.com</p>
        <p>Follow us on 
          <a href="#" aria-label="Facebook">Facebook</a>, 
          <a href="#" aria-label="Twitter">Twitter</a>, 
          <a href="#" aria-label="Instagram">Instagram</a>
        </p>
      </div>
    </section>
  );
}

export default Contact;
