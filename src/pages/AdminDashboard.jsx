import React, { useState } from "react";
import "../AdminDashboard.css";

const menuItems = [
  { label: "Dashboard", key: "dashboard" },
  { label: "Create Users", key: "create-users" },
  { label: "Create Classes", key: "create-classes" },
  { label: "Create Courses", key: "create-courses" },
  { label: "Create Announcement", key: "create-announcement" },
  { label: "Analysts", key: "analysts" },
  { label: "Logout", key: "logout" },
];

function Sidebar({ onMenuClick }) {
  return (
    <div className="admin-sidebar">
      <div className="sidebar-logo">
        <img src={process.env.PUBLIC_URL + "/logo192.png"} alt="CCHub Logo" />
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.key} onClick={() => onMenuClick(item.key)}>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Navbar({ username, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <nav className="admin-navbar">
      <div className="navbar-left">
        <img src={process.env.PUBLIC_URL + "/logo192.png"} alt="CCHub Logo" className="navbar-logo" />
      </div>
      <div className="navbar-right">
        <div className="profile" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <span className="profile-icon">👤</span>
          <span className="profile-name">{username}</span>
          <span className="dropdown-arrow">▼</span>
          {dropdownOpen && (
            <div className="profile-dropdown">
              <button onClick={onLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const username = localStorage.getItem("username") || "Admin";

  const handleMenuClick = (key) => {
    if (key === "logout") {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userRole");
      localStorage.removeItem("username");
      window.location.href = "/login/team";
    } else {
      setActiveMenu(key);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    window.location.href = "/login/team";
  };

  return (
    <div className="admin-dashboard-container">
      <Navbar username={username} onLogout={handleLogout} />
      <div className="admin-dashboard-main">
        <Sidebar onMenuClick={handleMenuClick} />
        <div className="admin-dashboard-content">
          {activeMenu === "dashboard" && <h2>Admin Dashboard</h2>}
          {activeMenu === "create-users" && <h2>Create Users</h2>}
          {activeMenu === "create-classes" && <h2>Create Classes</h2>}
          {activeMenu === "create-courses" && <h2>Create Courses</h2>}
          {activeMenu === "create-announcement" && <h2>Create Announcement</h2>}
          {activeMenu === "analysts" && <h2>Analysts</h2>}
        </div>
      </div>
    </div>
  );
}
