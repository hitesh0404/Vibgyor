"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import "../css/AuthPages.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    department: "",
    role: "",
    manager: "",
  });

  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    hasUpper: false,
    hasLower: false,
    hasSpecial: false,
  });

  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get("api/accounts/combined-data/");
        setDepartments(response.data.departments);
        setRoles(response.data.roles);
        setManagers(response.data.managers);
        console.log(response)
        
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    };

    fetchDepartments();
  }, []);
 const passwordValidation = (value) => {
   if (!/(?=.*?[A-Z])/.test(value)) {
     return "Password must contain at least one uppercase letter.";
   }
   if (!/(?=.*?[a-z])/.test(value)) {
     return "Password must contain at least one lowercase letter.";
   }
   if (!/(?=.*?[0-9])/.test(value)) {
     return "Password must contain at least one digit.";
   }
   if (!/(?=.*?[#?!@$%^&*-])/.test(value)) {
     return "Password must contain at least one special character.";
   }
   if (value.length < 8) {
     return "Password must be at least 8 characters long.";
   }
   return true; // return true if all conditions are met
 };
  const validatePassword = (password) => {
    const validations = {
      minLength: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasSpecial: /[^A-Za-z0-9]/.test(password),
    };
    setPasswordValidations(validations);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "password") {
      validatePassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError("");
      setLoading(true);
      console.log(formData);
      
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        department: formData.department,
        role: formData.role,
        manager: formData.manager,
      });

      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data) {
        const errors = err.response.data;
        const errorMessages = Object.keys(errors)
          .map((key) => `${key}: ${errors[key].join(", ")}`)
          .join("\n");
        setError(errorMessages);
      } else {
        setError("An error occurred during registration. Please try again.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Vibgyor HRMS</h1>
          <p>Create a new account</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              disabled={loading}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.url}>
                  {dept.dept_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
              required
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.url}>
                  {role.RoleName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="manager">Manager</label>
            <select
              id="manager"
              name="manager"
              value={formData.manager}
              onChange={handleChange}
              disabled={loading}
              required
            >
              <option value="">Select Manager</option>
              {managers.map((manager) => (
                <option key={manager.id} value={manager.url}>
                  {(manager.firs_tname + manager.last_name).length>0
                    ? manager.first_name + " " + manager.last_name
                    : manager.username}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <div className="password-requirements">
                <p>Password must include:</p>
                <ul>
                  <li
                    className={
                      passwordValidations.minLength ? "valid" : "invalid"
                    }
                  >
                    ✅ At least 8 characters
                  </li>
                  <li
                    className={
                      passwordValidations.hasUpper ? "valid" : "invalid"
                    }
                  >
                    ✅ An uppercase letter
                  </li>
                  <li
                    className={
                      passwordValidations.hasLower ? "valid" : "invalid"
                    }
                  >
                    ✅ A lowercase letter
                  </li>
                  <li
                    className={
                      passwordValidations.hasSpecial ? "valid" : "invalid"
                    }
                  >
                    ✅ A special character (!@#$...)
                  </li>
                </ul>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <input
                type="password"
                id="password2"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className="form-footer">
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>

          <div className="auth-links">
            <Link to="/login">Already have an account? Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
