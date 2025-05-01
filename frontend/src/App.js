import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import RequestHelp from './pages/RequestHelp_temp';
import Mechanics from './pages/Mechanics';
import Booking from './pages/Booking';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/request-help" element={<RequestHelp />} />
        <Route path="/mechanics" element={<Mechanics />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
