import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Dashboard() {
  const [data, setData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [prediction, setPrediction] = useState(null);
  const role = localStorage.getItem("role");

  useEffect(() => {
    axios.get("http://localhost:5000/api/emission/all")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const companies = [...new Set(data.map(item => item.company))];

  const filteredData = selectedCompany
    ? data.filter(item => item.company === selectedCompany)
    : data;

  // 🤖 Prediction
  const getPrediction = async () => {
    try {
      const emissions = filteredData
        .map(d => Number(d.totalEmission))
        .filter(v => !isNaN(v));

      if (emissions.length < 2) {
        alert("Add at least 2 months data for prediction");
        return;
      }

      const res = await axios.post("http://localhost:5001/predict", {
        emissions
      });

      setPrediction(res.data.prediction);

    } catch (err) {
      alert("Prediction failed");
    }
  };

  // 📄 PDF
  const downloadPDF = () => {
    const input = document.getElementById("report");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 180, 120);
      pdf.save("carbon_report.pdf");
    });
  };

  // GROUP DATA
  const groupedData = {};
  filteredData.forEach(item => {
    if (!groupedData[item.company]) {
      groupedData[item.company] = [];
    }
    groupedData[item.company].push(item);
  });

  return (
    <div style={{ backgroundColor: "#121212", minHeight: "100vh", color: "white" }}>
      <Navbar />

      <div className="container mt-4">

        <h2 style={{ color: "#00e676" }}>Dashboard ({role})</h2>

        {/* FILTER */}
        <select
          className="form-control custom-input mb-3"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          <option value="">All Companies</option>
          {companies.map((c, i) => (
            <option key={i}>{c}</option>
          ))}
        </select>

        {/* BUTTONS */}
        <div className="mb-3">
          <button className="btn custom-btn me-2" onClick={getPrediction}>
            🤖 Predict
          </button>

          <button className="btn custom-btn" onClick={downloadPDF}>
            📄 Download Report
          </button>
        </div>

        {/* PREDICTION */}
        {prediction && (
          <h5 style={{ color: "#00e676" }}>
            {selectedCompany || "All Companies"} → Predicted Next Emission: {prediction.toFixed(2)}
          </h5>
        )}

        <div id="report">

          {/* ADMIN */}
          {role === "admin" && (
            <>
              {/* CARDS */}
              <div className="row">
                {filteredData.map(item => (
                  <div className="col-md-4 mb-3" key={item._id}>
                    <div className="card dark-card">
                      <div className="card-body text-white">
                        <h5>{item.company}</h5>

                        <p><b>Month:</b> {item.month}</p>
                        <p><b>Total Emission:</b> {item.totalEmission}</p>
                        <p><b>Electricity:</b> {item.electricity}</p>
                        <p><b>Diesel:</b> {item.diesel}</p>
                        <p><b>Coal:</b> {item.coal}</p>
                        <p><b>Credits:</b> {item.credits}</p>
                        <p>
                <b>Status:</b>{" "}
                <span className={
                  item.creditStatus === "earned"
                    ? "text-success"
                    : "text-danger"
                }>
                  {item.creditStatus}
                </span>
              </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* COMPANY GRAPHS */}
              {Object.keys(groupedData).map((company, index) => (
                <div key={index} style={{ marginTop: "30px" }}>
                  <h4 style={{ color: "#00e676" }}>📊 {company}</h4>

                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={groupedData[company]}>
                      <CartesianGrid stroke="#444" />
                      <XAxis dataKey="month" stroke="#ccc" />
                      <YAxis stroke="#ccc" />
                      <Tooltip />
                      <Legend />
                      <Line dataKey="totalEmission" stroke="#00e676" />
                      <Line dataKey="electricity" stroke="#00bcd4" />
                      <Line dataKey="diesel" stroke="#ff9800" />
                      <Line dataKey="coal" stroke="#ff5252" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ))}

              {/* OVERALL GRAPH */}
              <h3 style={{ color: "#00e676", marginTop: "40px" }}>
                🌍 Overall Emission (All Companies)
              </h3>

              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data}>
                  <CartesianGrid stroke="#444" />
                  <XAxis dataKey="month" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Legend />
                  <Line dataKey="totalEmission" stroke="#00e676" strokeWidth={3} />
                  <Line dataKey="electricity" stroke="#00bcd4" />
                  <Line dataKey="diesel" stroke="#ff9800" />
                  <Line dataKey="coal" stroke="#ff5252" />
                </LineChart>
              </ResponsiveContainer>

              {/* CREDITS */}
              <h4 style={{ color: "#00e676", marginTop: "20px" }}>
                💰 Overall Credits Trend
              </h4>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid stroke="#444" />
                  <XAxis dataKey="month" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Legend />
                  <Line dataKey="credits" stroke="#00e676" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </>
          )}

          {/* MANAGER */}
        {role === "manager" && (
  <>
    {/* ADD BUTTON */}
    <a href="/add" className="btn custom-btn mb-3">
      ➕ Add Emission
    </a>

    {/* CARDS */}
    <div className="row">
      {filteredData.map(item => (
        <div key={item._id} className="col-md-4 mb-3">
          <div className="card dark-card">
            <div className="card-body text-white">

              <h5>{item.company}</h5>

              <p><b>Month:</b> {item.month}</p>

              <p><b>Total Emission:</b> {item.totalEmission}</p>

              <p><b>Electricity:</b> {item.electricity}</p>

              <p><b>Diesel:</b> {item.diesel}</p>

              <p><b>Coal:</b> {item.coal}</p>

              <p><b>Credits:</b> {item.credits}</p>

              

            </div>
          </div>
        </div>
      ))}
    </div>
  </>
)}

          {/* AUDITOR */}
          {role === "auditor" && (
  <>
    <div className="alert alert-dark">
      👁️ Read-only access (Audit View)
    </div>

    <div className="row">
      {filteredData.map(item => (
        <div key={item._id} className="col-md-4 mb-3">
          <div className="card dark-card">
            <div className="card-body text-white">

              <h5>{item.company}</h5>

              <p><b>Month:</b> {item.month}</p>
              <p><b>Total Emission:</b> {item.totalEmission}</p>
              <p><b>Credits:</b> {item.credits}</p>

              <p>
                <b>Status:</b>{" "}
                <span className={
                  item.creditStatus === "earned"
                    ? "text-success"
                    : "text-danger"
                }>
                  {item.creditStatus}
                </span>
              </p>

            </div>
          </div>
        </div>
      ))}
    </div>
  </>
)}

        </div>
      </div>

      {/* 🔥 STYLES */}
      <style>{`
        .dark-card {
          background: #1e1e1e !important;
          color: white !important;
          border-radius: 12px;
          transition: 0.3s;
        }

        .dark-card:hover {
          transform: scale(1.03);
          box-shadow: 0 0 20px rgba(0,255,150,0.4);
        }

        .custom-btn {
          background: #00e676;
          color: black;
          font-weight: bold;
        }

        .custom-btn:hover {
          background: #00c853;
        }

        .custom-input {
          background: #1e1e1e !important;
          color: white !important;
          border: none;
        }
      `}</style>

    </div>
  );
}

export default Dashboard;