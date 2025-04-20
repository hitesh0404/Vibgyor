"use client";

import { useState, useEffect } from "react";
import MainLayout from "./layout/MainLayout";
import { useAuth } from "../contexts/AuthContext";
import "../css/Profile.css";
import api from "../services/api";

const Profile = () => {
  const [disableForm, setDisableForm] = useState(true); // Controls whether form is editable
  const { currentUser, setCurrentUser } = useAuth();
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    department: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State to hold backend errors
  const [errors, setErrors] = useState({
    username: "",
    email: "",
  });

  // Fetch and set profile data when currentUser changes
  useEffect(() => {
    if (currentUser) {
      const fetchProfileData = () => {
        setIsLoading(true);

        // Simulate API call (You should replace this with actual API call)
        setTimeout(() => {
          setProfileData({
            first_name: currentUser.firstName || "",
            last_name: currentUser.lastName || "",
            username: currentUser.username || "",
            email: currentUser.email || "",
            department: currentUser.department || "",
            role: currentUser.role || "",
          });
          setIsLoading(false);
        }, 1000); // Simulating delay
      };

      fetchProfileData();
    }
  }, []);

  function handleEditForm() {
    setDisableForm(false); // Enable form for editing
  }

  function updateValue(e) {
    const data = { ...profileData, [e.target.name]: e.target.value };
    setProfileData(data);
  }

  async function handleSubmitForm() {
    if (!isValidEmail(profileData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    // setDisableForm(true);

    try {
      const response = await api.put(`/api/accounts/user/${currentUser.id}/`, {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        email: profileData.email,
        username: profileData.username,
        partial: true,
      });

      if (response.status === 200) {
        setCurrentUser({
          ...currentUser,
          firstName: profileData.first_name,
          lastName: profileData.last_name,
          email: profileData.email,
          username: profileData.username,
        });
        console.log(currentUser, profileData);
        setDisableForm(true);
        setErrors({ username: "", email: "" }); // Clear errors on successful submission
      }
    } catch (error) {
      console.error("Error updating profile", error);

      // Handle error from backend
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        setErrors({
          username: errorData.username ? errorData.username[0] : "",
          email: errorData.email ? errorData.email[0] : "",
        });
      } 
      else{
        setDisableForm(true);
      }
    } finally {
      setIsSubmitting(false);
        // setDisableForm(true);
    }
  }

  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  // Ensure we render once profile data is loaded
  if (isLoading) {
    return (
      <MainLayout title="Profile">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading profile data...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Profile">
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <h2>My Profile</h2>
          </div>

          <div className="profile-details">
            {/* First Name */}
            <div className="detail-item">
              <span className="detail-label">First Name:</span>
              <span className="detail-value">
                {disableForm ? (
                  profileData.first_name
                ) : (
                  <input
                    type="text"
                    onChange={updateValue}
                    value={profileData.first_name}
                    name="first_name"
                    style={{ border: "2px inset #EBE9ED" }}
                  />
                )}
              </span>
            </div>

            {/* Last Name */}
            <div className="detail-item">
              <span className="detail-label">Last Name:</span>
              <span className="detail-value">
                {disableForm ? (
                  profileData.last_name
                ) : (
                  <input
                    type="text"
                    onChange={updateValue}
                    value={profileData.last_name}
                    name="last_name"
                    style={{ border: "2px inset #EBE9ED" }}
                  />
                )}
              </span>
            </div>

            {/* Username */}
            <div className="detail-item">
              <span className="detail-label">Username:</span>
              <span className="detail-value">
                {disableForm ? (
                  profileData.username
                ) : (
                  <>
                    <input
                      type="text"
                      onChange={updateValue}
                      value={profileData.username}
                      name="username"
                      style={{ border: "2px inset #EBE9ED" }}
                    />
                    {errors.username && (
                      <div style={{ color: "red", marginTop: "5px" }}>
                        {errors.username}
                      </div>
                    )}
                  </>
                )}
              </span>
            </div>

            {/* Email */}
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">
                {disableForm ? (
                  profileData.email
                ) : (
                  <>
                    <input
                      type="text"
                      onChange={updateValue}
                      value={profileData.email}
                      name="email"
                      style={{ border: "2px inset #EBE9ED" }}
                    />
                    {errors.email && (
                      <div style={{ color: "red", marginTop: "5px" }}>
                        {errors.email}
                      </div>
                    )}
                  </>
                )}
              </span>
            </div>

            {/* Department (Non-editable) */}
            <div className="detail-item">
              <span className="detail-label">Department:</span>
              <span className="detail-value">{profileData.department}</span>
            </div>

            {/* Role (Non-editable) */}
            <div className="detail-item">
              <span className="detail-label">Role:</span>
              <span className="detail-value">{profileData.role}</span>
            </div>
          </div>

          <div className="profile-actions">
            <button
              type="button"
              className="action-button edit"
              onClick={disableForm ? handleEditForm : handleSubmitForm}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : disableForm
                ? "Edit Profile"
                : "Update"}
            </button>
            <button className="action-button change-password">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
