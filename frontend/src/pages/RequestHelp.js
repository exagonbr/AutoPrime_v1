import React, { useState } from 'react';
import './RequestHelp.css';

function RequestHelp() {
  const [formData, setFormData] = useState({
    location: '',
    vehicleType: '',
    issueDescription: '',
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
    if (formData.location && formData.vehicleType && formData.issueDescription) {
      alert('Your mechanic help request has been submitted. A mechanic will contact you shortly.');
      setFormData({ location: '', vehicleType: '', issueDescription: '' });
      setSubmitted(true);
    } else {
      alert('Please fill out all required fields.');
    }
  };

  return (
    <section className="request-help">
      <h2>Request Mechanic Help</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="location">Location</label>
        <input type="text" id="location" name="location" required placeholder="Your Location" value={formData.location} onChange={handleChange} />
        <label htmlFor="vehicleType">Vehicle Type</label>
        <input type="text" id="vehicleType" name="vehicleType" required placeholder="Car, Motorcycle, etc." value={formData.vehicleType} onChange={handleChange} />
        <label htmlFor="issueDescription">Issue Description</label>
        <textarea id="issueDescription" name="issueDescription" required placeholder="Describe the issue" value={formData.issueDescription} onChange={handleChange}></textarea>
        <button type="submit" className="btn-primary">Submit Request</button>
      </form>
    </section>
  );
}

export default RequestHelp;
