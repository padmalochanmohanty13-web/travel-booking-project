// ============================================================
// pages/Login.jsx - User Login Page
// Authenticates user via backend API and stores JWT in localStorage
// ============================================================

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  // Form state for email and password
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Update form when user types
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      // Send POST request to backend login route
      const res = await axios.post("/api/auth/login", form);

      // Save user data (including JWT token) in localStorage
      localStorage.setItem("user", JSON.stringify(res.data));

      // Redirect admin to Admin Dashboard, regular users to Home
      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper bg-light d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">

            {/* ── Login Card ────────────────────────────── */}
            <div className="card auth-card border-0 shadow p-4">
              {/* Logo */}
              <div className="text-center mb-4">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: 70, height: 70 }}>
                  <i className="bi bi-airplane-fill text-primary" style={{ fontSize: "1.8rem" }}></i>
                </div>
                <h3 className="fw-bold">Welcome Back!</h3>
                <p className="text-muted small">Login to access your TravelEase account</p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="alert alert-danger py-2">
                  <i className="bi bi-exclamation-circle me-2"></i>{error}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-3">
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
                <div className="mb-4">
                  <label className="form-label fw-semibold">Password</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-lock"></i></span>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fw-bold rounded-pill"
                  disabled={loading}
                >
                  {loading ? (
                    <><span className="spinner-border spinner-border-sm me-2"></span>Logging in...</>
                  ) : (
                    <><i className="bi bi-box-arrow-in-right me-2"></i>Login</>
                  )}
                </button>
              </form>

              {/* Register Link */}
              <div className="text-center mt-3">
                <span className="text-muted small">Don't have an account? </span>
                <Link to="/register" className="fw-bold text-primary text-decoration-none">Register here</Link>
              </div>

              {/* Demo Credentials */}
              <div className="alert alert-info mt-3 mb-0 py-2 small">
                <strong><i className="bi bi-info-circle me-1"></i>Demo:</strong>
                Register a new account or use admin credentials<br />
                Admin: admin@travel.com / admin123
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
