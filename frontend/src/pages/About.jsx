// ============================================================
// pages/About.jsx - About Us Page
// Company information, mission, team, and milestones
// ============================================================

import React from "react";

// Team member data
const team = [
  { name: "Amit Kumar", role: "CEO & Founder", icon: "bi-person-badge", color: "primary" },
  { name: "Sneha Verma", role: "Head of Operations", icon: "bi-gear", color: "success" },
  { name: "Rohit Joshi", role: "Travel Consultant", icon: "bi-map", color: "warning" },
  { name: "Pooja Das", role: "Customer Support", icon: "bi-headset", color: "info" },
];

const About = () => {
  return (
    <div className="page-wrapper">
      <div className="container">

        {/* ── Page Header ───────────────────────────────── */}
        <div className="text-center mb-5">
          <h1 className="section-title">About TravelEase</h1>
          <p className="text-muted fs-5">Your trusted companion for world-class travel experiences</p>
        </div>

        {/* ── Our Story ─────────────────────────────────── */}
        <div className="row align-items-center mb-5 g-4">
          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80"
              alt="Our Story"
              className="img-fluid rounded-4 shadow"
            />
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold text-primary mb-3">Our Story</h2>
            <p className="text-muted">
              Founded in 2014, TravelEase started with a simple mission — to make travel accessible,
              affordable, and memorable for everyone. From a small team of passionate travelers,
              we have grown into one of India's most trusted travel booking platforms.
            </p>
            <p className="text-muted">
              We believe travel transforms lives. Whether it's your first solo trip or a family
              vacation, we are here to make every journey extraordinary.
            </p>
            <div className="row g-3 mt-3">
              {[
                { val: "10+", label: "Years of Experience" },
                { val: "50K+", label: "Happy Customers" },
                { val: "100+", label: "Destinations" },
                { val: "98%", label: "Satisfaction Rate" },
              ].map((s, i) => (
                <div key={i} className="col-6">
                  <div className="bg-primary bg-opacity-10 rounded-3 p-3 text-center">
                    <div className="fw-bold fs-4 text-primary">{s.val}</div>
                    <small className="text-muted">{s.label}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Mission & Vision ──────────────────────────── */}
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm p-4 h-100 rounded-4">
              <i className="bi bi-bullseye text-primary mb-3" style={{ fontSize: "2rem" }}></i>
              <h4 className="fw-bold">Our Mission</h4>
              <p className="text-muted">
                To provide seamless, affordable, and memorable travel experiences by connecting
                travelers with the best destinations, hotels, and services worldwide.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-sm p-4 h-100 rounded-4">
              <i className="bi bi-eye text-success mb-3" style={{ fontSize: "2rem" }}></i>
              <h4 className="fw-bold">Our Vision</h4>
              <p className="text-muted">
                To become India's most loved travel platform by making international and domestic
                travel simple, transparent, and accessible for all.
              </p>
            </div>
          </div>
        </div>

        {/* ── Team Section ──────────────────────────────── */}
        <div className="text-center mb-4">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="text-muted">The passionate people behind TravelEase</p>
        </div>
        <div className="row g-4 mb-5">
          {team.map((member, i) => (
            <div key={i} className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm text-center p-4 h-100 rounded-4">
                <div
                  className={`bg-${member.color} bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3`}
                  style={{ width: 80, height: 80 }}
                >
                  <i className={`bi ${member.icon} text-${member.color}`} style={{ fontSize: "2rem" }}></i>
                </div>
                <h5 className="fw-bold mb-1">{member.name}</h5>
                <p className="text-muted small mb-0">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Values Section ────────────────────────────── */}
        <div className="bg-primary text-white rounded-4 p-5 text-center">
          <h3 className="fw-bold mb-3">Our Core Values</h3>
          <div className="row g-3">
            {["Transparency", "Customer First", "Innovation", "Reliability", "Passion", "Sustainability"].map((val, i) => (
              <div key={i} className="col-6 col-md-4 col-lg-2">
                <div className="bg-white bg-opacity-10 rounded-3 p-2">
                  <small className="fw-semibold">{val}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
