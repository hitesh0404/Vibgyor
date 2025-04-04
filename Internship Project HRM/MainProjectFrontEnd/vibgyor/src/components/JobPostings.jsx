"use client"

import { useState, useEffect } from "react"
import MainLayout from "./layout/MainLayout"
import { useAuth } from "../contexts/AuthContext"
import { FaPlus, FaEdit, FaTrash, FaEye, FaChevronDown, FaChevronUp } from "react-icons/fa"
import "../css/JobPostings.css"

const JobPostings = () => {
  const { currentUser } = useAuth()
  const [jobPostings, setJobPostings] = useState([])
  const [showJobForm, setShowJobForm] = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const [expandedJob, setExpandedJob] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [jobFormData, setJobFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "full-time",
    experience: "",
    salary: "",
    description: "",
    requirements: "",
    responsibilities: "",
    status: "active",
  })

  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Sample data - in a real app, this would come from your API
        const jobsData = [
          {
            id: 1,
            title: "Senior Frontend Developer",
            department: "Engineering",
            location: "New York, NY (Remote)",
            type: "full-time",
            experience: "3-5 years",
            salary: "$90,000 - $120,000",
            description:
              "We are looking for a Senior Frontend Developer to join our growing team. The ideal candidate will have strong experience with React and modern JavaScript.",
            requirements:
              "- 3+ years of experience with React\n- Strong knowledge of JavaScript, HTML, and CSS\n- Experience with state management libraries\n- Bachelor's degree in Computer Science or related field",
            responsibilities:
              "- Develop new user-facing features\n- Build reusable components and libraries\n- Optimize applications for maximum speed and scalability\n- Collaborate with backend developers and designers",
            status: "active",
            postedOn: "2023-10-15",
            applicants: 12,
          },
          {
            id: 2,
            title: "UX/UI Designer",
            department: "Design",
            location: "San Francisco, CA",
            type: "full-time",
            experience: "2-4 years",
            salary: "$80,000 - $100,000",
            description:
              "We are seeking a talented UX/UI Designer to create amazing user experiences. The ideal candidate should have a strong portfolio showcasing their design skills.",
            requirements:
              "- 2+ years of experience in UX/UI design\n- Proficiency in design tools like Figma, Sketch, or Adobe XD\n- Understanding of user-centered design principles\n- Portfolio demonstrating strong design skills",
            responsibilities:
              "- Create user flows, wireframes, and prototypes\n- Conduct user research and usability testing\n- Collaborate with product managers and developers\n- Design intuitive and visually appealing interfaces",
            status: "active",
            postedOn: "2023-10-20",
            applicants: 8,
          },
          {
            id: 3,
            title: "DevOps Engineer",
            department: "Engineering",
            location: "Remote",
            type: "full-time",
            experience: "3-6 years",
            salary: "$100,000 - $130,000",
            description:
              "We are looking for a DevOps Engineer to help us build and maintain our cloud infrastructure. The ideal candidate will have experience with AWS and CI/CD pipelines.",
            requirements:
              "- 3+ years of experience in DevOps\n- Strong knowledge of AWS services\n- Experience with CI/CD tools like Jenkins or GitHub Actions\n- Familiarity with containerization technologies like Docker and Kubernetes",
            responsibilities:
              "- Design and implement CI/CD pipelines\n- Manage and optimize cloud infrastructure\n- Implement security best practices\n- Collaborate with development teams to improve deployment processes",
            status: "inactive",
            postedOn: "2023-09-10",
            applicants: 5,
          },
        ]

        setJobPostings(jobsData)
      } catch (error) {
        console.error("Error fetching job postings:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobPostings()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setJobFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleJobSubmit = (e) => {
    e.preventDefault()

    if (editingJob) {
      // Update existing job
      setJobPostings((prev) =>
        prev.map((job) => {
          if (job.id === editingJob) {
            return {
              ...job,
              ...jobFormData,
              updatedOn: new Date().toISOString().split("T")[0],
            }
          }
          return job
        }),
      )
    } else {
      // Create new job
      const newJob = {
        id: Date.now(),
        ...jobFormData,
        postedOn: new Date().toISOString().split("T")[0],
        applicants: 0,
      }

      setJobPostings((prev) => [...prev, newJob])
    }

    // Reset form and state
    setJobFormData({
      title: "",
      department: "",
      location: "",
      type: "full-time",
      experience: "",
      salary: "",
      description: "",
      requirements: "",
      responsibilities: "",
      status: "active",
    })
    setShowJobForm(false)
    setEditingJob(null)
  }

  const handleEditJob = (job) => {
    setJobFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      experience: job.experience,
      salary: job.salary,
      description: job.description,
      requirements: job.requirements,
      responsibilities: job.responsibilities,
      status: job.status,
    })
    setEditingJob(job.id)
    setShowJobForm(true)
  }

  const handleDeleteJob = (jobId) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      setJobPostings((prev) => prev.filter((job) => job.id !== jobId))
    }
  }

  const handleToggleJobStatus = (jobId) => {
    setJobPostings((prev) =>
      prev.map((job) => {
        if (job.id === jobId) {
          return {
            ...job,
            status: job.status === "active" ? "inactive" : "active",
          }
        }
        return job
      }),
    )
  }

  const handleJobExpand = (jobId) => {
    if (expandedJob === jobId) {
      setExpandedJob(null)
    } else {
      setExpandedJob(jobId)
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
    <MainLayout title="Job Postings">
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading job postings...</p>
        </div>
      ) : (
        <div className="job-postings-container">
          <div className="job-header">
            <div className="job-stats">
              <div className="stat-card">
                <div className="stat-value">{jobPostings.filter((job) => job.status === "active").length}</div>
                <div className="stat-label">Active Jobs</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{jobPostings.reduce((total, job) => total + job.applicants, 0)}</div>
                <div className="stat-label">Total Applicants</div>
              </div>
            </div>

            <button
              className="add-job-btn"
              onClick={() => {
                setShowJobForm(!showJobForm)
                if (editingJob) {
                  setEditingJob(null)
                  setJobFormData({
                    title: "",
                    department: "",
                    location: "",
                    type: "full-time",
                    experience: "",
                    salary: "",
                    description: "",
                    requirements: "",
                    responsibilities: "",
                    status: "active",
                  })
                }
              }}
            >
              {showJobForm ? (
                "Cancel"
              ) : (
                <>
                  <FaPlus /> Create Job Posting
                </>
              )}
            </button>
          </div>

          {showJobForm && (
            <div className="job-form-container">
              <h3>{editingJob ? "Edit Job Posting" : "Create New Job Posting"}</h3>
              <form onSubmit={handleJobSubmit} className="job-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="title">Job Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={jobFormData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="department">Department</label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={jobFormData.department}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={jobFormData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="type">Job Type</label>
                    <select id="type" name="type" value={jobFormData.type} onChange={handleInputChange}>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="experience">Experience</label>
                    <input
                      type="text"
                      id="experience"
                      name="experience"
                      value={jobFormData.experience}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="salary">Salary Range</label>
                    <input
                      type="text"
                      id="salary"
                      name="salary"
                      value={jobFormData.salary}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Job Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={jobFormData.description}
                    onChange={handleInputChange}
                    rows="3"
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="requirements">Requirements</label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    value={jobFormData.requirements}
                    onChange={handleInputChange}
                    rows="4"
                    required
                    placeholder="Enter each requirement on a new line"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="responsibilities">Responsibilities</label>
                  <textarea
                    id="responsibilities"
                    name="responsibilities"
                    value={jobFormData.responsibilities}
                    onChange={handleInputChange}
                    rows="4"
                    required
                    placeholder="Enter each responsibility on a new line"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select id="status" name="status" value={jobFormData.status} onChange={handleInputChange}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setShowJobForm(false)
                      setEditingJob(null)
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    {editingJob ? "Update Job" : "Create Job"}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="job-list-container">
            <div className="job-list-header">
              <h3>Job Postings</h3>
              <div className="job-filters">
                <select
                  className="filter-select"
                  onChange={(e) => {
                    // In a real app, this would filter the jobs
                    console.log("Filter by:", e.target.value)
                  }}
                >
                  <option value="all">All Jobs</option>
                  <option value="active">Active Jobs</option>
                  <option value="inactive">Inactive Jobs</option>
                </select>

                <select
                  className="filter-select"
                  onChange={(e) => {
                    // In a real app, this would filter by department
                    console.log("Filter by department:", e.target.value)
                  }}
                >
                  <option value="all">All Departments</option>
                  <option value="engineering">Engineering</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="hr">HR</option>
                </select>
              </div>
            </div>

            {jobPostings.length === 0 ? (
              <div className="no-jobs">No job postings found.</div>
            ) : (
              <div className="job-list">
                {jobPostings.map((job) => (
                  <div key={job.id} className={`job-card ${job.status === "inactive" ? "inactive" : ""}`}>
                    <div className="job-card-header">
                      <div className="job-title-section">
                        <h4>{job.title}</h4>
                        <div className="job-meta">
                          <span className="job-department">{job.department}</span>
                          <span className="job-location">{job.location}</span>
                          <span className="job-type">{job.type}</span>
                        </div>
                      </div>

                      <div className="job-status-section">
                        <span className={`job-status ${job.status}`}>
                          {job.status === "active" ? "Active" : "Inactive"}
                        </span>
                        <span className="job-date">Posted: {formatDate(job.postedOn)}</span>
                        <span className="job-applicants">{job.applicants} Applicants</span>
                      </div>
                    </div>

                    <div className="job-card-actions">
                      <button className="action-btn view" onClick={() => handleJobExpand(job.id)}>
                        {expandedJob === job.id ? <FaChevronUp /> : <FaChevronDown />}
                        {expandedJob === job.id ? "Hide Details" : "View Details"}
                      </button>

                      <div className="action-buttons">
                        <button className="action-btn toggle-status" onClick={() => handleToggleJobStatus(job.id)}>
                          {job.status === "active" ? "Deactivate" : "Activate"}
                        </button>

                        <button className="action-btn edit" onClick={() => handleEditJob(job)}>
                          <FaEdit /> Edit
                        </button>

                        <button className="action-btn delete" onClick={() => handleDeleteJob(job.id)}>
                          <FaTrash /> Delete
                        </button>

                        <button
                          className="action-btn view-applicants"
                          onClick={() => {
                            // In a real app, this would navigate to applicants page
                            console.log("View applicants for job:", job.id)
                          }}
                        >
                          <FaEye /> View Applicants
                        </button>
                      </div>
                    </div>

                    {expandedJob === job.id && (
                      <div className="job-details">
                        <div className="detail-section">
                          <h5>Job Description</h5>
                          <p>{job.description}</p>
                        </div>

                        <div className="detail-section">
                          <h5>Requirements</h5>
                          <div className="detail-list">
                            {job.requirements.split("\n").map((req, index) => (
                              <p key={index}>{req}</p>
                            ))}
                          </div>
                        </div>

                        <div className="detail-section">
                          <h5>Responsibilities</h5>
                          <div className="detail-list">
                            {job.responsibilities.split("\n").map((resp, index) => (
                              <p key={index}>{resp}</p>
                            ))}
                          </div>
                        </div>

                        <div className="detail-section">
                          <h5>Additional Information</h5>
                          <div className="additional-info">
                            <div className="info-item">
                              <span className="info-label">Experience:</span>
                              <span className="info-value">{job.experience}</span>
                            </div>
                            <div className="info-item">
                              <span className="info-label">Salary Range:</span>
                              <span className="info-value">{job.salary}</span>
                            </div>
                          </div>
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

export default JobPostings

