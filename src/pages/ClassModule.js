import React, { useState, useEffect } from 'react';
import '../styles/ClassModule.css';
import { 
  Calendar, Clock, Video, Users, FileText, Download, 
  Bell, CheckCircle, XCircle, AlertCircle, Play, 
  Search, Filter, MessageCircle, Phone, Mail, BarChart2
} from 'lucide-react';

const ClassModule = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState('week');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // Mock data - Replace with API calls
  const classStats = {
    totalClasses: 48,
    attended: 42,
    missed: 6,
    averageAttendance: 87.5,
    nextClass: {
      title: 'Advanced React Patterns',
      date: '2024-10-26',
      time: '10:00 AM',
      instructor: 'Dr. Sarah Chen',
      course: 'Web Development',
      joinLink: 'https://meet.example.com/class-123'
    }
  };

  const liveClasses = [
    {
      id: 1,
      title: 'Introduction to Hooks',
      course: 'Web Development',
      instructor: 'Dr. Sarah Chen',
      date: '2024-10-25',
      time: '2:00 PM - 4:00 PM',
      status: 'live',
      joinLink: 'https://meet.example.com/class-101',
      notes: 'Please review React basics before class'
    }
  ];

  const upcomingClasses = [
    {
      id: 2,
      title: 'Advanced React Patterns',
      course: 'Web Development',
      instructor: 'Dr. Sarah Chen',
      date: '2024-10-26',
      time: '10:00 AM - 12:00 PM',
      status: 'upcoming',
      joinLink: 'https://meet.example.com/class-123'
    },
    {
      id: 3,
      title: 'Machine Learning Basics',
      course: 'Data Science',
      instructor: 'Prof. Mike Johnson',
      date: '2024-10-27',
      time: '3:00 PM - 5:00 PM',
      status: 'upcoming',
      joinLink: 'https://meet.example.com/class-124'
    }
  ];

  const recordedClasses = [
    {
      id: 1,
      title: 'React Fundamentals',
      course: 'Web Development',
      instructor: 'Dr. Sarah Chen',
      duration: '1:45:30',
      uploadDate: '2024-10-20',
      progress: 75,
      thumbnail: null
    },
    {
      id: 2,
      title: 'State Management with Redux',
      course: 'Web Development',
      instructor: 'Dr. Sarah Chen',
      duration: '2:10:15',
      uploadDate: '2024-10-18',
      progress: 100,
      thumbnail: null
    },
    {
      id: 3,
      title: 'Python Data Analysis',
      course: 'Data Science',
      instructor: 'Prof. Mike Johnson',
      duration: '1:30:45',
      uploadDate: '2024-10-15',
      progress: 45,
      thumbnail: null
    }
  ];

  const classResources = [
    {
      id: 1,
      name: 'React Hooks Cheat Sheet.pdf',
      type: 'pdf',
      size: '2.4 MB',
      course: 'Web Development',
      uploadDate: '2024-10-20',
      downloadUrl: '#'
    },
    {
      id: 2,
      name: 'State Management Slides.pptx',
      type: 'ppt',
      size: '5.1 MB',
      course: 'Web Development',
      uploadDate: '2024-10-18',
      downloadUrl: '#'
    },
    {
      id: 3,
      name: 'Assignment 3 - React Project.zip',
      type: 'zip',
      size: '1.8 MB',
      course: 'Web Development',
      uploadDate: '2024-10-15',
      downloadUrl: '#'
    },
    {
      id: 4,
      name: 'Data Analysis Tutorial.pdf',
      type: 'pdf',
      size: '3.2 MB',
      course: 'Data Science',
      uploadDate: '2024-10-12',
      downloadUrl: '#'
    }
  ];

  const instructors = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      subject: 'Web Development',
      email: 'sarah.chen@example.com',
      phone: '+1 (555) 123-4567',
      officeHours: 'Mon-Wed: 2:00 PM - 4:00 PM',
      avatar: null
    },
    {
      id: 2,
      name: 'Prof. Mike Johnson',
      subject: 'Data Science',
      email: 'mike.johnson@example.com',
      phone: '+1 (555) 234-5678',
      officeHours: 'Tue-Thu: 3:00 PM - 5:00 PM',
      avatar: null
    }
  ];

  const attendanceRecords = [
    { id: 1, date: '2024-10-20', title: 'React Fundamentals', status: 'present' },
    { id: 2, date: '2024-10-18', title: 'State Management', status: 'present' },
    { id: 3, date: '2024-10-15', title: 'Python Basics', status: 'present' },
    { id: 4, date: '2024-10-12', title: 'Data Analysis', status: 'absent' },
    { id: 5, date: '2024-10-10', title: 'React Components', status: 'present' },
    { id: 6, date: '2024-10-08', title: 'JavaScript ES6', status: 'late' },
    { id: 7, date: '2024-10-05', title: 'HTML & CSS', status: 'present' }
  ];

  const classNotes = [
    {
      id: 1,
      title: 'React Hooks Notes',
      content: 'useState and useEffect are the most commonly used hooks...',
      date: '2024-10-20',
      classTitle: 'React Fundamentals',
      isPrivate: true
    },
    {
      id: 2,
      title: 'Redux Pattern',
      content: 'Actions, Reducers, and Store are the core concepts...',
      date: '2024-10-18',
      classTitle: 'State Management',
      isPrivate: false
    }
  ];


  // Countdown timer for next class
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const nextClassDate = new Date(classStats.nextClass.date + ' ' + classStats.nextClass.time);
      const diff = nextClassDate - now;

      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown({ hours, minutes, seconds });
      }
    };

    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const getFileIcon = (type) => {
    const icons = {
      pdf: '📄',
      ppt: '📊',
      doc: '📝',
      zip: '📦'
    };
    return icons[type] || '📁';
  };

  const getStatusBadge = (status) => {
    const badges = {
      live: { color: '#10b981', icon: '🟢', text: 'Live Now' },
      upcoming: { color: '#3b82f6', icon: '🔵', text: 'Upcoming' },
      completed: { color: '#6b7280', icon: '⚪', text: 'Completed' },
      present: { color: '#10b981', icon: <CheckCircle size={16} />, text: 'Present' },
      absent: { color: '#ef4444', icon: <XCircle size={16} />, text: 'Absent' },
      late: { color: '#f59e0b', icon: <AlertCircle size={16} />, text: 'Late' },
      excused: { color: '#8b5cf6', icon: <CheckCircle size={16} />, text: 'Excused' }
    };
    return badges[status] || badges.upcoming;
  };

  const filteredResources = classResources.filter(resource => {
    const matchesCourse = selectedCourse === 'all' || resource.course === selectedCourse;
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  return (
    <div className="class-module">
      {/* Sticky Header with Quick Actions */}
      <div className="class-sticky-header">
        <div className="quick-info">
          <div className="next-class-info">
            <Clock size={20} />
            <div>
              <span className="next-class-label">Next Class:</span>
              <span className="next-class-title">{classStats.nextClass.title}</span>
            </div>
          </div>
          <div className="countdown-timer">
            <span className="countdown-label">Starts in:</span>
            <div className="countdown-digits">
              <span>{String(countdown.hours).padStart(2, '0')}</span>:
              <span>{String(countdown.minutes).padStart(2, '0')}</span>:
              <span>{String(countdown.seconds).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
        <button className="btn-join-class">
          <Video size={18} />
          Join Class
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="class-tabs">
        {['overview', 'schedule', 'recordings', 'resources', 'attendance', 'notes'].map(tab => (
          <button
            key={tab}
            className={`class-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="class-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-section">
            {/* Statistics Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#e0f2fe' }}>
                  <Calendar size={24} color="#0284c7" />
                </div>
                <div className="stat-content">
                  <span className="stat-label">Total Classes</span>
                  <span className="stat-value">{classStats.totalClasses}</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#d1fae5' }}>
                  <CheckCircle size={24} color="#059669" />
                </div>
                <div className="stat-content">
                  <span className="stat-label">Attended</span>
                  <span className="stat-value">{classStats.attended}</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#fee2e2' }}>
                  <XCircle size={24} color="#dc2626" />
                </div>
                <div className="stat-content">
                  <span className="stat-label">Missed</span>
                  <span className="stat-value">{classStats.missed}</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#fef3c7' }}>
                  <BarChart2 size={24} color="#d97706" />
                </div>
                <div className="stat-content">
                  <span className="stat-label">Attendance</span>
                  <span className="stat-value">{classStats.averageAttendance}%</span>
                </div>
              </div>
            </div>

            {/* Live Classes */}
            {liveClasses.length > 0 && (
              <div className="section-card live-classes-section">
                <h3 className="section-title">🟢 Live Classes</h3>
                <div className="classes-list">
                  {liveClasses.map(cls => (
                    <div key={cls.id} className="class-item live">
                      <div className="class-item-header">
                        <div className="class-badge live">
                          {getStatusBadge('live').icon} {getStatusBadge('live').text}
                        </div>
                        <span className="class-time">{cls.time}</span>
                      </div>
                      <h4 className="class-title">{cls.title}</h4>
                      <div className="class-meta">
                        <span>👨‍🏫 {cls.instructor}</span>
                        <span>📚 {cls.course}</span>
                      </div>
                      {cls.notes && (
                        <div className="class-notes-preview">
                          <FileText size={14} />
                          <span>{cls.notes}</span>
                        </div>
                      )}
                      <button className="btn-join-now">
                        <Video size={16} />
                        Join Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Classes */}
            <div className="section-card">
              <h3 className="section-title">📅 Upcoming Classes</h3>
              <div className="classes-list">
                {upcomingClasses.map(cls => (
                  <div key={cls.id} className="class-item upcoming">
                    <div className="class-item-header">
                      <div className="class-badge upcoming">
                        {getStatusBadge('upcoming').icon} {getStatusBadge('upcoming').text}
                      </div>
                      <span className="class-date">{cls.date}</span>
                    </div>
                    <h4 className="class-title">{cls.title}</h4>
                    <div className="class-meta">
                      <span>👨‍🏫 {cls.instructor}</span>
                      <span>📚 {cls.course}</span>
                      <span>🕐 {cls.time}</span>
                    </div>
                    <button className="btn-set-reminder">
                      <Bell size={16} />
                      Set Reminder
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor Info */}
            <div className="section-card">
              <h3 className="section-title">🧑‍🏫 Instructors</h3>
              <div className="instructors-grid">
                {instructors.map(instructor => (
                  <div key={instructor.id} className="instructor-card">
                    <div className="instructor-avatar">
                      {instructor.avatar ? (
                        <img src={instructor.avatar} alt={instructor.name} />
                      ) : (
                        <div className="avatar-placeholder">
                          {instructor.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="instructor-info">
                      <h4 className="instructor-name">{instructor.name}</h4>
                      <p className="instructor-subject">{instructor.subject}</p>
                      <div className="instructor-contact">
                        <div className="contact-item">
                          <Mail size={14} />
                          <span>{instructor.email}</span>
                        </div>
                        <div className="contact-item">
                          <Phone size={14} />
                          <span>{instructor.phone}</span>
                        </div>
                        <div className="contact-item">
                          <Clock size={14} />
                          <span>{instructor.officeHours}</span>
                        </div>
                      </div>
                      <button className="btn-message">
                        <MessageCircle size={16} />
                        Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="schedule-section">
            <div className="schedule-controls">
              <div className="view-mode-selector">
                <button 
                  className={`view-btn ${viewMode === 'day' ? 'active' : ''}`}
                  onClick={() => setViewMode('day')}
                >
                  Day
                </button>
                <button 
                  className={`view-btn ${viewMode === 'week' ? 'active' : ''}`}
                  onClick={() => setViewMode('week')}
                >
                  Week
                </button>
                <button 
                  className={`view-btn ${viewMode === 'month' ? 'active' : ''}`}
                  onClick={() => setViewMode('month')}
                >
                  Month
                </button>
              </div>
              <select 
                className="course-filter"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="all">All Courses</option>
                <option value="Web Development">Web Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Mobile Development">Mobile Development</option>
              </select>
            </div>

            <div className="calendar-placeholder">
              <Calendar size={48} />
              <p>Calendar view - Integrate with FullCalendar or React Big Calendar</p>
              <p className="calendar-note">Shows weekly/monthly schedule with color-coded classes</p>
            </div>
          </div>
        )}

        {/* Recordings Tab */}
        {activeTab === 'recordings' && (
          <div className="recordings-section">
            <div className="section-header">
              <h3 className="section-title">📼 Recorded Classes</h3>
              <div className="search-box">
                <Search size={18} />
                <input 
                  type="text" 
                  placeholder="Search recordings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="recordings-grid">
              {recordedClasses.map(recording => (
                <div key={recording.id} className="recording-card">
                  <div className="recording-thumbnail">
                    <Play size={48} />
                    <span className="recording-duration">{recording.duration}</span>
                  </div>
                  <div className="recording-info">
                    <h4 className="recording-title">{recording.title}</h4>
                    <p className="recording-meta">
                      👨‍🏫 {recording.instructor} • 📚 {recording.course}
                    </p>
                    <p className="recording-date">Uploaded: {recording.uploadDate}</p>
                    
                    <div className="recording-progress">
                      <div className="progress-bar-small">
                        <div 
                          className="progress-fill-small" 
                          style={{ width: `${recording.progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{recording.progress}% watched</span>
                    </div>

                    <div className="recording-actions">
                      <button className="btn-watch">
                        <Play size={16} />
                        Watch
                      </button>
                      <button className="btn-download">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="resources-section">
            <div className="section-header">
              <h3 className="section-title">📚 Class Resources</h3>
              <div className="resources-controls">
                <div className="search-box">
                  <Search size={18} />
                  <input 
                    type="text" 
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select 
                  className="course-filter"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="all">All Courses</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Data Science">Data Science</option>
                </select>
              </div>
            </div>

            <div className="resources-list">
              {filteredResources.map(resource => (
                <div key={resource.id} className="resource-item">
                  <div className="resource-icon">
                    {getFileIcon(resource.type)}
                  </div>
                  <div className="resource-info">
                    <h4 className="resource-name">{resource.name}</h4>
                    <div className="resource-meta">
                      <span>📚 {resource.course}</span>
                      <span>📅 {resource.uploadDate}</span>
                      <span>💾 {resource.size}</span>
                    </div>
                  </div>
                  <div className="resource-actions">
                    <button className="btn-view">View</button>
                    <button className="btn-download-resource">
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <div className="attendance-section">
            <div className="attendance-summary">
              <div className="summary-card">
                <h3>Attendance Overview</h3>
                <div className="attendance-percentage">
                  <div className="percentage-circle">
                    <span className="percentage-value">{classStats.averageAttendance}%</span>
                  </div>
                  <p>Overall Attendance</p>
                </div>
              </div>
              <div className="attendance-breakdown">
                <div className="breakdown-item">
                  <CheckCircle size={20} color="#059669" />
                  <span>Present: {classStats.attended}</span>
                </div>
                <div className="breakdown-item">
                  <XCircle size={20} color="#dc2626" />
                  <span>Absent: {classStats.missed}</span>
                </div>
              </div>
            </div>

            <div className="attendance-table-container">
              <div className="section-header">
                <h3 className="section-title">Attendance Records</h3>
                <button className="btn-download-report">
                  <Download size={16} />
                  Download Report
                </button>
              </div>
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Class Title</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map(record => {
                    const badge = getStatusBadge(record.status);
                    return (
                      <tr key={record.id}>
                        <td>{record.date}</td>
                        <td>{record.title}</td>
                        <td>
                          <span className={`status-badge ${record.status}`}>
                            {badge.icon} {badge.text}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="attendance-chart-placeholder">
              <h3>Attendance Trend</h3>
              <p>Line chart showing attendance over time</p>
            </div>
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div className="notes-section">
            <div className="section-header">
              <h3 className="section-title">📝 Class Notes</h3>
              <button className="btn-add-note">+ Add Note</button>
            </div>

            <div className="notes-list">
              {classNotes.map(note => (
                <div key={note.id} className="note-card">
                  <div className="note-header">
                    <h4 className="note-title">{note.title}</h4>
                    <span className={`note-privacy ${note.isPrivate ? 'private' : 'public'}`}>
                      {note.isPrivate ? '🔒 Private' : '🌐 Public'}
                    </span>
                  </div>
                  <p className="note-class">{note.classTitle}</p>
                  <p className="note-content">{note.content}</p>
                  <div className="note-footer">
                    <span className="note-date">{note.date}</span>
                    <div className="note-actions">
                      <button className="btn-edit-note">Edit</button>
                      <button className="btn-delete-note">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default ClassModule;
