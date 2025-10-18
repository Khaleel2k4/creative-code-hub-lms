import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import StudentDashboard from "./pages/StudentDashboard";

import MentorLayout from './layouts/MentorLayout';
import MentorDetails from './pages/MentorDetails';
import StudentDetails from './pages/StudentDetails';
import Assessment from './pages/Assessment';
import ComingSoon from './pages/ComingSoon';
import CodeEditor from './pages/CodeEditor';
import Practice from './pages/Practice';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/:role" element={<Login />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />

      <Route path="/mentor" element={<MentorLayout />}>
        <Route index element={<Navigate to="/mentor/details" replace />} />
        <Route path="details" element={<MentorDetails />} />
        <Route path="students" element={<StudentDetails />} />
        <Route path="courses" element={<ComingSoon title="Courses" />} />
        <Route path="practice" element={<Practice />} />
        <Route path="assessment" element={<Assessment />} />
        <Route path="editor" element={<CodeEditor />} />
        <Route path="report" element={<ComingSoon title="Report" />} />
        <Route path="feedback" element={<ComingSoon title="Feedback" />} />
      </Route>

      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={["team"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>  
      
      
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;