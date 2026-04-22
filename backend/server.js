// ============================================================
// server.js - Main Entry Point for Travel Booking Backend
// This file starts the Express server and connects all parts
// ============================================================

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

// Initialize Express app
const app = express();

// ── Middleware ──────────────────────────────────────────────
// Allow cross-origin requests from React frontend (port 3000)
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// ── Routes ─────────────────────────────────────────────────
// Authentication routes: /api/auth/register, /api/auth/login
app.use("/api/auth", require("./routes/authRoutes"));

// Booking routes: /api/bookings
app.use("/api/bookings", require("./routes/bookingRoutes"));

// ── Default Route ───────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "Travel Booking API is running!" });
});

// ── Start Server ────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
