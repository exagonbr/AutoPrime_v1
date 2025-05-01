import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout/Layout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import RequestHelp from './pages/RequestHelp_temp';
import Mechanics from './pages/Mechanics';
import Booking from './pages/Booking';
import Login from './pages/Login';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import Providers from './pages/admin/Providers';
import Plans from './pages/admin/Plans';

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request-help" element={<RequestHelp />} />
          <Route path="/mechanics" element={<Mechanics />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute requiredRole="master">
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/providers"
            element={
              <PrivateRoute requiredRole="master">
                <Providers />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/plans"
            element={
              <PrivateRoute requiredRole="master">
                <Plans />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
