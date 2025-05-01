import React, { useState } from 'react';
import './Booking.css';

function Booking() {
  const [formData, setFormData] = useState({
    mechanicId: '',
    date: '',
    time: '',
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
    if (formData.mechanicId && formData.date && formData.time) {
      alert('Your booking has been submitted. You will receive confirmation shortly.');
      setFormData({ mechanicId: '', date: '', time: '' });
      setSubmitted(true);
    } else {
      alert('Please fill out all required fields.');
    }
  };

  return (
    <section className="booking">
      <h2>Book Mechanic Help</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="mechanicId">Mechanic ID</label>
        <input type="text" id="mechanicId" name="mechanicId" required placeholder="Mechanic ID" value={formData.mechanicId} onChange={handleChange} />
        <label htmlFor="date">Date</label>
        <input type="date" id="date" name="date" required value={formData.date} onChange={handleChange} />
        <label htmlFor="time">Time</label>
        <input type="time" id="time" name="time" required value={formData.time} onChange={handleChange} />
        <button type="submit" className="btn-primary">Submit Booking</button>
      </form>
    </section>
  );
}

export default Booking;
