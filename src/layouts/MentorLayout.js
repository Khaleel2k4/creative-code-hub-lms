import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import '../styles/MentorDashboard.css';

const MentorLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      navigate('/');
    }
  };

  const notifications = [
    { id: 1, title: 'New Student Enrolled', message: 'John Doe joined Web Development course', time: '5 min ago', unread: true },
    { id: 2, title: 'Assignment Submitted', message: 'Sarah completed React Fundamentals assignment', time: '1 hour ago', unread: true },
    { id: 3, title: 'Course Updated', message: 'JavaScript Advanced course has been updated', time: '2 hours ago', unread: true },
    { id: 4, title: 'Meeting Reminder', message: 'Team meeting scheduled at 3:00 PM', time: '3 hours ago', unread: false },
    { id: 5, title: 'System Update', message: 'Platform maintenance scheduled for tonight', time: '1 day ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const menuItems = [
    { path: '/mentor/details', label: 'Mentor Details', icon: '👨‍🏫' },
    { path: '/mentor/students', label: 'Student Report', icon: '👥' },
    { path: '/mentor/courses', label: 'Course List', icon: '📚' },
    { path: '/mentor/assessment', label: 'Assessment', icon: '📝' },
    { path: '/mentor/practice', label: 'Practice', icon: '💻' },
    { path: '/mentor/editor', label: 'Editor', icon: '⚙️' },
    { path: '/mentor/report', label: 'Report', icon: '📈' },
    { path: '/mentor/feedback', label: 'Feedback', icon: '💬' },
  ];

  return (
    <div className="mentor-dashboard-layout">
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={2} className="p-0">
            <div className="mentor-sidebar">
              {/* Sidebar Header */}
              <div className="mentor-sidebar-header">
                <div className="mentor-sidebar-logo">C</div>
                <h5 className="mentor-sidebar-title">CCHub</h5>
              </div>

              {/* Sidebar Navigation */}
              <div className="mentor-sidebar-section">
                <div className="mentor-sidebar-section-title">Mentor Dashboard</div>
                <ul className="mentor-sidebar-nav">
                  {menuItems.map((item) => (
                    <li key={item.path} className="mentor-sidebar-nav-item">
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `mentor-sidebar-nav-link ${isActive ? 'active' : ''}`
                        }
                      >
                        <span className="mentor-sidebar-nav-icon">{item.icon}</span>
                        <span>{item.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Logout Button */}
              <div className="mentor-sidebar-logout">
                <button className="mentor-logout-btn" onClick={handleLogout}>
                  <span>🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </Col>

          {/* Main Content Area */}
          <Col md={10} className="p-0">
            {/* Top Navbar */}
            <div className="mentor-top-navbar">
              <div>
                <h1 className="mentor-navbar-title">
                  Dashboard Overview
                </h1>
                <p className="mentor-navbar-subtitle">
                  {location.pathname === '/mentor/details' 
                    ? 'View and manage your mentor profile information' 
                    : "Here's what's happening with your platform today"}
                </p>
              </div>
              <div className="mentor-navbar-actions">
                {/* Notification Bell with Dropdown */}
                <div style={{ position: 'relative' }}>
                  <button 
                    className="mentor-navbar-icon-btn"
                    onClick={() => {
                      setShowNotifications(!showNotifications);
                      setShowProfileMenu(false);
                    }}
                  >
                    <span>🔔</span>
                    {unreadCount > 0 && (
                      <span className="mentor-navbar-badge">{unreadCount}</span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="mentor-dropdown-menu mentor-notifications-dropdown">
                      <div className="mentor-dropdown-header">
                        <h6>Notifications</h6>
                        <span className="mentor-badge info">{unreadCount} New</span>
                      </div>
                      <div className="mentor-notifications-list">
                        {notifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`mentor-notification-item ${notification.unread ? 'unread' : ''}`}
                          >
                            <div className="mentor-notification-content">
                              <div className="mentor-notification-title">{notification.title}</div>
                              <div className="mentor-notification-message">{notification.message}</div>
                              <div className="mentor-notification-time">{notification.time}</div>
                            </div>
                            {notification.unread && <div className="mentor-notification-dot"></div>}
                          </div>
                        ))}
                      </div>
                      <div className="mentor-dropdown-footer">
                        <button className="mentor-dropdown-footer-btn">View All Notifications</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Messages */}
                <button className="mentor-navbar-icon-btn">
                  <span>💬</span>
                </button>

                {/* Profile Dropdown */}
                <div style={{ position: 'relative' }}>
                  <div 
                    className="mentor-navbar-profile"
                    onClick={() => {
                      setShowProfileMenu(!showProfileMenu);
                      setShowNotifications(false);
                    }}
                  >
                    <div className="mentor-navbar-avatar">M</div>
                    <span className="mentor-navbar-profile-name">Mentor</span>
                    <span style={{ fontSize: '12px', marginLeft: '4px' }}>▼</span>
                  </div>

                  {/* Profile Dropdown Menu */}
                  {showProfileMenu && (
                    <div className="mentor-dropdown-menu mentor-profile-dropdown">
                      <div className="mentor-dropdown-profile-info">
                        <div className="mentor-navbar-avatar" style={{ width: '48px', height: '48px', fontSize: '20px' }}>M</div>
                        <div>
                          <div className="mentor-dropdown-profile-name">Mentor Dashboard</div>
                          <div className="mentor-dropdown-profile-email">mentor@cchub.com</div>
                        </div>
                      </div>
                      <div className="mentor-dropdown-divider"></div>
                      <button className="mentor-dropdown-item">
                        <span>👤</span>
                        <span>My Profile</span>
                      </button>
                      <button className="mentor-dropdown-item">
                        <span>⚙️</span>
                        <span>Settings</span>
                      </button>
                      <button className="mentor-dropdown-item">
                        <span>❓</span>
                        <span>Help & Support</span>
                      </button>
                      <div className="mentor-dropdown-divider"></div>
                      <button className="mentor-dropdown-item mentor-dropdown-logout" onClick={handleLogout}>
                        <span>🚪</span>
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="mentor-main-content">
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MentorLayout;