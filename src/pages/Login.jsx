import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import "../styles/Login.css";

export default function Login() {
  const { role } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - In a real app, this would be an API call
      const isAdmin = username === "admin" && password === "admin123";
      const isMentor = username === "mentor" && password === "mentor123";
      
      if (isAdmin) {
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("isAuthenticated", "true");
        navigate("/admin-dashboard");
      } else if (isMentor) {
        localStorage.setItem("userRole", "mentor");
        localStorage.setItem("isAuthenticated", "true");
        navigate("/mentor");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // In a real app, this would trigger a password reset flow
    alert("Password reset link will be sent to your email.");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Top-right switch button between Team/Student login when role is present */}
        {role === "team" && (
          <div className="login-switch">
            <button className="switch-button" onClick={() => navigate("/login/student")}>Student Login</button>
          </div>
        )}
        {role === "student" && (
          <div className="login-switch">
            <button className="switch-button" onClick={() => navigate("/login/team")}>Team Login</button>
          </div>
        )}

        <div className="login-header">
          <h2>Welcome Back!</h2>
          <p>Please sign in to your account</p>
        </div>

        {error && (
          <div className="error-message">
            <svg className="error-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="error-text">{error}</p>
          </div>
        )}

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                id="username"
                name="username"
                type="text"
                required
                placeholder="Username"
                aria-label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" id="remember-me" name="remember-me" />
              <span>Remember me</span>
            </label>
            <button type="button" className="forgot-password" onClick={handleForgotPassword}>
              Forgot your password?
            </button>
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? (
              <>
                <svg className="spinner" viewBox="0 0 24 24">
                  <circle className="spinner-circle" cx="12" cy="12" r="10" strokeWidth="4"></circle>
                  <path className="spinner-path" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}