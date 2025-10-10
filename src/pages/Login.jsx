import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Login() {
  const { role } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    
    // Check email domain for student login
    if (role === 'student' && !username.endsWith('@student.cchub.in')) {
      setError("Please use your student email (@student.cchub.in) to login");
      return;
    }

    // Check email domain for team login (mentor or admin)
    if (role === 'team' && !username.endsWith('@mentor.cchub.in') && username !== 'admin@cchub.in') {
      setError("Please use your mentor email (@mentor.cchub.in) or admin credentials");
      return;
    }

    // For demo purposes - replace this with actual API call in production
    if (username === 'admin@cchub.in' && password === 'Admin@123') {
      // Admin login
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", username);
      navigate("/admin-dashboard");
      return;
    } else if (username.endsWith('@mentor.cchub.in') && password === 'Mentor@123') {
      // Mentor login
      localStorage.setItem("userRole", "mentor");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", username);
      navigate("/mentors-dashboard");
      return;
    } else if (username.endsWith('@student.cchub.in') && password === 'Student@123') {
      // Student login
      localStorage.setItem("userRole", "student");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", username);
      navigate("/student-dashboard");
      return;
    } else {
      setError("Invalid credentials. Please try again.");
      return;
    }
  };

  const handleForgot = () => {
    alert("Password reset link has been sent to your email.");
  };

  return (
    <div className={`login-container ${role}`}>
      <div className="login-card">
        <h2>{role === "team" ? "Team Login" : "Student Login"}</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
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