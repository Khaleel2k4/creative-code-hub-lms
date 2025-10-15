import React, { useState, useEffect } from "react";
import { 
  Bell, Moon, Sun, User, Users, BookOpen, GraduationCap, BarChart2, 
  ChevronDown, ChevronRight, FileText, Megaphone, TrendingUp, 
  Award, BarChart3, Activity, Settings, LogOut, Mail, Search, 
  Filter, Plus, Download, Edit, Trash2, Eye, Calendar, Tag,
  CheckCircle, Star, Target, Clock, UserCheck, UserPlus,
  BarChart4, TrendingDown, BarChart, PieChart, LineChart,
  XCircle, List, AlignLeft, Mouse, Building2, School,
  Target as TargetIcon, Bookmark, Shield, CreditCard
} from "lucide-react";

// Configuration for dynamic content
const sectionConfig = {
  dashboard: {
    title: "Dashboard Overview",
    subtitle: "Here's what's happening with your platform today",
    renderType: 'dashboard',
    tabs: {},
    icon: BarChart2
  },
  colleges: {
    title: "Colleges Management",
    subtitle: "Manage and monitor all college activities",
    renderType: 'crud',
    icon: GraduationCap,
    tabs: {
      list: { label: "College List", type: 'table' },
      create: { label: "Create College", type: 'form' },
      analytics: { label: "College Analytics", type: 'analytics' },
      manage: { label: "Manage Colleges", type: 'manage' }
    }
  },
  mentors: {
    title: "Mentors Management",
    subtitle: "Oversee mentor performance and assignments",
    renderType: 'crud',
    icon: Users,
    tabs: {
      list: { label: "Mentor List", type: 'table' },
      create: { label: "Create Mentor", type: 'form' },
      performance: { label: "Mentor Performance", type: 'performance' },
      assign: { label: "Assign Courses", type: 'assign' }
    }
  },
  students: {
    title: "Students Management",
    subtitle: "Track student progress and enrollment",
    renderType: 'crud',
    icon: User,
    tabs: {
      list: { label: "Student List", type: 'table' },
      create: { label: "Create Student", type: 'form' },
      progress: { label: "Student Progress", type: 'progress' },
      enrollment: { label: "Enrollment Stats", type: 'enrollment' }
    }
  },
  courses: {
    title: "Courses Management",
    subtitle: "Manage course catalog, categories, and analytics",
    renderType: 'crud',
    icon: BookOpen,
    tabs: {
      list: { label: "Course List", type: 'cards' },
      create: { label: "Create Course", type: 'form' },
      analytics: { label: "Course Analytics", type: 'analytics' }
    }
  },
  assessments: {
    title: "Assessments Management",
    subtitle: "Create and manage assessments and results",
    renderType: 'crud',
    icon: FileText,
    tabs: {
      list: { label: "All Assessments", type: 'table' },
      create: { label: "Create Assessment", type: 'form' },
      results: { label: "Assessment Results", type: 'results' },
      questions: { label: "Question Bank", type: 'questions' },
      grading: { label: "Grading System", type: 'grading' }
    }
  },
  announcements: {
    title: "Announcements Management",
    subtitle: "Create and schedule platform announcements",
    renderType: 'crud',
    icon: Megaphone,
    tabs: {
      list: { label: "All Announcements", type: 'table' },
      create: { label: "Create Announcement", type: 'form' },
      templates: { label: "Templates", type: 'templates' },
      scheduled: { label: "Scheduled Posts", type: 'scheduled' },
      analytics: { label: "Analytics", type: 'analytics' }
    }
  }
};

// Navigation configuration
const navConfig = {
  dashboard: {
    icon: BarChart2,
    label: "Dashboard",
    type: 'single'
  },
  colleges: {
    icon: GraduationCap,
    label: "Our Colleges",
    type: 'dropdown',
    items: [
      { section: 'colleges', tab: 'list', label: 'College List' },
      { section: 'colleges', tab: 'create', label: 'Create College' },
      { section: 'colleges', tab: 'analytics', label: 'College Analytics' },
      { section: 'colleges', tab: 'manage', label: 'Manage Colleges' }
    ]
  },
  mentors: {
    icon: Users,
    label: "Mentor Report",
    type: 'dropdown',
    items: [
      { section: 'mentors', tab: 'list', label: 'Mentor List' },
      { section: 'mentors', tab: 'create', label: 'Create Mentor' },
      { section: 'mentors', tab: 'performance', label: 'Mentor Performance' },
      { section: 'mentors', tab: 'assign', label: 'Assign Courses' }
    ]
  },
  students: {
    icon: User,
    label: "Student Report",
    type: 'dropdown',
    items: [
      { section: 'students', tab: 'list', label: 'Student List' },
      { section: 'students', tab: 'create', label: 'Create Student' },
      { section: 'students', tab: 'progress', label: 'Student Progress' },
      { section: 'students', tab: 'enrollment', label: 'Enrollment Stats' }
    ]
  },
  courses: {
    icon: BookOpen,
    label: "Course List",
    type: 'dropdown',
    items: [
      { section: 'courses', tab: 'list', label: 'Course List' },
      { section: 'courses', tab: 'create', label: 'Create Course' },
      { section: 'courses', tab: 'analytics', label: 'Course Analytics' }
    ]
  },
  assessments: {
    icon: FileText,
    label: "Assessment",
    type: 'dropdown',
    items: [
      { section: 'assessments', tab: 'list', label: 'All Assessments' },
      { section: 'assessments', tab: 'create', label: 'Create Assessment' },
      { section: 'assessments', tab: 'results', label: 'Assessment Results' },
      { section: 'assessments', tab: 'questions', label: 'Question Bank' },
      { section: 'assessments', tab: 'grading', label: 'Grading System' }
    ]
  },
  announcements: {
    icon: Megaphone,
    label: "Announcement",
    type: 'dropdown',
    items: [
      { section: 'announcements', tab: 'list', label: 'All Announcements' },
      { section: 'announcements', tab: 'create', label: 'Create Announcement' },
      { section: 'announcements', tab: 'templates', label: 'Templates' },
      { section: 'announcements', tab: 'scheduled', label: 'Scheduled Posts' },
      { section: 'announcements', tab: 'analytics', label: 'Analytics' }
    ]
  }
};

// Mock data functions
const fetchDashboardData = () => ({
  stats: {
    totalStudents: 1245,
    activeStudents: 842,
    totalMentors: 56,
    activeCourses: 24,
    totalColleges: 18,
    pendingTasks: 12
  },
  activeCourses: [
    { name: 'Web Development', students: 245, color: '#4f46e5' },
    { name: 'Data Science', students: 189, color: '#10b981' },
    { name: 'Mobile Development', students: 156, color: '#f59e0b' },
    { name: 'UI/UX Design', students: 132, color: '#ef4444' },
    { name: 'Digital Marketing', students: 98, color: '#8b5cf6' },
    { name: 'Cloud Computing', students: 76, color: '#06b6d4' }
  ],
  topMentors: [
    { name: 'Dr. Sarah Chen', courses: 8, students: 342, rating: 4.9 },
    { name: 'Prof. Mike Johnson', courses: 6, students: 287, rating: 4.8 },
    { name: 'Dr. Emily Davis', courses: 7, students: 265, rating: 4.9 },
    { name: 'Prof. Alex Brown', courses: 5, students: 198, rating: 4.7 },
    { name: 'Dr. Maria Garcia', courses: 4, students: 176, rating: 4.8 }
  ],
  collegeAnalysis: [
    { name: 'Tech University', students: 345, courses: 12, mentors: 8 },
    { name: 'Engineering College', students: 287, courses: 10, mentors: 7 },
    { name: 'Business School', students: 234, courses: 8, mentors: 5 },
    { name: 'Design Institute', students: 198, courses: 6, mentors: 4 },
    { name: 'Science College', students: 156, courses: 5, mentors: 3 }
  ],
  studentActivity: [
    { activity: 'Active Learning', students: 642, color: '#10b981' },
    { activity: 'Course Completed', students: 234, color: '#3b82f6' },
    { activity: 'Assessment Taken', students: 567, color: '#f59e0b' },
    { activity: 'Projects Submitted', students: 189, color: '#ef4444' },
    { activity: 'Inactive', students: 203, color: '#6b7280' }
  ],
  notifications: [
    { id: 1, type: 'info', message: 'New student registration pending approval', time: '5 mins ago', read: false },
    { id: 2, type: 'success', message: 'Course "Web Development" has been completed by 15 students', time: '1 hour ago', read: true },
    { id: 3, type: 'warning', message: 'Low attendance in "Data Science" course', time: '2 hours ago', read: false },
    { id: 4, type: 'info', message: 'New mentor application received', time: '3 hours ago', read: true },
    { id: 5, type: 'info', message: 'System maintenance scheduled for tonight', time: '4 hours ago', read: false }
  ]
});

