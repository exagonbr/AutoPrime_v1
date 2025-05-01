import React, { useState } from 'react';
import MapSelector from '../components/MapSelector_temp';

function RequestHelp() {
  const [formData, setFormData] = useState({
    vehicleType: '',
    issueDescription: '',
  });
  const [location, setLocation] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [routeDestination, setRouteDestination] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLocationSelect = (latlng) => {
    setLocation(latlng);
    setRouteDestination(latlng);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location && formData.vehicleType && formData.issueDescription) {
      // Here you would send the data to backend API including location coordinates and route destination
      alert('Your mechanic help request has been submitted. A mechanic will contact you shortly.');
      setFormData({ vehicleType: '', issueDescription: '' });
      setLocation(null);
      setRouteDestination(null);
      setSubmitted(true);
    } else {
      alert('Please fill out all required fields and select your location on the map.');
    }
  };

  return (
    <section className="request-help">
      <h2>Request Mechanic Help</h2>
      <MapSelector onLocationSelect={handleLocationSelect} initialPosition={location} />
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="vehicleType">Vehicle Type</label>
        <input
          type="text"
          id="vehicleType"
          name="vehicleType"
          required
          placeholder="Car, Motorcycle, etc."
          value={formData.vehicleType}
          onChange={handleChange}
        />
        <label htmlFor="issueDescription">Issue Description</label>
        <textarea
          id="issueDescription"
          name="issueDescription"
          required
          placeholder="Describe the issue"
          value={formData.issueDescription}
          onChange={handleChange}
        ></textarea>
        <button type="submit" className="btn-primary">Submit Request</button>
      </form>
      {submitted && <p className="success-message">Request submitted successfully!</p>}
    </section>
  );
}

export default RequestHelp;
