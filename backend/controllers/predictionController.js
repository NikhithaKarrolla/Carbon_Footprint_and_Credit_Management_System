const axios = require("axios");

exports.getPrediction = async (req, res) => {
  try {
    const { emissions } = req.body;

    const response = await axios.post("http://localhost:5001/predict", {
      emissions
    });

    res.json(response.data);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Prediction failed" });
  }
};