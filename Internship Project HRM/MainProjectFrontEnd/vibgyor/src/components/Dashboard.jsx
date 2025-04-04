// import React from "react";
// import './../css/dashboard.css'
// export default function Dashboard() {
//   return (
//     <>
     
//       <main>
//         <div className="row justify-content-center g-2">
//           <div
//             className="col-2"
//             style={{ "background-color": " hsl(36, 88%, 50%)" }}
//           >
//             <ul
//               className="side-links"
//               style={{
//                 "list-style": "none",
//                 padding: "2%",
//                 margin: "0 0 0 4%",
//               }}
//             >
//               <li>Lorem, ipsum dolor</li>
//               <li>Lorem, ipsum dolor</li>
//               <li>Lorem, ipsum dolor</li>
//               <li>Lorem, ipsum dolor</li>
//               <li>Lorem, ipsum dolor</li>
//               <li>Lorem, ipsum dolor</li>
//               <li>Lorem, ipsum dolor</li>
//               <li>Lorem, ipsum dolor</li>
//               <li>Lorem, ipsum dolor</li>
//               <li>Lorem, ipsum dolor</li>
//             </ul>
//           </div>

//           <div className="col main-links">
//             <div className="row">
//               <div className="col">
//                 <div className="card border-primary">
//                   <div
//                     className="position-relative"
//                     style={{ height: "100px" }}
//                   >
//                     <img
//                       className="card-img-top position-absolute top-50 start-50 translate-middle"
//                       style={{ width: "100px" }}
//                       src="C:\Users\admin\OneDrive\Pictures\random cat.jpg"
//                       alt="Title"
//                     />
//                   </div>
//                   <div className="card-body">
//                     <h4 className="card-title">Random Cat</h4>
//                     <p className="card-text">
//                       This is the random cat which is here just for demo
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col">
//                 <div className="card border-primary">
//                   <div
//                     className="position-relative"
//                     style={{ height: "100px" }}
//                   >
//                     <img
//                       className="card-img-top position-absolute top-50 start-50 translate-middle"
//                       style={{ width: "100px" }}
//                       src="C:\Users\admin\OneDrive\Pictures\random cat.jpg"
//                       alt="Title"
//                     />
//                   </div>
//                   <div className="card-body">
//                     <h4 className="card-title">Title</h4>
//                     <p className="card-text">Text</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col">
//                 <div className="card border-primary">
//                   <div
//                     className="position-relative"
//                     style={{ height: "100px" }}
//                   >
//                     <img
//                       className="card-img-top position-absolute top-50 start-50 translate-middle"
//                       style={{ width: "100px" }}
//                       src="C:\Users\admin\OneDrive\Pictures\random cat.jpg"
//                       alt="Title"
//                     />
//                   </div>
//                   <div className="card-body">
//                     <h4 className="card-title">Title</h4>
//                     <p className="card-text">Text</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="row">
//               <div className="col">
//                 <div className="card">
//                   <div className="card-body">
//                     <h3 className="card-title">Title</h3>
//                     <p className="card-text">Text</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col">
//                 <div className="card">
//                   <div className="card-body">
//                     <h3 className="card-title">Title</h3>
//                     <p className="card-text">Text</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col">
//                 <div className="card">
//                   <div className="card-body">
//                     <h3 className="card-title">Title</h3>
//                     <p className="card-text">Text</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col">
//                 <div className="card">
//                   <div className="card-body">
//                     <h3 className="card-title">Title</h3>
//                     <p className="card-text">Text</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col">
//                 <div className="card">
//                   <div className="card-body">
//                     <h3 className="card-title">Title</h3>
//                     <p className="card-text">Text</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col">
//                 <div className="card">
//                   <div className="card-body">
//                     <h3 className="card-title">Title</h3>
//                     <p className="card-text">Text</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col">
//                 <div className="card">
//                   <div className="card-body">
//                     <h3 className="card-title">Title</h3>
//                     <p className="card-text">Text</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col">
//                 <div className="card">
//                   <div className="card-body">
//                     <h3 className="card-title">Title</h3>
//                     <p className="card-text">Text</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col">
//                 <div className="card">
//                   <div className="card-body">
//                     <h3 className="card-title">Title</h3>
//                     <p className="card-text">Text</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }

