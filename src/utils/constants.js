// Application Constants

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  TEAM: 'team',
  MENTOR: 'mentor',
  STUDENT: 'student',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_ROLE: 'userRole',
  USERNAME: 'username',
  IS_AUTHENTICATED: 'isAuthenticated',
  USER_ID: 'userId',
};

// Route Paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  LOGIN_TEAM: '/login/team',
  LOGIN_STUDENT: '/login/student',
  DASHBOARD: '/dashboard',
  ADMIN_DASHBOARD: '/admin-dashboard',
  STUDENT_DASHBOARD: '/student-dashboard',
  MENTOR: '/mentor',
  MENTOR_DETAILS: '/mentor/details',
  MENTOR_STUDENTS: '/mentor/students',
  MENTOR_COURSES: '/mentor/courses',
  MENTOR_PRACTICE: '/mentor/practice',
  MENTOR_ASSESSMENT: '/mentor/assessment',
  MENTOR_EDITOR: '/mentor/editor',
  MENTOR_REPORT: '/mentor/report',
  MENTOR_FEEDBACK: '/mentor/feedback',
};

// Menu Items for Admin Dashboard
export const ADMIN_MENU_ITEMS = [
  { label: 'Dashboard', key: 'dashboard' },
  { label: 'Create Users', key: 'create-users' },
  { label: 'Create Colleges', key: 'create-colleges' },
  { label: 'Create Classes', key: 'create-classes' },
  { label: 'Create Courses', key: 'create-courses' },
  { label: 'Create Announcement', key: 'create-announcement' },
  { label: 'Analysts', key: 'analysts' },
  { label: 'Logout', key: 'logout' },
];

// Menu Items for Student Dashboard
export const STUDENT_MENU_ITEMS = [
  'College Details',
  'Mentor Details',
  'Student Details',
  'Courses',
  'Class',
  'Editor',
  'Practice',
  'Assignment',
  'Report',
];

// Menu Items for Mentor Dashboard
export const MENTOR_MENU_ITEMS = [
  { label: 'Mentor Details', path: '/mentor/details' },
  { label: 'Student Details', path: '/mentor/students' },
  { label: 'Courses', path: '/mentor/courses' },
  { label: 'Practice', path: '/mentor/practice' },
  { label: 'Assessment', path: '/mentor/assessment' },
  { label: 'Editor / Compiler', path: '/mentor/editor' },
  { label: 'Report', path: '/mentor/report' },
  { label: 'Feedback', path: '/mentor/feedback' },
];

// Application Messages
export const MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGIN_FAILED: 'Login failed. Please check your credentials.',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  NETWORK_ERROR: 'Network error. Please try again.',
  UNAUTHORIZED: 'You are not authorized to access this page.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
};

// API Response Status
export const API_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading',
};

export default {
  USER_ROLES,
  STORAGE_KEYS,
  ROUTES,
  ADMIN_MENU_ITEMS,
  STUDENT_MENU_ITEMS,
  MENTOR_MENU_ITEMS,
  MESSAGES,
  API_STATUS,
};
