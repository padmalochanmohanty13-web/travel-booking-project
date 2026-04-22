// ============================================================
// pages/Contact.jsx - Contact Us Page
// Contact form (frontend only) and company contact details
// ============================================================

import React, { useState } from "react";

const Contact = () => {
  // State for contact form fields
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  // Update form state when user types
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission (frontend only - no backend for contact form)
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real project, this would call an API to send email
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="page-wrapper">
      <div className="container">

        {/* ── Page Header ───────────────────────────────── */}
        <div className="text-center mb-5">
          <h1 className="section-title">Contact Us</h1>
          <p className="text-muted">Have questions? We'd love to hear from you!</p>
        </div>

        <div className="row g-5">
          {/* ── Contact Form ──────────────────────────── */}
          <div className="col-md-7">
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h4 className="fw-bold mb-4">
                <i className="bi bi-envelope-fill text-primary me-2"></i>Send us a Message
              </h4>

              {/* Success message shown after form submit */}
              {submitted && (
                <div className="alert alert-success">
                  <i className="bi bi-check-circle me-2"></i>
                  Thank you! Your message has been sent. We'll reply within 24 hours.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Name Field */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Email Field */}
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

                  {/* Subject Field */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      className="form-control"
                      placeholder="What is this about?"
                      value={form.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Message Field */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">Message</label>
                    <textarea
                      name="message"
                      className="form-control"
                      rows="5"
                      placeholder="Write your message here..."
                      value={form.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary w-100 rounded-pill py-2 fw-bold">
                      <i className="bi bi-send me-2"></i>Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* ── Contact Info ──────────────────────────── */}
          <div className="col-md-5">
            <h4 className="fw-bold mb-4">
              <i className="bi bi-info-circle-fill text-primary me-2"></i>Get in Touch
            </h4>

            {/* Contact Detail Cards */}
            {[
              { icon: "bi-geo-alt-fill", title: "Our Office", detail: "TravelEase Tower, Bandra West, Mumbai - 400050, India", color: "primary" },
              { icon: "bi-telephone-fill", title: "Phone", detail: "+91 9876543210\n+91 9123456780", color: "success" },
              { icon: "bi-envelope-fill", title: "Email", detail: "support@travelease.com\nbookings@travelease.com", color: "warning" },
              { icon: "bi-clock-fill", title: "Working Hours", detail: "Mon - Sat: 9:00 AM – 8:00 PM\nSunday: 10:00 AM – 4:00 PM", color: "info" },
            ].map((item, i) => (
              <div key={i} className="card border-0 shadow-sm rounded-4 p-3 mb-3">
                <div className="d-flex align-items-start">
                  <div className={`bg-${item.color} bg-opacity-10 rounded-3 p-2 me-3`}>
                    <i className={`bi ${item.icon} text-${item.color} fs-5`}></i>
                  </div>
                  <div>
                    <div className="fw-semibold">{item.title}</div>
                    <div className="text-muted small" style={{ whiteSpace: "pre-line" }}>{item.detail}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* Social Media Links */}
            <div className="card border-0 shadow-sm rounded-4 p-3">
              <div className="fw-semibold mb-2">Follow Us On</div>
              <div className="d-flex gap-3 fs-4">
                {[
                  { icon: "bi-facebook", color: "#1877f2" },
                  { icon: "bi-instagram", color: "#e4405f" },
                  { icon: "bi-twitter-x", color: "#000" },
                  { icon: "bi-youtube", color: "#ff0000" },
                ].map((s, i) => (
                  <a key={i} href="#" style={{ color: s.color }}>
                    <i className={`bi ${s.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
