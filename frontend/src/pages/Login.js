import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");

  const handleGoogleLogin = async (credentialResponse) => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/google", {
      token: credentialResponse.credential,
      role // send role also
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.user.role);

    alert("Google Login Successful!");
    window.location.href = "/dashboard";

  } catch (err) {
    console.error(err);
    alert("Google login failed");
  }
};

  // ✅ GET ROLE FROM SELECT PAGE
  useEffect(() => {
    const selectedRole = localStorage.getItem("selectedRole");
    if (selectedRole) setRole(selectedRole);
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      alert("Login Successful!");
      window.location.href = "/dashboard";

    } catch (err) {
      alert(err.response?.data?.msg || "Invalid credentials");
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
          Role: <b style={{ color: "#00e676" }}>{role}</b>
        </p>

        {/* Email */}
        <div className="input-group mb-3">
          <span className="input-group-text bg-dark text-white border-0">
            <FaUser />
          </span>
          <input
            type="email"
            className="form-control custom-input"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="btn w-100"
          onClick={handleLogin}
          disabled={loading}
          style={{
            backgroundColor: "#00e676",
            color: "black",
            fontWeight: "bold"
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center mt-3">
  <p style={{ color: "#aaa" }}>OR</p>

  <GoogleLogin
    onSuccess={handleGoogleLogin}
    onError={() => console.log("Google Login Failed")}
  />
</div>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <a href="/signup" style={{ color: "#00e676" }}>
            Signup
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

export default Login;