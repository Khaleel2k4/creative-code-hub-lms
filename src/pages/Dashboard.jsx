import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: localStorage.getItem("username") || "User",
    role: localStorage.getItem("userRole") || "student"
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const userRole = localStorage.getItem("userRole");
    
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      // Update user state with stored values
      setUser({
        username: localStorage.getItem("username") || "User",
        role: userRole || "student"
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear all user data from localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <div className="dash-card">
        <h1>
          {user.role === "team" ? "Team Dashboard" : "Student Dashboard"}
        </h1>
        <p>Welcome, {user.username} 👋</p>
        <button className="btn logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}