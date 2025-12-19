import React, { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "../api/authAPI";

const AuthContext = createContext(null);

/**
 * Auth Provider
 */
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check auth status on app load
    const token = authAPI.getToken();
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    await authAPI.login(credentials);
    setIsAuthenticated(true);
  };

  const signup = async (data) => {
    await authAPI.signup(data);
  };

  const logout = () => {
    authAPI.logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use auth
 */
export const useAuth = () => {
  return useContext(AuthContext);
};
