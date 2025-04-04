"use client"

import { createContext, useState, useContext, useEffect, useCallback } from "react"
import api from "../services/api"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userRole, setUserRole] = useState(null)

  const fetchCurrentUser = useCallback(async () => {
    try {
      const response = await api.get("api/accounts/users/me/");
      setCurrentUser(response.data);
      console.log(response);
      
      setUserRole(response.data.role || "Employee");
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
      if (error.response) {
        console.error(
          "Server responded with an error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error("No response was received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
      logout(); // Clear data if fetch fails
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token")
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      if(token)
        fetchCurrentUser();
      else
        console.log("no token");
    } else {
      setLoading(false)
    }
  }, [fetchCurrentUser])

  const login = async (username, password) => {
    try {
      setError(null)
      const response = await api.post("/api-token-auth/", {
        username,
        password,
      });
      const token  = response.data.token
      console.log(token);
      localStorage.setItem("token", token)
      // console.log(localStorage.getItem("token"));
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      if(token)
        fetchCurrentUser();
      else
        console.log("no token");
        
      setIsAuthenticated(true)
      return true
    } catch (error) {
      console.log(error);
      
      setError("Invalid username or password")
      return false
    }
  }

  const register = async (userData) => {
    try {
      setError(null)
      const response = await api.post("/auth/register/", userData)
      return response.data
    } catch (error) {
      setError("Registration failed")
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    delete api.defaults.headers.common["Authorization"]
    setCurrentUser(null)
    setUserRole(null)
    setIsAuthenticated(false)
  }

  // Role-based permission check
  const hasPermission = (requiredRole) => {
    if (!requiredRole) return true // No role required
    if (!userRole) return false // No user role

    const roleHierarchy = {
      Admin: 4,
      Manager: 3,
      Leader: 2,
      HR: 2,
      Employee: 1,
    }

    const userRoleLevel = roleHierarchy[userRole] || 0
    const requiredRoleLevel = roleHierarchy[requiredRole] || 0

    return userRoleLevel >= requiredRoleLevel
  }

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    error,
    userRole,
    login,
    register,
    logout,
    hasPermission,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

