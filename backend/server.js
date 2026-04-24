// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // ✅ Load .env variables

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

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