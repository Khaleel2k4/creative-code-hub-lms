import React, { useState } from 'react';

const Assessment = () => {
  // State management
  const [selectedStat, setSelectedStat] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('All Courses');
  const [filterType, setFilterType] = useState('All Types');

  // Course-wise data for each statistic
  const courseWiseData = {
    'Total Assessments': [
      { course: 'Web Development', count: 15 },
      { course: 'Data Science', count: 12 },
      { course: 'Mobile App Development', count: 10 },
      { course: 'Cloud Computing', count: 8 },
      { course: 'Cybersecurity', count: 3 }
    ],
    'Completed': [
      { course: 'Web Development', count: 12 },
      { course: 'Data Science', count: 9 },
      { course: 'Mobile App Development', count: 8 },
      { course: 'Cloud Computing', count: 5 },
      { course: 'Cybersecurity', count: 2 }
    ],
    'In Progress': [
      { course: 'Web Development', count: 2 },
      { course: 'Data Science', count: 2 },
      { course: 'Mobile App Development', count: 2 },
      { course: 'Cloud Computing', count: 2 },
      { course: 'Cybersecurity', count: 0 }
    ],
    'Not Attempted': [
      { course: 'Web Development', count: 1 },
      { course: 'Data Science', count: 1 },
      { course: 'Mobile App Development', count: 0 },
      { course: 'Cloud Computing', count: 1 },
      { course: 'Cybersecurity', count: 1 }
    ]
  };

  const stats = [
    { 
      label: 'Total Assessments', 
      value: '48', 
      change: '+6 this month',
      changeType: 'positive',
      icon: '📝',
      iconColor: 'blue'
    },
    { 
      label: 'Completed', 
      value: '36', 
      change: '75% completion rate',
      changeType: 'positive',
      icon: '✅',
      iconColor: 'green'
    },
    { 
      label: 'In Progress', 
      value: '8', 
      change: '16.7% ongoing',
      changeType: 'neutral',
      icon: '⏳',
      iconColor: 'orange'
    },
    { 
      label: 'Not Attempted', 
      value: '4', 
      change: '8.3% pending',
      changeType: 'negative',
      icon: '❌',
      iconColor: 'red'
    },
  ];

  const assessmentList = [
    { id: 1, title: 'React Fundamentals Quiz', type: 'Quiz', course: 'Web Development', students: 156, completed: 142, avgScore: 88, status: 'Active' },
    { id: 2, title: 'JavaScript Advanced Test', type: 'Test', course: 'Web Development', students: 134, completed: 128, avgScore: 82, status: 'Active' },
    { id: 3, title: 'CSS Layout Assignment', type: 'Assignment', course: 'Web Development', students: 145, completed: 138, avgScore: 90, status: 'Active' },
    { id: 4, title: 'Node.js Project', type: 'Project', course: 'Web Development', students: 98, completed: 76, avgScore: 85, status: 'In Progress' },
    { id: 5, title: 'Database Design Quiz', type: 'Quiz', course: 'Data Science', students: 112, completed: 0, avgScore: 0, status: 'Not Started' },
    { id: 6, title: 'Python Basics Test', type: 'Test', course: 'Data Science', students: 98, completed: 92, avgScore: 87, status: 'Active' },
    { id: 7, title: 'Machine Learning Project', type: 'Project', course: 'Data Science', students: 76, completed: 65, avgScore: 91, status: 'Active' },
    { id: 8, title: 'Flutter UI Assignment', type: 'Assignment', course: 'Mobile App Development', students: 89, completed: 84, avgScore: 86, status: 'Active' },
    { id: 9, title: 'AWS Fundamentals Quiz', type: 'Quiz', course: 'Cloud Computing', students: 67, completed: 58, avgScore: 83, status: 'Active' },
  ];

  // Get unique courses and types for filters
  const courses = ['All Courses', ...new Set(assessmentList.map(a => a.course))];
  const types = ['All Types', ...new Set(assessmentList.map(a => a.type))];

  // Filter assessments based on search and filters
  const filteredAssessments = assessmentList.filter(assessment => {
    const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === 'All Courses' || assessment.course === filterCourse;
    const matchesType = filterType === 'All Types' || assessment.type === filterType;
    return matchesSearch && matchesCourse && matchesType;
  });

  // Handle stat card click
  const handleStatClick = (statLabel) => {
    setSelectedStat(statLabel);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedStat(null);
  };

  // Calculate total for selected stat
  const getTotal = (statLabel) => {
    if (!courseWiseData[statLabel]) return 0;
    return courseWiseData[statLabel].reduce((sum, item) => sum + item.count, 0);
  };

  return (
    <div>
      {/* Stats Grid */}
      <div className="mentor-stats-grid">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="mentor-stat-card clickable"
            onClick={() => handleStatClick(stat.label)}
            title="Click to view course-wise breakdown"
          >
            <div className="mentor-stat-header">
              <div>
                <div className="mentor-stat-label">{stat.label}</div>
              </div>
              <div className={`mentor-stat-icon ${stat.iconColor}`}>
                {stat.icon}
              </div>
            </div>
            <div className="mentor-stat-value">{stat.value}</div>
            <div className={`mentor-stat-change ${stat.changeType}`}>
              {stat.changeType === 'positive' ? '↑' : stat.changeType === 'negative' ? '↓' : '•'} {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Course-wise Breakdown */}
      {showModal && selectedStat && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedStat} - Course-wise Breakdown</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="course-breakdown-list">
                {courseWiseData[selectedStat].map((item, index) => (
                  <div key={index} className="course-breakdown-item">
                    <div className="course-breakdown-info">
                      <span className="course-name">{item.course}</span>
                      <span className="course-count">{item.count} Assignments</span>
                    </div>
                    <div className="course-breakdown-bar">
                      <div 
                        className="course-breakdown-fill"
                        style={{ width: `${(item.count / getTotal(selectedStat)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <div className="total-count">
                  <strong>Total {selectedStat}:</strong> {getTotal(selectedStat)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overall Progress with Pie Chart */}
      <div className="mentor-detail-card">
        <div className="mentor-detail-header">
          <h2 className="mentor-detail-title">📊 Assessment Progress Overview</h2>
        </div>
        <div className="progress-overview-container">
          <div className="progress-bars-section">
            <div className="mentor-progress-container compact">
              <div className="mentor-progress-header">
                <span className="mentor-progress-label">Completion</span>
                <span className="mentor-progress-value">75% (36/48)</span>
              </div>
              <div className="mentor-progress-bar">
                <div className="mentor-progress-fill success" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="mentor-progress-container compact">
              <div className="mentor-progress-header">
                <span className="mentor-progress-label">In Progress</span>
                <span className="mentor-progress-value">16.7% (8/48)</span>
              </div>
              <div className="mentor-progress-bar">
                <div className="mentor-progress-fill warning" style={{ width: '16.7%' }}></div>
              </div>
            </div>
            <div className="mentor-progress-container compact">
              <div className="mentor-progress-header">
                <span className="mentor-progress-label">Not Attempted</span>
                <span className="mentor-progress-value">8.3% (4/48)</span>
              </div>
              <div className="mentor-progress-bar">
                <div className="mentor-progress-fill danger" style={{ width: '8.3%' }}></div>
              </div>
            </div>
          </div>
          <div className="pie-chart-section">
            <div className="pie-chart-container">
              <svg viewBox="0 0 200 200" className="pie-chart">
                {/* Completed - 75% */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="transparent"
                  stroke="#4CAF50"
                  strokeWidth="40"
                  strokeDasharray="377 503"
                  strokeDashoffset="0"
                  transform="rotate(-90 100 100)"
                />
                {/* In Progress - 16.7% */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="transparent"
                  stroke="#FF9800"
                  strokeWidth="40"
                  strokeDasharray="84 503"
                  strokeDashoffset="-377"
                  transform="rotate(-90 100 100)"
                />
                {/* Not Attempted - 8.3% */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="transparent"
                  stroke="#FF5252"
                  strokeWidth="40"
                  strokeDasharray="42 503"
                  strokeDashoffset="-461"
                  transform="rotate(-90 100 100)"
                />
                <text x="100" y="95" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#2C3E50">48</text>
                <text x="100" y="115" textAnchor="middle" fontSize="12" fill="#95A5A6">Total</text>
              </svg>
            </div>
            <div className="pie-chart-legend">
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#4CAF50' }}></span>
                <span className="legend-label">Completed (75%)</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#FF9800' }}></span>
                <span className="legend-label">In Progress (16.7%)</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#FF5252' }}></span>
                <span className="legend-label">Not Attempted (8.3%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assessment List with Filters */}
      <div className="mentor-detail-card">
        <div className="mentor-detail-header">
          <h2 className="mentor-detail-title">Assessment Details</h2>
          <button className="mentor-detail-action">Create New</button>
        </div>
        
        {/* Filter Section */}
        <div className="assessment-filters">
          <div className="filter-group">
            <label className="filter-label">🔍 Search:</label>
            <input
              type="text"
              className="filter-input"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label className="filter-label">📚 Course:</label>
            <select
              className="filter-select"
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
            >
              {courses.map((course, index) => (
                <option key={index} value={course}>{course}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">📋 Type:</label>
            <select
              className="filter-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              {types.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="filter-results">
            Showing <strong>{filteredAssessments.length}</strong> of <strong>{assessmentList.length}</strong> assessments
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="mentor-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Assessment Title</th>
                <th>Course</th>
                <th>Type</th>
                <th>Students</th>
                <th>Completed</th>
                <th>Avg Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssessments.length > 0 ? (
                filteredAssessments.map((assessment) => (
                  <tr key={assessment.id}>
                    <td>#{assessment.id}</td>
                    <td style={{ fontWeight: '600' }}>{assessment.title}</td>
                    <td>
                      <span className="course-tag">{assessment.course}</span>
                    </td>
                    <td>
                      <span className="mentor-badge info">{assessment.type}</span>
                    </td>
                    <td>{assessment.students}</td>
                    <td>
                      <span style={{ fontWeight: '600' }}>
                        {assessment.completed}/{assessment.students}
                      </span>
                    </td>
                    <td>
                      <span style={{ 
                        fontWeight: '700',
                        color: assessment.avgScore >= 85 ? '#4CAF50' : assessment.avgScore >= 70 ? '#FF9800' : '#FF5252'
                      }}>
                        {assessment.avgScore > 0 ? `${assessment.avgScore}%` : 'N/A'}
                      </span>
                    </td>
                    <td>
                      <span className={`mentor-badge ${
                        assessment.status === 'Active' ? 'success' : 
                        assessment.status === 'In Progress' ? 'warning' : 'danger'
                      }`}>
                        {assessment.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#95A5A6' }}>
                    No assessments found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="mentor-detail-card">
        <div className="mentor-detail-header">
          <h2 className="mentor-detail-title">📈 Performance Insights</h2>
        </div>
        <div className="mentor-detail-grid">
          <div className="mentor-detail-item">
            <div className="mentor-detail-item-label">Average Completion Time</div>
            <div className="mentor-detail-item-value">2.5 days</div>
          </div>
          <div className="mentor-detail-item">
            <div className="mentor-detail-item-label">Overall Average Score</div>
            <div className="mentor-detail-item-value">86%</div>
          </div>
          <div className="mentor-detail-item">
            <div className="mentor-detail-item-label">Pass Rate</div>
            <div className="mentor-detail-item-value">94%</div>
          </div>
          <div className="mentor-detail-item">
            <div className="mentor-detail-item-label">Participation Rate</div>
            <div className="mentor-detail-item-value">91.7%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;