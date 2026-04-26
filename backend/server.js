// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // ✅ Load .env variables

const app = express();
app.use(express.json()); // ✅ Parse JSON bodies

// ✅ CORS Configuration for deployed frontend
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:3000",
      "https://frontend-e1qs.onrender.com",
      "https://carbon-footprint-and-credit-management-6wqr.onrender.com",
      "https://carbon-footprint-and-credit-management.onrender.com"
    ];
    if (!origin || allowedOrigins.indexOf(origin) !== -1 || origin.endsWith(".onrender.com")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};
app.use(cors(corsOptions));

// ✅ Routes
const authRoutes = require("./routes/authRoutes");
const emissionRoutes = require("./routes/emissionRoutes");
const predictionRoutes = require("./routes/predictionRoutes");

;

app.use("/api/auth", authRoutes);
app.use("/api/emission", emissionRoutes);
app.use("/api/ai", predictionRoutes)

// ✅ MongoDB Connection using .env
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// ✅ Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});