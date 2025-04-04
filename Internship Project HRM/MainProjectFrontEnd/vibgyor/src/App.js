// import logo from './logo.svg';
// import './App.css';
// import { RouterProvider } from 'react-router-dom';
// import Route from './components/Route';
// function App() {
//   return (
//     <div className="App">
//       <RouterProvider router={Route()}/>
//     </div>
//   );
// }

// export default App;
"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import Login from "./components/Login"
import Register from "./components/Register"
import Dashboard from "./components/Dashboard"
import Attendance from "./components/Attendance"
import LeaveManagement from "./components/LeaveManagement"
import Tasks from "./components/Task"
import TeamTasks from "./components/TeamTasks"
import JobPostings from "./components/JobPostings"
import Applicants from "./components/Applicants"
import Onboarding from "./components/Onboarding"
import Leaderboard from "./components/Leaderboard"
import Profile from "./components/Profile"
import NotFound from "./components/NotFound"
import "./App.css"

// Role-based route component
const RoleRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, hasPermission, loading } = useAuth()

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (requiredRole && !hasPermission(requiredRole)) {
    return <Navigate to="/" />
  }

  return children
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <RoleRoute>
                <Dashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <RoleRoute>
                <Attendance />
              </RoleRoute>
            }
          />
          <Route
            path="/leave"
            element={
              <RoleRoute>
                <LeaveManagement />
              </RoleRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <RoleRoute>
                <Tasks />
              </RoleRoute>
            }
          />
          <Route
            path="/team-tasks"
            element={
              <RoleRoute requiredRole="Leader">
                <TeamTasks />
              </RoleRoute>
            }
          />
          <Route
            path="/job-postings"
            element={
              <RoleRoute requiredRole="HR">
                <JobPostings />
              </RoleRoute>
            }
          />
          <Route
            path="/applicants"
            element={
              <RoleRoute requiredRole="HR">
                <Applicants />
              </RoleRoute>
            }
          />
          <Route
            path="/onboarding"
            element={
              <RoleRoute requiredRole="HR">
                <Onboarding />
              </RoleRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <RoleRoute>
                <Leaderboard />
              </RoleRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <RoleRoute>
                <Profile />
              </RoleRoute>
            }
          />

          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

