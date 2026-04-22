// ============================================================
// routes/bookingRoutes.js - Booking API Routes
// All routes are protected - user must be logged in (JWT)
// ============================================================

const express = require("express");
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  deleteBooking,
} = require("../controllers/bookingController");

// ── JWT Authentication Middleware ────────────────────────────
// This runs before every booking route to verify the token
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header has Bearer token
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract token from "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];

      // Verify token using secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info to request (excluding password)
      req.user = await User.findById(decoded.id).select("-password");
      next(); // Continue to route handler
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// ── Admin Check Middleware ───────────────────────────────────
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};

// ── Route Definitions ────────────────────────────────────────

// POST /api/bookings → Create a new booking (logged-in users only)
router.post("/", protect, createBooking);

// GET /api/bookings/my → Get bookings for the logged-in user
router.get("/my", protect, getMyBookings);

// GET /api/bookings/all → Get all bookings (admin only)
router.get("/all", protect, adminOnly, getAllBookings);

// DELETE /api/bookings/:id → Delete a booking by ID
router.delete("/:id", protect, deleteBooking);

module.exports = router;
