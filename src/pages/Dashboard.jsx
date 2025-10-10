import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("cchub_user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("cchub_user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="dashboard">
      <div className="dash-card">
        <h1>
          {user.role === "team" ? "Team Dashboard" : "Student Dashboard"}
        </h1>
        <p>Welcome, {user.username} 👋</p>
        <button className="btn logout" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}