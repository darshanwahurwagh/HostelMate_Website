import { Routes, Route } from "react-router-dom";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Layouts
import AdminLayout from "../layouts/AdminLayout";
import StudentLayout from "../layouts/StudentLayout";

// Route Protection
import RoleProtectedRoute from "./RoleProtectedRoute";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import Rooms from "../pages/admin/Rooms";
import Students from "../pages/admin/Students";
import Complaints from "../pages/admin/Complaints";
import Fees from "../pages/admin/Fees";
import QRCode from "../pages/admin/QRCode";
import AdminAttendance from "../pages/admin/Attendance";
import MessBills from "../pages/admin/MessBills";


// Student Pages
import StudentDashboard from "../pages/student/Dashboard";
import Profile from "../pages/student/Profile";
import RoomRequest from "../pages/student/RoomRequest";
import StudentComplaints from "../pages/student/Complaints";
import Payments from "../pages/student/Payments";
import Attendance from "../pages/student/Attendance";
import AttendanceHistory from "../pages/student/AttendanceHistory";
import QRScanner from "../pages/student/QRScanner";
import FeeHistory from "../pages/student/FeeHistory";
import ComplaintHistory from "../pages/student/ComplaintHistory";
import MessBillHistory from "../pages/student/MessBillHistory";


const AppRoutes = () => {
  return (<Routes>
    {/* AUTH ROUTES */}
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />


    {/* ADMIN ROUTES */}

    <Route
      path="/admin/dashboard"
      element={
        <RoleProtectedRoute role="Admin">
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        </RoleProtectedRoute>
      }
    />

    <Route
      path="/rooms"
      element={
        <RoleProtectedRoute role="Admin">
          <AdminLayout>
            <Rooms />
          </AdminLayout>
        </RoleProtectedRoute>
      }
    />

    <Route
      path="/students"
      element={
        <RoleProtectedRoute role="Admin">
          <AdminLayout>
            <Students />
          </AdminLayout>
        </RoleProtectedRoute>
      }
    />

    <Route
      path="/complaints"
      element={
        <RoleProtectedRoute role="Admin">
          <AdminLayout>
            <Complaints />
          </AdminLayout>
        </RoleProtectedRoute>
      }
    />

    <Route
      path="/fees"
      element={
        <RoleProtectedRoute role="Admin">
          <AdminLayout>
            <Fees />
          </AdminLayout>
        </RoleProtectedRoute>
      }
    />

    <Route
      path="/admin/qr"
      element={
        <RoleProtectedRoute role="Admin">
          <AdminLayout>
            <QRCode />
          </AdminLayout>
        </RoleProtectedRoute>
      }

    />
    <Route
      path="/admin/attendance"
      element={
        <RoleProtectedRoute role="Admin">
          <AdminLayout>
            <AdminAttendance />
          </AdminLayout>
        </RoleProtectedRoute>
      }
    />

    <Route
      path="/admin/mess-bills"
      element={
        <RoleProtectedRoute role="Admin">
          <AdminLayout>
            <MessBills />
          </AdminLayout>
        </RoleProtectedRoute>
      }
    />

    {/* STUDENT ROUTES */}

    <Route
      path="/student/dashboard"
      element={
        <RoleProtectedRoute role="Student">
          <StudentLayout>
            <StudentDashboard />
          </StudentLayout>
        </RoleProtectedRoute>
      }
    />

    <Route
      path="/student/profile"
      element={
        <RoleProtectedRoute role="Student">
          <StudentLayout>
            <Profile />
          </StudentLayout>
        </RoleProtectedRoute>
      }
    />

    <Route
      path="/student/room-request"
      element={
        <RoleProtectedRoute role="Student">
          <StudentLayout>
            <RoomRequest />
          </StudentLayout>
        </RoleProtectedRoute>
      }
    />

    <Route
      path="/student/complaints"
      element={
        <RoleProtectedRoute role="Student">
          <StudentLayout>
            <StudentComplaints />
          </StudentLayout>
        </RoleProtectedRoute>
      }
    />

    <Route
      path="/student/payments"
      element={
        <RoleProtectedRoute role="Student">
          <StudentLayout>
            <Payments />
          </StudentLayout>
        </RoleProtectedRoute>
      }
    />

    <Route
      path="/student/attendance"
      element={
        <RoleProtectedRoute role="Student">
          <StudentLayout>
            <Attendance />
          </StudentLayout>
        </RoleProtectedRoute>
      }
    />

    <Route
      path="/student/scan-qr"
      element={
        <RoleProtectedRoute role="Student">
          <StudentLayout>
            <QRScanner />
          </StudentLayout>
        </RoleProtectedRoute>
      }
    />

    <Route
      path="/student/attendance-history"
      element={
        <RoleProtectedRoute role="Student">
          <StudentLayout>
            <AttendanceHistory />
          </StudentLayout>
        </RoleProtectedRoute>
      }
    />


    <Route
      path="/student/fee-history"
      element={
        <RoleProtectedRoute role="Student">
          <StudentLayout>
            <FeeHistory />
          </StudentLayout>
        </RoleProtectedRoute>
      }
    />

    <Route
      path="/student/complaint-history"
      element={
        <RoleProtectedRoute role="Student">
          <StudentLayout>
            <ComplaintHistory />
          </StudentLayout>
        </RoleProtectedRoute>
      }
    />

    <Route
      path="/student/mess-bills"
      element={
        <RoleProtectedRoute role="Student">
          <StudentLayout>
            <MessBillHistory />
          </StudentLayout>
        </RoleProtectedRoute>
      }
    />

  </Routes>


  );
};

export default AppRoutes;
