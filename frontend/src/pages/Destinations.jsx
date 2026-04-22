// ============================================================
// pages/Destinations.jsx - All Destinations Page
// Shows filterable list of all travel destinations
// ============================================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// All available destinations with detailed info
const allDestinations = [
  { id: 1, name: "Paris, France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80", price: 45000, rating: 4.8, duration: "7 Days", category: "Europe", description: "The city of love with the iconic Eiffel Tower, world-class cuisine, and art museums." },
  { id: 2, name: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80", price: 32000, rating: 4.7, duration: "6 Days", category: "Asia", description: "Tropical paradise with stunning rice terraces, temples, and beautiful beaches." },
  { id: 3, name: "Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80", price: 75000, rating: 4.9, duration: "5 Days", category: "Asia", description: "Crystal clear waters, overwater bungalows, and vibrant coral reefs." },
  { id: 4, name: "Switzerland", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", price: 90000, rating: 4.8, duration: "8 Days", category: "Europe", description: "Majestic Alps, pristine lakes, charming villages, and world-famous chocolates." },
  { id: 5, name: "Tokyo, Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80", price: 55000, rating: 4.7, duration: "7 Days", category: "Asia", description: "Where ancient traditions meet futuristic technology in a vibrant city." },
  { id: 6, name: "Dubai, UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", price: 60000, rating: 4.6, duration: "5 Days", category: "Middle East", description: "Luxury shopping, ultramodern architecture, and lively nightlife scene." },
  { id: 7, name: "New York, USA", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80", price: 85000, rating: 4.7, duration: "8 Days", category: "America", description: "The Big Apple — Times Square, Central Park, and world-famous skyline." },
  { id: 8, name: "Rome, Italy", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80", price: 50000, rating: 4.8, duration: "7 Days", category: "Europe", description: "The Eternal City with the Colosseum, Vatican, and incredible pasta." },
  { id: 9, name: "Rajasthan, India", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80", price: 18000, rating: 4.6, duration: "6 Days", category: "India", description: "Royal palaces, colorful bazaars, desert safaris, and rich Rajput heritage." },
  { id: 10, name: "Goa, India", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80", price: 12000, rating: 4.5, duration: "4 Days", category: "India", description: "Sun-kissed beaches, vibrant nightlife, and laid-back Portuguese vibes." },
  { id: 11, name: "Thailand", image: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=600&q=80", price: 28000, rating: 4.6, duration: "6 Days", category: "Asia", description: "Golden temples, street food paradise, and turquoise island beaches." },
  { id: 12, name: "London, UK", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80", price: 80000, rating: 4.7, duration: "7 Days", category: "Europe", description: "Big Ben, Buckingham Palace, and the world's most diverse cultural scene." },
];

// Available filter categories
const categories = ["All", "Asia", "Europe", "America", "Middle East", "India"];

const Destinations = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Filter destinations by category AND search term
  const filtered = allDestinations.filter((d) => {
    const matchCategory = activeCategory === "All" || d.category === activeCategory;
    const matchSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Navigate to booking page with pre-filled destination and price
  const handleBook = (dest) => {
    navigate("/booking", { state: { destination: dest.name, price: dest.price } });
  };

  return (
    <div className="page-wrapper">
      <div className="container">

        {/* ── Header ────────────────────────────────────── */}
        <div className="text-center mb-5">
          <h1 className="section-title">All Destinations</h1>
          <p className="text-muted">Discover your perfect travel destination from our curated list</p>
        </div>

        {/* ── Search Bar ────────────────────────────────── */}
        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-primary text-white border-0">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ── Category Filter Buttons ────────────────────── */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn rounded-pill px-4 ${activeCategory === cat ? "btn-primary" : "btn-outline-primary"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Results Count ─────────────────────────────── */}
        <p className="text-muted mb-3">
          Showing <strong>{filtered.length}</strong> destinations
        </p>

        {/* ── Destination Cards Grid ────────────────────── */}
        <div className="row g-4">
          {filtered.length === 0 ? (
            <div className="col-12 text-center py-5">
              <i className="bi bi-search text-muted" style={{ fontSize: "3rem" }}></i>
              <p className="text-muted mt-3">No destinations found. Try a different search.</p>
            </div>
          ) : (
            filtered.map((dest) => (
              <div key={dest.id} className="col-md-6 col-lg-4">
                <div className="card destination-card h-100 shadow-sm">
                  <img src={dest.image} className="card-img-top" alt={dest.name} />
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title fw-bold mb-0">{dest.name}</h5>
                      <span className="badge bg-primary">{dest.category}</span>
                    </div>
                    <p className="text-muted small">{dest.description}</p>
                    <div className="d-flex justify-content-between text-muted small mb-3">
                      <span><i className="bi bi-star-fill text-warning me-1"></i>{dest.rating}</span>
                      <span><i className="bi bi-clock me-1"></i>{dest.duration}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="fw-bold text-primary fs-5">₹{dest.price.toLocaleString()}</div>
                      <button
                        className="btn btn-primary btn-sm rounded-pill px-3"
                        onClick={() => handleBook(dest)}
                      >
                        <i className="bi bi-calendar-check me-1"></i>Book
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
