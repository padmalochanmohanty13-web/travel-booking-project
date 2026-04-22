// ============================================================
// models/User.js - Mongoose Schema for User
// Defines the structure of user documents in MongoDB
// ============================================================

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define User Schema (blueprint for user documents in MongoDB)
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"], // Validation message
      trim: true, // Remove extra spaces
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // No two users can have the same email
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Only these two values allowed
      default: "user", // Default role is regular user
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// ── Pre-save Hook ────────────────────────────────────────────
// Before saving a user, hash the password for security
userSchema.pre("save", async function (next) {
  // Only hash if password was modified (avoid double hashing)
  if (!this.isModified("password")) return next();

  // Generate salt (random data to make hash unique)
  const salt = await bcrypt.genSalt(10);

  // Replace plain password with hashed version
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ── Method to Compare Passwords ─────────────────────────────
// Used during login to check if entered password matches stored hash
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model
module.exports = mongoose.model("User", userSchema);
