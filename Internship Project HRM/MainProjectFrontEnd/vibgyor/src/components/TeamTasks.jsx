"use client"

import { useState, useEffect } from "react"
import MainLayout from "./layout/MainLayout"
import { useAuth } from "../contexts/AuthContext"
import { FaTasks, FaPlus, FaUserPlus, FaCheck, FaClock, FaChevronDown, FaChevronUp } from "react-icons/fa"
import "../css/TeamTasks.css"

const TeamTasks = () => {
  const { currentUser } = useAuth()
  const [teams, setTeams] = useState([])
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [teamTasks, setTeamTasks] = useState([])
  const [teamMembers, setTeamMembers] = useState([])
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [showSubtaskForm, setShowSubtaskForm] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [expandedTask, setExpandedTask] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [taskFormData, setTaskFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "medium",
  })
  const [subtaskFormData, setSubtaskFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    assignedTo: "",
    priority: "medium",
  })

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Sample data - in a real app, this would come from your API
        const teamsData = [
          { id: 1, name: "Development Team", department: "Engineering" },
          { id: 2, name: "Design Team", department: "Product" },
        ]

        setTeams(teamsData)

        if (teamsData.length > 0) {
          setSelectedTeam(teamsData[0].id)
          fetchTeamDetails(teamsData[0].id)
        } else {
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Error fetching team data:", error)
        setIsLoading(false)
      }
    }

    fetchTeamData()
  }, [])

  const fetchTeamDetails = async (teamId) => {
    try {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Sample data - in a real app, this would come from your API
      const membersData = [
        { id: 1, name: "John Doe", role: "Frontend Developer", avatar: "JD" },
        { id: 2, name: "Jane Smith", role: "Backend Developer", avatar: "JS" },
        { id: 3, name: "Mike Johnson", role: "UI/UX Designer", avatar: "MJ" },
        { id: 4, name: "Sarah Williams", role: "QA Engineer", avatar: "SW" },
      ]

      const tasksData = [
        {
          id: 1,
          title: "Implement new dashboard features",
          description: "Create new widgets and improve the dashboard UI",
          deadline: "2023-12-15",
          priority: "high",
          status: "in-progress",
          progress: 40,
          assignedOn: "2023-11-01",
          subtasks: [
            {
              id: 101,
              title: "Design dashboard widgets",
              description: "Create mockups for the new dashboard widgets",
              assignedTo: "Mike Johnson",
              deadline: "2023-11-20",
              status: "completed",
              priority: "medium",
            },
            {
              id: 102,
              title: "Implement analytics widget",
              description: "Create the analytics widget with charts",
              assignedTo: "John Doe",
              deadline: "2023-12-05",
              status: "in-progress",
              priority: "high",
            },
            {
              id: 103,
              title: "Test dashboard responsiveness",
              description: "Ensure the dashboard works well on all devices",
              assignedTo: "Sarah Williams",
              deadline: "2023-12-10",
              status: "pending",
              priority: "medium",
            },
          ],
        },
        {
          id: 2,
          title: "API integration for user management",
          description: "Integrate the new user management API endpoints",
          deadline: "2023-12-20",
          priority: "medium",
          status: "pending",
          progress: 0,
          assignedOn: "2023-11-05",
          subtasks: [],
        },
      ]

      setTeamMembers(membersData)
      setTeamTasks(tasksData)
    } catch (error) {
      console.error("Error fetching team details:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTeamChange = (teamId) => {
    setSelectedTeam(teamId)
    fetchTeamDetails(teamId)
  }

  const handleTaskInputChange = (e) => {
    const { name, value } = e.target
    setTaskFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubtaskInputChange = (e) => {
    const { name, value } = e.target
    setSubtaskFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTaskSubmit = (e) => {
    e.preventDefault()

    // In a real app, this would be an API call to create a new team task
    const newTask = {
      id: Date.now(),
      ...taskFormData,
      status: "pending",
      progress: 0,
      assignedOn: new Date().toISOString().split("T")[0],
      subtasks: [],
    }

    setTeamTasks((prev) => [...prev, newTask])

    // Reset form and hide it
    setTaskFormData({
      title: "",
      description: "",
      deadline: "",
      priority: "medium",
    })
    setShowTaskForm(false)
  }

  const handleSubtaskSubmit = (e) => {
    e.preventDefault()

    // In a real app, this would be an API call to create a new subtask
    const newSubtask = {
      id: Date.now(),
      ...subtaskFormData,
      status: "pending",
    }

    setTeamTasks((prev) =>
      prev.map((task) => {
        if (task.id === selectedTask) {
          return {
            ...task,
            subtasks: [...task.subtasks, newSubtask],
          }
        }
        return task
      }),
    )

    // Reset form and hide it
    setSubtaskFormData({
      title: "",
      description: "",
      deadline: "",
      assignedTo: "",
      priority: "medium",
    })
    setShowSubtaskForm(false)
  }

  const handleAddSubtask = (taskId) => {
    setSelectedTask(taskId)
    setShowSubtaskForm(true)
  }

  const handleTaskExpand = (taskId) => {
    if (expandedTask === taskId) {
      setExpandedTask(null)
    } else {
      setExpandedTask(taskId)
    }
  }

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

  const calculateTaskProgress = (task) => {
    if (task.subtasks.length === 0) return 0

    const completedSubtasks = task.subtasks.filter((subtask) => subtask.status === "completed").length
    return Math.round((completedSubtasks / task.subtasks.length) * 100)
  }

  const updateTaskProgress = (taskId) => {
    setTeamTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const progress = calculateTaskProgress(task)
          return {
            ...task,
            progress,
            status: progress === 100 ? "completed" : progress > 0 ? "in-progress" : "pending",
          }
        }
        return task
      }),
    )
  }

  const handleSubtaskStatusChange = (taskId, subtaskId, newStatus) => {
    // In a real app, this would be an API call to update subtask status
    setTeamTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const updatedSubtasks = task.subtasks.map((subtask) => {
            if (subtask.id === subtaskId) {
              return { ...subtask, status: newStatus }
            }
            return subtask
          })

          return {
            ...task,
            subtasks: updatedSubtasks,
          }
        }
        return task
      }),
    )

    // Update the parent task progress
    updateTaskProgress(taskId)
  }

  return (
    <MainLayout title="Team Tasks">
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading team data...</p>
        </div>
      ) : (
        <div className="team-tasks-container">
          <div className="team-header">
            <div className="team-selector">
              <label htmlFor="team-select">Select Team:</label>
              <select
                id="team-select"
                value={selectedTeam || ""}
                onChange={(e) => handleTeamChange(Number(e.target.value))}
              >
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name} ({team.department})
                  </option>
                ))}
              </select>
            </div>

            <button className="add-task-btn" onClick={() => setShowTaskForm(!showTaskForm)}>
              {showTaskForm ? (
                "Cancel"
              ) : (
                <>
                  <FaPlus /> Create Team Task
                </>
              )}
            </button>
          </div>

          {showTaskForm && (
            <div className="task-form-container">
              <h3>Create New Team Task</h3>
              <form onSubmit={handleTaskSubmit} className="task-form">
                <div className="form-group">
                  <label htmlFor="title">Task Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={taskFormData.title}
                    onChange={handleTaskInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={taskFormData.description}
                    onChange={handleTaskInputChange}
                    rows="3"
                    required
                  ></textarea>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="deadline">Deadline</label>
                    <input
                      type="date"
                      id="deadline"
                      name="deadline"
                      value={taskFormData.deadline}
                      onChange={handleTaskInputChange}
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select
                      id="priority"
                      name="priority"
                      value={taskFormData.priority}
                      onChange={handleTaskInputChange}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowTaskForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          )}

          {showSubtaskForm && (
            <div className="task-form-container">
              <h3>Create New Subtask</h3>
              <form onSubmit={handleSubtaskSubmit} className="task-form">
                <div className="form-group">
                  <label htmlFor="subtask-title">Subtask Title</label>
                  <input
                    type="text"
                    id="subtask-title"
                    name="title"
                    value={subtaskFormData.title}
                    onChange={handleSubtaskInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subtask-description">Description</label>
                  <textarea
                    id="subtask-description"
                    name="description"
                    value={subtaskFormData.description}
                    onChange={handleSubtaskInputChange}
                    rows="3"
                    required
                  ></textarea>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="subtask-deadline">Deadline</label>
                    <input
                      type="date"
                      id="subtask-deadline"
                      name="deadline"
                      value={subtaskFormData.deadline}
                      onChange={handleSubtaskInputChange}
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subtask-priority">Priority</label>
                    <select
                      id="subtask-priority"
                      name="priority"
                      value={subtaskFormData.priority}
                      onChange={handleSubtaskInputChange}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="assignedTo">Assign To</label>
                  <select
                    id="assignedTo"
                    name="assignedTo"
                    value={subtaskFormData.assignedTo}
                    onChange={handleSubtaskInputChange}
                    required
                  >
                    <option value="">Select Team Member</option>
                    {teamMembers.map((member) => (
                      <option key={member.id} value={member.name}>
                        {member.name} - {member.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowSubtaskForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Create Subtask
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="team-content">
            <div className="team-members-section">
              <h3>Team Members</h3>
              <div className="team-members-list">
                {teamMembers.map((member) => (
                  <div key={member.id} className="member-card">
                    <div className="member-avatar">{member.avatar}</div>
                    <div className="member-info">
                      <h4>{member.name}</h4>
                      <p>{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="team-tasks-section">
              <h3>Team Tasks</h3>
              {teamTasks.length === 0 ? (
                <div className="no-tasks">No team tasks found.</div>
              ) : (
                <div className="team-tasks-list">
                  {teamTasks.map((task) => (
                    <div key={task.id} className="team-task-card">
                      <div className="task-header" onClick={() => handleTaskExpand(task.id)}>
                        <div className="task-title-row">
                          <h4>{task.title}</h4>
                          {expandedTask === task.id ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                        <div className="task-meta">
                          {getPriorityBadge(task.priority)}
                          <span className="task-deadline">
                            Deadline: {formatDate(task.deadline)}
                            {getDeadlineStatus(task.deadline)}
                          </span>
                          {getStatusBadge(task.status)}
                        </div>
                        <div className="progress-bar-container">
                          <div className="progress-bar" style={{ width: `${task.progress}%` }}></div>
                          <span className="progress-text">{task.progress}%</span>
                        </div>
                      </div>

                      {expandedTask === task.id && (
                        <div className="task-details">
                          <p className="task-description">{task.description}</p>
                          <div className="task-info">
                            <div className="info-item">
                              <span className="info-label">Assigned On:</span>
                              <span className="info-value">{formatDate(task.assignedOn)}</span>
                            </div>
                            <div className="info-item">
                              <span className="info-label">Status:</span>
                              <span className="info-value">{getStatusBadge(task.status)}</span>
                            </div>
                          </div>

                          <div className="subtasks-section">
                            <div className="subtasks-header">
                              <h5>Subtasks</h5>
                              <button className="add-subtask-btn" onClick={() => handleAddSubtask(task.id)}>
                                <FaUserPlus /> Assign Subtask
                              </button>
                            </div>

                            {task.subtasks.length === 0 ? (
                              <div className="no-subtasks">No subtasks assigned yet.</div>
                            ) : (
                              <div className="subtasks-list">
                                {task.subtasks.map((subtask) => (
                                  <div key={subtask.id} className="subtask-item">
                                    <div className="subtask-header">
                                      <h6>{subtask.title}</h6>
                                      {getPriorityBadge(subtask.priority)}
                                    </div>
                                    <p className="subtask-description">{subtask.description}</p>
                                    <div className="subtask-meta">
                                      <div className="meta-item">
                                        <span className="meta-label">Assigned To:</span>
                                        <span className="meta-value">{subtask.assignedTo}</span>
                                      </div>
                                      <div className="meta-item">
                                        <span className="meta-label">Deadline:</span>
                                        <span className="meta-value">
                                          {formatDate(subtask.deadline)}
                                          {getDeadlineStatus(subtask.deadline)}
                                        </span>
                                      </div>
                                      <div className="meta-item">
                                        <span className="meta-label">Status:</span>
                                        <span className="meta-value">{getStatusBadge(subtask.status)}</span>
                                      </div>
                                    </div>

                                    <div className="subtask-actions">
                                      {subtask.status === "pending" && (
                                        <button
                                          className="action-btn start"
                                          onClick={() => handleSubtaskStatusChange(task.id, subtask.id, "in-progress")}
                                        >
                                          Start
                                        </button>
                                      )}

                                      {subtask.status === "in-progress" && (
                                        <button
                                          className="action-btn complete"
                                          onClick={() => handleSubtaskStatusChange(task.id, subtask.id, "completed")}
                                        >
                                          Complete
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  )
}

export default TeamTasks

