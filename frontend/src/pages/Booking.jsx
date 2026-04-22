// ============================================================
// pages/Booking.jsx - Travel Booking Form Page
// Users fill in travel details; sends data to backend API
// ============================================================

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Available destinations for the dropdown
const destinationOptions = [
  { name: "Paris, France", price: 45000 },
  { name: "Bali, Indonesia", price: 32000 },
  { name: "Maldives", price: 75000 },
  { name: "Switzerland", price: 90000 },
  { name: "Tokyo, Japan", price: 55000 },
  { name: "Dubai, UAE", price: 60000 },
  { name: "New York, USA", price: 85000 },
  { name: "Rome, Italy", price: 50000 },
  { name: "Rajasthan, India", price: 18000 },
  { name: "Goa, India", price: 12000 },
  { name: "Thailand", price: 28000 },
  { name: "London, UK", price: 80000 },
];

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Receives pre-filled data from destination cards

  // Get pre-filled destination from navigation state (if any)
  const preSelected = location.state;

  // Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Form state - pre-fill name, email, destination, price if coming from destination card
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    destination: preSelected?.destination || "",
    date: "",
    persons: 1,
    price: preSelected?.price || 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Update form fields when user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...form, [name]: value };

    // Auto-update price when destination changes
    if (name === "destination") {
      const found = destinationOptions.find((d) => d.name === value);
      updatedForm.price = found ? found.price * updatedForm.persons : 0;
    }

    // Recalculate total price when persons count changes
    if (name === "persons") {
      const found = destinationOptions.find((d) => d.name === form.destination);
      updatedForm.price = found ? found.price * parseInt(value) : 0;
    }

    setForm(updatedForm);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check if user is logged in before booking
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      // Send booking data to backend API with JWT token in header
      await axios.post("/api/bookings", form, {
        headers: {
          Authorization: `Bearer ${user.token}`, // JWT token for authentication
        },
      });

      // On success, navigate to confirmation page with booking details
      navigate("/confirmation", { state: form });
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">

            {/* ── Page Header ───────────────────────────── */}
            <div className="text-center mb-4">
              <h1 className="section-title">Book Your Trip</h1>
              <p className="text-muted">Fill in the details below to book your dream vacation</p>
            </div>

            {/* ── Booking Form Card ─────────────────────── */}
            <div className="card border-0 shadow rounded-4 p-4">
              {/* Login warning if not logged in */}
              {!user && (
                <div className="alert alert-warning">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Please <a href="/login" className="fw-bold">login</a> to complete your booking.
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="alert alert-danger">
                  <i className="bi bi-x-circle me-2"></i>{error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Traveler Name */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Destination Dropdown */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Select Destination</label>
                    <select
                      name="destination"
                      className="form-select"
                      value={form.destination}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Choose a Destination --</option>
                      {destinationOptions.map((d) => (
                        <option key={d.name} value={d.name}>
                          {d.name} - ₹{d.price.toLocaleString()}/person
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Travel Date */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Travel Date</label>
                    <input
                      type="date"
                      name="date"
                      className="form-control"
                      value={form.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]} // No past dates
                      required
                    />
                  </div>

                  {/* Number of Persons */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Number of Persons</label>
                    <input
                      type="number"
                      name="persons"
                      className="form-control"
                      value={form.persons}
                      onChange={handleChange}
                      min="1"
                      max="20"
                      required
                    />
                  </div>

                  {/* Total Price (auto-calculated, read-only) */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Total Price</label>
                    <div className="form-control bg-success text-white fw-bold">
                      ₹{form.price.toLocaleString()}
                    </div>
                  </div>

                  {/* Booking Summary Box */}
                  {form.destination && (
                    <div className="col-12">
                      <div className="alert alert-info">
                        <i className="bi bi-info-circle me-2"></i>
                        <strong>Summary:</strong> {form.persons} person(s) to <strong>{form.destination}</strong>
                        {form.date && ` on ${new Date(form.date).toDateString()}`}
                        {" — "}Total: <strong>₹{form.price.toLocaleString()}</strong>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 py-2 fw-bold rounded-pill"
                      disabled={loading}
                    >
                      {loading ? (
                        <><span className="spinner-border spinner-border-sm me-2"></span>Processing...</>
                      ) : (
                        <><i className="bi bi-check-circle me-2"></i>Confirm Booking</>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
