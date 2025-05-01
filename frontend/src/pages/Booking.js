import React, { useState } from 'react';
import './Booking.css';

function Booking() {
  const [formData, setFormData] = useState({
    service: '',
    vehicleType: '',
    date: '',
    time: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const services = [
    'Reparo de Emergência',
    'Manutenção de Rotina',
    'Diagnósticos',
    'Serviço Personalizado'
  ];

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.service && formData.vehicleType && formData.date && formData.time) {
      alert('Seu agendamento foi confirmado. Você receberá um email de confirmação em breve.');
      setFormData({ service: '', vehicleType: '', date: '', time: '', notes: '' });
      setSubmitted(true);
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  };

  return (
    <section className="booking">
      <div className="booking-container">
        <div className="booking-header">
          <h1>Agendar um Serviço</h1>
          <p>Agende seu serviço automotivo com nossos mecânicos especialistas</p>
        </div>

        <form onSubmit={handleSubmit} className="booking-form" noValidate>
          <div className="form-group">
            <label htmlFor="service">Tipo de Serviço <span className="required">*</span></label>
            <select 
              id="service" 
              name="service" 
              required 
              value={formData.service} 
              onChange={handleChange}
            >
              <option value="">Selecione um serviço</option>
              {services.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="vehicleType">Tipo de Veículo <span className="required">*</span></label>
            <input 
              type="text" 
              id="vehicleType" 
              name="vehicleType" 
              required 
              placeholder="ex: Toyota Camry 2020" 
              value={formData.vehicleType} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Data Preferida <span className="required">*</span></label>
              <input 
                type="date" 
                id="date" 
                name="date" 
                required 
                value={formData.date} 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Horário Preferido <span className="required">*</span></label>
              <input 
                type="time" 
                id="time" 
                name="time" 
                required 
                value={formData.time} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Observações Adicionais</label>
            <textarea 
              id="notes" 
              name="notes" 
              placeholder="Detalhes específicos sobre sua solicitação de serviço..." 
              value={formData.notes} 
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Agendar Horário
          </button>
        </form>

        {submitted && (
          <div className="success-message">
            <p>Obrigado por agendar conosco! Enviaremos um email de confirmação em breve.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Booking;
