import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";

const API_BASE_URL = "https://carbon-footprint-and-credit-management.onrender.com";

function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "manager"
  });


  const handleGoogleSignup = async (credentialResponse) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/auth/google`, {
      token: credentialResponse.credential,
      role: data.role
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.user.role);
    localStorage.setItem("name", res.data.user.name);
    localStorage.setItem("picture", res.data.user.picture);

    alert("Google Signup Successful!");
    window.location.href = "/dashboard";

  } catch (err) {
    console.error(err);
    alert("Google signup failed");
  }
};

  const [loading, setLoading] = useState(false);

  // ✅ AUTO SET ROLE FROM SELECT PAGE
  useEffect(() => {
    const selectedRole = localStorage.getItem("selectedRole");
    if (selectedRole) {
      setData(prev => ({ ...prev, role: selectedRole }));
    }
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    const { name, email, password } = data;

    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API_BASE_URL}/api/auth/register`, data);

      alert("Signup successful!");
      window.location.href = "/login";

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#121212" }}
    >
      <div className="card p-4"
        style={{
          width: "360px",
          borderRadius: "15px",
          backgroundColor: "#1e1e1e",
          color: "white",
          boxShadow: "0 0 20px rgba(0,255,150,0.2)"
        }}
      >
        <h3 className="text-center mb-2" style={{ color: "#00e676" }}>
          🌍 Carbon Tracker
        </h3>

        {/* 🔥 ROLE DISPLAY */}
        <p className="text-center mb-3">
          Role: <b style={{ color: "#00e676" }}>{data.role}</b>
        </p>

        {/* Name */}
        <div className="input-group mb-3">
          <span className="input-group-text bg-dark text-white border-0">
            <FaUser />
          </span>
          <input
            className="form-control custom-input"
            name="name"
            placeholder="Enter Name"
            value={data.name}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="input-group mb-3">
          <span className="input-group-text bg-dark text-white border-0">
            <FaEnvelope />
          </span>
          <input
            className="form-control custom-input"
            name="email"
            placeholder="Enter Email"
            value={data.email}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="input-group mb-3">
          <span className="input-group-text bg-dark text-white border-0">
            <FaLock />
          </span>
          <input
            type="password"
            className="form-control custom-input"
            name="password"
            placeholder="Enter Password"
            value={data.password}
            onChange={handleChange}
          />
        </div>

        {/* Button */}
        <button
          className="btn w-100"
          onClick={handleSignup}
          disabled={loading}
          style={{
            backgroundColor: "#00e676",
            color: "black",
            fontWeight: "bold"
          }}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>

        <div className="text-center mt-3">
  <p style={{ color: "#aaa" }}>OR</p>

  <GoogleLogin
    onSuccess={handleGoogleSignup}
    onError={() => console.log("Google Signup Failed")}
  />
</div>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <a href="/login" style={{ color: "#00e676" }}>
            Login
          </a>
        </p>
      </div>

      <style>{`
        .custom-input {
          background-color: #121212 !important;
          color: white !important;
          border: none !important;
        }
        .custom-input::placeholder {
          color: #bbbbbb !important;
        }
        .custom-input:focus {
          box-shadow: 0 0 5px #00e676 !important;
        }
      `}</style>
    </div>
  );
}

export default Signup;