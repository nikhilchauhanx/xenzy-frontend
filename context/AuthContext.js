"use client";

import { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // We'll need to install this library

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the AuthProvider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Holds user data e.g., { email: '...' }
  const [token, setToken] = useState(null); // Holds the raw JWT

  // This effect runs once when the app loads
  // It checks if a token exists in localStorage from a previous session
  useEffect(() => {
    const storedToken = localStorage.getItem('xenzy_token');
    if (storedToken) {
      try {
        const decodedUser = jwtDecode(storedToken);
        setUser(decodedUser);
        setToken(storedToken);
      } catch (error) {
        // If token is invalid, clear it
        localStorage.removeItem('xenzy_token');
      }
    }
  }, []);

  // Function to handle user login
  const login = (newToken) => {
    try {
      const decodedUser = jwtDecode(newToken);
      localStorage.setItem('xenzy_token', newToken);
      setUser(decodedUser);
      setToken(newToken);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };

  // Function to handle user logout
  const logout = () => {
    localStorage.removeItem('xenzy_token');
    setUser(null);
    setToken(null);
  };

  // The value provided to all children components
  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user, // A simple boolean to check if user is logged in
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Create a custom hook to use the context easily
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
