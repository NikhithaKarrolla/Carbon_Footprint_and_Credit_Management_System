import React from "react";

function Navbar() {
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");
  const picture = localStorage.getItem("picture");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div
      style={{
        background: "#1e1e1e",
        padding: "12px 25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        boxShadow: "0 2px 10px rgba(0,255,150,0.2)"
      }}
    >
      {/* Logo */}
      <h4 style={{ color: "#00e676", margin: 0 }}>
        🌍 Carbon Tracker
      </h4>

      {/* Navigation */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        
        <a href="/dashboard" style={linkStyle}>
          Dashboard
        </a>

        <a href="/add" style={linkStyle}>
          Add Data
        </a>

        {/* Role Badge */}
        <span
          style={{
            background: "#00e676",
            color: "#000",
            padding: "3px 8px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: "bold"
          }}
        >
          {role}
        </span>

        {/* Profile Image */}
        {picture && (
          <img
            src={picture}
            alt="profile"
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              border: "2px solid #00e676"
            }}
          />
        )}

        {/* Name */}
        <span>{name}</span>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            background: "#00e676",
            border: "none",
            padding: "6px 12px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "500"
};

export default Navbar;