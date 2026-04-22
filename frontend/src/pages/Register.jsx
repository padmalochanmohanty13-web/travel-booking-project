// ============================================================
// pages/Register.jsx - User Registration Page
// Creates a new user account via backend API
// ============================================================

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  // Form fields state
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", // Default role is "user"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Update form on input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle registration form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check if passwords match before sending to server
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Password must be at least 6 characters
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      // Send registration data to backend
      const res = await axios.post("/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      // Save user info and token in localStorage (auto-login after register)
      localStorage.setItem("user", JSON.stringify(res.data));

      // Redirect to home page after successful registration
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper bg-light d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">

            {/* ── Register Card ─────────────────────────── */}
            <div className="card auth-card border-0 shadow p-4">
              {/* Header */}
              <div className="text-center mb-4">
                <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: 70, height: 70 }}>
                  <i className="bi bi-person-plus-fill text-success" style={{ fontSize: "1.8rem" }}></i>
                </div>
                <h3 className="fw-bold">Create Account</h3>
                <p className="text-muted small">Join TravelEase and start your journey!</p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="alert alert-danger py-2">
                  <i className="bi bi-exclamation-circle me-2"></i>{error}
                </div>
              )}

              {/* Registration Form */}
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Full Name */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">Full Name</label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-person"></i></span>
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
                  </div>

                  {/* Email */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-envelope"></i></span>
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
                  </div>

                  {/* Password */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Password</label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-lock"></i></span>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Min 6 characters"
                        value={form.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Confirm Password</label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        placeholder="Repeat password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Role Selection */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">Account Type</label>
                    <select
                      name="role"
                      className="form-select"
                      value={form.role}
                      onChange={handleChange}
                    >
                      <option value="user">Regular User</option>
                      <option value="admin">Admin</option>
                    </select>
                    <div className="form-text">Select Admin only if you are a system administrator</div>
                  </div>

                  {/* Submit Button */}
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-success w-100 py-2 fw-bold rounded-pill"
                      disabled={loading}
                    >
                      {loading ? (
                        <><span className="spinner-border spinner-border-sm me-2"></span>Creating Account...</>
                      ) : (
                        <><i className="bi bi-person-check me-2"></i>Create Account</>
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {/* Login Link */}
              <div className="text-center mt-3">
                <span className="text-muted small">Already have an account? </span>
                <Link to="/login" className="fw-bold text-primary text-decoration-none">Login here</Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
