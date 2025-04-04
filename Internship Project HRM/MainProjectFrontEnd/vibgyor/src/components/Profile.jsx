"use client"

import { useState, useEffect } from "react"
import MainLayout from "./layout/MainLayout"
import { useAuth } from "../contexts/AuthContext"
import "../css/Profile.css"

const Profile = () => {
  const { currentUser } = useAuth()
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    department: "",
    role: "",
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Sample data - in a real app, this would come from your API
        setProfileData({
          firstName: currentUser?.first_name || "John",
          lastName: currentUser?.last_name || "Doe",
          username: currentUser?.username || "johndoe",
          email: currentUser?.email || "john.doe@example.com",
          department: currentUser?.role?.Department?.dept_name || "Engineering",
          role: currentUser?.role?.RoleName || "Software Engineer",
        })
      } catch (error) {
        console.error("Error fetching profile data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfileData()
  }, [currentUser])

  return (
    <MainLayout title="Profile">
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading profile data...</p>
        </div>
      ) : (
        <div className="profile-container">
          <div className="profile-card">
            <div className="profile-header">
              <h2>My Profile</h2>
            </div>

            <div className="profile-details">
              <div className="detail-item">
                <span className="detail-label">First Name:</span>
                <span className="detail-value">{profileData.firstName}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Last Name:</span>
                <span className="detail-value">{profileData.lastName}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Username:</span>
                <span className="detail-value">{profileData.username}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{profileData.email}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Department:</span>
                <span className="detail-value">{profileData.department}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Role:</span>
                <span className="detail-value">{profileData.role}</span>
              </div>
            </div>

            <div className="profile-actions">
              <button className="action-button edit">Edit Profile</button>
              <button className="action-button change-password">Change Password</button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  )
}

export default Profile

