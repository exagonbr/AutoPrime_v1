admin/providersimport React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import '../../styles/Dashboard.css';

function ProfessionalDashboard() {
  const [stats, setStats] = useState({
    totalServices: 0,
    completedServices: 0,
    pendingServices: 0,
    monthlyEarnings: 0,
    upcomingAppointments: []
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'professional') {
      navigate('/login');
      return;
    }

    loadDashboardData();
  }, [user, navigate]);

  const loadDashboardData = async () => {
    try {
      const response = await api.get('/api/professional/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error loading professional dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Loading dashboard...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Professional Dashboard</h1>
      </div>
      
      <div className="dashboard-content">
        <div className="stats-overview">
          <div className="stat-card">
            <h3>Total Services</h3>
            <div className="stat-value">{stats.totalServices}</div>
          </div>
          <div className="stat-card">
            <h3>Completed Services</h3>
            <div className="stat-value">{stats.completedServices}</div>
          </div>
          <div className="stat-card">
            <h3>Pending Services</h3>
            <div className="stat-value">{stats.pendingServices}</div>
          </div>
          <div className="stat-card">
            <h3>Monthly Earnings</h3>
            <div className="stat-value">
              R$ {stats.monthlyEarnings.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="upcoming-appointments">
          <h2>Upcoming Appointments</h2>
          {stats.upcomingAppointments.length > 0 ? (
            <div className="appointments-list">
              {stats.upcomingAppointments.map((appointment, index) => (
                <div key={index} className="appointment-card">
                  <div className="appointment-time">
                    {new Date(appointment.datetime).toLocaleString()}
                  </div>
                  <div className="appointment-details">
                    <h4>{appointment.serviceType}</h4>
                    <p>{appointment.location}</p>
                  </div>
                  <div className="appointment-status">
                    {appointment.status}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No upcoming appointments</p>
          )}
        </div>

        <div className="quick-actions">
          <button onClick={() => navigate('/professional/schedule')}>
            View Schedule
          </button>
          <button onClick={() => navigate('/professional/profile')}>
            Update Profile
          </button>
          <button onClick={() => navigate('/professional/earnings')}>
            View Earnings
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfessionalDashboard;
