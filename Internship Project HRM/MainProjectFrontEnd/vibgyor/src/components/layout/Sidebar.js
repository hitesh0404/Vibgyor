"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import {
  FaHome,
  FaClipboardCheck,
  FaTasks,
  FaUsers,
  FaBriefcase,
  FaUserPlus,
  FaCalendarAlt,
  FaTrophy,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa"
import "./Sidebar.css"

const Sidebar = () => {
  const { currentUser, userRole, logout, hasPermission } = useAuth()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Define menu items with required roles
  const menuItems = [
    { path: "/", icon: <FaHome />, label: "Dashboard", requiredRole: null },
    { path: "/attendance", icon: <FaClipboardCheck />, label: "Attendance", requiredRole: null },
    { path: "/leave", icon: <FaCalendarAlt />, label: "Leave Management", requiredRole: null },
    { path: "/tasks", icon: <FaTasks />, label: "My Tasks", requiredRole: null },
    { path: "/team-tasks", icon: <FaUsers />, label: "Team Tasks", requiredRole: "Leader" },
    { path: "/job-postings", icon: <FaBriefcase />, label: "Job Postings", requiredRole: "HR" },
    { path: "/applicants", icon: <FaUserPlus />, label: "Applicants", requiredRole: "HR" },
    { path: "/onboarding", icon: <FaUserPlus />, label: "Onboarding", requiredRole: "HR" },
    { path: "/leaderboard", icon: <FaTrophy />, label: "Leaderboard", requiredRole: null },
    { path: "/profile", icon: <FaUserCircle />, label: "Profile", requiredRole: null },
  ]

  return (
    <>
      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`sidebar ${isMobileMenuOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
          <h2>Vibgyor HRMS</h2>
          <div className="user-info">
            <FaUserCircle className="user-icon" />
            <div>
              <p className="user-name">{currentUser?.username || "User"}</p>
              <p className="user-role">{userRole || "Employee"}</p>
            </div>
          </div>
        </div>

        <nav className="sidebar-menu">
          <ul>
            {menuItems.map(
              (item) =>
                (!item.requiredRole || hasPermission(item.requiredRole)) && (
                  <li key={item.path} className={location.pathname === item.path ? "active" : ""}>
                    <Link to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                      <span className="menu-icon">{item.icon}</span>
                      <span className="menu-label">{item.label}</span>
                    </Link>
                  </li>
                ),
            )}
            <li className="logout-item">
              <button onClick={logout}>
                <span className="menu-icon">
                  <FaSignOutAlt />
                </span>
                <span className="menu-label">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {isMobileMenuOpen && <div className="sidebar-overlay" onClick={toggleMobileMenu}></div>}
    </>
  )
}

export default Sidebar

