"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import api from "../services/api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user_data");
    delete api.defaults.headers.common["Authorization"];
    setCurrentUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
  };

  const fetchCurrentUser = useCallback(async (data = null) => {
    setLoading(true);
    try {
      let userData = data;

      if (!userData) {
        const response = await api.get("api/accounts/users/me/");
        userData = response.data;
      }

      setCurrentUser(userData);
      setUserRole(userData.role || "Employee");
      setIsAuthenticated(true);
      localStorage.setItem("user_data", JSON.stringify(userData));
    } catch (error) {
      console.error("Error fetching user data:", error);
      logout();
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRefreshedToken = useCallback(async () => {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) {
      logout();
      return;
    }

    try {
      const response = await api.post("/api/token/refresh/", { refresh });
      const { access, user_data } = response.data;

      localStorage.setItem("access", access);
      if (user_data) {
        localStorage.setItem("user_data", JSON.stringify(user_data));
        fetchCurrentUser(user_data);
      }

      api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Token refresh failed:", err);
      logout();
    } finally {
      setLoading(false);
    }
  }, [fetchCurrentUser]);

  useEffect(() => {
    const access = localStorage.getItem("access");
    const user_data_str = localStorage.getItem("user_data");
    if (access) {
      api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      if (user_data_str) {
        const user_data = JSON.parse(user_data_str); // ✅ Correctly parsed
        fetchCurrentUser(user_data);
      } else {
        fetchCurrentUser(); // fallback
      }
    } else {
      setLoading(false);
    }
  }, [fetchCurrentUser]);

    const loginWithGoogle = async (googleToken) => {
    try {
      const response = await api.post("/api/auth/google/", {
        token: googleToken,
      });
      const { access, refresh, user_data } = response.data;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("user_data", JSON.stringify(user_data));

      api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      fetchCurrentUser(user_data);
      setCurrentUser(user_data);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Google login failed:", error);
      setError("Google authentication failed");
    }
  };

  // Add to value object
  
  const login = async (username, password) => {
    try {
      setError(null);

      const response = await api.post("/api-token-auth/", {
        username,
        password,
      });

      const { access, refresh, user_data } = response.data;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("user_data", JSON.stringify(user_data));

      api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      fetchCurrentUser(user_data);

      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error(error);
      setError("Invalid username or password");
      return false;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await api.post("/api/accounts/user/", userData);
      return response.data;
    } catch (error) {
      setError("Registration failed");
      throw error;
    }
  };

  const hasPermission = (requiredRole) => {
    if (!requiredRole) return true;
    if (!userRole) return false;

    const roleHierarchy = {
      Admin: 4,
      Manager: 3,
      Leader: 2,
      HR: 2,
      Employee: 1,
    };

    const userRoleLevel = roleHierarchy[userRole] || 0;
    const requiredRoleLevel = roleHierarchy[requiredRole] || 0;

    return userRoleLevel >= requiredRoleLevel;
  };

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
    setCurrentUser,
    fetchRefreshedToken,
    loginWithGoogle,

  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
