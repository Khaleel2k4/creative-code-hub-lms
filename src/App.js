import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/:role" element={<Login />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />

      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={["team"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;