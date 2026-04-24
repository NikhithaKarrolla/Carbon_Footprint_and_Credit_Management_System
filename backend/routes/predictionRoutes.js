const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/predict", async (req, res) => {
    try {
        const emissions = req.body.emissions;

        const response = await axios.post("http://127.0.0.1:5001/predict", {
            emissions: emissions
        });

        const prediction = response.data.prediction;

        // Carbon credit logic
        const LIMIT = 5000;

        let status = "";
        let credits = 0;

        if (prediction < LIMIT) {
            status = "Carbon Positive ✅";
            credits = LIMIT - prediction;
        } else {
            status = "Carbon Negative ❌";
            credits = prediction - LIMIT;
        }

        res.json({
            prediction,
            status,
            credits
        });

    } catch (error) {
        res.status(500).json({
            error: "AI service error",
            details: error.message
        });
    }
});

module.exports = router;