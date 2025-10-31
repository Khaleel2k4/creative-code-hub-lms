import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import "../styles/StudentDashboard.css";
import { 
  User, Users, BookOpen, FileText, Code, ClipboardList, 
  BarChart2, LogOut, Star, Clock, ChevronDown, ChevronRight,
  Eye, Edit, Trash2
} from "lucide-react";
import StudentDetailsProfile from "./StudentDetailsNew";
import ClassModule from "./ClassModule";

// Menu configuration matching admin dashboard structure
const menuConfig = {
  details: {
    icon: User,
    label: "Student Details",
    type: 'single'
  },
  courses: {
    icon: BookOpen,
    label: "Courses",
    type: 'single'
  },
  class: {
    icon: Users,
    label: "Class",
    type: 'single'
  },
  editor: {
    icon: Code,
    label: "Editor",
    type: 'single'
  },
  practice: {
    icon: FileText,
    label: "Practice",
    type: 'single'
  },
  assignment: {
    icon: ClipboardList,
    label: "Assignment",
    type: 'single'
  },
  report: {
    icon: BarChart2,
    label: "Report",
    type: 'single'
  }
};

// Sample course data matching admin dashboard structure
const coursesData = [
  { 
    id: 1, 
    name: 'Web Development', 
    category: 'Technology', 
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
    duration: '8 weeks', 
    status: 'Active',
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
];

// Course Card Component matching admin dashboard
const CourseCard = ({ course, onView }) => {
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
          </div>
        </div>
      </div>
    </div>
  );
};

// Language configurations
const languageConfigs = {
  javascript: {
    name: 'JavaScript',
    defaultCode: '// Write your JavaScript code here\nconsole.log("Hello, World!");',
    monacoLang: 'javascript'
  },
  python: {
    name: 'Python',
    defaultCode: '# Write your Python code here\nprint("Hello, World!")',
    monacoLang: 'python'
  },
  java: {
    name: 'Java',
    defaultCode: '// Write your Java code here\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
    monacoLang: 'java'
  },
  cpp: {
    name: 'C++',
    defaultCode: '// Write your C++ code here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
    monacoLang: 'cpp'
  },
  c: {
    name: 'C',
    defaultCode: '// Write your C code here\n#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
    monacoLang: 'c'
  },
  html: {
    name: 'HTML',
    defaultCode: '<!-- Write your HTML code here -->\n<!DOCTYPE html>\n<html>\n<head>\n    <title>Page Title</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n</body>\n</html>',
    monacoLang: 'html'
  },
  css: {
    name: 'CSS',
    defaultCode: '/* Write your CSS code here */\nbody {\n    background-color: #f0f0f0;\n    font-family: Arial, sans-serif;\n}',
    monacoLang: 'css'
  }
};

