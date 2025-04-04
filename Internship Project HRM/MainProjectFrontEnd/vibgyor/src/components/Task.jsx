"use client"

import { useState, useEffect } from "react"
import MainLayout from "./layout/MainLayout"
import { useAuth } from "../contexts/AuthContext"
import { FaTasks, FaCheck, FaClock, FaChevronDown, FaChevronUp } from "react-icons/fa"
import "../css/Task.css"

const Tasks = () => {
  const { currentUser } = useAuth()
  const [tasks, setTasks] = useState({
    pending: [],
    inProgress: [],
    completed: [],
  })
  const [selectedTask, setSelectedTask] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState("pending")

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Sample data - in a real app, this would come from your API
        setTasks({
          pending: [
            {
              id: 1,
              title: "Update user documentation",
              description: "Update the user documentation with the latest features and improvements",
              deadline: "2023-11-30",
              priority: "medium",
              assignedBy: "John Manager",
              assignedOn: "2023-11-01",
              status: "pending",
              progress: 0,
            },
            {
              id: 2,
              title: "Fix login page bugs",
              description: "Address the reported issues with the login page on mobile devices",
              deadline: "2023-11-15",
              priority: "high",
              assignedBy: "John Manager",
              assignedOn: "2023-11-05",
              status: "pending",
              progress: 0,
            },
          ],
          inProgress: [
            {
              id: 3,
              title: "Implement new dashboard widgets",
              description: "Create new dashboard widgets for the analytics module",
              deadline: "2023-11-20",
              priority: "medium",
              assignedBy: "Jane Lead",
              assignedOn: "2023-10-25",
              status: "in-progress",
              progress: 60,
            },
          ],
          completed: [
            {
              id: 4,
              title: "Design review meeting",
              description: "Participate in the design review meeting for the new feature",
              deadline: "2023-10-30",
              priority: "low",
              assignedBy: "John Manager",
              assignedOn: "2023-10-20",
              status: "completed",
              completedOn: "2023-10-28",
              progress: 100,
            },
            {
              id: 5,
              title: "Code review for PR #123",
              description: "Complete the code review for the pull request #123",
              deadline: "2023-10-28",
              priority: "high",
              assignedBy: "Jane Lead",
              assignedOn: "2023-10-22",
              status: "completed",
              completedOn: "2023-10-27",
              progress: 100,
            },
          ],
        })
      } catch (error) {
        console.error("Error fetching tasks:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "low":
        return <span className="priority-badge low">Low</span>
      case "medium":
        return <span className="priority-badge medium">Medium</span>
      case "high":
        return <span className="priority-badge high">High</span>
      default:
        return null
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="status-badge pending">
            <FaClock /> Pending
          </span>
        )
      case "in-progress":
        return (
          <span className="status-badge in-progress">
            <FaTasks /> In Progress
          </span>
        )
      case "completed":
        return (
          <span className="status-badge completed">
            <FaCheck /> Completed
          </span>
        )
      default:
        return null
    }
  }

  const handleTaskClick = (taskId) => {
    if (selectedTask === taskId) {
      setSelectedTask(null)
    } else {
      setSelectedTask(taskId)
    }
  }

  const handleStartTask = (taskId) => {
    // In a real app, this would be an API call to update task status
    setTasks((prev) => {
      const updatedPending = prev.pending.filter((task) => task.id !== taskId)
      const taskToUpdate = prev.pending.find((task) => task.id === taskId)
      if (taskToUpdate) {
        taskToUpdate.status = "in-progress"
        taskToUpdate.progress = 10
        return {
          ...prev,
          pending: updatedPending,
          inProgress: [...prev.inProgress, taskToUpdate],
        }
      }
      return prev
    })
  }

  const handleCompleteTask = (taskId) => {
    // In a real app, this would be an API call to update task status
    setTasks((prev) => {
      const updatedInProgress = prev.inProgress.filter((task) => task.id !== taskId)
      const taskToUpdate = prev.inProgress.find((task) => task.id === taskId)
      if (taskToUpdate) {
        taskToUpdate.status = "completed"
        taskToUpdate.progress = 100
        taskToUpdate.completedOn = new Date().toISOString().split("T")[0]
        return {
          ...prev,
          inProgress: updatedInProgress,
          completed: [taskToUpdate, ...prev.completed],
        }
      }
      return prev
    })
  }

  const handleUpdateProgress = (taskId, newProgress) => {
    // In a real app, this would be an API call to update task progress
    setTasks((prev) => {
      const updatedInProgress = prev.inProgress.map((task) => {
        if (task.id === taskId) {
          return { ...task, progress: newProgress }
        }
        return task
      })
      return {
        ...prev,
        inProgress: updatedInProgress,
      }
    })
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getDeadlineStatus = (deadline) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return <span className="deadline-status overdue">Overdue</span>
    } else if (diffDays === 0) {
      return <span className="deadline-status today">Due Today</span>
    } else if (diffDays <= 2) {
      return <span className="deadline-status soon">Due Soon</span>
    }
    return null
  }

  return (
    <MainLayout title="My Tasks">
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading tasks...</p>
        </div>
      ) : (
        <div className="tasks-container">
          <div className="tasks-nav">
            <button
              className={`nav-button ${viewMode === "pending" ? "active" : ""}`}
              onClick={() => setViewMode("pending")}
            >
              Pending ({tasks.pending.length})
            </button>
            <button
              className={`nav-button ${viewMode === "in-progress" ? "active" : ""}`}
              onClick={() => setViewMode("in-progress")}
            >
              In Progress ({tasks.inProgress.length})
            </button>
            <button
              className={`nav-button ${viewMode === "completed" ? "active" : ""}`}
              onClick={() => setViewMode("completed")}
            >
              Completed ({tasks.completed.length})
            </button>
          </div>

          <div className="tasks-content">
            {viewMode === "pending" && (
              <>
                <h3 className="section-title">Pending Tasks</h3>
                {tasks.pending.length === 0 ? (
                  <div className="no-tasks">No pending tasks.</div>
                ) : (
                  <div className="tasks-list">
                    {tasks.pending.map((task) => (
                      <div key={task.id} className="task-card">
                        <div className="task-header" onClick={() => handleTaskClick(task.id)}>
                          <div className="task-title-row">
                            <h4>{task.title}</h4>
                            {selectedTask === task.id ? <FaChevronUp /> : <FaChevronDown />}
                          </div>
                          <div className="task-meta">
                            {getPriorityBadge(task.priority)}
                            <span className="task-deadline">
                              Deadline: {formatDate(task.deadline)}
                              {getDeadlineStatus(task.deadline)}
                            </span>
                          </div>
                        </div>

                        {selectedTask === task.id && (
                          <div className="task-details">
                            <p className="task-description">{task.description}</p>
                            <div className="task-info">
                              <div className="info-item">
                                <span className="info-label">Assigned By:</span>
                                <span className="info-value">{task.assignedBy}</span>
                              </div>
                              <div className="info-item">
                                <span className="info-label">Assigned On:</span>
                                <span className="info-value">{formatDate(task.assignedOn)}</span>
                              </div>
                              <div className="info-item">
                                <span className="info-label">Status:</span>
                                <span className="info-value">{getStatusBadge(task.status)}</span>
                              </div>
                            </div>
                            <div className="task-actions">
                              <button className="action-button start" onClick={() => handleStartTask(task.id)}>
                                Start Task
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {viewMode === "in-progress" && (
              <>
                <h3 className="section-title">In Progress Tasks</h3>
                {tasks.inProgress.length === 0 ? (
                  <div className="no-tasks">No tasks in progress.</div>
                ) : (
                  <div className="tasks-list">
                    {tasks.inProgress.map((task) => (
                      <div key={task.id} className="task-card">
                        <div className="task-header" onClick={() => handleTaskClick(task.id)}>
                          <div className="task-title-row">
                            <h4>{task.title}</h4>
                            {selectedTask === task.id ? <FaChevronUp /> : <FaChevronDown />}
                          </div>
                          <div className="task-meta">
                            {getPriorityBadge(task.priority)}
                            <span className="task-deadline">
                              Deadline: {formatDate(task.deadline)}
                              {getDeadlineStatus(task.deadline)}
                            </span>
                          </div>
                          <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: `${task.progress}%` }}></div>
                            <span className="progress-text">{task.progress}%</span>
                          </div>
                        </div>

                        {selectedTask === task.id && (
                          <div className="task-details">
                            <p className="task-description">{task.description}</p>
                            <div className="task-info">
                              <div className="info-item">
                                <span className="info-label">Assigned By:</span>
                                <span className="info-value">{task.assignedBy}</span>
                              </div>
                              <div className="info-item">
                                <span className="info-label">Assigned On:</span>
                                <span className="info-value">{formatDate(task.assignedOn)}</span>
                              </div>
                              <div className="info-item">
                                <span className="info-label">Status:</span>
                                <span className="info-value">{getStatusBadge(task.status)}</span>
                              </div>
                            </div>
                            <div className="update-progress">
                              <h5>Update Progress</h5>
                              <div className="progress-buttons">
                                {[25, 50, 75, 100].map((progress) => (
                                  <button
                                    key={progress}
                                    className={`progress-button ${task.progress >= progress ? "active" : ""}`}
                                    onClick={() => handleUpdateProgress(task.id, progress)}
                                    disabled={task.progress >= progress}
                                  >
                                    {progress}%
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="task-actions">
                              <button
                                className="action-button complete"
                                onClick={() => handleCompleteTask(task.id)}
                                disabled={task.progress < 100}
                              >
                                Mark as Complete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {viewMode === "completed" && (
              <>
                <h3 className="section-title">Completed Tasks</h3>
                {tasks.completed.length === 0 ? (
                  <div className="no-tasks">No completed tasks.</div>
                ) : (
                  <div className="tasks-list">
                    {tasks.completed.map((task) => (
                      <div key={task.id} className="task-card completed-card">
                        <div className="task-header" onClick={() => handleTaskClick(task.id)}>
                          <div className="task-title-row">
                            <h4>{task.title}</h4>
                            {selectedTask === task.id ? <FaChevronUp /> : <FaChevronDown />}
                          </div>
                          <div className="task-meta">
                            {getPriorityBadge(task.priority)}
                            <span className="task-deadline">Completed: {formatDate(task.completedOn)}</span>
                          </div>
                        </div>

                        {selectedTask === task.id && (
                          <div className="task-details">
                            <p className="task-description">{task.description}</p>
                            <div className="task-info">
                              <div className="info-item">
                                <span className="info-label">Assigned By:</span>
                                <span className="info-value">{task.assignedBy}</span>
                              </div>
                              <div className="info-item">
                                <span className="info-label">Assigned On:</span>
                                <span className="info-value">{formatDate(task.assignedOn)}</span>
                              </div>
                              <div className="info-item">
                                <span className="info-label">Deadline:</span>
                                <span className="info-value">{formatDate(task.deadline)}</span>
                              </div>
                              <div className="info-item">
                                <span className="info-label">Status:</span>
                                <span className="info-value">{getStatusBadge(task.status)}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </MainLayout>
  )
}

export default Tasks

