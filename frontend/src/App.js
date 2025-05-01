import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
<<<<<<< HEAD
import { RoleProvider } from './contexts/RoleContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout/Layout';
import AdminRoutes from './routes/AdminRoutes';
<<<<<<< HEAD
import ProviderRoutes from './routes/ProviderRoutes';
import ProfessionalRoutes from './routes/ProfessionalRoutes';
=======
>>>>>>> 4c537f1 (Everyt)
=======
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout/Layout';
>>>>>>> b4c6797 (Authentication)

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import RequestHelp from './pages/RequestHelp';
import RequestStatus from './pages/RequestStatus';
import Login from './pages/Login';
<<<<<<< HEAD
import Profile from './pages/Profile';
import MyRequests from './pages/MyRequests';
=======
>>>>>>> 4c537f1 (Everyt)

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import Providers from './pages/admin/Providers';
import Plans from './pages/admin/Plans';

function App() {
  return (
    <AuthProvider>
<<<<<<< HEAD
      <RoleProvider>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/request-help" element={<RequestHelp />} />
            <Route path="/request-status" element={<RequestStatus />} />
            <Route path="/login" element={<Login />} />

<<<<<<< HEAD
            {/* User Routes */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-requests"
              element={
                <PrivateRoute>
                  <MyRequests />
                </PrivateRoute>
              }
            />

            {/* Role-based Routes */}
            <Route
              path="/admin/*"
              element={
                <PrivateRoute requiredRole="master">
                  <AdminRoutes />
                </PrivateRoute>
              }
            />
            <Route
              path="/provider/*"
              element={
                <PrivateRoute requiredRole="provider">
                  <ProviderRoutes />
                </PrivateRoute>
              }
            />
            <Route
              path="/professional/*"
              element={
                <PrivateRoute requiredRole="professional">
                  <ProfessionalRoutes />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </RoleProvider>
=======
          {/* Protected Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <PrivateRoute requiredRole="master">
                <AdminRoutes />
=======
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
>>>>>>> b4c6797 (Authentication)
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
<<<<<<< HEAD
>>>>>>> 4c537f1 (Everyt)
=======
>>>>>>> b4c6797 (Authentication)
    </AuthProvider>
  );
}

export default App;
