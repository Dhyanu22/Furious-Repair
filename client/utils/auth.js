// utils/auth.js
import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export const authUtils = {
  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem("user");
  },

  // Sign out user
  signOut: async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/auth/signout`,
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("user");
      window.location.href = "/login";
    } catch (error) {
      console.error("Sign out error:", error);
      // Still clear localStorage even if server request fails
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  },

  // Check authentication status with server
  checkAuth: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
        withCredentials: true,
      });
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error) {
      localStorage.removeItem("user");
      return null;
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/users/profile`,
        userData,
        { withCredentials: true }
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user profile
  getProfile: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Set up axios interceptor for automatic authentication
  setupAxiosInterceptor: () => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  },
};

// Configure axios defaults
axios.defaults.withCredentials = true;
