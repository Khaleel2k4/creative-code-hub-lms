import React, { useState } from 'react';
import '../styles/StudentDetailsProfile.css';

// Student Details Profile Component for Student Dashboard
// Shows comprehensive student information including profile, courses, tests, activity, and achievements
const StudentDetailsProfile = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('all');

  // Mock student data
  const studentData = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    studentId: 'STU-2024-001',
    enrollmentId: 'ENR-24-CS-001',
    batch: 'Batch 2024-A',
    year: '3rd Year',
    joinedDate: 'Jan 15, 2024',
    status: 'Active',
    profilePhoto: null,
    totalHoursSpent: 156,
    lastActive: '2 hours ago',
    totalPoints: 2450
  };

  // Course enrollment data
  const enrolledCourses = [
    {
      id: 1,
      title: 'Web Development Fundamentals',
      instructor: 'Dr. Sarah Chen',
      startDate: 'Jan 20, 2024',
      endDate: 'Apr 20, 2024',
      progress: 78,
      status: 'ongoing',
      color: '#4f46e5'
    },
    {
      id: 2,
      title: 'Data Structures & Algorithms',
      instructor: 'Prof. Mike Johnson',
      startDate: 'Feb 1, 2024',
      endDate: 'May 1, 2024',
      progress: 65,
      status: 'ongoing',
      color: '#10b981'
    },
    {
      id: 3,
      title: 'Introduction to Python',
      instructor: 'Dr. Emily Davis',
      startDate: 'Dec 1, 2023',
      endDate: 'Feb 28, 2024',
      progress: 100,
      status: 'completed',
      color: '#059669'
    },
    {
      id: 4,
      title: 'Database Management Systems',
      instructor: 'Prof. Robert Taylor',
      startDate: 'Mar 15, 2024',
      endDate: 'Jun 15, 2024',
      progress: 0,
      status: 'upcoming',
      color: '#f59e0b'
    }
  ];

  // Test performance data
  const testResults = [
    { id: 1, testName: 'Web Dev Quiz 1', score: 92, date: 'Mar 10, 2024', status: 'Passed' },
    { id: 2, testName: 'DSA Midterm', score: 88, date: 'Mar 5, 2024', status: 'Passed' },
    { id: 3, testName: 'Python Final', score: 95, date: 'Feb 25, 2024', status: 'Passed' },
    { id: 4, testName: 'Web Dev Quiz 2', score: 85, date: 'Feb 20, 2024', status: 'Passed' },
    { id: 5, testName: 'DSA Quiz 1', score: 78, date: 'Feb 15, 2024', status: 'Passed' }
  ];

  const testStats = {
    totalTests: 15,
    passed: 13,
    failed: 2,
    averageScore: 87,
    bestScore: 95
  };

  // Activity data
  const activityData = {
    dailyActivity: [
      { day: 'Mon', hours: 3.5 },
      { day: 'Tue', hours: 4.2 },
      { day: 'Wed', hours: 2.8 },
      { day: 'Thu', hours: 5.1 },
      { day: 'Fri', hours: 3.9 },
      { day: 'Sat', hours: 6.2 },
      { day: 'Sun', hours: 4.5 }
    ],
    courseTime: [
      { course: 'Web Dev', hours: 45 },
      { course: 'DSA', hours: 38 },
      { course: 'Python', hours: 52 },
      { course: 'DBMS', hours: 21 }
    ]
  };

  // Achievements data
  const achievements = [
    { id: 1, title: 'First Course Completed', icon: '🎓', date: 'Feb 28, 2024' },
    { id: 2, title: '100% Attendance', icon: '✅', date: 'Mar 1, 2024' },
    { id: 3, title: 'Top Performer', icon: '🏆', date: 'Mar 15, 2024' },
    { id: 4, title: 'Quick Learner', icon: '⚡', date: 'Feb 10, 2024' }
  ];

  const certificates = [
    { id: 1, title: 'Python Programming Certificate', date: 'Feb 28, 2024' },
    { id: 2, title: 'Web Development Basics', date: 'Jan 30, 2024' }
  ];

  // Filter courses by status
  const filteredCourses = enrolledCourses.filter(course => {
    if (activeTab === 'all') return true;
    return course.status === activeTab;
  });

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#10b981';
    if (progress >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const maxActivityHours = Math.max(...activityData.dailyActivity.map(d => d.hours));
  const maxCourseHours = Math.max(...activityData.courseTime.map(c => c.hours));

  return (
    <div className="student-details-profile">
      {/* Basic Profile Info */}
      <div className="profile-section">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {studentData.profilePhoto ? (
                <img src={studentData.profilePhoto} alt={studentData.name} />
              ) : (
                <div className="avatar-placeholder">
                  {studentData.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="profile-info">
              <h1 className="profile-name">{studentData.name}</h1>
              <p className="profile-email">{studentData.email}</p>
              <span className={`status-badge ${studentData.status.toLowerCase()}`}>
                {studentData.status}
              </span>
            </div>
          </div>
          
          <div className="profile-details-grid">
            <div className="detail-item">
              <span className="detail-label">Student ID</span>
              <span className="detail-value">{studentData.studentId}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Enrollment ID</span>
              <span className="detail-value">{studentData.enrollmentId}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Batch / Year</span>
              <span className="detail-value">{studentData.batch} • {studentData.year}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Joined Date</span>
              <span className="detail-value">{studentData.joinedDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Course Enrollment Info */}
      <div className="section-card">
        <div className="section-header">
          <div>
            <h2 className="section-title">📚 Course Enrollment</h2>
            <p className="section-subtitle">Total Courses: {enrolledCourses.length}</p>
          </div>
        </div>

        <div className="course-tabs">
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All ({enrolledCourses.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'ongoing' ? 'active' : ''}`}
            onClick={() => setActiveTab('ongoing')}
          >
            Ongoing ({enrolledCourses.filter(c => c.status === 'ongoing').length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed ({enrolledCourses.filter(c => c.status === 'completed').length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming ({enrolledCourses.filter(c => c.status === 'upcoming').length})
          </button>
        </div>

        <div className="courses-list">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-item">
              <div className="course-item-header">
                <div className="course-icon" style={{ backgroundColor: course.color }}>
                  📖
                </div>
                <div className="course-item-info">
                  <h3 className="course-item-title">{course.title}</h3>
                  <p className="course-instructor">👨‍🏫 {course.instructor}</p>
                  <p className="course-dates">
                    📅 {course.startDate} - {course.endDate}
                  </p>
                </div>
              </div>
              <div className="course-progress-section">
                <div className="progress-info">
                  <span>Progress</span>
                  <span className="progress-percentage">{course.progress}%</span>
                </div>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar-fill" 
                    style={{ 
                      width: `${course.progress}%`,
                      backgroundColor: getProgressColor(course.progress)
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Test/Quiz Performance */}
      <div className="section-card">
        <div className="section-header">
          <h2 className="section-title">🧪 Test & Quiz Performance</h2>
        </div>

        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <span className="stat-label">Total Tests</span>
              <span className="stat-value">{testStats.totalTests}</span>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon success">✅</div>
            <div className="stat-content">
              <span className="stat-label">Passed</span>
              <span className="stat-value success">{testStats.passed}</span>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon danger">❌</div>
            <div className="stat-content">
              <span className="stat-label">Failed</span>
              <span className="stat-value danger">{testStats.failed}</span>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <span className="stat-label">Average Score</span>
              <span className="stat-value">{testStats.averageScore}%</span>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <span className="stat-label">Best Score</span>
              <span className="stat-value">{testStats.bestScore}%</span>
            </div>
          </div>
        </div>

        <div className="test-performance-chart">
          <h3 className="chart-title">Pass/Fail Distribution</h3>
          <div className="pie-chart-container">
            <div className="pie-chart">
              <div 
                className="pie-segment success" 
                style={{ 
                  '--percentage': (testStats.passed / testStats.totalTests) * 100,
                  '--rotation': 0
                }}
              ></div>
            </div>
            <div className="pie-legend">
              <div className="legend-item">
                <span className="legend-color success"></span>
                <span>Passed: {testStats.passed} ({Math.round((testStats.passed / testStats.totalTests) * 100)}%)</span>
              </div>
              <div className="legend-item">
                <span className="legend-color danger"></span>
                <span>Failed: {testStats.failed} ({Math.round((testStats.failed / testStats.totalTests) * 100)}%)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="recent-tests">
          <h3 className="subsection-title">Recent Test Results</h3>
          <div className="test-table">
            <table>
              <thead>
                <tr>
                  <th>Test Name</th>
                  <th>Score</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {testResults.map(test => (
                  <tr key={test.id}>
                    <td>{test.testName}</td>
                    <td>
                      <span className={`score ${test.score >= 80 ? 'high' : test.score >= 60 ? 'medium' : 'low'}`}>
                        {test.score}%
                      </span>
                    </td>
                    <td>{test.date}</td>
                    <td>
                      <span className={`badge ${test.status.toLowerCase()}`}>
                        {test.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="section-card">
        <div className="section-header">
          <h2 className="section-title">🕒 Activity Summary</h2>
        </div>

        <div className="activity-stats">
          <div className="activity-stat-card">
            <div className="activity-stat-icon">⏱️</div>
            <div className="activity-stat-content">
              <span className="activity-stat-label">Total Hours</span>
              <span className="activity-stat-value">{studentData.totalHoursSpent} hrs</span>
            </div>
          </div>
          <div className="activity-stat-card">
            <div className="activity-stat-icon">🔥</div>
            <div className="activity-stat-content">
              <span className="activity-stat-label">Last Active</span>
              <span className="activity-stat-value">{studentData.lastActive}</span>
            </div>
          </div>
        </div>

        <div className="activity-charts">
          <div className="chart-container">
            <h3 className="chart-title">Weekly Activity (Hours)</h3>
            <div className="bar-chart">
              {activityData.dailyActivity.map((day, index) => (
                <div key={index} className="bar-item">
                  <div className="bar-wrapper">
                    <div 
                      className="bar" 
                      style={{ height: `${(day.hours / maxActivityHours) * 100}%` }}
                    >
                      <span className="bar-value">{day.hours}h</span>
                    </div>
                  </div>
                  <span className="bar-label">{day.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="chart-container">
            <h3 className="chart-title">Time Spent per Course (Hours)</h3>
            <div className="horizontal-bar-chart">
              {activityData.courseTime.map((course, index) => (
                <div key={index} className="h-bar-item">
                  <span className="h-bar-label">{course.course}</span>
                  <div className="h-bar-wrapper">
                    <div 
                      className="h-bar" 
                      style={{ width: `${(course.hours / maxCourseHours) * 100}%` }}
                    >
                      <span className="h-bar-value">{course.hours}h</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Achievements & Certificates */}
      <div className="section-card">
        <div className="section-header">
          <h2 className="section-title">🏅 Achievements & Certificates</h2>
        </div>

        <div className="points-display">
          <div className="points-icon">⭐</div>
          <div className="points-content">
            <span className="points-label">Total Points / XP</span>
            <span className="points-value">{studentData.totalPoints} XP</span>
          </div>
        </div>

        <div className="achievements-section">
          <h3 className="subsection-title">Earned Badges</h3>
          <div className="achievements-grid">
            {achievements.map(achievement => (
              <div key={achievement.id} className="achievement-card">
                <div className="achievement-icon">{achievement.icon}</div>
                <h4 className="achievement-title">{achievement.title}</h4>
                <p className="achievement-date">{achievement.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="certificates-section">
          <h3 className="subsection-title">Certificates</h3>
          <div className="certificates-list">
            {certificates.map(cert => (
              <div key={cert.id} className="certificate-item">
                <div className="certificate-icon">📜</div>
                <div className="certificate-info">
                  <h4 className="certificate-title">{cert.title}</h4>
                  <p className="certificate-date">Issued: {cert.date}</p>
                </div>
                <button className="download-btn">Download</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsProfile;
