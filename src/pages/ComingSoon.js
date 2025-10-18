import React from 'react';

const ComingSoon = ({ title }) => {
  const getPlaceholderFields = () => {
    switch(title) {
      case 'Courses':
        return ['Course Name', 'Duration', 'Students Enrolled', 'Completion Rate'];
      case 'Practice':
        return ['Exercise Title', 'Difficulty Level', 'Attempts', 'Success Rate'];
      case 'Editor / Compiler':
        return ['Language', 'Code Files', 'Execution Time', 'Output'];
      case 'Report':
        return ['Report Type', 'Generated Date', 'Status', 'Download'];
      case 'Feedback':
        return ['Student Name', 'Rating', 'Comments', 'Date'];
      default:
        return ['Field 1', 'Field 2', 'Field 3', 'Field 4'];
    }
  };

  const getIcon = () => {
    switch(title) {
      case 'Courses': return '📚';
      case 'Practice': return '💻';
      case 'Editor / Compiler': return '⚙️';
      case 'Report': return '📈';
      case 'Feedback': return '💬';
      default: return '🚧';
    }
  };

  return (
    <div className="mentor-under-development">
      <div className="mentor-under-development-icon">{getIcon()}</div>
      <h2 className="mentor-under-development-title">{title}</h2>
      <p className="mentor-under-development-text">
        This section is currently under development. Our team is working hard to bring you this feature soon!
      </p>
      
      <div className="mentor-under-development-fields">
        {getPlaceholderFields().map((field, index) => (
          <div key={index} className="mentor-placeholder-field">
            <div className="mentor-placeholder-label">{field}</div>
            <div className="mentor-placeholder-value"></div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '32px' }}>
        <span className="mentor-badge info">Coming Soon</span>
      </div>
    </div>
  );
};

export default ComingSoon;