const getTableData = (section, tab) => {
  const data = {
    colleges: {
      list: [
        { id: 1, name: 'Tech University', location: 'New York', students: 345, courses: 12, status: 'Active' },
        { id: 2, name: 'Engineering College', location: 'San Francisco', students: 287, courses: 10, status: 'Active' },
        { id: 3, name: 'Business School', location: 'Chicago', students: 234, courses: 8, status: 'Active' },
        { id: 4, name: 'Design Institute', location: 'Los Angeles', students: 198, courses: 6, status: 'Active' },
        { id: 5, name: 'Science College', location: 'Boston', students: 156, courses: 5, status: 'Inactive' }
      ]
    },
    mentors: {
      list: [
        { id: 1, name: 'Dr. Sarah Chen', email: 'sarah@university.edu', courses: 8, students: 342, status: 'Active' },
        { id: 2, name: 'Prof. Mike Johnson', email: 'mike@university.edu', courses: 6, students: 287, status: 'Active' },
        { id: 3, name: 'Dr. Emily Davis', email: 'emily@university.edu', courses: 7, students: 265, status: 'Active' },
        { id: 4, name: 'Prof. Alex Brown', email: 'alex@university.edu', courses: 5, students: 198, status: 'Inactive' },
        { id: 5, name: 'Dr. Maria Garcia', email: 'maria@university.edu', courses: 4, students: 176, status: 'Active' }
      ]
    },
    students: {
      list: [
        { id: 1, name: 'John Smith', email: 'john@student.edu', college: 'Tech University', courses: 5, status: 'Active' },
        { id: 2, name: 'Emma Wilson', email: 'emma@student.edu', college: 'Engineering College', courses: 4, status: 'Active' },
        { id: 3, name: 'Michael Brown', email: 'michael@student.edu', college: 'Business School', courses: 3, status: 'Active' },
        { id: 4, name: 'Sarah Johnson', email: 'sarah@student.edu', college: 'Design Institute', courses: 6, status: 'Inactive' },
        { id: 5, name: 'David Lee', email: 'david@student.edu', college: 'Science College', courses: 4, status: 'Active' }
      ]
    },
    courses: {
      list: [
        { 
          id: 1, 
          name: 'Web Development', 
          category: 'Technology', 
          students: 245, 
          duration: '12 weeks', 
          status: 'Active',
          instructor: 'Dr. Sarah Chen',
          rating: 4.8,
          enrolled: 245,
          progress: 78,
          color: '#4f46e5',
          description: 'Learn modern web development with HTML, CSS, JavaScript and React',
          price: '$199'
        },
        { 
          id: 2, 
          name: 'Data Science', 
          category: 'Technology', 
          students: 189, 
          duration: '16 weeks', 
          status: 'Active',
          instructor: 'Prof. Mike Johnson',
          rating: 4.9,
          enrolled: 189,
          progress: 65,
          color: '#10b981',
          description: 'Master data analysis, machine learning and statistical modeling',
          price: '$249'
        },
        { 
          id: 3, 
          name: 'Mobile Development', 
          category: 'Technology', 
          students: 156, 
          duration: '14 weeks', 
          status: 'Active',
          instructor: 'Dr. Emily Davis',
          rating: 4.7,
          enrolled: 156,
          progress: 82,
          color: '#f59e0b',
          description: 'Build cross-platform mobile apps with React Native and Flutter',
          price: '$179'
        },
        { 
          id: 4, 
          name: 'UI/UX Design', 
          category: 'Design', 
          students: 132, 
          duration: '10 weeks', 
          status: 'Active',
          instructor: 'Prof. Alex Brown',
          rating: 4.8,
          enrolled: 132,
          progress: 71,
          color: '#ef4444',
          description: 'Learn user-centered design principles and prototyping tools',
          price: '$159'
        },
        { 
          id: 5, 
          name: 'Digital Marketing', 
          category: 'Business', 
          students: 98, 
          duration: '8 weeks', 
          status: 'Inactive',
          instructor: 'Dr. Maria Garcia',
          rating: 4.6,
          enrolled: 98,
          progress: 45,
          color: '#8b5cf6',
          description: 'Master SEO, social media marketing and digital advertising',
          price: '$129'
        },
        { 
          id: 6, 
          name: 'Cloud Computing', 
          category: 'Technology', 
          students: 76, 
          duration: '12 weeks', 
          status: 'Active',
          instructor: 'Prof. James Wilson',
          rating: 4.9,
          enrolled: 76,
          progress: 88,
          color: '#06b6d4',
          description: 'Learn AWS, Azure and Google Cloud platform services',
          price: '$299'
        },
        { 
          id: 7, 
          name: 'Python Programming', 
          category: 'Technology', 
          students: 210, 
          duration: '10 weeks', 
          status: 'Active',
          instructor: 'Dr. Lisa Anderson',
          rating: 4.7,
          enrolled: 210,
          progress: 73,
          color: '#059669',
          description: 'From basics to advanced Python programming and applications',
          price: '$169'
        },
        { 
          id: 8, 
          name: 'Java Development', 
          category: 'Technology', 
          students: 145, 
          duration: '14 weeks', 
          status: 'Active',
          instructor: 'Prof. Robert Taylor',
          rating: 4.8,
          enrolled: 145,
          progress: 69,
          color: '#dc2626',
          description: 'Comprehensive Java programming and enterprise development',
          price: '$189'
        },
        { 
          id: 9, 
          name: 'Node.js Backend', 
          category: 'Technology', 
          students: 167, 
          duration: '12 weeks', 
          status: 'Active',
          instructor: 'Dr. Jennifer Martinez',
          rating: 4.8,
          enrolled: 167,
          progress: 81,
          color: '#d97706',
          description: 'Build scalable backend applications with Node.js and Express',
          price: '$179'
        }
      ]
    },
    assessments: {
      list: [
        { id: 1, name: 'Web Development Final Exam', course: 'Web Development', students: 45, date: '2024-01-15', status: 'Completed' },
        { id: 2, name: 'Data Science Midterm', course: 'Data Science', students: 32, date: '2024-01-20', status: 'Pending' },
        { id: 3, name: 'Mobile Development Quiz', course: 'Mobile Development', students: 28, date: '2024-01-25', status: 'Draft' },
        { id: 4, name: 'UI/UX Design Project', course: 'UI/UX Design', students: 25, date: '2024-02-01', status: 'Completed' },
        { id: 5, name: 'Digital Marketing Test', course: 'Digital Marketing', students: 20, date: '2024-02-05', status: 'Pending' }
      ]
    },
    announcements: {
      list: [
        { id: 1, title: 'System Maintenance', content: 'Scheduled maintenance this weekend', type: 'Info', date: '2024-01-10', status: 'Published' },
        { id: 2, title: 'New Course Available', content: 'New Data Science course is now available', type: 'Success', date: '2024-01-08', status: 'Published' },
        { id: 3, title: 'Holiday Schedule', content: 'College will be closed for holidays', type: 'Warning', date: '2024-01-05', status: 'Draft' },
        { id: 4, title: 'Scholarship Applications', content: 'Apply for scholarships now', type: 'Info', date: '2024-01-03', status: 'Published' },
        { id: 5, title: 'Career Fair', content: 'Annual career fair next month', type: 'Success', date: '2024-01-01', status: 'Scheduled' }
      ]
    }
  };
  return data[section]?.[tab] || [];
};

