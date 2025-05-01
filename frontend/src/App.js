import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { RoleProvider } from './contexts/RoleContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout/Layout';
import AdminRoutes from './routes/AdminRoutes';
<<<<<<< HEAD
import ProviderRoutes from './routes/ProviderRoutes';
import ProfessionalRoutes from './routes/ProfessionalRoutes';
=======
>>>>>>> 4c537f1 (Everyt)

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

function App() {
  return (
    <AuthProvider>
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
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
>>>>>>> 4c537f1 (Everyt)
    </AuthProvider>
  );
}

export default App;
