// ============================================================
// controllers/bookingController.js
// FIXED: email variable properly passed to sendEmail functions
// ============================================================

const Booking = require("../models/Booking");
const { sendBookingConfirmationEmail, sendCancellationEmail } = require("../utils/sendEmail");

// ── Create Booking ───────────────────────────────────────────
// POST /api/bookings
const createBooking = async (req, res) => {
  try {
    // FIXED: destructure ALL fields including email clearly
    const { name, email, destination, date, persons, price } = req.body;

    // Check email exists before proceeding
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Create booking in MongoDB
    const booking = await Booking.create({
      userId: req.user._id,
      name,
      email,
      destination,
      date,
      persons,
      price,
      status: "Confirmed",
    });

    // Send confirmation email
    try {
      await sendBookingConfirmationEmail(booking.email, {
        name: booking.name,
        destination: booking.destination,
        date: booking.date,
        persons: booking.persons,
        price: booking.price,
        status: booking.status,
      });
      console.log("Confirmation email sent to:", booking.email);
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
    }

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Booking failed: " + error.message });
  }
};

// ── Get Bookings for Logged-in User ─────────────────────────
// GET /api/bookings/my
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings: " + error.message });
  }
};

// ── Get All Bookings Admin ───────────────────────────────────
// GET /api/bookings/all
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all bookings: " + error.message });
  }
};

// ── Delete Booking ───────────────────────────────────────────
// DELETE /api/bookings/:id
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // FIXED: Save all details from booking OBJECT before deleting
    const bookingName        = booking.name;
    const bookingEmail       = booking.email;
    const bookingDestination = booking.destination;

    // Delete the booking
    await booking.deleteOne();

    // Send cancellation email using saved details
    try {
      await sendCancellationEmail(bookingEmail, {
        name: bookingName,
        destination: bookingDestination,
      });
      console.log("Cancellation email sent to:", bookingEmail);
    } catch (emailError) {
      console.error("Cancellation email failed:", emailError.message);
    }

    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Cancel failed: " + error.message });
  }
};

module.exports = { createBooking, getMyBookings, getAllBookings, deleteBooking };