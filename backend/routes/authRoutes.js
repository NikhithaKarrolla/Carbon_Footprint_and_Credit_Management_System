const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");

// Google Auth
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ==============================
// 🔐 Normal Auth Routes
// ==============================
router.post("/register", register);
router.post("/login", login);

// ==============================
// 🌐 Google Auth Route
// ==============================
router.post("/google", async (req, res) => {
  try {
    const { token, role } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token missing" });
    }

    // ✅ Verify token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { name, email, picture } = payload;

    if (!email) {
      return res.status(400).json({ message: "Invalid Google account" });
    }

    // ✅ Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // ✅ Create new user
      user = await User.create({
        name,
        email,
        password: "google_auth",
        role: "manager",
        picture,
      });
    } else {
      // ✅ Update existing user (important)
      user.name = name;
      user.picture = picture;
      if (!user.role) user.role = role || "manager";

      await user.save();
    }

    // ✅ Generate JWT
    const authToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token: authToken,
      user,
    });

  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ message: "Google authentication failed", error: error.message });
  }
});

module.exports = router;