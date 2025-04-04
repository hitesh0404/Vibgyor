"use client"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { FaBell, FaEnvelope, FaSearch } from "react-icons/fa"
import "./Header.css"

const Header = ({ title }) => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="app-header">
      <h1 className="page-title">{title}</h1>

      <div className="header-search">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search..." className="search-input" />
      </div>

      <div className="header-actions">
        <div className="notification-icon">
          <FaBell />
          <span className="notification-badge">3</span>
        </div>

        <div className="message-icon">
          <FaEnvelope />
          <span className="notification-badge">5</span>
        </div>

        <div className="user-avatar" onClick={() => navigate("/profile")}>
          {currentUser?.username?.charAt(0).toUpperCase() || "U"}
        </div>
      </div>
    </header>
  )
}

export default Header

