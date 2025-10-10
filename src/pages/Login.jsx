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

  const handleLogin = (e) => {
    e.preventDefault();
    if (valid) {
      localStorage.setItem("cchub_user", JSON.stringify({ username, role }));
      navigate("/dashboard");
    } else {
      setError("Invalid credentials! (Demo: admin/adminpass or student/studentpass)");
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
          Forgot Password?
        </button>
      </div>
    </div>
  );
}