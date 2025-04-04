"use client"

import { useState, useEffect } from "react"
import MainLayout from "./layout/MainLayout"
import { useAuth } from "../contexts/AuthContext"
import { FaCalendarAlt, FaPlus, FaCheck, FaTimes, FaClock } from "react-icons/fa"
import "../css/LeaveManagement.css"

const LeaveManagement = () => {
  const { currentUser } = useAuth()
  const [leaveBalance, setLeaveBalance] = useState({
    annual: 0,
    sick: 0,
    casual: 0,
    unpaid: 0,
  })
  const [leaveRequests, setLeaveRequests] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showLeaveForm, setShowLeaveForm] = useState(false)
  const [leaveFormData, setLeaveFormData] = useState({
    type: "annual",
    startDate: "",
    endDate: "",
    reason: "",
    attachment: null,
  })

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Sample data - in a real app, this would come from your API
        setLeaveBalance({
          annual: 15,
          sick: 10,
          casual: 5,
          unpaid: 30,
        })

        setLeaveRequests([
          {
            id: 1,
            type: "annual",
            startDate: "2023-12-20",
            endDate: "2023-12-24",
            days: 5,
            reason: "Family vacation",
            status: "approved",
            appliedOn: "2023-11-05",
          },
          {
            id: 2,
            type: "sick",
            startDate: "2023-11-10",
            endDate: "2023-11-10",
            days: 1,
            reason: "Doctor appointment",
            status: "pending",
            appliedOn: "2023-11-01",
          },
          {
            id: 3,
            type: "casual",
            startDate: "2023-10-15",
            endDate: "2023-10-15",
            days: 1,
            reason: "Personal work",
            status: "rejected",
            appliedOn: "2023-10-10",
          },
        ])
      } catch (error) {
        console.error("Error fetching leave data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeaveData()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setLeaveFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    setLeaveFormData((prev) => ({
      ...prev,
      attachment: e.target.files[0],
    }))
  }

  const calculateDays = () => {
    if (!leaveFormData.startDate || !leaveFormData.endDate) return 0

    const start = new Date(leaveFormData.startDate)
    const end = new Date(leaveFormData.endDate)
    const timeDiff = Math.abs(end - start)
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1

    return days
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // In a real app, this would be an API call to submit leave request
      const days = calculateDays()
      const newLeaveRequest = {
        id: Date.now(),
        type: leaveFormData.type,
        startDate: leaveFormData.startDate,
        endDate: leaveFormData.endDate,
        days,
        reason: leaveFormData.reason,
        status: "pending",
        appliedOn: new Date().toISOString().split("T")[0],
      }

      setLeaveRequests((prev) => [newLeaveRequest, ...prev])

      // Reset form and hide it
      setLeaveFormData({
        type: "annual",
        startDate: "",
        endDate: "",
        reason: "",
        attachment: null,
      })
      setShowLeaveForm(false)
    } catch (error) {
      console.error("Error submitting leave request:", error)
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="status-badge approved">
            <FaCheck /> Approved
          </span>
        )
      case "rejected":
        return (
          <span className="status-badge rejected">
            <FaTimes /> Rejected
          </span>
        )
      case "pending":
        return (
          <span className="status-badge pending">
            <FaClock /> Pending
          </span>
        )
      default:
        return null
    }
  }

  const getLeaveTypeLabel = (type) => {
    switch (type) {
      case "annual":
        return "Annual Leave"
      case "sick":
        return "Sick Leave"
      case "casual":
        return "Casual Leave"
      case "unpaid":
        return "Unpaid Leave"
      default:
        return type
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <MainLayout title="Leave Management">
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading leave data...</p>
        </div>
      ) : (
        <div className="leave-container">
          <div className="leave-header">
            <div className="leave-balance-cards">
              <div className="balance-card annual">
                <div className="balance-icon">
                  <FaCalendarAlt />
                </div>
                <div className="balance-details">
                  <h3>Annual Leave</h3>
                  <p className="balance-value">{leaveBalance.annual} days</p>
                </div>
              </div>

              <div className="balance-card sick">
                <div className="balance-icon">
                  <FaCalendarAlt />
                </div>
                <div className="balance-details">
                  <h3>Sick Leave</h3>
                  <p className="balance-value">{leaveBalance.sick} days</p>
                </div>
              </div>

              <div className="balance-card casual">
                <div className="balance-icon">
                  <FaCalendarAlt />
                </div>
                <div className="balance-details">
                  <h3>Casual Leave</h3>
                  <p className="balance-value">{leaveBalance.casual} days</p>
                </div>
              </div>

              <div className="balance-card unpaid">
                <div className="balance-icon">
                  <FaCalendarAlt />
                </div>
                <div className="balance-details">
                  <h3>Unpaid Leave</h3>
                  <p className="balance-value">{leaveBalance.unpaid} days</p>
                </div>
              </div>
            </div>

            <button className="apply-leave-btn" onClick={() => setShowLeaveForm(!showLeaveForm)}>
              {showLeaveForm ? (
                "Cancel"
              ) : (
                <>
                  <FaPlus /> Apply for Leave
                </>
              )}
            </button>
          </div>

          {showLeaveForm && (
            <div className="leave-form-container">
              <h3>Apply for Leave</h3>
              <form onSubmit={handleSubmit} className="leave-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="type">Leave Type</label>
                    <select id="type" name="type" value={leaveFormData.type} onChange={handleInputChange} required>
                      <option value="annual">Annual Leave</option>
                      <option value="sick">Sick Leave</option>
                      <option value="casual">Casual Leave</option>
                      <option value="unpaid">Unpaid Leave</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={leaveFormData.startDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="endDate">End Date</label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={leaveFormData.endDate}
                      onChange={handleInputChange}
                      min={leaveFormData.startDate || new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                </div>

                {leaveFormData.startDate && leaveFormData.endDate && (
                  <div className="days-calculation">
                    <span>
                      Duration: <strong>{calculateDays()} days</strong>
                    </span>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="reason">Reason</label>
                  <textarea
                    id="reason"
                    name="reason"
                    value={leaveFormData.reason}
                    onChange={handleInputChange}
                    rows="3"
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="attachment">Attachment (optional)</label>
                  <input type="file" id="attachment" onChange={handleFileChange} />
                  <small>Upload medical certificates or other relevant documents</small>
                </div>

                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowLeaveForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="leave-requests-section">
            <div className="section-header">
              <h3>Leave Requests</h3>
            </div>

            <div className="leave-requests-list">
              {leaveRequests.length === 0 ? (
                <div className="no-data">No leave requests found.</div>
              ) : (
                leaveRequests.map((request) => (
                  <div key={request.id} className="leave-request-card">
                    <div className="leave-request-header">
                      <h4>{getLeaveTypeLabel(request.type)}</h4>
                      {getStatusBadge(request.status)}
                    </div>

                    <div className="leave-request-dates">
                      <div>
                        <span className="date-label">From:</span>
                        <span className="date-value">{formatDate(request.startDate)}</span>
                      </div>
                      <div>
                        <span className="date-label">To:</span>
                        <span className="date-value">{formatDate(request.endDate)}</span>
                      </div>
                      <div>
                        <span className="date-label">Duration:</span>
                        <span className="date-value">
                          {request.days} day{request.days > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>

                    <div className="leave-request-details">
                      <div className="detail-item">
                        <span className="detail-label">Reason:</span>
                        <span className="detail-value">{request.reason}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Applied On:</span>
                        <span className="detail-value">{formatDate(request.appliedOn)}</span>
                      </div>
                    </div>

                    {request.status === "pending" && (
                      <div className="leave-request-actions">
                        <button className="action-btn cancel">Cancel Request</button>
                      </div>
                    )}

                    {request.status === "rejected" && (
                      <div className="rejection-reason">
                        <p>Rejection reason: Not eligible for leave at this time.</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  )
}

export default LeaveManagement

