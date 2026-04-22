// ============================================================
// src/App.js - Main Application Router
// Sets up all page routes using React Router v6
// ============================================================

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import all pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Destinations from "./pages/Destinations";
import Booking from "./pages/Booking";
import Confirmation from "./pages/Confirmation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import BookingHistory from "./pages/BookingHistory";

// Import reusable components
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    // BrowserRouter enables client-side routing
    <Router>
      {/* Navbar is always visible on every page */}
      <Navbar />

      {/* Define all application routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/history" element={<BookingHistory />} />
      </Routes>

      {/* Chatbot floats on every page */}
      <Chatbot />
    </Router>
  );
}

export default App;
