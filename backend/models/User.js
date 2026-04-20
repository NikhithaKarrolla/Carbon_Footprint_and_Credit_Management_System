// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true, // ✅ prevent duplicates
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      default: "google_auth", // ✅ for Google users
    },

    role: {
      type: String,
      enum: ["admin", "manager", "auditor"],
      default: "manager", // ✅ important
    },

    // ✅ Optional: store Google profile pic
    picture: {
      type: String,
    }
  },
  {
    timestamps: true // ✅ createdAt, updatedAt
  }
);

module.exports = mongoose.model("User", userSchema);