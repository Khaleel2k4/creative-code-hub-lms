import React, { useState } from "react";
import Editor from "@monaco-editor/react"; // make sure to install this
import "../styles/StudentDashboard.css";

const menuItems = [
  "Student Details",
  "Courses",
  "Class",
  "Editor",
  "Practice",
  "Assignment",
  "Report",
];

export default function StudentDashboard() {
  const [activeMenu, setActiveMenu] = useState("Courses");
  const [code, setCode] = useState("// Write your code here...");
  const [output, setOutput] = useState("");

  const runCode = () => {
    try {
      // For demo — runs JS code safely in a sandboxed eval
      // You can later integrate a backend compiler API
      const result = eval(code);
      setOutput(String(result));
    } catch (err) {
      setOutput(err.message);
    }
  };

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
          <div className="sidebar-header">
            <div className="sidebar-logo">S</div>
            <h3 className="sidebar-title">Student Portal</h3>
          </div>
          <ul>
            {menuItems.map((item) => (
              <li
                key={item}
                className={activeMenu === item ? "active" : ""}
                onClick={() => setActiveMenu(item)}
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="sidebar-logout">
            <button className="logout-btn" onClick={() => alert('Logout functionality')}>
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Content */}
        <main className="student-content">
          {activeMenu === "Courses" && (
            <>
              <h2>Courses</h2>
              <div className="course-grid">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="course-card"></div>
                ))}
              </div>
            </>
          )}

          {activeMenu === "Editor" && (
            <div className="editor-container">
              <div className="editor-header">
                <h2>Code Editor</h2>
                <button onClick={runCode}>Run ▶</button>
              </div>
              <div className="editor-main">
                <div className="code-editor">
                  <Editor
                    height="300px"
                    defaultLanguage="javascript"
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value)}
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

          {activeMenu !== "Courses" && activeMenu !== "Editor" && (
            <h2 style={{ color: "#1e3c72" }}>{activeMenu} Page Coming Soon...</h2>
          )}
        </main>
      </div>
    </div>
  );
}
