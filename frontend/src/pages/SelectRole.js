import React from "react";
import { FaUserTie, FaUserCog, FaUserCheck } from "react-icons/fa";

function SelectRole() {

  const handleSelect = (role) => {
    localStorage.setItem("selectedRole", role);
    window.location.href = "/login";
  };

  return (
    <div className="main-container">

      <h2 className="title">Select Your Role</h2>

      <div className="card-container">

        {/* ADMIN */}
        <div className="role-card" onClick={() => handleSelect("admin")}>
          <FaUserCog className="icon" />
          <h4>Admin</h4>
          <p>Full access & analytics</p>
        </div>

        {/* MANAGER */}
        <div className="role-card" onClick={() => handleSelect("manager")}>
          <FaUserTie className="icon" />
          <h4>Manager</h4>
          <p>Manage emissions & data</p>
        </div>

        {/* AUDITOR */}
        <div className="role-card" onClick={() => handleSelect("auditor")}>
          <FaUserCheck className="icon" />
          <h4>Auditor</h4>
          <p>View reports & compliance</p>
        </div>

      </div>

      {/* STYLES */}
      <style>
        {`
          .main-container {
            background: #121212;
            height: 100vh;
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .title {
            color: #00e676;
            margin-bottom: 40px;
          }

          .card-container {
            display: flex;
            gap: 30px;
            flex-wrap: wrap;
            justify-content: center;
          }

          .role-card {
            background: #1e1e1e;
            padding: 30px;
            width: 220px;
            border-radius: 15px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 0 15px rgba(0,255,150,0.1);
          }

          .role-card:hover {
            transform: translateY(-10px) scale(1.05);
            box-shadow: 0 0 25px rgba(0,255,150,0.5);
            background: #252525;
          }

          .icon {
            font-size: 40px;
            margin-bottom: 15px;
            color: #00e676;
          }

          .role-card h4 {
            margin-bottom: 10px;
          }

          .role-card p {
            font-size: 14px;
            color: #bbb;
          }
        `}
      </style>

    </div>
  );
}

export default SelectRole;