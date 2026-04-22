// ============================================================
// models/Booking.js - Mongoose Schema for Booking
// Defines the structure of booking documents in MongoDB
// ============================================================

const mongoose = require("mongoose");

// Define Booking Schema
const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User document
      ref: "User", // Links to the User model
      required: true,
    },
    name: {
      type: String,
      required: [true, "Traveler name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    destination: {
      type: String,
      required: [true, "Destination is required"],
    },
    date: {
      type: String, // Stored as string for simplicity (e.g., "2024-12-25")
      required: [true, "Travel date is required"],
    },
    persons: {
      type: Number,
      required: [true, "Number of persons is required"],
      min: 1,
      max: 20,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"], // Allowed status values
      default: "Confirmed", // New bookings are auto-confirmed
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Export the Booking model
module.exports = mongoose.model("Booking", bookingSchema);
