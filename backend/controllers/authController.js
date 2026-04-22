// ============================================================
// controllers/authController.js - Authentication Logic
// Handles user registration and login operations
// ============================================================

const User = require("../models/User");
const jwt = require("jsonwebtoken");

// ── Generate JWT Token ───────────────────────────────────────
// Creates a token with user's ID that expires in 7 days
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ── Register User ────────────────────────────────────────────
// POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Create new user (password will be hashed automatically by model hook)
    const user = await User.create({ name, email, password, role: role || "user" });

    // Return user info and token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id), // JWT token for authentication
    });
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

// ── Login User ───────────────────────────────────────────────
// POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

module.exports = { registerUser, loginUser };
