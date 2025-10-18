import React from 'react';

const StudentDetails = () => {
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
    { id: 1, name: 'Alice Johnson', score: 92, submissions: 15, timeSpent: '5.2 hrs', status: 'Active' },
    { id: 2, name: 'Bob Smith', score: 88, submissions: 14, timeSpent: '4.8 hrs', status: 'Active' },
    { id: 3, name: 'Charlie Davis', score: 78, submissions: 12, timeSpent: '3.5 hrs', status: 'Inactive' },
    { id: 4, name: 'Diana Prince', score: 95, submissions: 16, timeSpent: '6.1 hrs', status: 'Active' },
    { id: 5, name: 'Ethan Hunt', score: 82, submissions: 13, timeSpent: '4.2 hrs', status: 'Active' },
    { id: 6, name: 'Fiona Green', score: 90, submissions: 15, timeSpent: '5.5 hrs', status: 'Active' },
  ];

  return (
    <div>
      {/* Stats Grid */}
      <div className="mentor-stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="mentor-stat-card">
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

      {/* Student List Table */}
      <div className="mentor-detail-card">
        <div className="mentor-detail-header">
          <h2 className="mentor-detail-title">Student Performance Overview</h2>
          <button className="mentor-detail-action">Export Data</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="mentor-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Student Name</th>
                <th>Score</th>
                <th>Submissions</th>
                <th>Time Spent</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {studentList.map((student) => (
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

      {/* Performance Distribution */}
      <div className="mentor-detail-card">
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
    </div>
  );
};

export default StudentDetails;