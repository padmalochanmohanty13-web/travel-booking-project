// ============================================================
// components/DestinationCards.jsx - Destination Cards Grid
// Displays popular travel destinations with price and rating
// ============================================================

import React from "react";
import { useNavigate } from "react-router-dom";

// Array of destination data shown as cards
const destinations = [
  {
    id: 1,
    name: "Paris, France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
    price: 45000,
    rating: 4.8,
    duration: "7 Days",
    tag: "Popular",
  },
  {
    id: 2,
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
    price: 32000,
    rating: 4.7,
    duration: "6 Days",
    tag: "Trending",
  },
  {
    id: 3,
    name: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80",
    price: 75000,
    rating: 4.9,
    duration: "5 Days",
    tag: "Luxury",
  },
  {
    id: 4,
    name: "Switzerland",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    price: 90000,
    rating: 4.8,
    duration: "8 Days",
    tag: "Adventure",
  },
  {
    id: 5,
    name: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
    price: 55000,
    rating: 4.7,
    duration: "7 Days",
    tag: "Cultural",
  },
  {
    id: 6,
    name: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    price: 60000,
    rating: 4.6,
    duration: "5 Days",
    tag: "Shopping",
  },
];

// Map tag names to Bootstrap badge colors
const tagColors = {
  Popular: "primary",
  Trending: "success",
  Luxury: "warning",
  Adventure: "danger",
  Cultural: "info",
  Shopping: "secondary",
};

const DestinationCards = () => {
  const navigate = useNavigate();

  // When user clicks "Book Now", go to booking page with destination pre-filled
  const handleBook = (destName, price) => {
    navigate("/booking", { state: { destination: destName, price } });
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="section-title">Popular Destinations</h2>
          <p className="text-muted">Explore the world's most beautiful places</p>
        </div>

        {/* Cards Grid - 3 per row on large screens */}
        <div className="row g-4">
          {destinations.map((dest) => (
            <div key={dest.id} className="col-lg-4 col-md-6">
              <div className="card destination-card h-100 shadow-sm">
                {/* Destination Image */}
                <div className="position-relative">
                  <img src={dest.image} className="card-img-top" alt={dest.name} />
                  {/* Badge tag overlay on image */}
                  <span className={`badge bg-${tagColors[dest.tag]} position-absolute top-0 end-0 m-2`}>
                    {dest.tag}
                  </span>
                </div>

                <div className="card-body">
                  {/* Destination name */}
                  <h5 className="card-title fw-bold">
                    <i className="bi bi-geo-alt-fill text-primary me-1"></i>
                    {dest.name}
                  </h5>

                  {/* Rating and Duration */}
                  <div className="d-flex justify-content-between text-muted mb-3">
                    <span>
                      <i className="bi bi-star-fill text-warning me-1"></i>
                      {dest.rating} Rating
                    </span>
                    <span>
                      <i className="bi bi-clock me-1"></i>
                      {dest.duration}
                    </span>
                  </div>

                  {/* Price and Book Button */}
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="text-muted small">Starting from</span>
                      <div className="fw-bold fs-5 text-primary">
                        ₹{dest.price.toLocaleString()}
                      </div>
                    </div>
                    <button
                      className="btn btn-primary btn-sm rounded-pill px-3"
                      onClick={() => handleBook(dest.name, dest.price)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationCards;
