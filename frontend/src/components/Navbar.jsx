// ============================================================
// components/Navbar.jsx - Navigation Bar Component
// Shows links based on login status and user role
// ============================================================

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // Get user info from localStorage (set during login)
  const user = JSON.parse(localStorage.getItem("user"));

  // Handle logout - clear storage and go to login page
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow">
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-airplane-fill me-2"></i>TravelEase
        </Link>

        {/* Mobile toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="bi bi-house me-1"></i>Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/destinations">
                <i className="bi bi-map me-1"></i>Destinations
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/booking">
                <i className="bi bi-calendar-check me-1"></i>Book Now
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                <i className="bi bi-info-circle me-1"></i>About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                <i className="bi bi-envelope me-1"></i>Contact
              </Link>
            </li>
          </ul>

          {/* Right side - login/logout buttons */}
          <ul className="navbar-nav">
            {user ? (
              // If user is logged in show their name and options
              <>
                {/* Show Booking History for all users */}
                <li className="nav-item">
                  <Link className="nav-link" to="/history">
                    <i className="bi bi-clock-history me-1"></i>My Bookings
                  </Link>
                </li>

                {/* Show Admin Dashboard only for admin users */}
                {user.role === "admin" && (
                  <li className="nav-item">
                    <Link className="nav-link text-warning fw-bold" to="/admin">
                      <i className="bi bi-shield-check me-1"></i>Admin
                    </Link>
                  </li>
                )}

                {/* User name and logout */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-person-circle me-1"></i>
                    {user.name}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              // If not logged in, show Login and Register links
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="bi bi-box-arrow-in-right me-1"></i>Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-light btn-sm ms-2 fw-bold" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
