"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import "../css/AuthPages.css";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [managers, setManagers] = useState([]);
  const [error, setError] = useState("");

  const { register: authRegister } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get("api/accounts/combined-data/");
        setDepartments(response.data.departments);
        setRoles(response.data.roles);
        setManagers(response.data.managers);
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    };

    fetchDepartments();
  }, []);

  const passwordValidation = (value) => {
    if (!value) return "Password is required";
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
    return true;
  };

  const onSubmit = async (formData) => {
    try {
      setError("");

      await authRegister({
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

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                {...register("first_name", {
                  required: "First Name is required",
                  minLength: {
                    value: 2,
                    message: "Minimum length should be 2",
                  },
                })}
                disabled={isSubmitting}
              />
              {errors.first_name && (
                <span className="error-message">
                  {errors.first_name.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                {...register("last_name", {
                  required: "Last Name is required",
                  minLength: {
                    value: 2,
                    message: "Minimum length should be 2",
                  },
                })}
                disabled={isSubmitting}
              />
              {errors.last_name && (
                <span className="error-message">
                  {errors.last_name.message}
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Minimum length should be 3",
                },
              })}
              disabled={isSubmitting}
            />
            {errors.username && (
              <span className="error-message">{errors.username.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email",
                },
              })}
              disabled={isSubmitting}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              {...register("department", {
                required: "Department is required",
              })}
              disabled={isSubmitting}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.url}>
                  {dept.dept_name}
                </option>
              ))}
            </select>
            {errors.department && (
              <span className="error-message">{errors.department.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              {...register("role", {
                required: "Role is required",
              })}
              disabled={isSubmitting}
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.url}>
                  {role.RoleName}
                </option>
              ))}
            </select>
            {errors.role && (
              <span className="error-message">{errors.role.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="manager">Manager</label>
            <select
              id="manager"
              {...register("manager", {
                required: "Manager is required",
              })}
              disabled={isSubmitting}
            >
              <option value="">Select Manager</option>
              {managers.map((manager) => (
                <option key={manager.id} value={manager.url}>
                  {(manager.first_name + manager.last_name).length > 0
                    ? manager.first_name + " " + manager.last_name
                    : manager.username}
                </option>
              ))}
            </select>
            {errors.manager && (
              <span className="error-message">{errors.manager.message}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  validate: passwordValidation,
                })}
                disabled={isSubmitting}
              />
              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <input
                type="password"
                id="password2"
                name="password2"
                {...register("password2", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                disabled={isSubmitting}
              />
              {errors.password2 && (
                <span className="error-message">
                  {errors.password2.message}
                </span>
              )}
            </div>
          </div>

          <div className="form-footer">
            <button
              type="submit"
              className="auth-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
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
