import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend);

function AddEmission() {

  const [data, setData] = useState({
    company: "",
    plant: "",
    month: "",
    electricity: "",
    diesel: "",
    coal: "",
    transport: ""
  });

  const [prediction, setPrediction] = useState(null);
  const [chartData, setChartData] = useState(null);

  const role = localStorage.getItem("role");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      // 1️⃣ Save emission data
      const res = await axios.post(
        "http://localhost:5000/api/emission/add",
        data,
        {
          headers: {
            Authorization: token
          }
        }
      );

      // 2️⃣ Prepare ML input
      const emissionsArray = [
        Number(data.electricity),
        Number(data.diesel),
        Number(data.coal),
        Number(data.transport)
      ];

      // 3️⃣ Call prediction API
      const predictionRes = await axios.post(
        "http://localhost:5000/api/predict",
        {
          emissions: emissionsArray
        }
      );

      const predictedValue = predictionRes.data.prediction;
      setPrediction(predictedValue);

      // 4️⃣ Prepare graph data
      setChartData({
        labels: ["Electricity", "Diesel", "Coal", "Transport", "Predicted"],
        datasets: [
          {
            label: "Emission Values",
            data: [...emissionsArray, predictedValue],
            borderColor: "#00e676",
            backgroundColor: "rgba(0,230,118,0.2)"
          }
        ]
      });

      alert("Emission Added!\nCredits: " + res.data.credits);

    } catch (err) {
      console.error(err);
      alert("Error adding emission or prediction failed");
    }
  };

  // 🔒 Role check
  if (role !== "manager") {
    return (
      <div style={{ backgroundColor: "#121212", minHeight: "100vh", color: "white" }}>
        <Navbar />
        <h2 style={{ padding: "50px" }}>Access Denied</h2>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#121212", minHeight: "100vh", color: "white" }}>
      <Navbar />

      <div className="container mt-5">

        <h2 style={{ color: "#00e676" }}>➕ Add Emission Data</h2>

        <div className="card dark-card p-4 mt-3">

          {Object.keys(data).map((key) => (
            <div key={key} className="mb-3">
              <label style={{ textTransform: "capitalize" }}>{key}</label>

              <input
                name={key}
                placeholder={`Enter ${key}`}
                value={data[key]}
                onChange={handleChange}
                className="form-control custom-input"
              />
            </div>
          ))}

          <button className="btn custom-btn mt-3" onClick={handleSubmit}>
            Submit
          </button>

          {/* 🔥 Prediction Box */}
          {prediction !== null && (
            <div className="alert alert-success mt-4">
              <strong>Predicted Next Emission:</strong> {prediction}
            </div>
          )}

          {/* 📊 Graph */}
          {chartData && (
            <div className="mt-4">
              <h5 style={{ color: "#00e676" }}>Emission Trend</h5>
              <Line data={chartData} />
            </div>
          )}

        </div>
      </div>

      {/* Styles */}
      <style>
        {`
          .dark-card {
            background: #1e1e1e;
            border-radius: 12px;
            box-shadow: 0 0 20px rgba(0,255,150,0.2);
          }

          .custom-input {
            background-color: #121212 !important;
            color: white !important;
            border: none !important;
          }

          .custom-input::placeholder {
            color: #bbb !important;
          }

          .custom-input:focus {
            outline: none !important;
            box-shadow: 0 0 5px #00e676 !important;
          }

          .custom-btn {
            background-color: #00e676;
            color: black;
            font-weight: bold;
          }

          .custom-btn:hover {
            background-color: #00c853;
          }
        `}
      </style>
    </div>
  );
}

export default AddEmission;