import { Navigate, Routes, Route } from "react-router-dom";

import AppLayout from "../components/AppLayout";
import AuthLayout from "../components/AuthLayout";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import AdminDashboard from "../pages/AdminDashboard";
import AccessDenied from "../pages/AccessDenied";

function AppRoutes() {
  return (
    <Routes>
      {/* Root */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Authentication Pages */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Application Pages */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/access-denied" element={<AccessDenied />} />
      </Route>

      {/* Unknown URLs */}
      <Route path="*" element={<AccessDenied />} />
    </Routes>
  );
}

export default AppRoutes;