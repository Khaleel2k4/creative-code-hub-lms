import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Login() {
  const { role } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const valid =
    (role === "team" && username === "admin" && password === "adminpass") ||
    (role === "student" && username === "student" && password === "studentpass");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          role,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store user data in localStorage or context/state management
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("isAuthenticated", "true");

        // Redirect based on role
        if (data.role === "team") {
          navigate("/dashboard");
        } else {
          navigate("/student-dashboard");
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", err);
    }
  };


  const handleForgot = () => {
    alert("Password reset link (demo only).");
  };

  return (
    <div className={`login-container ${role}`}>
      <div className="login-card">
        <h2>{role === "team" ? "Team Login" : "Student Login"}</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn primary" type="submit">
            Login
          </button>
        </form>

        <button className="forgot" onClick={handleForgot}>
          Request Password Reset
        </button>
      </div>
    </div>
  );

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    navigate("/login");
  };
}