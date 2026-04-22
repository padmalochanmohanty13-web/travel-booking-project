// ============================================================
// components/Slider.jsx - Image Carousel Slider for Home Page
// Uses Bootstrap 5 Carousel with travel destination images
// ============================================================

import React from "react";

// Slide data - each object has image URL, title, and subtitle
const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    title: "Explore the Alps",
    subtitle: "Breathtaking mountain adventures await you",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
    title: "Discover Dubai",
    subtitle: "Experience luxury and modern marvels",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80",
    title: "Beautiful Japan",
    subtitle: "Culture, tradition, and natural beauty",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=80",
    title: "Incredible India",
    subtitle: "Timeless heritage and vibrant culture",
  },
];

const Slider = () => {
  return (
    // Bootstrap Carousel component
    <div id="travelCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3500">
      {/* Slide indicators (dots at bottom) */}
      <div className="carousel-indicators">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            data-bs-target="#travelCarousel"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
          ></button>
        ))}
      </div>

      {/* Slides */}
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div key={slide.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <img src={slide.image} className="d-block w-100" alt={slide.title} />
            {/* Overlay text on each slide */}
            <div className="carousel-caption d-none d-md-block">
              <h2 className="display-5 fw-bold">{slide.title}</h2>
              <p className="fs-5">{slide.subtitle}</p>
              <a href="/booking" className="btn btn-primary btn-lg mt-2 rounded-pill px-4">
                Book Now <i className="bi bi-arrow-right ms-1"></i>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Previous and Next Buttons */}
      <button className="carousel-control-prev" type="button" data-bs-target="#travelCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#travelCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
};

export default Slider;
