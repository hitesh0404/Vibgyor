"use client"

import { useState, useEffect } from "react"
import MainLayout from "./layout/MainLayout"
import { useAuth } from "../contexts/AuthContext"
import { FaUserPlus, FaFileAlt, FaEnvelope, FaPhone, FaChevronDown, FaChevronUp } from "react-icons/fa"
import "../css/Applicants.css"

const Applicants = () => {
  const { currentUser } = useAuth()
  const [applicants, setApplicants] = useState([])
  const [jobs, setJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [expandedApplicant, setExpandedApplicant] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchApplicantsData = async () => {
      try {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Sample data - in a real app, this would come from your API
        const jobsData = [
          { id: 1, title: "Senior Frontend Developer" },
          { id: 2, title: "UX/UI Designer" },
          { id: 3, title: "DevOps Engineer" },
        ]

        const applicantsData = [
          {
            id: 1,
            name: "John Smith",
            email: "john.smith@example.com",
            phone: "(555) 123-4567",
            jobId: 1,
            jobTitle: "Senior Frontend Developer",
            appliedOn: "2023-11-01",
            status: "new",
            resume: "john_smith_resume.pdf",
            coverLetter: "I am excited to apply for the Senior Frontend Developer position...",
            experience: "5 years",
            skills: ["React", "JavaScript", "TypeScript", "CSS", "HTML"],
            education: "Bachelor of Science in Computer Science, University of Technology",
            notes: "",
          },
          {
            id: 2,
            name: "Sarah Johnson",
            email: "sarah.johnson@example.com",
            phone: "(555) 987-6543",
            jobId: 1,
            jobTitle: "Senior Frontend Developer",
            appliedOn: "2023-10-28",
            status: "in-review",
            resume: "sarah_johnson_resume.pdf",
            coverLetter: "With over 4 years of experience in frontend development...",
            experience: "4 years",
            skills: ["React", "Redux", "JavaScript", "CSS", "Sass"],
            education: "Master of Computer Science, State University",
            notes: "Strong portfolio, good communication skills",
          },
          {
            id: 3,
            name: "Michael Brown",
            email: "michael.brown@example.com",
            phone: "(555) 456-7890",
            jobId: 2,
            jobTitle: "UX/UI Designer",
            appliedOn: "2023-10-30",
            status: "interview",
            resume: "michael_brown_resume.pdf",
            coverLetter: "As a passionate UX/UI Designer with 3 years of experience...",
            experience: "3 years",
            skills: ["Figma", "Sketch", "Adobe XD", "UI Design", "User Research"],
            education: "Bachelor of Fine Arts in Graphic Design, Design Institute",
            notes: "Scheduled for interview on Nov 15",
          },
          {
            id: 4,
            name: "Emily Davis",
            email: "emily.davis@example.com",
            phone: "(555) 789-0123",
            jobId: 3,
            jobTitle: "DevOps Engineer",
            appliedOn: "2023-10-25",
            status: "rejected",
            resume: "emily_davis_resume.pdf",
            coverLetter: "I am writing to express my interest in the DevOps Engineer position...",
            experience: "2 years",
            skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Jenkins"],
            education: "Bachelor of Science in Information Technology, Tech University",
            notes: "Not enough experience with Kubernetes",
          },
          {
            id: 5,
            name: "David Wilson",
            email: "david.wilson@example.com",
            phone: "(555) 234-5678",
            jobId: 2,
            jobTitle: "UX/UI Designer",
            appliedOn: "2023-10-27",
            status: "hired",
            resume: "david_wilson_resume.pdf",
            coverLetter: "I am excited to apply for the UX/UI Designer position...",
            experience: "6 years",
            skills: ["Figma", "Adobe XD", "UI Design", "Prototyping", "User Testing"],
            education: "Master of Design, Art University",
            notes: "Start date: December 1, 2023",
          },
        ]

        setJobs(jobsData)
        setApplicants(applicantsData)
      } catch (error) {
        console.error("Error fetching applicants data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchApplicantsData()
  }, [])

  const handleApplicantExpand = (applicantId) => {
    if (expandedApplicant === applicantId) {
      setExpandedApplicant(null)
    } else {
      setExpandedApplicant(applicantId)
    }
  }

  const handleStatusChange = (applicantId, newStatus) => {
    setApplicants((prev) =>
      prev.map((applicant) => {
        if (applicant.id === applicantId) {
          return {
            ...applicant,
            status: newStatus,
          }
        }
        return applicant
      }),
    )
  }

  const handleNotesChange = (applicantId, notes) => {
    setApplicants((prev) =>
      prev.map((applicant) => {
        if (applicant.id === applicantId) {
          return {
            ...applicant,
            notes,
          }
        }
        return applicant
      }),
    )
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return <span className="status-badge new">New</span>
      case "in-review":
        return <span className="status-badge in-review">In Review</span>
      case "interview":
        return <span className="status-badge interview">Interview</span>
      case "hired":
        return <span className="status-badge hired">Hired</span>
      case "rejected":
        return <span className="status-badge rejected">Rejected</span>
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

  const filteredApplicants = applicants.filter((applicant) => {
    if (selectedJob !== "all" && applicant.jobId !== Number.parseInt(selectedJob)) {
      return false
    }
    if (selectedStatus !== "all" && applicant.status !== selectedStatus) {
      return false
    }
    return true
  })

  return (
    <MainLayout title="Applicants">
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading applicants data...</p>
        </div>
      ) : (
        <div className="applicants-container">
          <div className="applicants-header">
            <div className="applicant-stats">
              <div className="stat-card">
                <div className="stat-value">{applicants.length}</div>
                <div className="stat-label">Total Applicants</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{applicants.filter((a) => a.status === "new").length}</div>
                <div className="stat-label">New</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{applicants.filter((a) => a.status === "interview").length}</div>
                <div className="stat-label">Interviews</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{applicants.filter((a) => a.status === "hired").length}</div>
                <div className="stat-label">Hired</div>
              </div>
            </div>

            <div className="applicant-filters">
              <div className="filter-group">
                <label htmlFor="job-filter">Filter by Job:</label>
                <select
                  id="job-filter"
                  value={selectedJob}
                  onChange={(e) => setSelectedJob(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Jobs</option>
                  {jobs.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="status-filter">Filter by Status:</label>
                <select
                  id="status-filter"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="in-review">In Review</option>
                  <option value="interview">Interview</option>
                  <option value="hired">Hired</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          <div className="applicants-list-container">
            <h3>Applicants ({filteredApplicants.length})</h3>

            {filteredApplicants.length === 0 ? (
              <div className="no-applicants">No applicants found matching the selected filters.</div>
            ) : (
              <div className="applicants-list">
                {filteredApplicants.map((applicant) => (
                  <div key={applicant.id} className="applicant-card">
                    <div className="applicant-header">
                      <div className="applicant-info">
                        <h4>{applicant.name}</h4>
                        <div className="applicant-meta">
                          <span className="applicant-job">{applicant.jobTitle}</span>
                          <span className="applicant-date">Applied: {formatDate(applicant.appliedOn)}</span>
                          {getStatusBadge(applicant.status)}
                        </div>
                      </div>

                      <div className="applicant-actions">
                        <button className="action-btn view" onClick={() => handleApplicantExpand(applicant.id)}>
                          {expandedApplicant === applicant.id ? <FaChevronUp /> : <FaChevronDown />}
                          {expandedApplicant === applicant.id ? "Hide Details" : "View Details"}
                        </button>
                      </div>
                    </div>

                    {expandedApplicant === applicant.id && (
                      <div className="applicant-details">
                        <div className="details-grid">
                          <div className="details-column">
                            <div className="detail-section">
                              <h5>Contact Information</h5>
                              <div className="contact-info">
                                <div className="contact-item">
                                  <FaEnvelope className="contact-icon" />
                                  <a href={`mailto:${applicant.email}`}>{applicant.email}</a>
                                </div>
                                <div className="contact-item">
                                  <FaPhone className="contact-icon" />
                                  <a href={`tel:${applicant.phone}`}>{applicant.phone}</a>
                                </div>
                              </div>
                            </div>

                            <div className="detail-section">
                              <h5>Resume</h5>
                              <div className="resume-preview">
                                <FaFileAlt className="file-icon" />
                                <span>{applicant.resume}</span>
                                <button className="view-btn">View Resume</button>
                              </div>
                            </div>

                            <div className="detail-section">
                              <h5>Cover Letter</h5>
                              <div className="cover-letter">
                                <p>{applicant.coverLetter}</p>
                              </div>
                            </div>
                          </div>

                          <div className="details-column">
                            <div className="detail-section">
                              <h5>Experience & Education</h5>
                              <div className="experience-info">
                                <div className="info-item">
                                  <span className="info-label">Experience:</span>
                                  <span className="info-value">{applicant.experience}</span>
                                </div>
                                <div className="info-item">
                                  <span className="info-label">Education:</span>
                                  <span className="info-value">{applicant.education}</span>
                                </div>
                              </div>
                            </div>

                            <div className="detail-section">
                              <h5>Skills</h5>
                              <div className="skills-list">
                                {applicant.skills.map((skill, index) => (
                                  <span key={index} className="skill-tag">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="detail-section">
                              <h5>Notes</h5>
                              <textarea
                                className="notes-input"
                                value={applicant.notes}
                                onChange={(e) => handleNotesChange(applicant.id, e.target.value)}
                                placeholder="Add notes about this applicant..."
                                rows="3"
                              ></textarea>
                            </div>
                          </div>
                        </div>

                        <div className="status-actions">
                          <h5>Update Status</h5>
                          <div className="status-buttons">
                            <button
                              className={`status-btn new ${applicant.status === "new" ? "active" : ""}`}
                              onClick={() => handleStatusChange(applicant.id, "new")}
                              disabled={applicant.status === "new"}
                            >
                              New
                            </button>
                            <button
                              className={`status-btn in-review ${applicant.status === "in-review" ? "active" : ""}`}
                              onClick={() => handleStatusChange(applicant.id, "in-review")}
                              disabled={applicant.status === "in-review"}
                            >
                              In Review
                            </button>
                            <button
                              className={`status-btn interview ${applicant.status === "interview" ? "active" : ""}`}
                              onClick={() => handleStatusChange(applicant.id, "interview")}
                              disabled={applicant.status === "interview"}
                            >
                              Interview
                            </button>
                            <button
                              className={`status-btn hired ${applicant.status === "hired" ? "active" : ""}`}
                              onClick={() => handleStatusChange(applicant.id, "hired")}
                              disabled={applicant.status === "hired"}
                            >
                              Hired
                            </button>
                            <button
                              className={`status-btn rejected ${applicant.status === "rejected" ? "active" : ""}`}
                              onClick={() => handleStatusChange(applicant.id, "rejected")}
                              disabled={applicant.status === "rejected"}
                            >
                              Rejected
                            </button>
                          </div>
                        </div>

                        <div className="applicant-footer-actions">
                          <button
                            className="footer-btn onboard"
                            onClick={() => {
                              // In a real app, this would navigate to onboarding page
                              console.log("Onboard applicant:", applicant.id)
                            }}
                            disabled={applicant.status !== "hired"}
                          >
                            <FaUserPlus /> Start Onboarding
                          </button>

                          <button
                            className="footer-btn email"
                            onClick={() => {
                              // In a real app, this would open email composer
                              window.location.href = `mailto:${applicant.email}`
                            }}
                          >
                            <FaEnvelope /> Send Email
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </MainLayout>
  )
}

export default Applicants

