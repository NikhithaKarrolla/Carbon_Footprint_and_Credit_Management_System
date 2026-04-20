// models/Emission.js
const mongoose = require("mongoose");

const emissionSchema = new mongoose.Schema({
  company: String,
  plant: String,
  month: String,

  electricity: Number,
  diesel: Number,
  coal: Number,
  transport: Number,

  totalEmission: Number,
  creditStatus: String,
  credits: Number
});

module.exports = mongoose.model("Emission", emissionSchema);