import React, { useState } from 'react';

const StudentDetails = () => {
  const [selectedModal, setSelectedModal] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [activeColumnFilter, setActiveColumnFilter] = useState(null);
  const [filters, setFilters] = useState({
    studentName: '',
    scoreRange: 'all',
    submissionRange: 'all',
    timeRange: 'all',
    status: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { 
      label: 'Total Members', 
      value: '842', 
      change: '+45 this week',
      changeType: 'positive',
      icon: '👥',
      iconColor: 'blue'
    },
    { 
      label: 'Average Score', 
      value: '85%', 
      change: '+3% from last month',
      changeType: 'positive',
      icon: '⭐',
      iconColor: 'green'
    },
    { 
      label: 'Submissions', 
      value: '756/842', 
      change: '89.8% completion',
      changeType: 'positive',
      icon: '📝',
      iconColor: 'orange'
    },
    { 
      label: 'Spent Time', 
      value: '4.2 hrs', 
      change: 'Average per student',
      changeType: 'neutral',
      icon: '⏱️',
      iconColor: 'blue'
    },
  ];

  const studentList = [
    { id: 1, name: 'Alice Johnson', score: 92, submissions: 15, timeSpent: '5.2 hrs', status: 'Active', course: 'Web Development' },
    { id: 2, name: 'Bob Smith', score: 88, submissions: 14, timeSpent: '4.8 hrs', status: 'Active', course: 'Data Science' },
    { id: 3, name: 'Charlie Davis', score: 78, submissions: 12, timeSpent: '3.5 hrs', status: 'Inactive', course: 'Mobile Development' },
    { id: 4, name: 'Diana Prince', score: 95, submissions: 16, timeSpent: '6.1 hrs', status: 'Active', course: 'Web Development' },
    { id: 5, name: 'Ethan Hunt', score: 82, submissions: 13, timeSpent: '4.2 hrs', status: 'Active', course: 'Data Science' },
    { id: 6, name: 'Fiona Green', score: 90, submissions: 15, timeSpent: '5.5 hrs', status: 'Active', course: 'Web Development' },
  ];

  // Detailed breakdown data
  const memberBreakdown = [
    { course: 'Web Development', count: 345, percentage: 41 },
    { course: 'Data Science', count: 285, percentage: 34 },
    { course: 'Mobile Development', count: 212, percentage: 25 }
  ];

  const scoreBreakdown = [
    { range: 'Excellent (90-100%)', count: 295, percentage: 35, avgScore: 94 },
    { range: 'Good (80-89%)', count: 354, percentage: 42, avgScore: 85 },
    { range: 'Average (70-79%)', count: 152, percentage: 18, avgScore: 75 },
    { range: 'Below Average (<70%)', count: 41, percentage: 5, avgScore: 62 }
  ];

  const submissionBreakdown = [
    { course: 'Web Development', submitted: 330, total: 345, percentage: 95.7 },
    { course: 'Data Science', submitted: 265, total: 285, percentage: 93.0 },
    { course: 'Mobile Development', submitted: 161, total: 212, percentage: 75.9 }
  ];

  const timeBreakdown = [
    { course: 'Web Development', avgTime: '4.8 hrs', totalHours: 1656 },
    { course: 'Data Science', avgTime: '5.2 hrs', totalHours: 1482 },
    { course: 'Mobile Development', avgTime: '2.9 hrs', totalHours: 615 }
  ];

  const handleStatClick = (statLabel) => {
    setSelectedModal(statLabel);
  };

  const closeModal = () => {
    setSelectedModal(null);
  };

  const getModalContent = () => {
    switch(selectedModal) {
      case 'Total Members':
        return (
          <div>
            <div className="course-breakdown-list">
              {memberBreakdown.map((item, index) => (
                <div key={index} className="course-breakdown-item">
                  <div className="course-breakdown-info">
                    <span className="course-name">{item.course}</span>
                    <span className="course-count">{item.count} students</span>
                  </div>
                  <div className="course-breakdown-bar">
                    <div className="course-breakdown-fill" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <div className="total-count">
                Total Students: <strong>842</strong>
              </div>
            </div>
          </div>
        );
      case 'Average Score':
        return (
          <div>
            <div className="course-breakdown-list">
              {scoreBreakdown.map((item, index) => (
                <div key={index} className="course-breakdown-item">
                  <div className="course-breakdown-info">
                    <span className="course-name">{item.range}</span>
                    <span className="course-count">{item.count} students (Avg: {item.avgScore}%)</span>
                  </div>
                  <div className="course-breakdown-bar">
                    <div className="course-breakdown-fill" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <div className="total-count">
                Overall Average Score: <strong>85%</strong>
              </div>
            </div>
          </div>
        );
      case 'Submissions':
        return (
          <div>
            <div className="course-breakdown-list">
              {submissionBreakdown.map((item, index) => (
                <div key={index} className="course-breakdown-item">
                  <div className="course-breakdown-info">
                    <span className="course-name">{item.course}</span>
                    <span className="course-count">{item.submitted}/{item.total} ({item.percentage}%)</span>
                  </div>
                  <div className="course-breakdown-bar">
                    <div className="course-breakdown-fill" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <div className="total-count">
                Total Submissions: <strong>756/842 (89.8%)</strong>
              </div>
            </div>
          </div>
        );
      case 'Spent Time':
        return (
          <div>
            <div className="course-breakdown-list">
              {timeBreakdown.map((item, index) => (
                <div key={index} className="course-breakdown-item">
                  <div className="course-breakdown-info">
                    <span className="course-name">{item.course}</span>
                    <span className="course-count">{item.avgTime} (Total: {item.totalHours}h)</span>
                  </div>
                  <div className="course-breakdown-bar">
                    <div className="course-breakdown-fill" style={{ width: `${(item.totalHours / 3753) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <div className="total-count">
                Average Time per Student: <strong>4.2 hrs</strong>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const filteredStudents = studentList.filter(student => {
    // Name filter
    const nameMatch = filters.studentName === '' || 
                      student.name.toLowerCase().includes(filters.studentName.toLowerCase());
    
    // Score filter
    let scoreMatch = true;
    if (filters.scoreRange === 'excellent') {
      scoreMatch = student.score >= 90;
    } else if (filters.scoreRange === 'good') {
      scoreMatch = student.score >= 80 && student.score < 90;
    } else if (filters.scoreRange === 'average') {
      scoreMatch = student.score >= 70 && student.score < 80;
    } else if (filters.scoreRange === 'below') {
      scoreMatch = student.score < 70;
    }
    
    // Submission filter
    let submissionMatch = true;
    if (filters.submissionRange === 'high') {
      submissionMatch = student.submissions >= 15;
    } else if (filters.submissionRange === 'medium') {
      submissionMatch = student.submissions >= 10 && student.submissions < 15;
    } else if (filters.submissionRange === 'low') {
      submissionMatch = student.submissions < 10;
    }
    
    // Time filter
    let timeMatch = true;
    const timeValue = parseFloat(student.timeSpent);
    if (filters.timeRange === 'high') {
      timeMatch = timeValue >= 5.0;
    } else if (filters.timeRange === 'medium') {
      timeMatch = timeValue >= 3.0 && timeValue < 5.0;
    } else if (filters.timeRange === 'low') {
      timeMatch = timeValue < 3.0;
    }
    
    // Status filter
    const statusMatch = filters.status === 'all' || student.status === filters.status;
    
    return nameMatch && scoreMatch && submissionMatch && timeMatch && statusMatch;
  });

  const uniqueStudentNames = [...new Set(studentList.map(s => s.name))].sort();
  const filteredNames = uniqueStudentNames.filter(name => 
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleColumnFilter = (column) => {
    setActiveColumnFilter(activeColumnFilter === column ? null : column);
    setSearchTerm('');
  };

  const handleNameSelect = (name) => {
    setFilters({...filters, studentName: name});
    setActiveColumnFilter(null);
    setSearchTerm('');
  };

  const clearNameFilter = () => {
    setFilters({...filters, studentName: ''});
  };

  return (
    <div>
      {/* Stats Grid - Compact Single Row */}
      <div className="mentor-stats-grid-compact">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="mentor-stat-card compact clickable"
            onClick={() => handleStatClick(stat.label)}
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

      {/* Modal for Stat Details */}
      {selectedModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedModal} - Detailed Breakdown</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              {getModalContent()}
            </div>
          </div>
        </div>
      )}

      {/* Student List Table */}
      <div className="mentor-detail-card">
        <div className="mentor-detail-header">
          <h2 className="mentor-detail-title">Student Performance Overview</h2>
          <div style={{ display: 'flex', gap: '12px', position: 'relative' }}>
            <button 
              className="mentor-detail-action" 
              style={{ background: showFilters ? '#2C5F8D' : '#4A90E2' }}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? '✕ Close' : '🔍 Filters'}
            </button>
            <button className="mentor-detail-action">Export Data</button>
            
            {/* Filters Dropdown */}
            {showFilters && (
              <div className="filters-dropdown">
                <div className="filters-dropdown-header">
                  <h4>Filter Students</h4>
                </div>
                <div className="filters-dropdown-body">
                  <div className="filter-group-dropdown">
                    <label className="filter-label">Student Name:</label>
                    <input 
                      type="text" 
                      className="filter-input" 
                      placeholder="Search by name..."
                      value={filters.studentName}
                      onChange={(e) => setFilters({...filters, studentName: e.target.value})}
                    />
                  </div>
                  <div className="filter-group-dropdown">
                    <label className="filter-label">Score Range:</label>
                    <select 
                      className="filter-select"
                      value={filters.scoreRange}
                      onChange={(e) => setFilters({...filters, scoreRange: e.target.value})}
                    >
                      <option value="all">All Scores</option>
                      <option value="above90">Above 90%</option>
                      <option value="80-89">80-89%</option>
                      <option value="70-79">70-79%</option>
                      <option value="below50">Below 50%</option>
                    </select>
                  </div>
                  <div className="filter-results-dropdown">
                    Showing <strong>{filteredStudents.length}</strong> of <strong>{studentList.length}</strong> students
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="mentor-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>
                  <div className="table-header-filter">
                    <span>Student Name</span>
                    <button 
                      className="filter-toggle-btn"
                      onClick={() => toggleColumnFilter('name')}
                    >
                      {filters.studentName ? '🔽' : '▼'}
                    </button>
                    {activeColumnFilter === 'name' && (
                      <div className="column-filter-dropdown">
                        <div className="column-filter-search">
                          <input
                            type="text"
                            placeholder="Search student..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="column-filter-input"
                          />
                        </div>
                        <div className="column-filter-list">
                          <div 
                            className="column-filter-item"
                            onClick={clearNameFilter}
                          >
                            <strong>All Students</strong>
                          </div>
                          {filteredNames.map((name, idx) => (
                            <div
                              key={idx}
                              className={`column-filter-item ${filters.studentName === name ? 'active' : ''}`}
                              onClick={() => handleNameSelect(name)}
                            >
                              {name}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </th>
                <th>
                  <div className="table-header-filter">
                    <span>Score</span>
                    <button 
                      className="filter-toggle-btn"
                      onClick={() => toggleColumnFilter('score')}
                    >
                      {filters.scoreRange !== 'all' ? '🔽' : '▼'}
                    </button>
                    {activeColumnFilter === 'score' && (
                      <div className="column-filter-dropdown">
                        <div className="column-filter-list">
                          <div 
                            className={`column-filter-item ${filters.scoreRange === 'all' ? 'active' : ''}`}
                            onClick={() => { setFilters({...filters, scoreRange: 'all'}); setActiveColumnFilter(null); }}
                          >
                            All Scores
                          </div>
                          <div 
                            className={`column-filter-item ${filters.scoreRange === 'excellent' ? 'active' : ''}`}
                            onClick={() => { setFilters({...filters, scoreRange: 'excellent'}); setActiveColumnFilter(null); }}
                          >
                            Excellent (90-100%)
                          </div>
                          <div 
                            className={`column-filter-item ${filters.scoreRange === 'good' ? 'active' : ''}`}
                            onClick={() => { setFilters({...filters, scoreRange: 'good'}); setActiveColumnFilter(null); }}
                          >
                            Good (80-89%)
                          </div>
                          <div 
                            className={`column-filter-item ${filters.scoreRange === 'average' ? 'active' : ''}`}
                            onClick={() => { setFilters({...filters, scoreRange: 'average'}); setActiveColumnFilter(null); }}
                          >
                            Average (70-79%)
                          </div>
                          <div 
                            className={`column-filter-item ${filters.scoreRange === 'below' ? 'active' : ''}`}
                            onClick={() => { setFilters({...filters, scoreRange: 'below'}); setActiveColumnFilter(null); }}
                          >
                            Below Average (&lt;70%)
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </th>
                <th>
                  <div className="table-header-filter">
                    <span>Submissions</span>
                    <button 
                      className="filter-toggle-btn"
                      onClick={() => toggleColumnFilter('submissions')}
                    >
                      {filters.submissionRange !== 'all' ? '🔽' : '▼'}
                    </button>
                    {activeColumnFilter === 'submissions' && (
                      <div className="column-filter-dropdown">
                        <div className="column-filter-list">
                          <div 
                            className={`column-filter-item ${filters.submissionRange === 'all' ? 'active' : ''}`}
                            onClick={() => { setFilters({...filters, submissionRange: 'all'}); setActiveColumnFilter(null); }}
                          >
                            All Submissions
                          </div>
                          <div 
                            className={`column-filter-item ${filters.submissionRange === 'high' ? 'active' : ''}`}
                            onClick={() => { setFilters({...filters, submissionRange: 'high'}); setActiveColumnFilter(null); }}
                          >
                            High (15+)
                          </div>
                          <div 
                            className={`column-filter-item ${filters.submissionRange === 'medium' ? 'active' : ''}`}
                            onClick={() => { setFilters({...filters, submissionRange: 'medium'}); setActiveColumnFilter(null); }}
                          >
                            Medium (10-14)
                          </div>
                          <div 
                            className={`column-filter-item ${filters.submissionRange === 'low' ? 'active' : ''}`}
                            onClick={() => { setFilters({...filters, submissionRange: 'low'}); setActiveColumnFilter(null); }}
                          >
                            Low (&lt;10)
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </th>
                <th>
                  <div className="table-header-filter">
                    <span>Time Spent</span>
                    <button 
                      className="filter-toggle-btn"
                      onClick={() => toggleColumnFilter('time')}
                    >
                      {filters.timeRange !== 'all' ? '🔽' : '▼'}
                    </button>
                    {activeColumnFilter === 'time' && (
                      <div className="column-filter-dropdown">
                        <div className="column-filter-list">
                          <div 
                            className={`column-filter-item ${filters.timeRange === 'all' ? 'active' : ''}`}
                            onClick={() => { setFilters({...filters, timeRange: 'all'}); setActiveColumnFilter(null); }}
                          >
                            All Time Ranges
                          </div>
                          <div 
                            className={`column-filter-item ${filters.timeRange === 'high' ? 'active' : ''}`}
                            onClick={() => { setFilters({...filters, timeRange: 'high'}); setActiveColumnFilter(null); }}
                          >
                            High (5+ hrs)
                          </div>
                          <div 
                            className={`column-filter-item ${filters.timeRange === 'medium' ? 'active' : ''}`}
                            onClick={() => { setFilters({...filters, timeRange: 'medium'}); setActiveColumnFilter(null); }}
                          >
                            Medium (3-5 hrs)
                          </div>
                          <div 
                            className={`column-filter-item ${filters.timeRange === 'low' ? 'active' : ''}`}
                            onClick={() => { setFilters({...filters, timeRange: 'low'}); setActiveColumnFilter(null); }}
                          >
                            Low (&lt;3 hrs)
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </th>
                <th>
                  <div className="table-header-filter">
                    <span>Status</span>
                    <button 
                      className="filter-toggle-btn"
                      onClick={() => toggleColumnFilter('status')}
                    >
                      {filters.status !== 'all' ? '🔽' : '▼'}
                    </button>
                    {activeColumnFilter === 'status' && (
                      <div className="column-filter-dropdown">
                        <div className="column-filter-list">
                          <div 
                            className={`column-filter-item ${filters.status === 'all' ? 'active' : ''}`}
                            onClick={() => { setFilters({...filters, status: 'all'}); setActiveColumnFilter(null); }}
                          >
                            All Status
                          </div>
                          <div 
                            className={`column-filter-item ${filters.status === 'Active' ? 'active' : ''}`}
                            onClick={() => { setFilters({...filters, status: 'Active'}); setActiveColumnFilter(null); }}
                          >
                            Active
                          </div>
                          <div 
                            className={`column-filter-item ${filters.status === 'Inactive' ? 'active' : ''}`}
                            onClick={() => { setFilters({...filters, status: 'Inactive'}); setActiveColumnFilter(null); }}
                          >
                            Inactive
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>#{student.id}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        width: '36px', 
                        height: '36px', 
                        borderRadius: '50%', 
                        background: '#4A90E2',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '600'
                      }}>
                        {student.name.charAt(0)}
                      </div>
                      <span style={{ fontWeight: '600' }}>{student.name}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ 
                      fontWeight: '700',
                      color: student.score >= 90 ? '#4CAF50' : student.score >= 80 ? '#FF9800' : '#FF5252'
                    }}>
                      {student.score}%
                    </span>
                  </td>
                  <td>{student.submissions}</td>
                  <td>{student.timeSpent}</td>
                  <td>
                    <span className={`mentor-badge ${student.status === 'Active' ? 'success' : 'warning'}`}>
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Distribution - Side by Side */}
      <div className="score-distribution-container" style={{ marginBottom: '0' }}>
        {/* Score Distribution Progress Bars */}
        <div className="mentor-detail-card compact-distribution">
          <div className="mentor-detail-header">
            <h2 className="mentor-detail-title">📊 Score Distribution</h2>
          </div>
          <div className="mentor-progress-container">
            <div className="mentor-progress-header">
              <span className="mentor-progress-label">Excellent (90-100%)</span>
              <span className="mentor-progress-value">35% (295 students)</span>
            </div>
            <div className="mentor-progress-bar">
              <div className="mentor-progress-fill success" style={{ width: '35%' }}></div>
            </div>
          </div>
          <div className="mentor-progress-container">
            <div className="mentor-progress-header">
              <span className="mentor-progress-label">Good (80-89%)</span>
              <span className="mentor-progress-value">42% (354 students)</span>
            </div>
            <div className="mentor-progress-bar">
              <div className="mentor-progress-fill" style={{ width: '42%' }}></div>
            </div>
          </div>
          <div className="mentor-progress-container">
            <div className="mentor-progress-header">
              <span className="mentor-progress-label">Average (70-79%)</span>
              <span className="mentor-progress-value">18% (152 students)</span>
            </div>
            <div className="mentor-progress-bar">
              <div className="mentor-progress-fill warning" style={{ width: '18%' }}></div>
            </div>
          </div>
          <div className="mentor-progress-container">
            <div className="mentor-progress-header">
              <span className="mentor-progress-label">Below Average (&lt;70%)</span>
              <span className="mentor-progress-value">5% (41 students)</span>
            </div>
            <div className="mentor-progress-bar">
              <div className="mentor-progress-fill danger" style={{ width: '5%' }}></div>
            </div>
          </div>
        </div>

        {/* Bar Graph Visualization */}
        <div className="mentor-detail-card compact-distribution">
          <div className="mentor-detail-header">
            <h2 className="mentor-detail-title">📈 Visual Comparison</h2>
          </div>
          <div className="bar-graph-container-enhanced">
            <div className="bar-graph-item-enhanced">
              <div className="bar-graph-bar-enhanced" style={{ height: 'calc(35% * 2.8)', background: 'linear-gradient(180deg, #4CAF50, #45A049)' }}>
                <div className="bar-graph-value-enhanced">35%</div>
                <div className="bar-graph-count-inline">295</div>
              </div>
              <div className="bar-graph-label-enhanced">Excellent</div>
              <div className="bar-graph-range">(90-100%)</div>
            </div>
            <div className="bar-graph-item-enhanced">
              <div className="bar-graph-bar-enhanced" style={{ height: 'calc(42% * 2.8)', background: 'linear-gradient(180deg, #4A90E2, #2C5F8D)' }}>
                <div className="bar-graph-value-enhanced">42%</div>
                <div className="bar-graph-count-inline">354</div>
              </div>
              <div className="bar-graph-label-enhanced">Good</div>
              <div className="bar-graph-range">(80-89%)</div>
            </div>
            <div className="bar-graph-item-enhanced">
              <div className="bar-graph-bar-enhanced" style={{ height: 'calc(18% * 2.8)', background: 'linear-gradient(180deg, #FF9800, #F57C00)' }}>
                <div className="bar-graph-value-enhanced">18%</div>
                <div className="bar-graph-count-inline">152</div>
              </div>
              <div className="bar-graph-label-enhanced">Average</div>
              <div className="bar-graph-range">(70-79%)</div>
            </div>
            <div className="bar-graph-item-enhanced">
              <div className="bar-graph-bar-enhanced" style={{ height: 'calc(5% * 2.8)', background: 'linear-gradient(180deg, #FF5252, #E53935)' }}>
                <div className="bar-graph-value-enhanced">5%</div>
                <div className="bar-graph-count-inline">41</div>
              </div>
              <div className="bar-graph-label-enhanced">Below Avg</div>
              <div className="bar-graph-range">(&lt;70%)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;