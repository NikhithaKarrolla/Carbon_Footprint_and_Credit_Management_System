const express = require("express");
const router = express.Router();
const Emission = require("../models/Emission");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const calculateEmission = require("../utils/calculateEmission");
const calculateCredits = require("../utils/calculateCredits");

// ✅ ADD EMISSION (Manager only)
router.post("/add", auth, role("manager"), async (req, res) => {
  try {
    const data = req.body;

    // 🔹 Step 1: Calculate CO2
    const totalEmission = calculateEmission(data);

    // 🔹 Step 2: Calculate Carbon Credits
    const creditInfo = calculateCredits(totalEmission);

    // 🔹 Step 3: Save in DB
    const emission = await Emission.create({
      ...data,
      totalEmission,
      creditStatus: creditInfo.status,
      credits: creditInfo.credits
    });

    res.json(emission);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ GET ALL EMISSIONS (for dashboard)
router.get("/all", async (req, res) => {
  try {
    const data = await Emission.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ OPTIONAL: GET BY COMPANY (extra feature 💯)
router.get("/company/:name", async (req, res) => {
  try {
    const data = await Emission.find({ company: req.params.name });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;