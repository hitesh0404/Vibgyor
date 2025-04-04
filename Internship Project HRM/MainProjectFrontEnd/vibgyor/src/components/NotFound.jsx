"use client"
import { Link, useNavigate } from "react-router-dom"
import { FaHome, FaArrowLeft } from "react-icons/fa"
import "../css/NotFound.css"

const NotFound = () => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>

        <div className="not-found-actions">
          <Link to="/" className="action-btn home">
            <FaHome /> Go to Dashboard
          </Link>
          <button className="action-btn back" onClick={goBack}>
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound

