// ============================================================
// pages/Confirmation.jsx - Booking Confirmation Page
// Shown after a successful booking with booking summary
// ============================================================

import React from "react";
import { useLocation, Link } from "react-router-dom";

const Confirmation = () => {
  // Get booking details passed from Booking page via navigation state
  const location = useLocation();
  const booking = location.state;

  // If no booking data (user navigated here directly), show fallback message
  if (!booking) {
    return (
      <div className="page-wrapper text-center">
        <i className="bi bi-exclamation-circle text-warning" style={{ fontSize: "4rem" }}></i>
        <h3 className="mt-3">No booking data found.</h3>
        <Link to="/booking" className="btn btn-primary mt-3 rounded-pill">Go to Booking</Link>
      </div>
    );
  }

  return (
    <div className="page-wrapper bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7">

            {/* ── Success Icon and Message ───────────────── */}
            <div className="text-center mb-4">
              <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{ width: 90, height: 90 }}>
                <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "3rem" }}></i>
              </div>
              <h1 className="fw-bold text-success">Booking Confirmed!</h1>
              <p className="text-muted fs-5">Your trip has been successfully booked. Have a great journey! ✈️</p>
                <div className="alert alert-info d-flex align-items-center mb-4">
                   <i className="bi bi-envelope-check-fill fs-3 me-3 text-primary"></i>
                    <div>
                       <strong>Confirmation Email Sent!</strong><br />
                       <small>A booking confirmation email has been sent to <strong>{booking.email}</strong></small>
                    </div>
                </div>
            </div>

            {/* ── Booking Details Card ───────────────────── */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-4 border-bottom pb-2">
                <i className="bi bi-receipt me-2 text-primary"></i>Booking Summary
              </h5>
              

              {/* Detail rows */}
              {[
                { label: "Traveler Name", value: booking.name, icon: "bi-person" },
                { label: "Email", value: booking.email, icon: "bi-envelope" },
                { label: "Destination", value: booking.destination, icon: "bi-geo-alt" },
                { label: "Travel Date", value: new Date(booking.date).toDateString(), icon: "bi-calendar" },
                { label: "Number of Persons", value: booking.persons, icon: "bi-people" },
              ].map((item, i) => (
                <div key={i} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                  <span className="text-muted">
                    <i className={`bi ${item.icon} me-2`}></i>{item.label}
                  </span>
                  <span className="fw-semibold">{item.value}</span>
                </div>
              ))}

              {/* Total price highlighted */}
              <div className="d-flex justify-content-between align-items-center py-3 mt-2">
                <span className="fw-bold fs-5">Total Amount Paid</span>
                <span className="fw-bold fs-4 text-success">₹{Number(booking.price).toLocaleString()}</span>
              </div>

              {/* Status Badge */}
              <div className="text-center mt-2">
                <span className="badge bg-success fs-6 rounded-pill px-4 py-2">
                  <i className="bi bi-check2-circle me-2"></i>Status: Confirmed
                </span>
              </div>
            </div>

            {/* ── Important Notes ────────────────────────── */}
            <div className="alert alert-info rounded-4">
              <h6 className="fw-bold"><i className="bi bi-info-circle me-2"></i>Important Notes</h6>
              <ul className="mb-0 small">
                <li>A confirmation email has been sent to <strong>{booking.email}</strong></li>
                <li>Please carry a valid government ID proof during travel</li>
                <li>Report to the departure point 2 hours before scheduled time</li>
                <li>For support, call us at <strong>+91 9876543210</strong></li>
              </ul>
            </div>

            {/* ── Action Buttons ─────────────────────────── */}
            <div className="d-flex gap-3 justify-content-center mt-4">
              <Link to="/" className="btn btn-outline-primary rounded-pill px-4">
                <i className="bi bi-house me-2"></i>Back to Home
              </Link>
              <Link to="/history" className="btn btn-primary rounded-pill px-4">
                <i className="bi bi-clock-history me-2"></i>My Bookings
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
