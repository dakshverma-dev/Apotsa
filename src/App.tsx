import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { LandingPage } from './components/LandingPage'
import { LoginPage } from './components/LoginPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AdminDashboardPage } from './components/pages/AdminDashboardPage'
import { ManagerDashboardPage } from './components/pages/ManagerDashboardPage'
import { EmployeeDashboardPage } from './components/pages/EmployeeDashboardPage'

export type UserRole = 'admin' | 'manager' | 'employee'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/manager/dashboard" element={<ManagerDashboardPage />} />
            <Route path="/employee/dashboard" element={<EmployeeDashboardPage />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