export default function StudentDashboard() {
  const [activeMenu, setActiveMenu] = useState("details");
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState(languageConfigs.javascript.defaultCode);
  const [output, setOutput] = useState("");
  const [openMenus, setOpenMenus] = useState({});

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(languageConfigs[newLang].defaultCode);
    setOutput('');
  };

  const runCode = async () => {
    try {
      setOutput('Running code...');
      
      // Security: Create a safe execution context for JavaScript
      const executeJavaScriptSafely = (code) => {
        const logs = [];
        const originalLog = console.log;
        
        // Override console.log to capture output
        console.log = (...args) => {
          logs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
        };
        
        try {
          // Create a function instead of direct eval
          const result = new Function(code)();
          if (result !== undefined) {
            logs.push(String(result));
          }
          return {
            success: true,
            output: logs.length > 0 ? logs.join('\n') : 'Code executed successfully (no output)',
            error: null
          };
        } catch (err) {
          return {
            success: false,
            output: '',
            error: err.message
          };
        } finally {
          // Restore original console.log
          console.log = originalLog;
        }
      };
      
      switch(selectedLanguage) {
        case 'javascript':
          const jsResult = executeJavaScriptSafely(code);
          if (jsResult.success) {
            setOutput(jsResult.output);
          } else {
            setOutput(`Error: ${jsResult.error}`);
          }
          break;
          
        case 'python':
        case 'java':
        case 'cpp':
        case 'c':
          setOutput(`${languageConfigs[selectedLanguage].name} execution requires a backend compiler.\n\nSimulated output:\nHello, World!\n\nNote: Connect to a ${languageConfigs[selectedLanguage].name} compiler API for actual execution.`);
          break;
          
        case 'html':
          setOutput('HTML Preview:\n\n' + code + '\n\nNote: For live preview, integrate an iframe renderer.');
          break;
          
        case 'css':
          setOutput('CSS code validated.\n\nNote: For live preview, integrate with HTML renderer.');
          break;
          
        default:
          setOutput('Language not supported yet.');
      }
    } catch (err) {
      setOutput(`Error: ${err.message}`);
    }
  };

  const handleSectionChange = (section) => {
    setActiveMenu(section);
  };

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleCourseView = (course) => {
    alert(`Viewing course: ${course.name}`);
  };

  const handleLogout = () => {
    alert('Logout functionality');
  };

  const renderNavigation = () => (
    <nav className="navigation">
      <p className="nav-section-title">Student Portal</p>
      
      {Object.entries(menuConfig).map(([key, config]) => {
        const Icon = config.icon;
        
        return (
          <button
            key={key}
            className={`nav-item ${activeMenu === key ? 'active' : ''}`}
            onClick={() => handleSectionChange(key)}
          >
            <Icon className="nav-icon" />
            {config.label}
          </button>
        );
      })}
    </nav>
  );

  return (
    <div className="student-dashboard">
      {/* Header */}
      <div className="student-header">
        <div className="header-field">
          <label>Mentor Name:</label>
          <span className="header-value">Dr. John Smith</span>
        </div>
        <div className="header-field">
          <label>Course Name:</label>
          <span className="header-value">Full Stack Development</span>
        </div>
        <div className="header-field">
          <label>Student Name:</label>
          <span className="header-value">Alex Johnson</span>
        </div>
      </div>

      {/* Main Section */}
      <div className="student-main">
        {/* Sidebar */}
        <aside className="student-sidebar">
          <div className="sidebar-content">
            <div className="logo-section">
              <div className="logo">S</div>
              <span className="logo-text">Student</span>
            </div>
            {renderNavigation()}
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </aside>

        {/* Content */}
        <main className="student-content">
          {activeMenu === "details" && (
            <StudentDetailsProfile />
          )}

          {activeMenu === "class" && (
            <ClassModule />
          )}

          {activeMenu === "courses" && (
            <div className="courses-section">
              <div className="section-header-content">
                <h2>My Courses</h2>
                <p className="section-subtitle">Continue learning and track your progress</p>
              </div>
              <div className="courses-grid">
                {coursesData.map(course => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onView={handleCourseView}
                  />
                ))}
              </div>
            </div>
          )}

          {activeMenu === "editor" && (
            <div className="editor-container">
              <div className="editor-header">
                <div className="editor-title-section">
                  <h2>Code Editor</h2>
                  <div className="language-selector">
                    <label htmlFor="language-select">Language:</label>
                    <select 
                      id="language-select"
                      value={selectedLanguage} 
                      onChange={handleLanguageChange}
                      className="language-dropdown"
                    >
                      {Object.entries(languageConfigs).map(([key, config]) => (
                        <option key={key} value={key}>{config.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button onClick={runCode} className="run-button">Run ▶</button>
              </div>
              <div className="editor-main">
                <div className="code-editor">
                  <Editor
                    height="400px"
                    language={languageConfigs[selectedLanguage].monacoLang}
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value)}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      roundedSelection: false,
                      scrollBeyondLastLine: false,
                      automaticLayout: true
                    }}
                  />
                </div>
                <div className="output-terminal">
                  <h3>Output Terminal</h3>
                  <div className="output-box">
                    <pre>{output}</pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeMenu !== "details" && activeMenu !== "class" && activeMenu !== "courses" && activeMenu !== "editor" && (
            <div className="coming-soon">
              <h2>{menuConfig[activeMenu]?.label} Page</h2>
              <p>This section is under development and will be available soon.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// export default StudentDashboard;
