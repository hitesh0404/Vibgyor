"use client"

import { useState, useEffect } from "react"
import MainLayout from "./layout/MainLayout"
import { useAuth } from "../contexts/AuthContext"
import { FaTrophy, FaMedal, FaStar, FaChartLine, FaCalendarAlt } from "react-icons/fa"
import "../css/Leaderboard.css"

const Leaderboard = () => {
  const { currentUser } = useAuth()
  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState([])
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Sample data - in a real app, this would come from your API
        const departmentsData = [
          { id: 1, name: "Engineering" },
          { id: 2, name: "Design" },
          { id: 3, name: "Marketing" },
          { id: 4, name: "Human Resources" },
        ]

        const employeesData = [
          {
            id: 1,
            name: "John Smith",
            position: "Senior Frontend Developer",
            department: "Engineering",
            avatar: "JS",
            score: 95,
            tasksCompleted: 28,
            onTimeCompletion: 96,
            qualityRating: 4.8,
            attendance: 98,
            rank: 1,
            previousRank: 2,
            trend: "up",
          },
          {
            id: 2,
            name: "Sarah Johnson",
            position: "UX Designer",
            department: "Design",
            avatar: "SJ",
            score: 92,
            tasksCompleted: 24,
            onTimeCompletion: 94,
            qualityRating: 4.9,
            attendance: 95,
            rank: 2,
            previousRank: 1,
            trend: "down",
          },
          {
            id: 3,
            name: "Michael Brown",
            position: "Backend Developer",
            department: "Engineering",
            avatar: "MB",
            score: 88,
            tasksCompleted: 22,
            onTimeCompletion: 90,
            qualityRating: 4.6,
            attendance: 97,
            rank: 3,
            previousRank: 4,
            trend: "up",
          },
          {
            id: 4,
            name: "Emily Davis",
            position: "Marketing Specialist",
            department: "Marketing",
            avatar: "ED",
            score: 85,
            tasksCompleted: 20,
            onTimeCompletion: 88,
            qualityRating: 4.5,
            attendance: 94,
            rank: 4,
            previousRank: 3,
            trend: "down",
          },
          {
            id: 5,
            name: "David Wilson",
            position: "UI Designer",
            department: "Design",
            avatar: "DW",
            score: 82,
            tasksCompleted: 18,
            onTimeCompletion: 85,
            qualityRating: 4.4,
            attendance: 92,
            rank: 5,
            previousRank: 6,
            trend: "up",
          },
          {
            id: 6,
            name: "Jennifer Lee",
            position: "HR Coordinator",
            department: "Human Resources",
            avatar: "JL",
            score: 80,
            tasksCompleted: 17,
            onTimeCompletion: 84,
            qualityRating: 4.3,
            attendance: 96,
            rank: 6,
            previousRank: 5,
            trend: "down",
          },
          {
            id: 7,
            name: "Robert Chen",
            position: "Full Stack Developer",
            department: "Engineering",
            avatar: "RC",
            score: 78,
            tasksCompleted: 16,
            onTimeCompletion: 82,
            qualityRating: 4.2,
            attendance: 90,
            rank: 7,
            previousRank: 8,
            trend: "up",
          },
          {
            id: 8,
            name: "Maria Garcia",
            position: "Content Strategist",
            department: "Marketing",
            avatar: "MG",
            score: 75,
            tasksCompleted: 15,
            onTimeCompletion: 80,
            qualityRating: 4.0,
            attendance: 93,
            rank: 8,
            previousRank: 7,
            trend: "down",
          },
        ]

        setDepartments(departmentsData)
        setEmployees(employeesData)
      } catch (error) {
        console.error("Error fetching leaderboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeaderboardData()
  }, [])

  const filteredEmployees = employees.filter((employee) => {
    if (selectedDepartment === "all") {
      return true
    }
    return employee.department === selectedDepartment
  })

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return (
          <div className="rank-badge gold">
            <FaTrophy /> 1st
          </div>
        )
      case 2:
        return (
          <div className="rank-badge silver">
            <FaMedal /> 2nd
          </div>
        )
      case 3:
        return (
          <div className="rank-badge bronze">
            <FaMedal /> 3rd
          </div>
        )
      default:
        return <div className="rank-badge">{rank}th</div>
    }
  }

  const getTrendIcon = (trend) => {
    if (trend === "up") {
      return <span className="trend-icon up">↑</span>
    } else if (trend === "down") {
      return <span className="trend-icon down">↓</span>
    }
    return null
  }

  const getScoreColor = (score) => {
    if (score >= 90) {
      return "excellent"
    } else if (score >= 80) {
      return "good"
    } else if (score >= 70) {
      return "average"
    } else {
      return "below-average"
    }
  }

  return (
    <MainLayout title="Leaderboard">
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading leaderboard data...</p>
        </div>
      ) : (
        <div className="leaderboard-container">
          <div className="leaderboard-header">
            <div className="leaderboard-title">
              <h2>Employee Performance Leaderboard</h2>
              <p>Recognizing top performers based on task completion, quality, and attendance</p>
            </div>

            <div className="leaderboard-filters">
              <div className="filter-group">
                <label htmlFor="department-filter">Department:</label>
                <select
                  id="department-filter"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="period-filter">Time Period:</label>
                <select
                  id="period-filter"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="filter-select"
                >
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>
          </div>

          <div className="top-performers">
            {filteredEmployees.slice(0, 3).map((employee) => (
              <div key={employee.id} className={`performer-card rank-${employee.rank}`}>
                <div className="performer-rank">
                  {getRankBadge(employee.rank)}
                  {getTrendIcon(employee.trend)}
                </div>

                <div className="performer-avatar">{employee.avatar}</div>

                <div className="performer-info">
                  <h3>{employee.name}</h3>
                  <p className="performer-position">{employee.position}</p>
                  <p className="performer-department">{employee.department}</p>
                </div>

                <div className="performer-score">
                  <div className={`score-value ${getScoreColor(employee.score)}`}>{employee.score}</div>
                  <div className="score-label">Performance Score</div>
                </div>

                <div className="performer-metrics">
                  <div className="metric">
                    <div className="metric-value">{employee.tasksCompleted}</div>
                    <div className="metric-label">Tasks Completed</div>
                  </div>

                  <div className="metric">
                    <div className="metric-value">{employee.onTimeCompletion}%</div>
                    <div className="metric-label">On-Time Completion</div>
                  </div>

                  <div className="metric">
                    <div className="metric-value">{employee.qualityRating}</div>
                    <div className="metric-label">Quality Rating</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="leaderboard-table-container">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Tasks Completed</th>
                  <th>On-Time Completion</th>
                  <th>Quality Rating</th>
                  <th>Attendance</th>
                  <th>Performance Score</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className={employee.rank <= 3 ? `top-${employee.rank}` : ""}>
                    <td className="rank-cell">
                      {getRankBadge(employee.rank)}
                      {getTrendIcon(employee.trend)}
                    </td>
                    <td className="employee-cell">
                      <div className="table-employee">
                        <div className="table-avatar">{employee.avatar}</div>
                        <div className="table-employee-info">
                          <div className="table-employee-name">{employee.name}</div>
                          <div className="table-employee-position">{employee.position}</div>
                        </div>
                      </div>
                    </td>
                    <td>{employee.department}</td>
                    <td>{employee.tasksCompleted}</td>
                    <td>{employee.onTimeCompletion}%</td>
                    <td>
                      <div className="rating">
                        {Array.from({ length: Math.floor(employee.qualityRating) }).map((_, i) => (
                          <FaStar key={i} className="star-icon full" />
                        ))}
                        {employee.qualityRating % 1 !== 0 && <FaStar className="star-icon half" />}
                      </div>
                    </td>
                    <td>{employee.attendance}%</td>
                    <td className="score-cell">
                      <div className={`table-score ${getScoreColor(employee.score)}`}>{employee.score}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="leaderboard-footer">
            <div className="period-info">
              <FaCalendarAlt className="calendar-icon" />
              <span>
                {selectedPeriod === "month" && "Leaderboard for November 2023"}
                {selectedPeriod === "quarter" && "Leaderboard for Q4 2023"}
                {selectedPeriod === "year" && "Leaderboard for 2023"}
              </span>
            </div>

            <div className="leaderboard-note">
              <FaChartLine className="note-icon" />
              <p>Performance scores are calculated based on task completion rate, quality of work, and attendance.</p>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  )
}

export default Leaderboard

