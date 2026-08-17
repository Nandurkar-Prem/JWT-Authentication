import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import AdminDashboard from "../pages/AdminDashboard";
import AccessDenied from "../pages/AccessDenied";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="/access-denied" element={<AccessDenied />} />

      <Route path="*" element={<AccessDenied />} />
    </Routes>
  );
}

export default AppRoutes;