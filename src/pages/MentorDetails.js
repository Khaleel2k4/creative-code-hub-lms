import React from 'react';

const MentorDetails = () => {
  // Mentor Information - Core Details
  const mentorInfo = {
    name: 'Dr. Sarah Johnson',
    subject: 'Full Stack Development',
    activeTime: '6 hrs/day',
    sessions: '24 sessions',
    attendance: '98%',
    report: 'Excellent Performance'
  };

  return (
    <div>
      {/* Mentor Profile Card - Main Information */}
      <div className="mentor-detail-card">
        <div className="mentor-detail-header">
          <h2 className="mentor-detail-title">👨‍🏫 Mentor Profile Information</h2>
          <button className="mentor-detail-action">Edit Profile</button>
        </div>
        
        {/* Mentor Details Grid */}
        <div className="mentor-detail-grid">
          <div className="mentor-detail-item">
            <div className="mentor-detail-item-label">Mentor Name</div>
            <div className="mentor-detail-item-value">{mentorInfo.name}</div>
          </div>
          <div className="mentor-detail-item">
            <div className="mentor-detail-item-label">Subject</div>
            <div className="mentor-detail-item-value">{mentorInfo.subject}</div>
          </div>
          <div className="mentor-detail-item">
            <div className="mentor-detail-item-label">Active Time</div>
            <div className="mentor-detail-item-value">{mentorInfo.activeTime}</div>
          </div>
          <div className="mentor-detail-item">
            <div className="mentor-detail-item-label">Sessions</div>
            <div className="mentor-detail-item-value">{mentorInfo.sessions}</div>
          </div>
          <div className="mentor-detail-item">
            <div className="mentor-detail-item-label">Attendance</div>
            <div className="mentor-detail-item-value">{mentorInfo.attendance}</div>
          </div>
          <div className="mentor-detail-item">
            <div className="mentor-detail-item-label">Mentor Report</div>
            <div className="mentor-detail-item-value">
              <span className="mentor-badge success">{mentorInfo.report}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Distribution Charts - Side by Side */}
      <div className="mentor-charts-grid">
        {/* Active Courses Distribution */}
        <div className="mentor-detail-card compact">
          <div className="mentor-detail-header">
            <h2 className="mentor-detail-title">📊 Active Courses Distribution</h2>
          </div>
          <div className="mentor-progress-container">
            <div className="mentor-progress-header">
              <span className="mentor-progress-label">Web Development</span>
              <span className="mentor-progress-value">27.3% (345)</span>
            </div>
            <div className="mentor-progress-bar">
              <div className="mentor-progress-fill" style={{ width: '27.3%' }}></div>
            </div>
          </div>
          <div className="mentor-progress-container">
            <div className="mentor-progress-header">
              <span className="mentor-progress-label">Data Science</span>
              <span className="mentor-progress-value">22.5% (285)</span>
            </div>
            <div className="mentor-progress-bar">
              <div className="mentor-progress-fill success" style={{ width: '22.5%' }}></div>
            </div>
          </div>
          <div className="mentor-progress-container">
            <div className="mentor-progress-header">
              <span className="mentor-progress-label">Mobile Development</span>
              <span className="mentor-progress-value">18.7% (237)</span>
            </div>
            <div className="mentor-progress-bar">
              <div className="mentor-progress-fill warning" style={{ width: '18.7%' }}></div>
            </div>
          </div>
        </div>

        {/* Student Activity Distribution */}
        <div className="mentor-detail-card compact">
          <div className="mentor-detail-header">
            <h2 className="mentor-detail-title">📈 Student Activity Distribution</h2>
          </div>
          <div className="mentor-progress-container">
            <div className="mentor-progress-header">
              <span className="mentor-progress-label">Active Learning</span>
              <span className="mentor-progress-value">38.0% (642)</span>
            </div>
            <div className="mentor-progress-bar">
              <div className="mentor-progress-fill success" style={{ width: '38%' }}></div>
            </div>
          </div>
          <div className="mentor-progress-container">
            <div className="mentor-progress-header">
              <span className="mentor-progress-label">Course Completed</span>
              <span className="mentor-progress-value">28.5% (482)</span>
            </div>
            <div className="mentor-progress-bar">
              <div className="mentor-progress-fill" style={{ width: '28.5%' }}></div>
            </div>
          </div>
          <div className="mentor-progress-container">
            <div className="mentor-progress-header">
              <span className="mentor-progress-label">In Progress</span>
              <span className="mentor-progress-value">33.5% (567)</span>
            </div>
            <div className="mentor-progress-bar">
              <div className="mentor-progress-fill warning" style={{ width: '33.5%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDetails;