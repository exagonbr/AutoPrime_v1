import React, { useState } from 'react';
import './RequestHelp.css';
import MapSelector from '../components/MapSelector';

function RequestHelp() {
  const [formData, setFormData] = useState({
    vehicleType: '',
    issueDescription: '',
  });
  const [location, setLocation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLocationSelect = (latlng) => {
    setLocation(latlng);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!location) {
      alert('Please enable location services to continue.');
      return;
    }

    if (!formData.vehicleType || !formData.issueDescription) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you would send the data to backend API
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      alert('Your request has been submitted. A mechanic will contact you shortly.');
      setFormData({ vehicleType: '', issueDescription: '' });
    } catch (error) {
      alert('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="request-help-page">
      <div className="request-help-container">
        <div className="request-help-header">
          <h1>Request Emergency Help</h1>
          <p>We'll connect you with the nearest available mechanic</p>
        </div>

        <div className="request-help-content">
          <div className="location-section">
            <h2>Your Location</h2>
            <p className="location-note">
              For accurate service, we use your device's location. Please ensure location services are enabled.
            </p>
            <MapSelector onLocationSelect={handleLocationSelect} />
          </div>

          <form onSubmit={handleSubmit} className="request-form">
            <div className="form-group">
              <label htmlFor="vehicleType">
                Vehicle Type <span className="required">*</span>
              </label>
              <input 
                type="text" 
                id="vehicleType" 
                name="vehicleType" 
                required 
                placeholder="e.g., Toyota Camry, Honda CBR600" 
                value={formData.vehicleType} 
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="issueDescription">
                Issue Description <span className="required">*</span>
              </label>
              <textarea 
                id="issueDescription" 
                name="issueDescription" 
                required 
                placeholder="Please describe what's wrong with your vehicle..." 
                value={formData.issueDescription} 
                onChange={handleChange}
                rows="4"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting || !location}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Submitting...
                </>
              ) : (
                'Request Emergency Help'
              )}
            </button>

            {!location && (
              <p className="location-warning">
                Please enable location services to submit your request
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default RequestHelp;
