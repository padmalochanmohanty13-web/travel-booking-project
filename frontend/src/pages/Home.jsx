// ============================================================
// pages/Home.jsx - Landing Page
// Shows slider, features, destinations, and footer
// ============================================================

import React from "react";
import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import DestinationCards from "../components/DestinationCards";

// Why Choose Us feature items
const features = [
  { icon: "bi-shield-check", title: "Safe & Secure", text: "Your safety and security is our top priority on every journey.", color: "text-primary" },
  { icon: "bi-currency-rupee", title: "Best Prices", text: "We offer competitive prices with no hidden charges whatsoever.", color: "text-success" },
  { icon: "bi-headset", title: "24/7 Support", text: "Our team is available around the clock to assist you anytime.", color: "text-warning" },
  { icon: "bi-geo-alt", title: "100+ Destinations", text: "Choose from over 100 amazing destinations worldwide.", color: "text-danger" },
];

const Home = () => {
  return (
    <div>
      {/* ── Hero Image Slider ─────────────────────────────── */}
      <Slider />

      {/* ── Stats Section ─────────────────────────────────── */}
      <section className="py-4 bg-primary text-white">
        <div className="container">
          <div className="row text-center g-3">
            {[
              { number: "50,000+", label: "Happy Travelers" },
              { number: "100+", label: "Destinations" },
              { number: "10+", label: "Years Experience" },
              { number: "4.8★", label: "Average Rating" },
            ].map((stat, i) => (
              <div key={i} className="col-6 col-md-3">
                <h3 className="fw-bold mb-0">{stat.number}</h3>
                <small>{stat.label}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Destinations Cards ─────────────────────── */}
      <DestinationCards />

      {/* ── Why Choose Us Section ─────────────────────────── */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Why Choose TravelEase?</h2>
            <p className="text-muted">We make travel easy, affordable, and unforgettable</p>
          </div>
          <div className="row g-4">
            {features.map((f, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <div className="card text-center border-0 shadow-sm p-4 h-100">
                  <i className={`bi ${f.icon} ${f.color} mb-3`} style={{ fontSize: "2.5rem" }}></i>
                  <h5 className="fw-bold">{f.title}</h5>
                  <p className="text-muted small mb-0">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Call To Action Banner ──────────────────────────── */}
      <section className="py-5" style={{ background: "linear-gradient(135deg, #0d6efd, #0dcaf0)" }}>
        <div className="container text-center text-white">
          <h2 className="fw-bold mb-3">Ready to Start Your Adventure?</h2>
          <p className="fs-5 mb-4">Book your dream trip today and create memories that last a lifetime!</p>
          <Link to="/booking" className="btn btn-light btn-lg fw-bold rounded-pill px-5 me-3">
            <i className="bi bi-calendar-check me-2"></i>Book Now
          </Link>
          <Link to="/destinations" className="btn btn-outline-light btn-lg rounded-pill px-4">
            Explore Destinations
          </Link>
        </div>
      </section>

      {/* ── Testimonials Section ──────────────────────────── */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">What Our Travelers Say</h2>
          </div>
          <div className="row g-4">
            {[
              { name: "Rahul Sharma", dest: "Bali Trip", text: "Amazing experience! Everything was perfectly organized. Will definitely book again.", rating: 5 },
              { name: "Priya Patel", dest: "Paris Trip", text: "TravelEase made our honeymoon absolutely magical. Best decision ever!", rating: 5 },
              { name: "Arjun Singh", dest: "Switzerland Trip", text: "The Alps were breathtaking. Great service at a very reasonable price!", rating: 4 },
            ].map((t, i) => (
              <div key={i} className="col-md-4">
                <div className="card border-0 shadow-sm p-4 h-100">
                  <div className="mb-3">
                    {Array(t.rating).fill(0).map((_, j) => (
                      <i key={j} className="bi bi-star-fill text-warning"></i>
                    ))}
                  </div>
                  <p className="text-muted fst-italic">"{t.text}"</p>
                  <div className="d-flex align-items-center mt-auto">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{ width: 45, height: 45, fontSize: "1.2rem", fontWeight: 700 }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="fw-bold">{t.name}</div>
                      <small className="text-muted">{t.dest}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="footer">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <h5><i className="bi bi-airplane-fill me-2 text-primary"></i>TravelEase</h5>
              <p className="text-muted small">Your trusted travel partner since 2014. Making dreams come true, one destination at a time.</p>
            </div>
            <div className="col-md-2">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                {[["Home", "/"], ["Destinations", "/destinations"], ["Book Now", "/booking"], ["About", "/about"]].map(([label, path]) => (
                  <li key={label}><Link to={path} className="text-muted text-decoration-none small">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Contact</h5>
              <p className="text-muted small mb-1"><i className="bi bi-envelope me-2"></i>support@travelease.com</p>
              <p className="text-muted small mb-1"><i className="bi bi-telephone me-2"></i>+91 9876543210</p>
              <p className="text-muted small"><i className="bi bi-geo-alt me-2"></i>Mumbai, India</p>
            </div>
            <div className="col-md-3">
              <h5>Follow Us</h5>
              <div className="d-flex gap-3 fs-4">
                <a href="#" className="text-muted"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-muted"><i className="bi bi-instagram"></i></a>
                <a href="#" className="text-muted"><i className="bi bi-twitter-x"></i></a>
                <a href="#" className="text-muted"><i className="bi bi-youtube"></i></a>
              </div>
            </div>
          </div>
          <hr className="border-secondary mt-4" />
          <p className="text-center text-muted small mb-0">
            © 2024 TravelEase. All rights reserved. | Made with ❤️ for 6th Semester Project
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
