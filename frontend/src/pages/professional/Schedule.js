import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './Schedule.css';

function Schedule() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('week'); // 'day', 'week', or 'month'

  useEffect(() => {
    loadAppointments();
  }, [selectedDate, view]);

  const loadAppointments = async () => {
    try {
      const response = await api.get('/api/professional/appointments', {
        params: {
          date: selectedDate.toISOString(),
          view
        }
      });
      setAppointments(response.data);
    } catch (error) {
      console.error('Error loading appointments:', error);
      setError('Erro ao carregar agendamentos');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      await api.patch(`/api/professional/appointments/${appointmentId}/status`, {
        status: newStatus
      });
      loadAppointments();
    } catch (error) {
      console.error('Error updating appointment status:', error);
      setError('Erro ao atualizar status do agendamento');
    }
  };

  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 18; hour++) {
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }
    return slots;
  };

  const getDayLabel = (date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    }).format(date);
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h1>Agenda</h1>
        
        <div className="view-controls">
          <button
            className={`view-button ${view === 'day' ? 'active' : ''}`}
            onClick={() => handleViewChange('day')}
          >
            Dia
          </button>
          <button
            className={`view-button ${view === 'week' ? 'active' : ''}`}
            onClick={() => handleViewChange('week')}
          >
            Semana
          </button>
          <button
            className={`view-button ${view === 'month' ? 'active' : ''}`}
            onClick={() => handleViewChange('month')}
          >
            Mês
          </button>
        </div>

        <div className="date-navigation">
          <button
            onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setDate(selectedDate.getDate() - 1);
              handleDateChange(newDate);
            }}
          >
            Anterior
          </button>
          <span className="current-date">{getDayLabel(selectedDate)}</span>
          <button
            onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setDate(selectedDate.getDate() + 1);
              handleDateChange(newDate);
            }}
          >
            Próximo
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="schedule-grid">
        <div className="time-slots">
          {getTimeSlots().map((time) => (
            <div key={time} className="time-slot">
              {time}
            </div>
          ))}
        </div>

        <div className="appointments-container">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`appointment-card ${appointment.status}`}
              style={{
                gridRow: `time-${new Date(appointment.startTime).getHours()}-${new Date(appointment.startTime).getMinutes()}`
              }}
            >
              <div className="appointment-header">
                <h3>{appointment.serviceName}</h3>
                <span className="appointment-time">
                  {new Date(appointment.startTime).toLocaleTimeString()} - 
                  {new Date(appointment.endTime).toLocaleTimeString()}
                </span>
              </div>
              
              <div className="appointment-details">
                <p><strong>Cliente:</strong> {appointment.customerName}</p>
                <p><strong>Local:</strong> {appointment.location}</p>
                <p><strong>Status:</strong> {appointment.status}</p>
              </div>

              <div className="appointment-actions">
                {appointment.status === 'scheduled' && (
                  <>
                    <button
                      className="btn-success"
                      onClick={() => handleStatusUpdate(appointment.id, 'confirmed')}
                    >
                      Confirmar
                    </button>
                    <button
                      className="btn-error"
                      onClick={() => handleStatusUpdate(appointment.id, 'cancelled')}
                    >
                      Cancelar
                    </button>
                  </>
                )}
                {appointment.status === 'confirmed' && (
                  <button
                    className="btn-primary"
                    onClick={() => handleStatusUpdate(appointment.id, 'completed')}
                  >
                    Concluir
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Schedule;