const getFormFields = (section) => {
  const forms = {
    colleges: [
      { name: 'name', label: 'College Name', type: 'text', placeholder: 'Enter college name', required: true, grid: 'half' },
      { name: 'location', label: 'Location', type: 'text', placeholder: 'Enter location', required: true, grid: 'half' },
      { name: 'email', label: 'Contact Email', type: 'email', placeholder: 'Enter contact email', required: true, grid: 'half' },
      { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Enter phone number', required: true, grid: 'half' },
      { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter college description', required: false, grid: 'full' }
    ],
    mentors: [
      { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter mentor\'s full name', required: true, grid: 'half' },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email address', required: true, grid: 'half' },
      { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Enter phone number', required: true, grid: 'half' },
      { name: 'specialization', label: 'Specialization', type: 'select', options: ['Technology', 'Design', 'Business', 'Science'], required: true, grid: 'half' },
      { name: 'bio', label: 'Bio', type: 'textarea', placeholder: 'Enter mentor bio', required: false, grid: 'full' },
      { name: 'experience', label: 'Experience (Years)', type: 'number', placeholder: 'Enter years of experience', required: true, grid: 'half' }
    ],
    students: [
      { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter student\'s full name', required: true, grid: 'half' },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email address', required: true, grid: 'half' },
      { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Enter phone number', required: true, grid: 'half' },
      { name: 'college', label: 'College', type: 'select', options: ['Tech University', 'Engineering College', 'Business School', 'Design Institute', 'Science College'], required: true, grid: 'half' },
      { name: 'dob', label: 'Date of Birth', type: 'date', required: true, grid: 'half' },
      { name: 'enrollmentDate', label: 'Enrollment Date', type: 'date', required: true, grid: 'half' },
      { name: 'address', label: 'Address', type: 'textarea', placeholder: 'Enter student address', required: false, grid: 'full' }
    ],
    courses: [
      { name: 'name', label: 'Course Name', type: 'text', placeholder: 'Enter course name', required: true, grid: 'half' },
      { name: 'category', label: 'Category', type: 'select', options: ['Technology', 'Design', 'Business', 'Science', 'Arts'], required: true, grid: 'half' },
      { name: 'duration', label: 'Duration (weeks)', type: 'number', placeholder: 'Enter course duration', required: true, grid: 'half' },
      { name: 'price', label: 'Price ($)', type: 'number', placeholder: 'Enter course price', required: true, grid: 'half' },
      { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter course description', required: false, grid: 'full' },
      { name: 'objectives', label: 'Learning Objectives', type: 'textarea', placeholder: 'Enter learning objectives (one per line)', required: false, grid: 'full' }
    ],
    assessments: [
      { name: 'name', label: 'Assessment Name', type: 'text', placeholder: 'Enter assessment name', required: true, grid: 'half' },
      { name: 'course', label: 'Course', type: 'select', options: ['Web Development', 'Data Science', 'Mobile Development', 'UI/UX Design', 'Digital Marketing'], required: true, grid: 'half' },
      { name: 'dueDate', label: 'Due Date', type: 'datetime-local', required: true, grid: 'half' },
      { name: 'timeLimit', label: 'Time Limit (minutes)', type: 'number', placeholder: 'Enter time limit', required: true, grid: 'half' },
      { name: 'instructions', label: 'Instructions', type: 'textarea', placeholder: 'Enter assessment instructions', required: false, grid: 'full' },
      { name: 'type', label: 'Assessment Type', type: 'select', options: ['Quiz', 'Exam', 'Assignment', 'Project'], required: true, grid: 'half' },
      { name: 'points', label: 'Total Points', type: 'number', placeholder: 'Enter total points', required: true, grid: 'half' }
    ],
    announcements: [
      { name: 'title', label: 'Title', type: 'text', placeholder: 'Enter announcement title', required: true, grid: 'half' },
      { name: 'type', label: 'Type', type: 'select', options: ['Information', 'Success', 'Warning', 'Urgent'], required: true, grid: 'half' },
      { name: 'content', label: 'Content', type: 'textarea', placeholder: 'Enter announcement content', required: true, grid: 'full' },
      { name: 'audience', label: 'Target Audience', type: 'select', options: ['All Users', 'Students Only', 'Mentors Only', 'Specific Groups'], required: true, grid: 'half' },
      { name: 'publishDate', label: 'Publish Date', type: 'datetime-local', required: true, grid: 'half' }
    ]
  };
  return forms[section] || [];
};

// Reusable Components
const StatCard = ({ label, value, trend, icon: Icon, trendType = 'positive' }) => (
  <div className="stat-card">
    <div className="stat-content">
      <div>
        <p className="stat-label">{label}</p>
        <p className="stat-value">{typeof value === 'number' ? value.toLocaleString() : value}</p>
        <p className={`stat-trend ${trendType}`}>{trend}</p>
      </div>
      <div className="stat-icon-wrapper">
        <Icon className="stat-icon" />
      </div>
    </div>
  </div>
);

const DataTable = ({ data, columns, onEdit, onDelete, onView }) => (
  <div className="table-wrapper">
    <table className="data-table">
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key}>{col.title}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row.id || index}>
            {columns.map(col => (
              <td key={col.key}>
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
            <td>
              <div className="action-buttons">
                {onView && (
                  <button className="btn-icon" title="View" onClick={() => onView(row)}>
                    <Eye size={16} />
                  </button>
                )}
                {onEdit && (
                  <button className="btn-icon" title="Edit" onClick={() => onEdit(row)}>
                    <Edit size={16} />
                  </button>
                )}
                {onDelete && (
                  <button className="btn-icon" title="Delete" onClick={() => onDelete(row)}>
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CourseCard = ({ course, onEdit, onDelete, onView }) => {
  const getProgressColor = (progress) => {
    if (progress >= 80) return '#10b981';
    if (progress >= 60) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="course-card">
      <div className="course-card-header" style={{ backgroundColor: course.color }}>
        <div className="course-icon">
          <BookOpen size={24} />
        </div>
        <div className="course-badge">
          <span className={`status-badge ${course.status.toLowerCase()}`}>
            {course.status}
          </span>
        </div>
      </div>
      
      <div className="course-card-content">
        <div className="course-title-section">
          <h3 className="course-title">{course.name}</h3>
          <p className="course-category">{course.category}</p>
        </div>
        
        <p className="course-description">{course.description}</p>
        
        <div className="course-instructor">
          <User size={14} />
          <span>{course.instructor}</span>
        </div>
        
        <div className="course-stats">
          <div className="course-stat">
            <Users size={14} />
            <span>{course.enrolled} students</span>
          </div>
          <div className="course-stat">
            <Clock size={14} />
            <span>{course.duration}</span>
          </div>
          <div className="course-stat">
            <Star size={14} />
            <span>{course.rating}</span>
          </div>
        </div>
        
        <div className="course-progress">
          <div className="progress-header">
            <span>Progress</span>
            <span>{course.progress}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ 
                width: `${course.progress}%`,
                backgroundColor: getProgressColor(course.progress)
              }}
            />
          </div>
        </div>
        
        <div className="course-price-section">
          <div className="course-price">{course.price}</div>
          <div className="course-actions">
            <button className="btn-icon" title="View" onClick={() => onView(course)}>
              <Eye size={16} />
            </button>
            <button className="btn-icon" title="Edit" onClick={() => onEdit(course)}>
              <Edit size={16} />
            </button>
            <button className="btn-icon" title="Delete" onClick={() => onDelete(course)}>
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseDetailsView = ({ course, onClose, onEdit, onDelete }) => {
  const [activeTopic, setActiveTopic] = useState(0);
  
  const courseContent = {
    topics: [
      {
        id: 1,
        title: "Introduction",
        description: "Get started with the course",
        content: `
          <h2>Welcome to ${course.name}</h2>
          <p>This course will teach you everything you need to know about ${course.name}.</p>
          <h3>What you'll learn:</h3>
          <ul>
            <li>Fundamental concepts and principles</li>
            <li>Practical skills and techniques</li>
            <li>Real-world applications</li>
            <li>Best practices and industry standards</li>
          </ul>
          <div class="example-box">
            <h3>Example 1: Basic Concept</h3>
            <p>Here's a simple example to get you started:</p>
            <div class="code-example">
              // Your first example code here
              console.log("Hello, ${course.name}!");
            </div>
          </div>
        `
      },
      {
        id: 2,
        title: "Getting Started",
        description: "Setup and basic concepts",
        content: `
          <h2>Getting Started with ${course.name}</h2>
          <p>Let's dive into the basics and set up your development environment.</p>
          
          <div class="example-box">
            <h3>Example 1: Environment Setup</h3>
            <p>Setting up your workspace:</p>
            <div class="code-example">
              # Install required tools
              npm install -g ${course.name.toLowerCase()}-tools
              
              # Initialize project
              ${course.name.toLowerCase()} init my-project
            </div>
          </div>
          
          <div class="example-box">
            <h3>Example 2: Basic Syntax</h3>
            <p>Understanding the fundamental syntax:</p>
            <div class="code-example">
              // Basic structure
              function main() {
                return "Hello, ${course.name}!";
              }
            </div>
          </div>
        `
      },
      {
        id: 3,
        title: "Core Concepts",
        description: "Deep dive into main topics",
        content: `
          <h2>Core Concepts of ${course.name}</h2>
          <p>Master the essential concepts that form the foundation of ${course.name}.</p>
          
          <div class="example-box">
            <h3>Example 1: Data Structures</h3>
            <p>Working with common data structures:</p>
            <div class="code-example">
              // Example data structure
              const data = {
                students: ${course.enrolled},
                rating: ${course.rating},
                duration: "${course.duration}"
              };
            </div>
          </div>
          
          <div class="example-box">
            <h3>Example 2: Advanced Techniques</h3>
            <p>Implementing advanced patterns:</p>
            <div class="code-example">
              // Advanced pattern example
              class ${course.name.replace(/\s+/g, '')}Course {
                constructor() {
                  this.name = "${course.name}";
                  this.progress = ${course.progress};
                }
                
                updateProgress(value) {
                  this.progress = value;
                }
              }
            </div>
          </div>
        `
      },
      {
        id: 4,
        title: "Advanced Topics",
        description: "Expert-level concepts and techniques",
        content: `
          <h2>Advanced ${course.name} Topics</h2>
          <p>Explore advanced concepts and real-world applications.</p>
          
          <div class="example-box">
            <h3>Example 1: Performance Optimization</h3>
            <p>Techniques for optimizing your ${course.name} applications:</p>
            <div class="code-example">
              // Performance optimization example
              function optimizePerformance() {
                // Cache frequently used data
                const cache = new Map();
                
                return function(data) {
                  if (!cache.has(data)) {
                    cache.set(data, processData(data));
                  }
                  return cache.get(data);
                };
              }
            </div>
          </div>
          
          <div class="example-box">
            <h3>Example 2: Integration Patterns</h3>
            <p>How to integrate ${course.name} with other technologies:</p>
            <div class="code-example">
              // Integration example
              async function integrateWithAPI() {
                try {
                  const response = await fetch('/api/${course.name.toLowerCase()}');
                  const data = await response.json();
                  return processIntegration(data);
                } catch (error) {
                  handleError(error);
                }
              }
            </div>
          </div>
        `
      },
      {
        id: 5,
        title: "Projects & Practice",
        description: "Hands-on projects and exercises",
        content: `
          <h2>${course.name} Projects & Practice</h2>
          <p>Apply your knowledge with real projects and exercises.</p>
          
          <div class="example-box">
            <h3>Example 1: Building a Complete Application</h3>
            <p>Create a full-featured ${course.name} application:</p>
            <div class="code-example">
              // Main application structure
              class ${course.name.replace(/\s+/g, '')}App {
                constructor() {
                  this.features = [
                    "User authentication",
                    "Data management",
                    "Real-time updates",
                    "Advanced analytics"
                  ];
                }
                
                initialize() {
                  this.setupRoutes();
                  this.configureDatabase();
                  this.enableFeatures();
                }
              }
            </div>
          </div>
          
          <div class="example-box">
            <h3>Example 2: Testing and Deployment</h3>
            <p>Testing and deploying your ${course.name} projects:</p>
            <div class="code-example">
              // Testing and deployment setup
              describe('${course.name} Application', () => {
                it('should handle user interactions', () => {
                  const app = new ${course.name.replace(/\s+/g, '')}App();
                  expect(app.initialize()).toBeTruthy();
                });
                
                it('should deploy successfully', () => {
                  const result = deployToProduction();
                  expect(result.status).toBe('success');
                });
              });
            </div>
          </div>
        `
      }
    ],
    exercises: [
      { id: 1, title: "Basic Setup Exercise", difficulty: "Beginner" },
      { id: 2, title: "Data Manipulation", difficulty: "Intermediate" },
      { id: 3, title: "Advanced Project", difficulty: "Advanced" }
    ],
    resources: [
      { id: 1, title: "Official Documentation", type: "Documentation" },
      { id: 2, title: "Video Tutorials", type: "Video" },
      { id: 3, title: "Community Forum", type: "Community" }
    ]
  };

  return (
    <div className="course-details-overlay">
      <div className="course-details-container">
        <div className="course-details-header">
          <div className="course-details-title">
            <button className="back-btn" onClick={onClose}>
              <ChevronRight className="back-icon" />
              Back to Courses
            </button>
            <h1>{course.name}</h1>
            <p className="course-details-description">{course.description}</p>
          </div>
          <div className="course-details-actions">
            <button className="btn btn-outline" onClick={() => onEdit(course)}>
              <Edit size={16} />
              Edit Course
            </button>
            <button className="btn btn-danger" onClick={() => onDelete(course)}>
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>

        <div className="course-details-content">
          <div className="course-sidebar">
            <div className="sidebar-section">
              <h3>Course Content</h3>
              <div className="topics-list">
                {courseContent.topics.map((topic, index) => (
                  <div
                    key={topic.id}
                    className={`topic-item ${activeTopic === index ? 'active' : ''}`}
                    onClick={() => setActiveTopic(index)}
                  >
                    <div className="topic-number">{index + 1}</div>
                    <div className="topic-info">
                      <div className="topic-title">{topic.title}</div>
                      <div className="topic-description">{topic.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <h3>Exercises</h3>
              <div className="exercises-list">
                {courseContent.exercises.map(exercise => (
                  <div key={exercise.id} className="exercise-item">
                    <FileText size={16} />
                    <span>{exercise.title}</span>
                    <span className={`difficulty-badge ${exercise.difficulty.toLowerCase()}`}>
                      {exercise.difficulty}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <h3>Resources</h3>
              <div className="resources-list">
                {courseContent.resources.map(resource => (
                  <div key={resource.id} className="resource-item">
                    <BookOpen size={16} />
                    <span>{resource.title}</span>
                    <span className="resource-type">{resource.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="course-main-content">
            <div className="content-header">
              <h2>{courseContent.topics[activeTopic].title}</h2>
              <div className="content-actions">
                <button className="btn btn-outline">
                  <Download size={16} />
                  Download PDF
                </button>
                <button className="btn btn-outline">
                  <Bookmark size={16} />
                  Bookmark
                </button>
              </div>
            </div>

            <div className="content-body">
              <div 
                className="topic-content"
                dangerouslySetInnerHTML={{ __html: courseContent.topics[activeTopic].content }}
              />
            </div>

            <div className="content-navigation">
              {activeTopic > 0 && (
                <button 
                  className="btn btn-outline"
                  onClick={() => setActiveTopic(activeTopic - 1)}
                >
                  <ChevronRight className="prev-icon" />
                  Previous Topic
                </button>
              )}
              
              {activeTopic < courseContent.topics.length - 1 && (
                <button 
                  className="btn btn-primary"
                  onClick={() => setActiveTopic(activeTopic + 1)}
                >
                  Next Topic
                  <ChevronRight className="next-icon" />
                </button>
              )}
              
              {activeTopic === courseContent.topics.length - 1 && (
                <button className="btn btn-success">
                  <CheckCircle size={16} />
                  Complete Course
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DynamicForm = ({ fields, onSubmit, onCancel, title }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const groupFieldsByGrid = () => {
    const halfFields = fields.filter(field => field.grid === 'half');
    const fullFields = fields.filter(field => field.grid === 'full');
    
    const rows = [];
    for (let i = 0; i < halfFields.length; i += 2) {
      rows.push(halfFields.slice(i, i + 2));
    }
    
    fullFields.forEach(field => {
      rows.push([field]);
    });
    
    return rows;
  };

  const fieldRows = groupFieldsByGrid();

  return (
    <form className="form" onSubmit={handleSubmit}>
      {fieldRows.map((row, rowIndex) => (
        <div key={rowIndex} className={`form-row ${row.length === 1 ? 'single' : 'double'}`}>
          {row.map((field) => (
            <div key={field.name} className="form-group">
              <label>{field.label}{field.required && '*'}</label>
              {field.type === 'select' ? (
                <select 
                  value={formData[field.name] || ''} 
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  required={field.required}
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  required={field.required}
                  rows="4"
                />
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  required={field.required}
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <div className="form-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Create {title}
        </button>
      </div>
    </form>
  );
};

const PieChartComponent = ({ data, title, totalLabel = "Total" }) => {
  const total = data.reduce((sum, item) => sum + (item.students || item.value || 0), 0);
  
  return (
    <div className="pie-chart-container">
      <div className="pie-chart-wrapper">
        <div className="pie-chart">
          {data.map((item, index) => {
            const percentage = ((item.students || item.value || 0) / total) * 100;
            const rotation = data
              .slice(0, index)
              .reduce((sum, i) => sum + ((i.students || i.value || 0) / total) * 360, 0);
            
            return (
              <div
                key={item.name || item.activity}
                className="pie-segment"
                style={{
                  backgroundColor: item.color,
                  transform: `rotate(${rotation}deg)`,
                  clipPath: `polygon(50% 50%, 50% 0%, ${
                    percentage > 50 ? '100% 0%, 100% 100%, 0% 100%, 0% 0%' : ''
                  } 50% 0%)`
                }}
              />
            );
          })}
          <div className="pie-center-circle">
            <div className="pie-center-content">
              <span className="pie-center-text">{totalLabel}</span>
              <span className="pie-center-value">{total}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="pie-legend">
        {data.map((item) => {
          const percentage = ((item.students || item.value || 0) / total) * 100;
          return (
            <div key={item.name || item.activity} className="legend-item">
              <div className="legend-color" style={{ backgroundColor: item.color }} />
              <div className="legend-text">
                <span className="legend-label">{item.name || item.activity}</span>
                <span className="legend-value">
                  {percentage.toFixed(1)}% ({item.students || item.value})
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const BarChartComponent = ({ data, title }) => {
  const maxValue = Math.max(...data.map(item => item.students || item.value || 0));
  
  return (
    <div className="bar-chart-container">
      {data.map((item, index) => {
        const barHeight = ((item.students || item.value || 0) / maxValue) * 100;
        
        return (
          <div key={item.name || index} className="bar-item">
            <div className="bar-label">{item.name}</div>
            <div className="bar-wrapper">
              <div 
                className="bar-fill"
                style={{ height: `${barHeight}%` }}
              />
              <div className="bar-value">{item.students || item.value}</div>
            </div>
            <div className="bar-stats">
              {item.courses && (
                <div className="stat">
                  <BookOpen className="stat-icon" />
                  <span>{item.courses}</span>
                </div>
              )}
              {item.mentors && (
                <div className="stat">
                  <Users className="stat-icon" />
                  <span>{item.mentors}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Main Component
export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    stats: {},
    activeCourses: [],
    topMentors: [],
    collegeAnalysis: [],
    studentActivity: [],
    notifications: []
  });

  const [openMenus, setOpenMenus] = useState({});
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('overview');
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseDetails, setShowCourseDetails] = useState(false);

  // Dynamic handlers
  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleSectionChange = (section, tab = 'overview') => {
    setActiveSection(section);
    setActiveTab(tab);
  };

  const handleFormSubmit = (formData) => {
    console.log('Form submitted:', formData);
    alert(`Form submitted successfully! Data: ${JSON.stringify(formData, null, 2)}`);
  };

  const handleFormCancel = () => {
    const firstTab = Object.keys(sectionConfig[activeSection]?.tabs || {})[0];
    setActiveTab(firstTab);
  };

  const handleItemAction = (action, item) => {
    console.log(`${action} action:`, item);
    alert(`${action} ${sectionConfig[activeSection]?.title.replace(' Management', '')}: ${item.name || item.title}`);
  };

  const handleCourseView = (course) => {
    setSelectedCourse(course);
    setShowCourseDetails(true);
  };

  // Effects
  useEffect(() => {
    const data = fetchDashboardData();
    setDashboardData(data);
    const unreadCount = data.notifications.filter(n => !n.read).length;
    setUnreadNotifications(unreadCount);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Dynamic content renderers
  const renderDashboard = () => (
    <>
      <div className="stats-grid">
        <StatCard
          label="Total Students"
          value={dashboardData.stats.totalStudents || 0}
          trend="+12% from last month"
          icon={Users}
        />
        <StatCard
          label="Active Students"
          value={dashboardData.stats.activeStudents || 0}
          trend="+8% from last week"
          icon={UserCheck}
        />
        <StatCard
          label="Mentors"
          value={dashboardData.stats.totalMentors || 0}
          trend="+3 this month"
          icon={GraduationCap}
        />
        <StatCard
          label="Active Courses"
          value={dashboardData.stats.activeCourses || 0}
          trend="+5 this quarter"
          icon={BookOpen}
        />
        <StatCard
          label="Total Colleges"
          value={dashboardData.stats.totalColleges || 0}
          trend="+2 this year"
          icon={Building2}
        />
        <StatCard
          label="Pending Tasks"
          value={dashboardData.stats.pendingTasks || 0}
          trend="-3 from yesterday"
          icon={FileText}
          trendType="negative"
        />
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <BookOpen className="chart-icon" />
            <h3 className="chart-title">Active Courses Distribution</h3>
          </div>
          <PieChartComponent 
            data={dashboardData.activeCourses} 
            title="Active Courses"
            totalLabel="Total Students"
          />
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <Activity className="chart-icon" />
            <h3 className="chart-title">Student Activity Distribution</h3>
          </div>
          <PieChartComponent 
            data={dashboardData.studentActivity} 
            title="Student Activity"
            totalLabel="Total Students"
          />
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <Award className="chart-icon" />
            <h3 className="chart-title">Top Performing Mentors</h3>
          </div>
          <div className="mentors-list">
            {dashboardData.topMentors.map((mentor, index) => (
              <div key={mentor.name} className="mentor-item">
                <div className="mentor-rank">#{index + 1}</div>
                <div className="mentor-info">
                  <div className="mentor-name">{mentor.name}</div>
                  <div className="mentor-stats">
                    <span className="stat-item">
                      <BookOpen className="stat-icon" />
                      {mentor.courses} courses
                    </span>
                    <span className="stat-item">
                      <Users className="stat-icon" />
                      {mentor.students} students
                    </span>
                    <span className="stat-item">
                      <Star className="stat-icon" />
                      {mentor.rating} rating
                    </span>
                  </div>
                </div>
                <div className="mentor-badge">
                  <TrendingUp className="badge-icon" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <BarChart3 className="chart-icon" />
            <h3 className="chart-title">College Performance Analysis</h3>
          </div>
          <BarChartComponent data={dashboardData.collegeAnalysis} />
        </div>
      </div>
    </>
  );

  const getColumnsForSection = (section) => {
    const columnConfig = {
      colleges: [
        { key: 'name', title: 'Name' },
        { key: 'location', title: 'Location' },
        { key: 'students', title: 'Students' },
        { key: 'courses', title: 'Courses' },
        { 
          key: 'status', 
          title: 'Status',
          render: (value) => (
            <span className={`status-badge ${value.toLowerCase()}`}>
              {value}
            </span>
          )
        }
      ],
      mentors: [
        { key: 'name', title: 'Name' },
        { key: 'email', title: 'Email' },
        { key: 'courses', title: 'Courses' },
        { key: 'students', title: 'Students' },
        { 
          key: 'status', 
          title: 'Status',
          render: (value) => (
            <span className={`status-badge ${value.toLowerCase()}`}>
              {value}
            </span>
          )
        }
      ],
      students: [
        { key: 'name', title: 'Name' },
        { key: 'email', title: 'Email' },
        { key: 'college', title: 'College' },
        { key: 'courses', title: 'Courses' },
        { 
          key: 'status', 
          title: 'Status',
          render: (value) => (
            <span className={`status-badge ${value.toLowerCase()}`}>
              {value}
            </span>
          )
        }
      ],
      courses: [
        { key: 'name', title: 'Name' },
        { key: 'category', title: 'Category' },
        { key: 'students', title: 'Students' },
        { key: 'duration', title: 'Duration' },
        { 
          key: 'status', 
          title: 'Status',
          render: (value) => (
            <span className={`status-badge ${value.toLowerCase()}`}>
              {value}
            </span>
          )
        }
      ],
      assessments: [
        { key: 'name', title: 'Name' },
        { key: 'course', title: 'Course' },
        { key: 'students', title: 'Students' },
        { key: 'date', title: 'Date' },
        { 
          key: 'status', 
          title: 'Status',
          render: (value) => (
            <span className={`status-badge ${value.toLowerCase()}`}>
              {value}
            </span>
          )
        }
      ],
      announcements: [
        { key: 'title', title: 'Title' },
        { 
          key: 'type', 
          title: 'Type',
          render: (value) => (
            <span className={`type-badge ${value.toLowerCase()}`}>
              {value}
            </span>
          )
        },
        { key: 'date', title: 'Date' },
        { 
          key: 'status', 
          title: 'Status',
          render: (value) => (
            <span className={`status-badge ${value.toLowerCase()}`}>
              {value}
            </span>
          )
        }
      ]
    };
    return columnConfig[section] || [];
  };

  const renderTableSection = () => {
    const tableData = getTableData(activeSection, activeTab);
    const columns = getColumnsForSection(activeSection);

    return (
      <div className="data-table-container">
        <div className="table-header">
          <div className="search-box">
            <Search className="search-icon" />
            <input type="text" placeholder={`Search ${sectionConfig[activeSection]?.title.toLowerCase()}...`} className="search-input" />
          </div>
          <div className="table-actions">
            <button className="btn btn-outline">
              <Filter className="btn-icon" />
              Filter
            </button>
            <button className="btn btn-outline">
              <Download className="btn-icon" />
              Export
            </button>
          </div>
        </div>
        <DataTable
          data={tableData}
          columns={columns}
          onEdit={(row) => handleItemAction('Edit', row)}
          onDelete={(row) => handleItemAction('Delete', row)}
          onView={(row) => handleItemAction('View', row)}
        />
      </div>
    );
  };

  const renderCardsSection = () => {
    const coursesData = getTableData(activeSection, activeTab);

    return (
      <div className="cards-section">
        <div className="cards-header">
          <div className="search-box">
            <Search className="search-icon" />
            <input type="text" placeholder="Search courses..." className="search-input" />
          </div>
          <div className="filter-actions">
            <button className="btn btn-outline">
              <Filter className="btn-icon" />
              Filter
            </button>
            <button className="btn btn-outline">
              <Download className="btn-icon" />
              Export
            </button>
          </div>
        </div>

        <div className="courses-grid">
          {coursesData.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={(course) => handleItemAction('Edit', course)}
              onDelete={(course) => handleItemAction('Delete', course)}
              onView={handleCourseView}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderFormSection = () => (
    <div className="form-container">
      <div className="form-card">
        <h3>Create New {sectionConfig[activeSection]?.title.replace(' Management', '')}</h3>
        <DynamicForm
          fields={getFormFields(activeSection)}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          title={sectionConfig[activeSection]?.title.replace(' Management', '')}
        />
      </div>
    </div>
  );

  const renderAnalyticsSection = () => (
    <div className="analytics-container">
      <div className="analytics-grid">
        <div className="analytics-card">
          <h4>Total {sectionConfig[activeSection]?.title.replace(' Management', 's')}</h4>
          <p className="analytics-value">1,245</p>
          <p className="analytics-trend positive">+12% from last month</p>
        </div>
        <div className="analytics-card">
          <h4>Active {sectionConfig[activeSection]?.title.replace(' Management', 's')}</h4>
          <p className="analytics-value">842</p>
          <p className="analytics-trend positive">+8% from last week</p>
        </div>
        <div className="analytics-card">
          <h4>Completion Rate</h4>
          <p className="analytics-value">78%</p>
          <p className="analytics-trend positive">+8% from last quarter</p>
        </div>
      </div>
    </div>
  );

  const renderSpecializedContent = () => {
    const tabConfig = sectionConfig[activeSection]?.tabs[activeTab];
    
    switch (tabConfig?.type) {
      case 'performance':
        return (
          <div className="performance-container">
            <div className="performance-stats">
              <StatCard
                label="Avg Completion Rate"
                value="89%"
                trend="+5% from last month"
                icon={Target}
              />
              <StatCard
                label="Avg Student Satisfaction"
                value="4.8/5"
                trend="+0.2 from last quarter"
                icon={Star}
              />
              <StatCard
                label="Total Hours Taught"
                value="692"
                trend="+45 this month"
                icon={Clock}
              />
            </div>
          </div>
        );
      
      case 'progress':
        return (
          <div className="progress-container">
            <div className="progress-stats">
              <StatCard
                label="Avg Progress"
                value="62%"
                trend="+8% from last week"
                icon={TrendingUp}
              />
              <StatCard
                label="Active Students"
                value="842"
                trend="+23 this week"
                icon={UserCheck}
              />
              <StatCard
                label="Completion Rate"
                value="78%"
                trend="+5% from last month"
                icon={CheckCircle}
              />
            </div>
          </div>
        );
      
      case 'categories':
        return (
          <div className="categories-container">
            <div className="categories-grid">
              {[
                { id: 1, name: 'Technology', courses: 12, students: 856, color: '#3b82f6' },
                { id: 2, name: 'Design', courses: 8, students: 432, color: '#8b5cf6' },
                { id: 3, name: 'Business', courses: 6, students: 298, color: '#10b981' },
                { id: 4, name: 'Science', courses: 4, students: 187, color: '#f59e0b' },
                { id: 5, name: 'Arts', courses: 3, students: 124, color: '#ef4444' }
              ].map(category => (
                <div key={category.id} className="category-card">
                  <div 
                    className="category-icon" 
                    style={{ backgroundColor: category.color }}
                  >
                    <BookOpen size={24} />
                  </div>
                  <div className="category-info">
                    <h4>{category.name}</h4>
                    <p>{category.courses} Courses</p>
                    <p>{category.students} Students</p>
                  </div>
                  <div className="category-actions">
                    <button className="btn-icon" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button className="btn-icon" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="tab-content-placeholder">
            <h3>{tabConfig?.label}</h3>
            <p>This section is under development and will be implemented soon.</p>
          </div>
        );
    }
  };

  const renderContent = () => {
    const section = sectionConfig[activeSection];
    if (!section) return null;

    if (section.renderType === 'dashboard') {
      return renderDashboard();
    }

    const tabConfig = section.tabs[activeTab];
    if (!tabConfig) return null;

    switch (tabConfig.type) {
      case 'table':
        return renderTableSection();
      case 'cards':
        return renderCardsSection();
      case 'form':
        return renderFormSection();
      case 'analytics':
        return renderAnalyticsSection();
      case 'performance':
      case 'progress':
      case 'categories':
        return renderSpecializedContent();
      default:
        return renderSpecializedContent();
    }
  };

  const renderNavigation = () => (
    <nav className="navigation">
      <p className="nav-section-title">Admin Dashboard</p>
      
      {Object.entries(navConfig).map(([key, config]) => {
        const Icon = config.icon;
        
        if (config.type === 'single') {
          return (
            <button
              key={key}
              className={`nav-item ${activeSection === key ? 'active' : ''}`}
              onClick={() => handleSectionChange(key)}
            >
              <Icon className="nav-icon" />
              {config.label}
            </button>
          );
        }

        return (
          <div key={key} className="nav-section">
            <button
              className="nav-dropdown-header"
              onClick={() => toggleMenu(key)}
            >
              <div className="dropdown-title">
                <Icon className="nav-icon" />
                {config.label}
              </div>
              {openMenus[key] ? (
                <ChevronDown className="dropdown-arrow" />
              ) : (
                <ChevronRight className="dropdown-arrow" />
              )}
            </button>
            <div className={`dropdown-content ${openMenus[key] ? 'open' : ''}`}>
              <ul className="nav-submenu">
                {config.items.map((item, index) => (
                  <li
                    key={index}
                    className={`nav-subitem ${activeSection === item.section && activeTab === item.tab ? 'active' : ''}`}
                    onClick={() => handleSectionChange(item.section, item.tab)}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </nav>
  );

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleNotifications = () => setShowNotifications(!showNotifications);
  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);

  const markNotificationAsRead = (notificationId) => {
    setDashboardData(prev => ({
      ...prev,
      notifications: prev.notifications.map(notification =>
        notification.id === notificationId ? { ...notification, read: true } : notification
      )
    }));
    setUnreadNotifications(prev => prev - 1);
  };

  const clearAllNotifications = () => {
    setDashboardData(prev => ({
      ...prev,
      notifications: prev.notifications.map(notification => ({ ...notification, read: true }))
    }));
    setUnreadNotifications(0);
  };

  const handleLogout = () => {
    alert('Logout functionality would be implemented here');
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <div className="sidebar-content">
          <div className="logo-section">
            <div className="logo">C</div>
            <span className="logo-text">CCHub</span>
          </div>
          {renderNavigation()}
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        <div className="header">
          <div className="header-text">
            <h1 className="header-title">
              {sectionConfig[activeSection]?.title || 'Dashboard'}
            </h1>
            <p className="header-subtitle">
              {sectionConfig[activeSection]?.subtitle || 'Manage your platform'}
            </p>
          </div>
          <div className="header-actions">
            <div className="notifications-container">
              <button className="icon-btn" onClick={toggleNotifications}>
                <Bell className="icon" />
                {unreadNotifications > 0 && (
                  <span className="notification-badge">{unreadNotifications}</span>
                )}
              </button>
              
              {showNotifications && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h3>Notifications</h3>
                    <button className="clear-btn" onClick={clearAllNotifications}>
                      Clear All
                    </button>
                  </div>
                  <div className="notifications-list">
                    {dashboardData.notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        <div className="notification-icon">
                          <Mail className="icon" />
                        </div>
                        <div className="notification-content">
                          <p className="notification-message">{notification.message}</p>
                          <span className="notification-time">{notification.time}</span>
                        </div>
                        {!notification.read && <div className="unread-dot"></div>}
                      </div>
                    ))}
                  </div>
                  <div className="notifications-footer">
                    <button className="view-all-btn">View All Notifications</button>
                  </div>
                </div>
              )}
            </div>

            <button className="icon-btn" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="icon" /> : <Moon className="icon" />}
            </button>

            <div className="profile-container">
              <button className="user-profile" onClick={toggleProfileMenu}>
                <div className="avatar">
                  <User className="avatar-icon" />
                </div>
                <span className="username">Admin</span>
                <ChevronDown className="dropdown-arrow" />
              </button>
              
              {showProfileMenu && (
                <div className="profile-dropdown">
                  <div className="profile-header">
                    <div className="avatar">
                      <User className="avatar-icon" />
                    </div>
                    <div className="profile-info">
                      <span className="profile-name">Admin User</span>
                      <span className="profile-email">admin@cchub.com</span>
                    </div>
                  </div>
                  <div className="profile-menu">
                    <button className="profile-menu-item">
                      <User className="menu-icon" />
                      <span>My Profile</span>
                    </button>
                    <button className="profile-menu-item">
                      <Settings className="menu-icon" />
                      <span>Settings</span>
                    </button>
                    <button className="profile-menu-item">
                      <Bell className="menu-icon" />
                      <span>Notification Settings</span>
                    </button>
                    <div className="menu-divider"></div>
                    <button className="profile-menu-item logout" onClick={handleLogout}>
                      <LogOut className="menu-icon" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {sectionConfig[activeSection]?.renderType !== 'dashboard' && (
          <div className="section-content">
            <div className="section-header">
              <div className="section-title">
                {React.createElement(sectionConfig[activeSection]?.icon || BarChart2, { className: "section-icon" })}
                <h2>{sectionConfig[activeSection]?.title}</h2>
              </div>
              <div className="section-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    const firstTab = Object.keys(sectionConfig[activeSection]?.tabs || {})[0];
                    setActiveTab(firstTab === 'create' ? 'list' : 'create');
                  }}
                >
                  <Plus className="btn-icon" />
                  Add {sectionConfig[activeSection]?.title.replace(' Management', '')}
                </button>
              </div>
            </div>

            {Object.keys(sectionConfig[activeSection]?.tabs || {}).length > 0 && (
              <div className="tabs-container">
                <div className="tabs">
                  {Object.entries(sectionConfig[activeSection]?.tabs || {}).map(([tabKey, tabConfig]) => (
                    <button
                      key={tabKey}
                      className={`tab ${activeTab === tabKey ? 'active' : ''}`}
                      onClick={() => setActiveTab(tabKey)}
                    >
                      {tabConfig.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="tab-content">
              {renderContent()}
            </div>
          </div>
        )}

        {sectionConfig[activeSection]?.renderType === 'dashboard' && renderContent()}
      </main>

      {/* Course Details Modal */}
      {showCourseDetails && selectedCourse && (
        <CourseDetailsView
          course={selectedCourse}
          onClose={() => {
            setShowCourseDetails(false);
            setSelectedCourse(null);
          }}
          onEdit={(course) => {
            setShowCourseDetails(false);
            handleItemAction('Edit', course);
          }}
          onDelete={(course) => {
            setShowCourseDetails(false);
            handleItemAction('Delete', course);
          }}
        />
      )}

      <style jsx>{`
        .admin-dashboard {
          display: flex;
          min-height: 100vh;
          background: #f8fafc;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .sidebar {
          width: 280px;
          background: #ffffff;
          color: #374151;
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.04);
          border-right: 1px solid #e5e7eb;
        }

        .sidebar-content {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 0;
        }

        .logo-section {
          padding: 1.5rem 1.25rem;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          background: #fafafa;
        }

        .logo {
          height: 2rem;
          width: 2rem;
          background: #1877F2;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          margin-right: 0.75rem;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1877F2;
        }

        .navigation {
          flex: 1;
          padding: 1.5rem 1rem;
          overflow-y: auto;
        }

        .nav-section-title {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          color: #6b7280;
          margin-bottom: 0.75rem;
          letter-spacing: 0.05em;
        }

        .nav-item {
          display: flex;
          align-items: center;
          width: 100%;
          text-align: left;
          padding: 0.75rem 1rem;
          margin-bottom: 0.5rem;
          border-radius: 8px;
          transition: all 0.2s ease;
          background: transparent;
          color: #374151;
          border: none;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .nav-item:hover {
          background: #f3f4f6;
          color: #1877F2;
        }

        .nav-item.active {
          background: #1877F2;
          color: white;
        }

        .nav-icon {
          height: 1.25rem;
          width: 1.25rem;
          margin-right: 0.75rem;
        }

        .nav-section {
          margin-top: 0.5rem;
        }

        .nav-dropdown-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          text-align: left;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          transition: all 0.2s ease;
          background: transparent;
          color: #374151;
          border: none;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
        }

        .nav-dropdown-header:hover {
          background: #f3f4f6;
          color: #1877F2;
        }

        .dropdown-title {
          display: flex;
          align-items: center;
          flex: 1;
        }

        .dropdown-arrow {
          height: 1rem;
          width: 1rem;
          transition: transform 0.2s ease;
          color: #6b7280;
        }

        .dropdown-content {
          max-height: 0;
          overflow: hidden;
          transition: all 0.2s ease;
          margin-left: 0.5rem;
        }

        .dropdown-content.open {
          max-height: 300px;
          margin-top: 0.5rem;
        }

        .nav-submenu {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .nav-subitem {
          padding: 0.6rem 0.75rem;
          font-size: 0.875rem;
          color: #6b7280;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s ease;
          margin-bottom: 0.25rem;
        }

        .nav-subitem:hover {
          color: #1877F2;
          background: #f3f4f6;
        }

        .nav-subitem.active {
          color: #1877F2;
          background: #f0f9ff;
          font-weight: 600;
        }

        .logout-btn {
          margin: 1.5rem 1rem;
          padding: 0.75rem 1rem;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .logout-btn:hover {
          background: #dc2626;
        }

        .main-content {
          margin-left: 280px;
          flex: 1;
          padding: 2rem;
          min-height: 100vh;
          background: #f8fafc;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          background: white;
          padding: 1.5rem 2rem;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
        }

        .header-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        .header-subtitle {
          color: #6b7280;
          margin: 0.5rem 0 0 0;
          font-size: 1rem;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          position: relative;
        }

        .icon-btn {
          position: relative;
          padding: 0.75rem;
          border-radius: 8px;
          border: none;
          background: #f3f4f6;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-btn:hover {
          background: #1877F2;
          color: white;
        }

        .icon {
          height: 1.25rem;
          width: 1.25rem;
        }

        .section-content {
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #e5e7eb;
          background: #fafafa;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .section-title h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        .section-icon {
          height: 1.5rem;
          width: 1.5rem;
          color: #1877F2;
        }

        .section-actions {
          display: flex;
          gap: 0.75rem;
        }

        .tabs-container {
          border-bottom: 1px solid #e5e7eb;
          background: white;
        }

        .tabs {
          display: flex;
          padding: 0 2rem;
          gap: 0;
        }

        .tab {
          padding: 1rem 1.5rem;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          color: #6b7280;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .tab:hover {
          color: #374151;
          background: #f9fafb;
        }

        .tab.active {
          color: #1877F2;
          border-bottom-color: #1877F2;
          background: #f0f9ff;
        }

        .tab-content {
          padding: 2rem;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          font-size: 0.875rem;
        }

        .btn-primary {
          background: #1877F2;
          color: white;
        }

        .btn-primary:hover {
          background: #0d6efd;
        }

        .btn-outline {
          background: white;
          color: #374151;
          border: 1px solid #d1d5db;
        }

        .btn-outline:hover {
          background: #f9fafb;
          border-color: #9ca3af;
        }

        .btn-danger {
          background: #ef4444;
          color: white;
        }

        .btn-danger:hover {
          background: #dc2626;
        }

        .btn-success {
          background: #10b981;
          color: white;
        }

        .btn-success:hover {
          background: #059669;
        }

        .btn-icon {
          padding: 0.5rem;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-icon:hover {
          background: #f3f4f6;
          color: #374151;
        }

        .btn-icon .btn-icon {
          height: 1rem;
          width: 1rem;
        }

        .data-table-container {
          background: white;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }

        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          background: #fafafa;
        }

        .search-box {
          position: relative;
          width: 300px;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.875rem;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #1877F2;
          box-shadow: 0 0 0 3px rgba(24, 119, 242, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          height: 1rem;
          width: 1rem;
          color: #6b7280;
        }

        .table-actions {
          display: flex;
          gap: 0.75rem;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th {
          background: #f8fafc;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: #374151;
          border-bottom: 1px solid #e5e7eb;
          font-size: 0.875rem;
        }

        .data-table td {
          padding: 1rem;
          border-bottom: 1px solid #f3f4f6;
          font-size: 0.875rem;
        }

        .data-table tr:hover {
          background: #f9fafb;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .status-badge.active {
          background: #d1fae5;
          color: #065f46;
        }

        .status-badge.inactive {
          background: #fef3c7;
          color: #92400e;
        }

        .status-badge.completed {
          background: #dbeafe;
          color: #1e40af;
        }

        .status-badge.pending {
          background: #fef3c7;
          color: #92400e;
        }

        .status-badge.draft {
          background: #f3f4f6;
          color: #374151;
        }

        .status-badge.published {
          background: #d1fae5;
          color: #065f46;
        }

        .status-badge.scheduled {
          background: #e0e7ff;
          color: #3730a3;
        }

        .type-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .type-badge.info {
          background: #dbeafe;
          color: #1e40af;
        }

        .type-badge.success {
          background: #d1fae5;
          color: #065f46;
        }

        .type-badge.warning {
          background: #fef3c7;
          color: #92400e;
        }

        .form-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .form-card {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }

        .form-card h3 {
          margin: 0 0 1.5rem 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
          display: grid;
          gap: 1rem;
        }

        .form-row.double {
          grid-template-columns: 1fr 1fr;
        }

        .form-row.single {
          grid-template-columns: 1fr;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-weight: 500;
          color: #374151;
          font-size: 0.875rem;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.875rem;
          transition: all 0.2s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: #1877F2;
          box-shadow: 0 0 0 3px rgba(24, 119, 242, 0.1);
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1rem;
        }

        .analytics-container {
          padding: 1rem 0;
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .analytics-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          text-align: center;
        }

        .analytics-card h4 {
          margin: 0 0 0.5rem 0;
          font-size: 0.875rem;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .analytics-value {
          font-size: 2rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 0.5rem 0;
        }

        .analytics-trend {
          font-size: 0.75rem;
          font-weight: 600;
          margin: 0;
        }

        .analytics-trend.positive {
          color: #059669;
        }

        .analytics-trend.negative {
          color: #dc2626;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          transition: all 0.2s ease;
        }

        .stat-card:hover {
          border-color: #1877F2;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(24, 119, 242, 0.1);
        }

        .stat-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .stat-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: #111827;
          margin: 0.5rem 0;
        }

        .stat-trend {
          font-size: 0.75rem;
          font-weight: 600;
          margin: 0;
        }

        .stat-trend.positive {
          color: #059669;
        }

        .stat-trend.negative {
          color: #dc2626;
        }

        .stat-icon-wrapper {
          padding: 0.75rem;
          border-radius: 10px;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .stat-card:hover .stat-icon-wrapper {
          background: #1877F2;
        }

        .stat-icon {
          height: 1.75rem;
          width: 1.75rem;
          color: #6b7280;
          transition: all 0.2s ease;
        }

        .stat-card:hover .stat-icon {
          color: white;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .chart-card {
          background: white;
          border-radius: 12px;
          padding: 1.25rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          min-height: 320px;
          display: flex;
          flex-direction: column;
        }

        .chart-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .chart-icon {
          height: 1.25rem;
          width: 1.25rem;
          color: #1877F2;
          margin-right: 0.5rem;
        }

        .chart-title {
          font-size: 1rem;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .pie-chart-container {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .pie-chart-wrapper {
          position: relative;
          width: 160px;
          height: 160px;
        }

        .pie-chart {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          position: relative;
          background: #f3f4f6;
        }

        .pie-segment {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%);
        }

        .pie-center-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          background: white;
          border-radius: 50%;
          z-index: 2;
          border: 2px solid #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .pie-center-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .pie-center-text {
          font-size: 0.7rem;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .pie-center-value {
          font-size: 0.9rem;
          font-weight: 700;
          color: #111827;
        }

        .pie-legend {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 3px;
          flex-shrink: 0;
        }

        .legend-text {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .legend-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
        }

        .legend-value {
          font-size: 0.75rem;
          color: #6b7280;
        }

        .mentors-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .mentor-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: #f8fafc;
          border-radius: 8px;
          transition: all 0.2s ease;
          border: 1px solid #e5e7eb;
          min-height: 60px;
        }

        .mentor-item:hover {
          border-color: #1877F2;
          background: white;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(24, 119, 242, 0.1);
        }

        .mentor-rank {
          width: 2rem;
          height: 2rem;
          background: #1877F2;
          color: white;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .mentor-info {
          flex: 1;
          min-width: 0;
        }

        .mentor-name {
          font-size: 0.8rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 0.25rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mentor-stats {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.7rem;
          color: #6b7280;
          background: white;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          border: 1px solid #e5e7eb;
        }

        .stat-item .stat-icon {
          height: 0.7rem;
          width: 0.7rem;
          color: #1877F2;
        }

        .mentor-badge {
          padding: 0.4rem;
          background: #1877F2;
          color: white;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .badge-icon {
          height: 0.875rem;
          width: 0.875rem;
        }

        .bar-chart-container {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 0.75rem;
          height: 180px;
          padding: 0.75rem 0;
        }

        .bar-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          height: 100%;
        }

        .bar-label {
          font-size: 0.7rem;
          font-weight: 600;
          color: #374151;
          text-align: center;
          min-height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1.2;
        }

        .bar-wrapper {
          position: relative;
          width: 100%;
          height: 120px;
          background: #f8fafc;
          border-radius: 6px 6px 0 0;
          display: flex;
          align-items: flex-end;
          border: 1px solid #e5e7eb;
          transition: all 0.2s ease;
        }

        .bar-wrapper:hover {
          border-color: #1877F2;
        }

        .bar-fill {
          width: 100%;
          background: linear-gradient(180deg, #1877F2 0%, #0d6efd 100%);
          border-radius: 4px 4px 0 0;
          transition: all 0.3s ease;
          min-height: 15px;
          position: relative;
        }

        .bar-fill::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
          border-radius: 4px 4px 0 0;
        }

        .bar-value {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          background: #1877F2;
          color: white;
          padding: 0.15rem 0.4rem;
          border-radius: 3px;
          font-size: 0.65rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .bar-value::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 3px solid transparent;
          border-right: 3px solid transparent;
          border-top: 3px solid #1877F2;
        }

        .bar-stats {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          width: 100%;
          padding: 0 0.2rem;
        }

        .bar-stats .stat {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.65rem;
          color: #6b7280;
          font-weight: 500;
          padding: 0.25rem 0.4rem;
          background: #f8fafc;
          border-radius: 3px;
          border: 1px solid #e5e7eb;
          transition: all 0.2s ease;
          justify-content: center;
        }

        .bar-stats .stat:hover {
          background: #e5e7eb;
        }

        .bar-stats .stat-icon {
          height: 0.65rem;
          width: 0.65rem;
          color: #1877F2;
          flex-shrink: 0;
        }

        .notification-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          font-size: 0.7rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
        }

        .notifications-container {
          position: relative;
        }

        .notifications-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          width: 320px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          border: 1px solid #e5e7eb;
          z-index: 1000;
          margin-top: 0.5rem;
        }

        .notifications-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .notifications-header h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .clear-btn {
          background: none;
          border: none;
          color: #1877F2;
          font-size: 0.875rem;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .clear-btn:hover {
          background: #f3f4f6;
        }

        .notifications-list {
          max-height: 300px;
          overflow-y: auto;
        }

        .notification-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #f3f4f6;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }

        .notification-item:hover {
          background: #f8fafc;
        }

        .notification-item.unread {
          background: #f0f9ff;
        }

        .notification-icon {
          padding: 0.5rem;
          background: #f3f4f6;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .notification-icon .icon {
          height: 1rem;
          width: 1rem;
          color: #6b7280;
        }

        .notification-content {
          flex: 1;
          min-width: 0;
        }

        .notification-message {
          font-size: 0.875rem;
          color: #374151;
          margin: 0 0 0.25rem 0;
          line-height: 1.4;
        }

        .notification-time {
          font-size: 0.75rem;
          color: #6b7280;
        }

        .unread-dot {
          width: 8px;
          height: 8px;
          background: #1877F2;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 0.25rem;
        }

        .notifications-footer {
          padding: 1rem 1.25rem;
          border-top: 1px solid #e5e7eb;
        }

        .view-all-btn {
          width: 100%;
          padding: 0.75rem;
          background: #1877F2;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .view-all-btn:hover {
          background: #0d6efd;
        }

        .profile-container {
          position: relative;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0.75rem;
          background: #f3f4f6;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .user-profile:hover {
          background: #e5e7eb;
        }

        .avatar {
          height: 2.5rem;
          width: 2.5rem;
          border-radius: 50%;
          background: #1877F2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .avatar-icon {
          height: 1.25rem;
          width: 1.25rem;
          color: white;
        }

        .username {
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
        }

        .profile-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          width: 240px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          border: 1px solid #e5e7eb;
          z-index: 1000;
          margin-top: 0.5rem;
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.25rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .profile-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .profile-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #111827;
        }

        .profile-email {
          font-size: 0.75rem;
          color: #6b7280;
        }

        .profile-menu {
          padding: 0.5rem;
        }

        .profile-menu-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.75rem;
          background: none;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.875rem;
          color: #374151;
        }

        .profile-menu-item:hover {
          background: #f3f4f6;
          color: #1877F2;
        }

        .profile-menu-item.logout {
          color: #ef4444;
        }

        .profile-menu-item.logout:hover {
          background: #fef2f2;
          color: #dc2626;
        }

        .menu-icon {
          height: 1rem;
          width: 1rem;
        }

        .menu-divider {
          height: 1px;
          background: #e5e7eb;
          margin: 0.5rem 0;
        }

        .performance-container,
        .progress-container {
          padding: 1rem 0;
        }

        .performance-stats,
        .progress-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .categories-container {
          padding: 1rem 0;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .category-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.2s ease;
        }

        .category-card:hover {
          border-color: #1877F2;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .category-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .category-info {
          flex: 1;
        }

        .category-info h4 {
          margin: 0 0 0.5rem 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .category-info p {
          margin: 0.25rem 0;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .category-actions {
          display: flex;
          gap: 0.5rem;
        }

        .cards-section {
          padding: 1rem 0;
        }

        .cards-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }

        .filter-actions {
          display: flex;
          gap: 0.75rem;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .course-card {
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .course-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          border-color: #1877F2;
        }

        .course-card-header {
          position: relative;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          color: white;
        }

        .course-icon {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 0.5rem;
          backdrop-filter: blur(10px);
        }

        .course-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
        }

        .course-card-content {
          padding: 1.5rem;
        }

        .course-title-section {
          margin-bottom: 1rem;
        }

        .course-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 0.25rem 0;
        }

        .course-category {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
          font-weight: 500;
        }

        .course-description {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0 0 1rem 0;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .course-instructor {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #374151;
          margin-bottom: 1rem;
        }

        .course-stats {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          padding: 0.75rem;
          background: #f8fafc;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }

        .course-stat {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: #6b7280;
          font-weight: 500;
        }

        .course-progress {
          margin-bottom: 1.5rem;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
        }

        .progress-bar {
          width: 100%;
          height: 6px;
          background: #e5e7eb;
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .course-price-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .course-price {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1877F2;
        }

        .course-actions {
          display: flex;
          gap: 0.5rem;
        }

        .course-details-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .course-details-container {
          background: white;
          border-radius: 12px;
          width: 100%;
          max-width: 1400px;
          height: 90vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .course-details-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #e5e7eb;
          background: #fafafa;
        }

        .course-details-title h1 {
          margin: 0 0 0.5rem 0;
          font-size: 1.875rem;
          font-weight: 700;
          color: #111827;
        }

        .course-details-description {
          margin: 0;
          color: #6b7280;
          font-size: 1rem;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          color: #1877F2;
          cursor: pointer;
          font-size: 0.875rem;
          margin-bottom: 1rem;
          padding: 0.5rem 0;
        }

        .back-icon {
          transform: rotate(180deg);
        }

        .course-details-actions {
          display: flex;
          gap: 0.75rem;
        }

        .course-details-content {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .course-sidebar {
          width: 320px;
          background: #f8fafc;
          border-right: 1px solid #e5e7eb;
          overflow-y: auto;
          padding: 1.5rem;
        }

        .sidebar-section {
          margin-bottom: 2rem;
        }

        .sidebar-section h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #374151;
          margin: 0 0 1rem 0;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .topics-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .topic-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.75rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .topic-item:hover {
          background: white;
          border-color: #e5e7eb;
        }

        .topic-item.active {
          background: #1877F2;
          color: white;
          border-color: #1877F2;
        }

        .topic-number {
          width: 2rem;
          height: 2rem;
          background: #e5e7eb;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          font-weight: 600;
          flex-shrink: 0;
        }

        .topic-item.active .topic-number {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .topic-info {
          flex: 1;
        }

        .topic-title {
          font-weight: 600;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        .topic-description {
          font-size: 0.75rem;
          opacity: 0.7;
        }

        .exercises-list,
        .resources-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .exercise-item,
        .resource-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          border-radius: 6px;
          background: white;
          border: 1px solid #e5e7eb;
          font-size: 0.875rem;
        }

        .difficulty-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 600;
          margin-left: auto;
        }

        .difficulty-badge.beginner {
          background: #d1fae5;
          color: #065f46;
        }

        .difficulty-badge.intermediate {
          background: #fef3c7;
          color: #92400e;
        }

        .difficulty-badge.advanced {
          background: #fee2e2;
          color: #991b1b;
        }

        .resource-type {
          font-size: 0.7rem;
          color: #6b7280;
          margin-left: auto;
        }

        .course-main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #e5e7eb;
          background: white;
        }

        .content-header h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
        }

        .content-actions {
          display: flex;
          gap: 0.75rem;
        }

        .content-body {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
          background: white;
        }

        .topic-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .topic-content h2 {
          color: #111827;
          margin-bottom: 1rem;
        }

        .topic-content h3 {
          color: #374151;
          margin: 1.5rem 0 0.75rem 0;
        }

        .topic-content p {
          line-height: 1.6;
          color: #4b5563;
          margin-bottom: 1rem;
        }

        .topic-content ul {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }

        .topic-content li {
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }

        .example-box {
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 1.5rem;
          margin: 1.5rem 0;
        }

        .example-box h3 {
          color: #111827;
          margin-top: 0;
        }

        .code-example {
          background: #1f2937;
          color: #f9fafb;
          padding: 1rem;
          border-radius: 6px;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 0.875rem;
          line-height: 1.5;
          overflow-x: auto;
          margin-top: 0.75rem;
        }

        .content-navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          border-top: 1px solid #e5e7eb;
          background: #fafafa;
        }

        .prev-icon {
          transform: rotate(180deg);
        }

        .tab-content-placeholder {
          text-align: center;
          padding: 3rem 2rem;
          color: #6b7280;
        }

        .tab-content-placeholder h3 {
          margin: 0 0 1rem 0;
          color: #374151;
        }

        /* Dark Mode Styles */
        .dark-mode .admin-dashboard {
          background: #111827;
          color: #f9fafb;
        }

        .dark-mode .sidebar {
          background: #1f2937;
          border-right-color: #374151;
        }

        .dark-mode .logo-section {
          background: #374151;
          border-bottom-color: #374151;
        }

        .dark-mode .main-content {
          background: #111827;
        }

        .dark-mode .header,
        .dark-mode .stat-card,
        .dark-mode .chart-card,
        .dark-mode .section-content,
        .dark-mode .data-table-container,
        .dark-mode .form-card,
        .dark-mode .analytics-card,
        .dark-mode .category-card,
        .dark-mode .cards-header,
        .dark-mode .course-card,
        .dark-mode .course-details-container {
          background: #1f2937;
          border-color: #374151;
          color: #f9fafb;
        }

        .dark-mode .header-title,
        .dark-mode .stat-value,
        .dark-mode .chart-title,
        .dark-mode .section-title h2,
        .dark-mode .analytics-value,
        .dark-mode .category-info h4,
        .dark-mode .course-title,
        .dark-mode .course-details-title h1 {
          color: #f9fafb;
        }

        .dark-mode .header-subtitle,
        .dark-mode .stat-label,
        .dark-mode .legend-value,
        .dark-mode .analytics-card h4,
        .dark-mode .category-info p,
        .dark-mode .course-category,
        .dark-mode .course-description,
        .dark-mode .course-details-description {
          color: #d1d5db;
        }

        .dark-mode .icon-btn {
          background: #374151;
          color: #d1d5db;
        }

        .dark-mode .icon-btn:hover {
          background: #1877F2;
          color: white;
        }

        .dark-mode .user-profile {
          background: #374151;
          color: #d1d5db;
        }

        .dark-mode .pie-center-circle {
          background: #1f2937;
          border-color: #374151;
        }

        .dark-mode .pie-center-text {
          color: #d1d5db;
        }

        .dark-mode .pie-center-value {
          color: #f9fafb;
        }

        .dark-mode .section-header {
          background: #374151;
          border-bottom-color: #374151;
        }

        .dark-mode .tabs-container {
          background: #1f2937;
          border-bottom-color: #374151;
        }

        .dark-mode .tab {
          color: #d1d5db;
        }

        .dark-mode .tab:hover {
          color: #f9fafb;
          background: #374151;
        }

        .dark-mode .tab.active {
          color: #1877F2;
          background: #1e3a8a;
        }

        .dark-mode .table-header {
          background: #374151;
          border-bottom-color: #374151;
        }

        .dark-mode .data-table th {
          background: #374151;
          color: #f9fafb;
          border-bottom-color: #4b5563;
        }

        .dark-mode .data-table td {
          border-bottom-color: #374151;
          color: #d1d5db;
        }

        .dark-mode .data-table tr:hover {
          background: #374151;
        }

        .dark-mode .search-input {
          background: #1f2937;
          border-color: #4b5563;
          color: #f9fafb;
        }

        .dark-mode .search-input:focus {
          border-color: #1877F2;
        }

        .dark-mode .btn-outline {
          background: #1f2937;
          color: #d1d5db;
          border-color: #4b5563;
        }

        .dark-mode .btn-outline:hover {
          background: #374151;
          border-color: #6b7280;
        }

        .dark-mode .form-group input,
        .dark-mode .form-group textarea,
        .dark-mode .form-group select {
          background: #1f2937;
          border-color: #4b5563;
          color: #f9fafb;
        }

        .dark-mode .form-group input:focus,
        .dark-mode .form-group textarea:focus,
        .dark-mode .form-group select:focus {
          border-color: #1877F2;
        }

        .dark-mode .mentor-item,
        .dark-mode .bar-wrapper,
        .dark-mode .bar-stats .stat,
        .dark-mode .course-stats,
        .dark-mode .course-sidebar {
          background: #374151;
          border-color: #4b5563;
        }

        .dark-mode .stat-item {
          background: #1f2937;
          border-color: #4b5563;
        }

        .dark-mode .course-instructor {
          color: #e5e7eb;
        }

        .dark-mode .progress-header {
          color: #e5e7eb;
        }

        .dark-mode .progress-bar {
          background: #4b5563;
        }

        .dark-mode .course-details-header {
          background: #374151;
          border-bottom-color: #4b5563;
        }

        .dark-mode .course-sidebar {
          background: #374151;
          border-right-color: #4b5563;
        }

        .dark-mode .sidebar-section h3 {
          color: #e5e7eb;
          border-bottom-color: #4b5563;
        }

        .dark-mode .topic-item:hover {
          background: #4b5563;
        }

        .dark-mode .exercise-item,
        .dark-mode .resource-item {
          background: #4b5563;
          border-color: #6b7280;
        }

        .dark-mode .content-header {
          background: #374151;
          border-bottom-color: #4b5563;
        }

        .dark-mode .content-header h2 {
          color: #f9fafb;
        }

        .dark-mode .content-body {
          background: #1f2937;
        }

        .dark-mode .topic-content h2 {
          color: #f9fafb;
        }

        .dark-mode .topic-content h3 {
          color: #e5e7eb;
        }

        .dark-mode .topic-content p {
          color: #d1d5db;
        }

        .dark-mode .example-box {
          background: #374151;
          border-color: #4b5563;
        }

        .dark-mode .content-navigation {
          background: #374151;
          border-top-color: #4b5563;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .sidebar {
            width: 240px;
          }
          
          .main-content {
            margin-left: 240px;
            padding: 1.5rem;
          }
          
          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
          
          .charts-grid {
            grid-template-columns: 1fr;
          }

          .courses-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          }

          .course-details-container {
            height: 95vh;
          }
          
          .course-sidebar {
            width: 280px;
          }
        }

        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
          }
          
          .main-content {
            margin-left: 0;
          }
          
          .header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .pie-chart-container {
            flex-direction: column;
            text-align: center;
          }

          .section-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .table-header {
            flex-direction: column;
            gap: 1rem;
          }

          .search-box {
            width: 100%;
          }

          .form-row.double {
            grid-template-columns: 1fr;
          }

          .categories-grid {
            grid-template-columns: 1fr;
          }

          .bar-chart-container {
            flex-direction: column;
            height: auto;
            gap: 1.5rem;
          }

          .bar-item {
            flex-direction: row;
            align-items: center;
            gap: 1rem;
            height: auto;
          }

          .bar-label {
            width: 80px;
            text-align: left;
          }

          .bar-wrapper {
            width: 50px;
            height: 80px;
          }

          .bar-stats {
            flex: 1;
            flex-direction: row;
            justify-content: space-between;
          }

          .cards-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .courses-grid {
            grid-template-columns: 1fr;
          }

          .course-stats {
            flex-direction: column;
            gap: 0.5rem;
          }

          .course-price-section {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .course-actions {
            align-self: flex-end;
          }

          .course-details-overlay {
            padding: 1rem;
          }
          
          .course-details-content {
            flex-direction: column;
          }
          
          .course-sidebar {
            width: 100%;
            height: 300px;
            border-right: none;
            border-bottom: 1px solid #e5e7eb;
          }
          
          .course-details-header {
            flex-direction: column;
            gap: 1rem;
          }
          
          .content-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }

        @media (max-width: 640px) {
          .mentor-item {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }
          
          .mentor-stats {
            justify-content: center;
          }
          
          .tabs {
            flex-wrap: wrap;
          }

          .tab {
            flex: 1;
            min-width: 120px;
            text-align: center;
          }

          .notifications-dropdown {
            width: 280px;
            right: -50px;
          }

          .profile-dropdown {
            width: 200px;
            right: -20px;
          }

          .username {
            display: none;
          }

          .course-card-content {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}