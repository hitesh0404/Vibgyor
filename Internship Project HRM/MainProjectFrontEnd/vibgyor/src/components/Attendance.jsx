"use client"

import { useState, useEffect } from "react"
import MainLayout from "./layout/MainLayout"
import { useAuth } from "../contexts/AuthContext"
import { FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa"
import "../css/Attendance.css"

const Attendance = () => {
  const { currentUser } = useAuth()
  const [attendanceStatus, setAttendanceStatus] = useState({
    checkedIn: false,
    checkedOut: false,
    checkinTime: null,
    checkoutTime: null,
  })
  const [attendanceHistory, setAttendanceHistory] = useState([])
  const [attendanceSummary, setAttendanceSummary] = useState({
    present: 0,
    absent: 0,
    late: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // Update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Sample data - in a real app, this would come from your API
        setAttendanceStatus({
          checkedIn: true,
          checkedOut: false,
          checkinTime: new Date(new Date().setHours(9, 5, 0)),
          checkoutTime: null,
        })

        setAttendanceHistory([
          {
            id: 1,
            date: "2023-11-01",
            checkinTime: "09:02 AM",
            checkoutTime: "06:15 PM",
            status: "present",
          },
          {
            id: 2,
            date: "2023-10-31",
            checkinTime: "09:15 AM",
            checkoutTime: "06:05 PM",
            status: "late",
          },
          {
            id: 3,
            date: "2023-10-30",
            checkinTime: "08:55 AM",
            checkoutTime: "06:00 PM",
            status: "present",
          },
          {
            id: 4,
            date: "2023-10-27",
            checkinTime: "09:05 AM",
            checkoutTime: "05:45 PM",
            status: "present",
          },
          {
            id: 5,
            date: "2023-10-26",
            checkinTime: null,
            checkoutTime: null,
            status: "absent",
          },
        ])

        setAttendanceSummary({
          present: 22,
          absent: 1,
          late: 3,
        })
      } catch (error) {
        console.error("Error fetching attendance data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAttendanceData()
  }, [])

  const handleCheckin = async () => {
    try {
      // In a real app, this would be an API call to record check-in
      const checkinTime = new Date()

      setAttendanceStatus({
        ...attendanceStatus,
        checkedIn: true,
        checkinTime,
      })

      // Add to history (this would normally happen via the API)
      const today = new Date().toISOString().split("T")[0]
      const formattedTime = checkinTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })

      setAttendanceHistory((prev) => [
        {
          id: Date.now(),
          date: today,
          checkinTime: formattedTime,
          checkoutTime: null,
          status: "present",
        },
        ...prev,
      ])
    } catch (error) {
      console.error("Error during check-in:", error)
    }
  }

  const handleCheckout = async () => {
    try {
      // In a real app, this would be an API call to record check-out
      const checkoutTime = new Date()

      setAttendanceStatus({
        ...attendanceStatus,
        checkedOut: true,
        checkoutTime,
      })

      // Update history (this would normally happen via the API)
      const formattedTime = checkoutTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })

      setAttendanceHistory((prev) => {
        const updated = [...prev]
        if (updated[0] && !updated[0].checkoutTime) {
          updated[0].checkoutTime = formattedTime
        }
        return updated
      })
    } catch (error) {
      console.error("Error during check-out:", error)
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "present":
        return <span className="status-badge present">Present</span>
      case "absent":
        return <span className="status-badge absent">Absent</span>
      case "late":
        return <span className="status-badge late">Late</span>
      default:
        return null
    }
  }

  return (
    <MainLayout title="Attendance">
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading attendance data...</p>
        </div>
      ) : (
        <div className="attendance-container">
          <div className="attendance-header">
            <div className="today-info">
              <div className="date-box">
                <FaCalendarAlt className="calendar-icon" />
                <div className="date-text">
                  <p className="current-day">{currentTime.toLocaleDateString("en-US", { weekday: "long" })}</p>
                  <p className="current-date">
                    {currentTime.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="time-box">
                <FaClock className="clock-icon" />
                <div className="time-text">
                  <p className="current-time">
                    {currentTime.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="attendance-actions">
              <button
                className={`check-button checkin ${attendanceStatus.checkedIn ? "disabled" : ""}`}
                onClick={handleCheckin}
                disabled={attendanceStatus.checkedIn}
              >
                <FaCheckCircle />
                Check In
              </button>

              <button
                className={`check-button checkout ${!attendanceStatus.checkedIn || attendanceStatus.checkedOut ? "disabled" : ""}`}
                onClick={handleCheckout}
                disabled={!attendanceStatus.checkedIn || attendanceStatus.checkedOut}
              >
                <FaTimesCircle />
                Check Out
              </button>
            </div>
          </div>

          <div className="attendance-status-card">
            <h3>Today's Status</h3>

            <div className="status-details">
              <div className="status-item">
                <div className="status-label">Check In:</div>
                <div className="status-value">
                  {attendanceStatus.checkinTime
                    ? attendanceStatus.checkinTime.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : "Not checked in"}
                </div>
              </div>

              <div className="status-item">
                <div className="status-label">Check Out:</div>
                <div className="status-value">
                  {attendanceStatus.checkoutTime
                    ? attendanceStatus.checkoutTime.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : "Not checked out"}
                </div>
              </div>

              <div className="status-item">
                <div className="status-label">Working Hours:</div>
                <div className="status-value">
                  {attendanceStatus.checkinTime && attendanceStatus.checkoutTime
                    ? calculateHours(attendanceStatus.checkinTime, attendanceStatus.checkoutTime)
                    : attendanceStatus.checkinTime
                      ? calculateHours(attendanceStatus.checkinTime, new Date())
                      : "0 hours"}
                </div>
              </div>
            </div>
          </div>

          <div className="attendance-grid">
            <div className="attendance-summary-card">
              <h3>Monthly Overview</h3>
              <div className="summary-stats">
                <div className="stat-block present">
                  <div className="stat-number">{attendanceSummary.present}</div>
                  <div className="stat-label">Present</div>
                </div>

                <div className="stat-block late">
                  <div className="stat-number">{attendanceSummary.late}</div>
                  <div className="stat-label">Late</div>
                </div>

                <div className="stat-block absent">
                  <div className="stat-number">{attendanceSummary.absent}</div>
                  <div className="stat-label">Absent</div>
                </div>
              </div>

              <div className="attendance-chart">
                <div
                  className="chart-bar present"
                  style={{
                    width: `${(attendanceSummary.present / (attendanceSummary.present + attendanceSummary.absent + attendanceSummary.late)) * 100}%`,
                  }}
                ></div>
                <div
                  className="chart-bar late"
                  style={{
                    width: `${(attendanceSummary.late / (attendanceSummary.present + attendanceSummary.absent + attendanceSummary.late)) * 100}%`,
                  }}
                ></div>
                <div
                  className="chart-bar absent"
                  style={{
                    width: `${(attendanceSummary.absent / (attendanceSummary.present + attendanceSummary.absent + attendanceSummary.late)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="attendance-history-card">
              <h3>Attendance History</h3>
              <div className="history-list">
                <table className="attendance-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Check In</th>
                      <th>Check Out</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceHistory.map((entry) => (
                      <tr key={entry.id}>
                        <td>{formatDate(entry.date)}</td>
                        <td>{entry.checkinTime || "-"}</td>
                        <td>{entry.checkoutTime || "-"}</td>
                        <td>{getStatusBadge(entry.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  )
}

// Helper functions
function calculateHours(start, end) {
  const diff = Math.abs(end - start) / 36e5 // Convert milliseconds to hours
  return `${diff.toFixed(1)} hours`
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default Attendance

