import React from "react";
import { Link } from "react-router-dom";
import bg from "./bg.jpg";

function Home() {
  return (
    <div style={{ backgroundColor: "#121212", color: "white" }}>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-black px-4">
        <h3 className="text-white">🌍 Carbon Tracker</h3>

        <div className="ms-auto">
          <Link to="/select-role" className="btn btn-outline-light me-2">
            Login
          </Link>
          <Link to="/select-role" className="btn btn-success">
            Signup
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <div
        style={{
          height: "90vh",
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative"
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.7)"
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
          }}
        >
          <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
            Carbon Footprint & Credit Management
          </h1>

          <p style={{ fontSize: "1.3rem", marginTop: "10px" }}>
            Track • Analyze • Predict • Reduce Emissions
          </p>

          <div className="mt-4">
            <Link to="/select-role" className="btn btn-light me-3">
              Get Started
            </Link>
            <a href="#about" className="btn btn-outline-light">
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div id="about" className="container mt-5 text-center">
        <h2>About Our Project</h2>
        <p className="mt-3 text-light">
          Our system helps industries monitor carbon emissions, manage carbon credits,
          and use AI predictions for sustainable decision-making.
        </p>
      </div>

      {/* FEATURES */}
      <div className="container mt-5">
        <h2 className="text-center">Key Features</h2>

        <div className="row mt-4 text-center">

          {[
            ["⚙️ Automated Calculation", "Automate carbon footprint calculation"],
            ["🤖 AI Prediction", "Predict future emissions using ML"],
            ["💰 Carbon Credits", "Estimate carbon credits"],
            ["📄 ESG Reports", "Generate compliance-ready reports"],
            ["📊 Role-Based Dashboard", "Admin, Manager & Auditor views"]
          ].map((item, i) => (
            <div className="col-md-4 mb-4" key={i}>
              <div className="feature-card">
                <h4>{item[0]}</h4>
                <p>{item[1]}</p>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* CONTACT */}
      <div className="container mt-5 text-center">
        <h2>Contact Us</h2>
        <p className="mt-3">Have questions? We'd love to help!</p>

        <div className="mt-3 text-light">
          <p><b>Email:</b> support@carbontracker.com</p>
          <p><b>Phone:</b> +91 9876543210</p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-black text-white text-center p-3 mt-5">
        © 2026 Carbon Tracker | All Rights Reserved
      </footer>

      {/* STYLES */}
      <style>
        {`
          .feature-card {
            background: #1e1e1e;
            padding: 25px;
            border-radius: 12px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.5);
          }

          .feature-card:hover {
            transform: translateY(-10px) scale(1.03);
            box-shadow: 0 8px 25px rgba(0,255,150,0.4);
            background: #252525;
          }

          h2 {
            color: #00e676;
          }
        `}
      </style>

    </div>
  );
}

export default Home;