"use client"

import { useState, useEffect } from "react"
import MainLayout from "./layout/MainLayout"
import { useAuth } from "../contexts/AuthContext"
import { FaClipboardCheck, FaCalendarAlt, FaTasks, FaChartLine } from "react-icons/fa"
import "../css/Dashboard.css"

const Dashboard = () => {
  const { currentUser } = useAuth()
  const [stats, setStats] = useState({
    attendanceRate: 0,
    pendingTasks: 0,
    completedTasks: 0,
    leaveBalance: 0,
    teamMembers: 0,
    performanceScore: 0,
  })
  const [recentActivities, setRecentActivities] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true)
        // In a real application, these would be separate API calls
        // For demonstration, we're using dummy data

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Sample data
        setStats({
          attendanceRate: 95,
          pendingTasks: 3,
          completedTasks: 12,
          leaveBalance: 15,
          teamMembers: 8,
          performanceScore: 87,
        })

        setRecentActivities([
          { id: 1, type: "task", message: 'You completed task "Update user documentation"', time: "2 hours ago" },
          { id: 2, type: "attendance", message: "You checked in at 09:05 AM", time: "5 hours ago" },
          { id: 3, type: "leave", message: "Your leave request was approved", time: "1 day ago" },
          { id: 4, type: "task", message: 'New task assigned: "Prepare monthly report"', time: "2 days ago" },
        ])
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const getActivityIcon = (type) => {
    switch (type) {
      case "task":
        return <FaTasks className="activity-icon task" />
      case "attendance":
        return <FaClipboardCheck className="activity-icon attendance" />
      case "leave":
        return <FaCalendarAlt className="activity-icon leave" />
      default:
        return <FaChartLine className="activity-icon" />
    }
  }

  return (
    <MainLayout title="Dashboard">
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading dashboard data...</p>
        </div>
      ) : (
        <div className="dashboard-container">
          <div className="welcome-card">
            <div className="welcome-text">
              <h2>Welcome back, {currentUser?.first_name || "User"}!</h2>
              <p>Here's what's happening with your account today.</p>
            </div>
            <div className="date-display">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-icon attendance">
                <FaClipboardCheck />
              </div>
              <div className="stat-content">
                <h3>Attendance Rate</h3>
                <p className="stat-value">{stats.attendanceRate}%</p>
                <p className="stat-label">This Month</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon tasks">
                <FaTasks />
              </div>
              <div className="stat-content">
                <h3>Tasks</h3>
                <p className="stat-value">
                  {stats.pendingTasks} / {stats.pendingTasks + stats.completedTasks}
                </p>
                <p className="stat-label">Pending / Total</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon leave">
                <FaCalendarAlt />
              </div>
              <div className="stat-content">
                <h3>Leave Balance</h3>
                <p className="stat-value">{stats.leaveBalance}</p>
                <p className="stat-label">Days Available</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon performance">
                <FaChartLine />
              </div>
              <div className="stat-content">
                <h3>Performance Score</h3>
                <p className="stat-value">{stats.performanceScore}</p>
                <p className="stat-label">This Month</p>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="recent-activities">
              <h3>Recent Activities</h3>
              <div className="activities-list">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    {getActivityIcon(activity.type)}
                    <div className="activity-content">
                      <p className="activity-message">{activity.message}</p>
                      <p className="activity-time">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="upcoming-section">
              <h3>Upcoming</h3>
              <div className="upcoming-card">
                <div className="upcoming-header">
                  <h4>Team Meeting</h4>
                  <p className="upcoming-time">Tomorrow, 10:00 AM</p>
                </div>
                <p className="upcoming-description">Weekly sprint planning with development team</p>
              </div>

              <div className="upcoming-card">
                <div className="upcoming-header">
                  <h4>Project Deadline</h4>
                  <p className="upcoming-time">Friday, 5:00 PM</p>
                </div>
                <p className="upcoming-description">Submit monthly performance report</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  )
}

export default Dashboard

