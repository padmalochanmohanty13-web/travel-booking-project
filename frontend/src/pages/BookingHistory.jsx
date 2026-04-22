// ============================================================
// pages/BookingHistory.jsx - User Booking History Page
// Fetches and displays all bookings for the logged-in user
// ============================================================


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BookingHistory = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user

  const [bookings, setBookings] = useState([]); // Store fetched bookings
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // NEW: Email notification state
const [emailMsg, setEmailMsg] = useState("");
  // Fetch user's bookings when component loads
  useEffect(() => {
    // Redirect to login if not logged in
    if (!user) {
      navigate("/login");
      return;
    }
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      // GET request with JWT token to fetch only this user's bookings
      const res = await axios.get("/api/bookings/my", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBookings(res.data);
    } catch (err) {
      setError("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle booking deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await axios.delete(`/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      // Remove deleted booking from state without re-fetching
      setBookings(bookings.filter((b) => b._id !== id));
    } catch {
      alert("Failed to cancel booking.");
    }
    // NEW: Show email sent notification
      setEmailMsg(`Booking cancelled! A cancellation email has been sent to ${user.email}`);
    // Hide message after 5 seconds
       setTimeout(() => setEmailMsg(""), 5000);
  };

  // Status badge color mapping
  const statusColor = { Confirmed: "success", Pending: "warning", Cancelled: "danger" };

  if (loading) {
    return (
      <div className="page-wrapper text-center">
        <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }}></div>
        <p className="mt-3 text-muted">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container">

        {/* ── Header ────────────────────────────────────── */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 className="section-title mb-1">My Bookings</h1>
            <p className="text-muted">Welcome back, <strong>{user?.name}</strong></p>
          </div>
          <Link to="/booking" className="btn btn-primary rounded-pill px-4">
            <i className="bi bi-plus-circle me-2"></i>New Booking
          </Link>
        </div>

        {/* ── Error Alert ───────────────────────────────── */}
        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        {/* NEW: Green toast shown after cancellation */}
        {emailMsg && (
             <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
               <i className="bi bi-envelope-check-fill fs-4 me-3"></i>
                <div>
                   <strong>Cancellation Email Sent!</strong><br />
                   <small>{emailMsg}</small>
                </div>
            </div>
       )}

        {/* ── No Bookings Message ───────────────────────── */}
        {bookings.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-calendar-x text-muted" style={{ fontSize: "4rem" }}></i>
            <h4 className="mt-3">No bookings found</h4>
            <p className="text-muted">You haven't booked any trips yet.</p>
            <Link to="/destinations" className="btn btn-primary rounded-pill mt-2">
              Explore Destinations
            </Link>
          </div>
        ) : (
          <>
            {/* ── Summary Stats ─────────────────────────── */}
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <div className="card border-0 bg-primary text-white rounded-4 p-3 text-center">
                  <div className="fs-2 fw-bold">{bookings.length}</div>
                  <div>Total Bookings</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-0 bg-success text-white rounded-4 p-3 text-center">
                  <div className="fs-2 fw-bold">
                    {bookings.filter((b) => b.status === "Confirmed").length}
                  </div>
                  <div>Confirmed</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-0 bg-info text-white rounded-4 p-3 text-center">
                  <div className="fs-2 fw-bold">
                    ₹{bookings.reduce((sum, b) => sum + b.price, 0).toLocaleString()}
                  </div>
                  <div>Total Spent</div>
                </div>
              </div>
            </div>

            {/* ── Booking Cards ─────────────────────────── */}
            <div className="row g-4">
              {bookings.map((booking) => (
                <div key={booking._id} className="col-md-6 col-lg-4">
                  <div className="card border-0 shadow-sm rounded-4 h-100">
                    <div className="card-body">
                      {/* Destination + Status */}
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <h5 className="fw-bold mb-0">
                          <i className="bi bi-geo-alt-fill text-primary me-1"></i>
                          {booking.destination}
                        </h5>
                        <span className={`badge bg-${statusColor[booking.status]}`}>
                          {booking.status}
                        </span>
                      </div>

                      {/* Details */}
                      <ul className="list-unstyled small text-muted mb-3">
                        <li className="mb-1">
                          <i className="bi bi-person me-2"></i>{booking.name}
                        </li>
                        <li className="mb-1">
                          <i className="bi bi-calendar me-2"></i>
                          {new Date(booking.date).toDateString()}
                        </li>
                        <li className="mb-1">
                          <i className="bi bi-people me-2"></i>
                          {booking.persons} person(s)
                        </li>
                        <li>
                          <i className="bi bi-clock me-2"></i>
                          Booked on {new Date(booking.createdAt).toLocaleDateString()}
                        </li>
                      </ul>

                      {/* Price + Cancel Button */}
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold text-success fs-5">
                          ₹{booking.price.toLocaleString()}
                        </span>
                        <button
                          className="btn btn-outline-danger btn-sm rounded-pill"
                          onClick={() => handleDelete(booking._id)}
                        >
                          <i className="bi bi-trash me-1"></i>Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;
