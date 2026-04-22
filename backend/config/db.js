// ============================================================
// config/db.js - MongoDB Connection Setup
// Uses Mongoose to connect to MongoDB Atlas or Local MongoDB
// ============================================================

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If connection fails, print error and stop the server
    console.error(`❌ MongoDB Error: ${error.message}`);
    process.exit(1); // Exit with failure code
  }
};

module.exports = connectDB;
