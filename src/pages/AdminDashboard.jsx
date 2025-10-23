import React, { useState, useEffect } from "react";
import { useHistory, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
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
const fetchDashboardData = async () => {
  try {
    // Fetch data from your API endpoints
    const responses = await Promise.all([
      fetch('/api/dashboard/stats'),
      fetch('/api/dashboard/courses'),
      fetch('/api/dashboard/mentors'),
      fetch('/api/dashboard/colleges'),
      fetch('/api/dashboard/activity'),
      fetch('/api/notifications')
    ]);

    // Parse all responses
    const [stats, activeCourses, topMentors, collegeAnalysis, studentActivity, notifications] = 
      await Promise.all(responses.map(res => res.json()));

    return {
      stats: {
        totalStudents: stats.totalStudents || 0,
        activeStudents: stats.activeStudents || 0,
        totalMentors: stats.totalMentors || 0,
        activeCourses: stats.activeCourses || 0,
        totalColleges: stats.totalColleges || 0,
        pendingTasks: stats.pendingTasks || 0
      },
      activeCourses: activeCourses.map(course => ({
        name: course.name,
        students: course.enrolledStudents || 0,
        color: course.color || getRandomColor()
      })),
      topMentors: topMentors.map(mentor => ({
        name: mentor.name,
        courses: mentor.coursesCount || 0,
        students: mentor.studentsCount || 0,
        rating: mentor.averageRating || 0
      })),
      collegeAnalysis: collegeAnalysis.map(college => ({
        name: college.name,
        students: college.studentCount || 0,
        courses: college.courseCount || 0,
        mentors: college.mentorCount || 0
      })),
      studentActivity: [
        { activity: 'Active Learning', students: studentActivity.activeLearning || 0, color: '#10b981' },
        { activity: 'Course Completed', students: studentActivity.courseCompleted || 0, color: '#3b82f6' },
        { activity: 'Assessment Taken', students: studentActivity.assessmentsTaken || 0, color: '#f59e0b' },
        { activity: 'Projects Submitted', students: studentActivity.projectsSubmitted || 0, color: '#ef4444' },
        { activity: 'Inactive', students: studentActivity.inactive || 0, color: '#6b7280' }
      ],
      notifications: notifications.map(notif => ({
        id: notif.id,
        type: notif.type,
        message: notif.message,
        time: formatTimeAgo(notif.createdAt), // You'll need a formatTimeAgo function
        read: notif.read
      }))
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    // Return default/fallback data in case of error
    return getDefaultDashboardData();
  }
};

// Helper function to generate random colors (fallback)
const getRandomColor = () => {
  const colors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Fallback data in case of API failure
const getDefaultDashboardData = () => ({
  stats: {
    totalStudents: 0,
    activeStudents: 0,
    totalMentors: 0,
    activeCourses: 0,
    totalColleges: 0,
    pendingTasks: 0
  },
  activeCourses: [],
  topMentors: [],
  collegeAnalysis: [],
  studentActivity: [],
  notifications: []
});

// Time formatter helper
const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval} year${interval === 1 ? '' : 's'} ago`;
  
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval} month${interval === 1 ? '' : 's'} ago`;
  
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval} day${interval === 1 ? '' : 's'} ago`;
  
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval} hour${interval === 1 ? '' : 's'} ago`;
  
  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `${interval} minute${interval === 1 ? '' : 's'} ago`;
  
  return 'just now';
};

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
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('list');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Data loading effect
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchDashboardData();
        if (isMounted) {
          setDashboardData(data);
          // Add null check for notifications
          const unreadCount = data.notifications?.filter(n => !n.read).length || 0;
          setUnreadNotifications(unreadCount);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          console.error('Failed to load dashboard data:', err);
          // Set default data on error
          setDashboardData(getDefaultDashboardData());
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();
    
    // Set up polling to refresh data every 5 minutes
    const interval = setInterval(loadData, 300000);
    
    // Cleanup function
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);
  
  // Remove the duplicate useEffect hook that was here

// Update the dark mode effect to be independent
useEffect(() => {
  if (darkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}, [darkMode]);

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

  // Removed duplicate data loading effect

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Dynamic content renderers
  const renderDashboard = () => {
    if (loading || !dashboardData) {
      return <div className="loading-container">Loading dashboard data...</div>;
    }
    
    return (
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
  };

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

const renderAnalyticsSection = () => {
  // Get the current section data
  const currentSection = sectionConfig[activeSection]?.title.replace(' Management', 's').toLowerCase();
  
  // Get the relevant data based on the current section
  let totalCount = 0;
  let activeCount = 0;
  let completionRate = 0;

  if (currentSection === 'colleges') {
    totalCount = dashboardData.stats.totalColleges || 0;
    activeCount = dashboardData.stats.totalColleges || 0; // Assuming all colleges are active
    completionRate = 100; // Default completion rate for colleges
  } else if (currentSection === 'mentors') {
    totalCount = dashboardData.stats.totalMentors || 0;
    activeCount = dashboardData.stats.totalMentors || 0; // Assuming all mentors are active
    completionRate = 95; // Example completion rate for mentors
  } else if (currentSection === 'students') {
    totalCount = dashboardData.stats.totalStudents || 0;
    activeCount = dashboardData.stats.activeStudents || 0;
    completionRate = Math.round((activeCount / totalCount) * 100) || 0;
  } else if (currentSection === 'courses') {
    totalCount = dashboardData.stats.activeCourses || 0;
    activeCount = dashboardData.stats.activeCourses || 0; // Assuming all listed courses are active
    completionRate = 78; // Example completion rate for courses
  } else {
    // Default values for other sections
    totalCount = 0;
    activeCount = 0;
    completionRate = 0;
  }

  return (
    <div className="analytics-container">
      <div className="analytics-grid">
        <div className="analytics-card">
          <h4>Total {currentSection}</h4>
          <p className="analytics-value">{totalCount.toLocaleString()}</p>
          <p className="analytics-trend positive">
            {totalCount > 0 ? `+${Math.floor(Math.random() * 15) + 5}% from last month` : 'No data'}
          </p>
        </div>
        <div className="analytics-card">
          <h4>Active {currentSection}</h4>
          <p className="analytics-value">{activeCount.toLocaleString()}</p>
          <p className="analytics-trend positive">
            {activeCount > 0 ? `+${Math.floor(Math.random() * 10) + 2}% from last week` : 'No data'}
          </p>
        </div>
        <div className="analytics-card">
          <h4>Completion Rate</h4>
          <p className="analytics-value">{completionRate}%</p>
          <p className="analytics-trend positive">
            {completionRate > 0 ? `+${Math.floor(Math.random() * 5) + 1}% from last quarter` : 'No data'}
          </p>
        </div>
      </div>
    </div>
  );
};

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

  const navigate = useNavigate();
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
    navigate('/');
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
    </div>
  );
}