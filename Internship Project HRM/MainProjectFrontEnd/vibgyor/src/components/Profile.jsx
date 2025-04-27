"use client";

import { useState, useEffect } from "react";
import MainLayout from "./layout/MainLayout";
import { useAuth } from "../contexts/AuthContext";
import styles from "../css/Profile.module.css";
import api from "../services/api";

const Profile = () => {
  const [disableForm, setDisableForm] = useState(true); // Controls whether form is editable
  const { currentUser, setCurrentUser } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    department: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State to hold backend errors
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });
function fetchProfileData () {
  setIsLoading(true);
  // Simulate API call (You should replace this with actual API call)
  setTimeout(() => {
    setProfileData({
      firstName: currentUser.firstName || "",
      lastName: currentUser.lastName || "",
      username: currentUser.username || "",
      email: currentUser.email || "",
      department: currentUser.department || "",
      role: currentUser.role || "",
    });
    setIsLoading(false);
  }, 1000); // Simulating delay
};
  // Fetch and set profile data when currentUser changes
  useEffect(() => {
    if(currentUser) 
      fetchProfileData();
  },[currentUser] );

  function handleEditForm() {
    setDisableForm(false); // Enable form for editing
  }

  function updateValue(e) {
    const data = { ...profileData, [e.target.name]: e.target.value };
    setProfileData(data);
  }

  async function handleSubmitForm() {
    let newErrors = {};
    if (!isValidEmail(profileData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!profileData.username.trim()){
      newErrors.username = "UserName is Required. "
    }
    if (!profileData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    } else if (!isNaN(profileData.firstName)) {
      newErrors.firstName = "First name cannot be numeric.";
    }
    if (!profileData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    } else if (!isNaN(profileData.lastName)) {
      newErrors.lastName = "Last name cannot be numeric.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitting(true);
    // setDisableForm(true);

    try {
      const response = await api.put(`/api/accounts/user/${currentUser.id}/`, {
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        email: profileData.email,
        username: profileData.username,
        partial: true,
      });

      if (response.status === 200) {
        setCurrentUser({
          ...currentUser,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          email: profileData.email,
          username: profileData.username,
        });
        console.log(currentUser, profileData);
        setDisableForm(true);
        setErrors({ username: "", email: "", firstName: "", lastName: "" }); // Clear errors on successful submission
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
      } else {
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
     <div className={styles["profile-container"]}>
       <div className={styles["profile-card"]}>
         <div className={styles["profile-header"]}>
           <h2>My Profile</h2>
         </div>

         <div className={styles["profile-details"]}>
           {/* First Name */}
           <div className={styles["detail-item"]}>
             <span className={styles["detail-label"]}>First Name:</span>
             <span className={styles["detail-value"]}>
               {disableForm ? (
                 profileData.firstName
               ) : (
                 <>
                   <input
                     type="text"
                     onChange={updateValue}
                     value={profileData.firstName}
                     name="firstName"
                     className={styles["profile-input"]}
                   />
                   {errors.firstName && (
                     <div style={{ color: "red", marginTop: "5px" }}>
                       {errors.firstName}
                     </div>
                   )}
                 </>
               )}
             </span>
           </div>

           {/* Last Name */}
           <div className={styles["detail-item"]}>
             <span className={styles["detail-label"]}>Last Name:</span>
             <span className={styles["detail-value"]}>
               {disableForm ? (
                 profileData.lastName
               ) : (
                 <>
                   <input
                     type="text"
                     onChange={updateValue}
                     value={profileData.lastName}
                     name="lastName"
                     className={styles["profile-input"]}
                   />
                   {errors.lastName && (
                     <div style={{ color: "red", marginTop: "5px" }}>
                       {errors.lastName}
                     </div>
                   )}
                 </>
               )}
             </span>
           </div>

           {/* Username */}
           <div className={styles["detail-item"]}>
             <span className={styles["detail-label"]}>Username:</span>
             <span className={styles["detail-value"]}>
               {disableForm ? (
                 profileData.username
               ) : (
                 <>
                   <input
                     type="text"
                     onChange={updateValue}
                     value={profileData.username}
                     name="username"
                     className={styles["profile-input"]}
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
           <div className={styles["detail-item"]}>
             <span className={styles["detail-label"]}>Email:</span>
             <span className={styles["detail-value"]}>
               {disableForm ? (
                 profileData.email
               ) : (
                 <>
                   <input
                     type="text"
                     onChange={updateValue}
                     value={profileData.email}
                     name="email"
                     className={styles["profile-input"]}
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

           {/* Department */}
           <div className={styles["detail-item"]}>
             <span className={styles["detail-label"]}>Department:</span>
             <span className={styles["detail-value"]}>
               {profileData.department}
             </span>
           </div>

           {/* Role */}
           <div className={styles["detail-item"]}>
             <span className={styles["detail-label"]}>Role:</span>
             <span className={styles["detail-value"]}>{profileData.role}</span>
           </div>
         </div>

         <div className={styles["profile-actions"]}>
           <button
             type="button"
             className={`${styles["action-button"]} ${styles["edit"]}`}
             onClick={disableForm ? handleEditForm : handleSubmitForm}
             disabled={isSubmitting}
           >
             {isSubmitting
               ? "Saving..."
               : disableForm
               ? "Edit Profile"
               : "Update"}
           </button>

           {disableForm ? (
             <button
               className={`${styles["action-button"]} ${styles["change-password"]}`}
             >
               Change Password
             </button>
           ) : (
             <button
               onClick={() => {
                 setDisableForm(true);
                 fetchProfileData();
                 setErrors({});
               }}
               className={`${styles["action-button"]} btn btn-primary ${styles["Cancel-Update"]}`}
             >
               Cancel Update
             </button>
           )}
         </div>
       </div>
     </div>
   </MainLayout>
 );

};

export default Profile;
