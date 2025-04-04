"use client"

import { useState, useEffect } from "react"
import MainLayout from "./layout/MainLayout"
import { useAuth } from "../contexts/AuthContext"
import { FaUserPlus, FaClipboardCheck, FaFileAlt, FaIdCard, FaLaptop, FaUsers, FaCheckCircle } from "react-icons/fa"
import "../css/Onboarding.css"

const Onboarding = () => {
  const { currentUser } = useAuth()
  const [onboardingEmployees, setOnboardingEmployees] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOnboardingData = async () => {
      try {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Sample data - in a real app, this would come from your API
        const employeesData = [
          {
            id: 1,
            name: "David Wilson",
            email: "david.wilson@example.com",
            phone: "(555) 234-5678",
            position: "UX/UI Designer",
            department: "Design",
            startDate: "2023-12-01",
            status: "in-progress",
            progress: 60,
            tasks: [
              { id: 1, title: "Complete personal information form", status: "completed" },
              { id: 2, title: "Submit identification documents", status: "completed" },
              { id: 3, title: "Complete tax forms", status: "completed" },
              { id: 4, title: "Set up company email", status: "completed" },
              { id: 5, title: "Set up workstation", status: "in-progress" },
              { id: 6, title: "Team introduction", status: "in-progress" },
              { id: 7, title: "Complete training modules", status: "pending" },
              { id: 8, title: "First project assignment", status: "pending" },
              { id: 9, title: "Schedule 30-day review", status: "pending" },
              { id: 10, title: "Benefits enrollment", status: "pending" },
            ],
          },
          {
            id: 2,
            name: "Jennifer Lee",
            email: "jennifer.lee@example.com",
            phone: "(555) 876-5432",
            position: "Marketing Specialist",
            department: "Marketing",
            startDate: "2023-11-15",
            status: "in-progress",
            progress: 80,
            tasks: [
              { id: 1, title: "Complete personal information form", status: "completed" },
              { id: 2, title: "Submit identification documents", status: "completed" },
              { id: 3, title: "Complete tax forms", status: "completed" },
              { id: 4, title: "Set up company email", status: "completed" },
              { id: 5, title: "Set up workstation", status: "completed" },
              { id: 6, title: "Team introduction", status: "completed" },
              { id: 7, title: "Complete training modules", status: "completed" },
              { id: 8, title: "First project assignment", status: "in-progress" },
              { id: 9, title: "Schedule 30-day review", status: "pending" },
              { id: 10, title: "Benefits enrollment", status: "pending" },
            ],
          },
          {
            id: 3,
            name: "Robert Chen",
            email: "robert.chen@example.com",
            phone: "(555) 345-6789",
            position: "Software Engineer",
            department: "Engineering",
            startDate: "2023-11-20",
            status: "in-progress",
            progress: 40,
            tasks: [
              { id: 1, title: "Complete personal information form", status: "completed" },
              { id: 2, title: "Submit identification documents", status: "completed" },
              { id: 3, title: "Complete tax forms", status: "completed" },
              { id: 4, title: "Set up company email", status: "completed" },
              { id: 5, title: "Set up workstation", status: "in-progress" },
              { id: 6, title: "Team introduction", status: "pending" },
              { id: 7, title: "Complete training modules", status: "pending" },
              { id: 8, title: "First project assignment", status: "pending" },
              { id: 9, title: "Schedule 30-day review", status: "pending" },
              { id: 10, title: "Benefits enrollment", status: "pending" },
            ],
          },
          {
            id: 4,
            name: "Maria Garcia",
            email: "maria.garcia@example.com",
            phone: "(555) 567-8901",
            position: "HR Coordinator",
            department: "Human Resources",
            startDate: "2023-10-15",
            status: "completed",
            progress: 100,
            tasks: [
              { id: 1, title: "Complete personal information form", status: "completed" },
              { id: 2, title: "Submit identification documents", status: "completed" },
              { id: 3, title: "Complete tax forms", status: "completed" },
              { id: 4, title: "Set up company email", status: "completed" },
              { id: 5, title: "Set up workstation", status: "completed" },
              { id: 6, title: "Team introduction", status: "completed" },
              { id: 7, title: "Complete training modules", status: "completed" },
              { id: 8, title: "First project assignment", status: "completed" },
              { id: 9, title: "Schedule 30-day review", status: "completed" },
              { id: 10, title: "Benefits enrollment", status: "completed" },
            ],
          },
        ]

        setOnboardingEmployees(employeesData)
        if (employeesData.length > 0) {
          setSelectedEmployee(employeesData[0].id)
        }
      } catch (error) {
        console.error("Error fetching onboarding data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOnboardingData()
  }, [])

  const handleTaskStatusChange = (employeeId, taskId, newStatus) => {
    setOnboardingEmployees((prev) =>
      prev.map((employee) => {
        if (employee.id === employeeId) {
          const updatedTasks = employee.tasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, status: newStatus }
            }
            return task
          })

          // Calculate new progress
          const completedTasks = updatedTasks.filter((task) => task.status === "completed").length
          const progress = Math.round((completedTasks / updatedTasks.length) * 100)

          // Update employee status if all tasks are completed
          const status = progress === 100 ? "completed" : "in-progress"

          return {
            ...employee,
            tasks: updatedTasks,
            progress,
            status,
          }
        }
        return employee
      }),
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "in-progress":
        return <span className="status-badge in-progress">In Progress</span>
      case "completed":
        return <span className="status-badge completed">Completed</span>
      default:
        return null
    }
  }

  const getTaskIcon = (title) => {
    if (title.includes("personal information") || title.includes("tax forms")) {
      return <FaFileAlt className="task-icon document" />
    } else if (title.includes("identification")) {
      return <FaIdCard className="task-icon id" />
    } else if (title.includes("email") || title.includes("workstation")) {
      return <FaLaptop className="task-icon tech" />
    } else if (title.includes("team") || title.includes("introduction")) {
      return <FaUsers className="task-icon team" />
    } else if (title.includes("training") || title.includes("project")) {
      return <FaClipboardCheck className="task-icon training" />
    } else {
      return <FaCheckCircle className="task-icon general" />
    }
  }

  const selectedEmployeeData = onboardingEmployees.find((emp) => emp.id === selectedEmployee)

  return (
    <MainLayout title="Employee Onboarding">
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading onboarding data...</p>
        </div>
      ) : (
        <div className="onboarding-container">
          <div className="onboarding-header">
            <div className="onboarding-stats">
              <div className="stat-card">
                <div className="stat-value">{onboardingEmployees.length}</div>
                <div className="stat-label">Total Employees</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">
                  {onboardingEmployees.filter((emp) => emp.status === "in-progress").length}
                </div>
                <div className="stat-label">In Progress</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">
                  {onboardingEmployees.filter((emp) => emp.status === "completed").length}
                </div>
                <div className="stat-label">Completed</div>
              </div>
            </div>

            <button
              className="add-employee-btn"
              onClick={() => {
                // In a real app, this would navigate to create employee page
                console.log("Add new employee")
              }}
            >
              <FaUserPlus /> Add New Employee
            </button>
          </div>

          <div className="onboarding-content">
            <div className="employees-list-container">
              <h3>Employees</h3>
              <div className="employees-list">
                {onboardingEmployees.map((employee) => (
                  <div
                    key={employee.id}
                    className={`employee-card ${selectedEmployee === employee.id ? "selected" : ""}`}
                    onClick={() => setSelectedEmployee(employee.id)}
                  >
                    <div className="employee-info">
                      <h4>{employee.name}</h4>
                      <div className="employee-meta">
                        <span className="employee-position">{employee.position}</span>
                        <span className="employee-department">{employee.department}</span>
                      </div>
                      <div className="employee-start-date">Start Date: {formatDate(employee.startDate)}</div>
                    </div>

                    <div className="employee-progress">
                      <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${employee.progress}%` }}></div>
                      </div>
                      <div className="progress-text">{employee.progress}% Complete</div>
                      {getStatusBadge(employee.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedEmployeeData && (
              <div className="onboarding-details">
                <div className="employee-header">
                  <div className="employee-profile">
                    <h3>{selectedEmployeeData.name}</h3>
                    <div className="profile-meta">
                      <div className="meta-item">
                        <span className="meta-label">Position:</span>
                        <span className="meta-value">{selectedEmployeeData.position}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">Department:</span>
                        <span className="meta-value">{selectedEmployeeData.department}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">Email:</span>
                        <span className="meta-value">{selectedEmployeeData.email}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">Phone:</span>
                        <span className="meta-value">{selectedEmployeeData.phone}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">Start Date:</span>
                        <span className="meta-value">{formatDate(selectedEmployeeData.startDate)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="employee-status">
                    <div className="status-progress">
                      <div className="progress-circle" data-progress={selectedEmployeeData.progress}>
                        <span className="progress-text">{selectedEmployeeData.progress}%</span>
                      </div>
                    </div>
                    {getStatusBadge(selectedEmployeeData.status)}
                  </div>
                </div>

                <div className="onboarding-tasks">
                  <h3>Onboarding Tasks</h3>
                  <div className="tasks-list">
                    {selectedEmployeeData.tasks.map((task) => (
                      <div key={task.id} className="task-item">
                        <div className="task-content">
                          {getTaskIcon(task.title)}
                          <div className="task-details">
                            <h4>{task.title}</h4>
                          </div>
                        </div>

                        <div className="task-actions">
                          {task.status === "pending" && (
                            <button
                              className="task-btn start"
                              onClick={() => handleTaskStatusChange(selectedEmployeeData.id, task.id, "in-progress")}
                            >
                              Start
                            </button>
                          )}

                          {task.status === "in-progress" && (
                            <button
                              className="task-btn complete"
                              onClick={() => handleTaskStatusChange(selectedEmployeeData.id, task.id, "completed")}
                            >
                              Complete
                            </button>
                          )}

                          {task.status === "completed" && (
                            <span className="task-completed">
                              <FaCheckCircle /> Completed
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="onboarding-actions">
                  <button
                    className="action-btn email"
                    onClick={() => {
                      // In a real app, this would open email composer
                      window.location.href = `mailto:${selectedEmployeeData.email}`
                    }}
                  >
                    Send Welcome Email
                  </button>

                  <button
                    className="action-btn complete"
                    onClick={() => {
                      // In a real app, this would mark all tasks as completed
                      selectedEmployeeData.tasks.forEach((task) => {
                        if (task.status !== "completed") {
                          handleTaskStatusChange(selectedEmployeeData.id, task.id, "completed")
                        }
                      })
                    }}
                    disabled={selectedEmployeeData.status === "completed"}
                  >
                    Complete All Tasks
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </MainLayout>
  )
}

export default Onboarding

