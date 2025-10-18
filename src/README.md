# Frontend Source Directory

## Quick Reference

```
src/
├── 📁 assets/              Static files (images, logos, icons)
├── 📁 components/          Reusable UI components
├── 📁 layouts/             Page layout wrappers
├── 📁 pages/               Route-level page components
├── 📁 styles/              CSS stylesheets
├── 📁 utils/               Utilities, helpers, and API config
├── 📄 App.js               Main app component with routing
├── 📄 index.js             Application entry point
├── 📄 reportWebVitals.js   Performance monitoring
└── 📄 setupTests.js        Test configuration
```

## Import Examples

### Components
```javascript
import ProtectedRoute from './components/ProtectedRoute';
```

### Pages
```javascript
import Home from './pages/Home';
import Login from './pages/Login';
```

### Layouts
```javascript
import MentorLayout from './layouts/MentorLayout';
```

### Styles
```javascript
import './styles/App.css';
import '../styles/AdminDashboard.css';
```

### Utils
```javascript
// Import specific functions
import { authAPI, courseAPI } from './utils/api';
import { USER_ROLES, ROUTES } from './utils/constants';
import { auth, formatDate } from './utils/helpers';

// Or import everything
import { authAPI, USER_ROLES, auth } from './utils';
```

### Assets
```javascript
import logo from './assets/logo.svg';
```

## Key Features

### 🔐 Authentication
- Centralized auth helpers in `utils/helpers.js`
- Protected routes with `components/ProtectedRoute.jsx`
- Role-based access control (Admin, Team, Mentor, Student)

### 🌐 API Integration
- All endpoints defined in `utils/api.js`
- Consistent error handling
- Automatic token management
- Proxy configured to Django backend (port 8000)

### 🎨 Styling
- Bootstrap 5.3.8 for UI framework
- Custom CSS in `styles/` directory
- Responsive design across all pages

### 🛣️ Routing
- React Router v6 for navigation
- Nested routes for mentor dashboard
- Dynamic route parameters for login roles

## Development Guidelines

1. **Keep components small and focused**
2. **Use constants instead of hardcoded values**
3. **Centralize API calls in utils/api.js**
4. **Follow existing naming conventions**
5. **Update this README when adding new patterns**

For detailed documentation, see [FRONTEND_STRUCTURE.md](../FRONTEND_STRUCTURE.md) in the root directory.
