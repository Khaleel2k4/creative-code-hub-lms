// API Configuration and Helper Functions
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/api/login/',
  LOGOUT: '/api/logout/',
  
  // User Management
  USERS: '/api/users/',
  USER_DETAIL: (id) => `/api/users/${id}/`,
  
  // College Management
  COLLEGES: '/api/colleges/',
  COLLEGE_DETAIL: (id) => `/api/colleges/${id}/`,
  
  // Class Management
  CLASSES: '/api/classes/',
  CLASS_DETAIL: (id) => `/api/classes/${id}/`,
  
  // Course Management
  COURSES: '/api/courses/',
  COURSE_DETAIL: (id) => `/api/courses/${id}/`,
  
  // Student Management
  STUDENTS: '/api/students/',
  STUDENT_DETAIL: (id) => `/api/students/${id}/`,
  
  // Mentor Management
  MENTORS: '/api/mentors/',
  MENTOR_DETAIL: (id) => `/api/mentors/${id}/`,
  
  // Assessment Management
  ASSESSMENTS: '/api/assessments/',
  ASSESSMENT_DETAIL: (id) => `/api/assessments/${id}/`,
  
  // Announcement Management
  ANNOUNCEMENTS: '/api/announcements/',
  ANNOUNCEMENT_DETAIL: (id) => `/api/announcements/${id}/`,
  
  // Practice/Exercise Management
  PRACTICES: '/api/practices/',
  PRACTICE_DETAIL: (id) => `/api/practices/${id}/`,
  
  // Report Management
  REPORTS: '/api/reports/',
  REPORT_DETAIL: (id) => `/api/reports/${id}/`,
  
  // Feedback Management
  FEEDBACKS: '/api/feedbacks/',
  FEEDBACK_DETAIL: (id) => `/api/feedbacks/${id}/`,
};

// Helper function for making API calls
export const apiCall = async (endpoint, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  // Add authentication token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    defaultOptions.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...defaultOptions,
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Specific API methods
export const authAPI = {
  login: (credentials) => apiCall(API_ENDPOINTS.LOGIN, {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  logout: () => apiCall(API_ENDPOINTS.LOGOUT, {
    method: 'POST',
  }),
};

export const userAPI = {
  getAll: () => apiCall(API_ENDPOINTS.USERS),
  getById: (id) => apiCall(API_ENDPOINTS.USER_DETAIL(id)),
  create: (userData) => apiCall(API_ENDPOINTS.USERS, {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  update: (id, userData) => apiCall(API_ENDPOINTS.USER_DETAIL(id), {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),
  delete: (id) => apiCall(API_ENDPOINTS.USER_DETAIL(id), {
    method: 'DELETE',
  }),
};

export const courseAPI = {
  getAll: () => apiCall(API_ENDPOINTS.COURSES),
  getById: (id) => apiCall(API_ENDPOINTS.COURSE_DETAIL(id)),
  create: (courseData) => apiCall(API_ENDPOINTS.COURSES, {
    method: 'POST',
    body: JSON.stringify(courseData),
  }),
  update: (id, courseData) => apiCall(API_ENDPOINTS.COURSE_DETAIL(id), {
    method: 'PUT',
    body: JSON.stringify(courseData),
  }),
  delete: (id) => apiCall(API_ENDPOINTS.COURSE_DETAIL(id), {
    method: 'DELETE',
  }),
};

export const studentAPI = {
  getAll: () => apiCall(API_ENDPOINTS.STUDENTS),
  getById: (id) => apiCall(API_ENDPOINTS.STUDENT_DETAIL(id)),
  create: (studentData) => apiCall(API_ENDPOINTS.STUDENTS, {
    method: 'POST',
    body: JSON.stringify(studentData),
  }),
  update: (id, studentData) => apiCall(API_ENDPOINTS.STUDENT_DETAIL(id), {
    method: 'PUT',
    body: JSON.stringify(studentData),
  }),
  delete: (id) => apiCall(API_ENDPOINTS.STUDENT_DETAIL(id), {
    method: 'DELETE',
  }),
};

export const mentorAPI = {
  getAll: () => apiCall(API_ENDPOINTS.MENTORS),
  getById: (id) => apiCall(API_ENDPOINTS.MENTOR_DETAIL(id)),
  create: (mentorData) => apiCall(API_ENDPOINTS.MENTORS, {
    method: 'POST',
    body: JSON.stringify(mentorData),
  }),
  update: (id, mentorData) => apiCall(API_ENDPOINTS.MENTOR_DETAIL(id), {
    method: 'PUT',
    body: JSON.stringify(mentorData),
  }),
  delete: (id) => apiCall(API_ENDPOINTS.MENTOR_DETAIL(id), {
    method: 'DELETE',
  }),
};

export default {
  API_ENDPOINTS,
  apiCall,
  authAPI,
  userAPI,
  courseAPI,
  studentAPI,
  mentorAPI,
};
