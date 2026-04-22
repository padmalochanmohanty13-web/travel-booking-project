// ============================================================
// pages/AdminDashboard.jsx - Admin Control Panel
// View all users' bookings, statistics, and manage bookings
// Only accessible to users with role = "admin"
// ============================================================

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(""); // Search filter
  const [statusFilter, setStatusFilter] = useState("All"); // Status filter

  useEffect(() => {
    // Redirect if not logged in or not admin
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.role !== "admin") {
      navigate("/"); // Non-admins go to home
      return;
    }
    fetchAllBookings();
  }, []);

  // Fetch ALL bookings from backend (admin endpoint)
  const fetchAllBookings = async () => {
    try {
      const res = await axios.get("/api/bookings/all", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBookings(res.data);
    } catch (err) {
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  // Delete any booking (admin power)
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      await axios.delete(`/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBookings(bookings.filter((b) => b._id !== id));
    } catch {
      alert("Failed to delete booking.");
    }
  };

  // Filter bookings by search term and status
  const filtered = bookings.filter((b) => {
    const matchSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.destination.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Calculate summary statistics
  const totalRevenue = bookings.reduce((sum, b) => sum + b.price, 0);
  const confirmed = bookings.filter((b) => b.status === "Confirmed").length;
  const totalPersons = bookings.reduce((sum, b) => sum + b.persons, 0);

  // Status badge colors
  const statusColor = { Confirmed: "success", Pending: "warning", Cancelled: "danger" };

  if (loading) {
    return (
      <div className="page-wrapper text-center">
        <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }}></div>
        <p className="mt-3">Loading admin data...</p>
      </div>
    );
  }

  return (
    <div className="page-wrapper bg-light">
      <div className="container-fluid px-4">

        {/* ── Admin Header ──────────────────────────────── */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-0">
              <i className="bi bi-shield-check text-primary me-2"></i>Admin Dashboard
            </h2>
            <p className="text-muted mb-0">Manage all bookings and users</p>
          </div>
          <div className="badge bg-primary fs-6 rounded-pill px-3 py-2">
            <i className="bi bi-person-badge me-1"></i>{user?.name} (Admin)
          </div>
        </div>

        {/* ── Error Alert ───────────────────────────────── */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* ── Statistics Cards ──────────────────────────── */}
        <div className="row g-4 mb-4">
          {[
            { title: "Total Bookings", value: bookings.length, icon: "bi-calendar-check", color: "primary", bg: "primary" },
            { title: "Confirmed Bookings", value: confirmed, icon: "bi-check-circle", color: "success", bg: "success" },
            { title: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: "bi-currency-rupee", color: "warning", bg: "warning" },
            { title: "Total Travelers", value: totalPersons, icon: "bi-people", color: "info", bg: "info" },
          ].map((stat, i) => (
            <div key={i} className="col-sm-6 col-xl-3">
              <div className={`card admin-stat-card border-0 border-start border-4 border-${stat.bg}`}>
                <div className="card-body d-flex justify-content-between align-items-center p-4">
                  <div>
                    <p className="text-muted small mb-1">{stat.title}</p>
                    <h3 className="fw-bold mb-0">{stat.value}</h3>
                  </div>
                  <div className={`bg-${stat.bg} bg-opacity-10 rounded-3 p-3`}>
                    <i className={`bi ${stat.icon} text-${stat.color} fs-3`}></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Filters Row ───────────────────────────────── */}
        <div className="card border-0 shadow-sm rounded-4 p-3 mb-4">
          <div className="row g-3 align-items-center">
            {/* Search Input */}
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-primary text-white border-0">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name, email, destination..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Status Filter Buttons */}
            <div className="col-md-6 d-flex gap-2 flex-wrap">
              {["All", "Confirmed", "Pending", "Cancelled"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`btn btn-sm rounded-pill ${statusFilter === s ? "btn-primary" : "btn-outline-primary"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bookings Table ────────────────────────────── */}
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
            <h5 className="fw-bold mb-0">All Bookings ({filtered.length})</h5>
            <span className="text-muted small">Showing {filtered.length} of {bookings.length}</span>
          </div>

          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Traveler</th>
                  <th>Destination</th>
                  <th>Date</th>
                  <th>Persons</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5 text-muted">
                      <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                      No bookings found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((b, i) => (
                    <tr key={b._id}>
                      <td className="fw-semibold">{i + 1}</td>
                      <td>
                        <div className="fw-semibold">{b.name}</div>
                        <div className="text-muted small">{b.email}</div>
                      </td>
                      <td>
                        <i className="bi bi-geo-alt text-primary me-1"></i>
                        {b.destination}
                      </td>
                      <td>{new Date(b.date).toLocaleDateString()}</td>
                      <td>
                        <i className="bi bi-people me-1"></i>{b.persons}
                      </td>
                      <td className="fw-bold text-success">₹{b.price.toLocaleString()}</td>
                      <td>
                        <span className={`badge bg-${statusColor[b.status]} rounded-pill`}>
                          {b.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm rounded-pill"
                          onClick={() => handleDelete(b._id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
