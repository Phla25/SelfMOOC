import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import TeacherDashboard from "./pages/teachers/Dashboard"
import StudentDashboard from "./pages/students/Dashboard"
import ParentDashboard from "./pages/parents/Dashboard"

import CreateStudent from "./pages/teachers/CreateStudent";
import CreateMaterial from "./pages/teachers/CreateMaterial";
import TeacherMaterialsPage from "./pages/teachers/TeacherMaterialsPage";
import StudentMaterialsPage from "./pages/students/StudentMaterialsPage"

import TeacherSetting from "./pages/teachers/Setting";
import StudentSetting from "./pages/students/Setting";
import ParentSetting from "./pages/parents/Setting";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />

        {/* Dashboard and settings routes for each role */}
        {/* Teacher routes */}
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/settings" element={<TeacherSetting />} />
        <Route path="/teacher/create-student" element={<CreateStudent />} />
        <Route path="/teacher/create-material" element={<CreateMaterial />} />
        <Route path="/teacher/materials" element={<TeacherMaterialsPage />} />

        {/* Student routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/settings" element={<StudentSetting />} />
        <Route path="/student/materials" element={<StudentMaterialsPage />} />

        {/* Parent routes */}
        <Route path="/parent/dashboard" element={<ParentDashboard />} />
        <Route path="/parent/settings" element={<ParentSetting />} />






      </Routes>
    </BrowserRouter>
  )
}

export default App