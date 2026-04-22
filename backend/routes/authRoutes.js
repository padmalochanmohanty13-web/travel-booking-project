// ============================================================
// routes/authRoutes.js - Authentication API Routes
// Defines endpoints for user register and login
// ============================================================

const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

// POST /api/auth/register → Create new account
router.post("/register", registerUser);

// POST /api/auth/login → Login and get JWT token
router.post("/login", loginUser);

module.exports = router;
