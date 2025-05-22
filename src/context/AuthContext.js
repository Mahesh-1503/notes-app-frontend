import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Initial token from localStorage:', token);
    if (token) {
      // Ensure token is properly formatted
      if (token.startsWith('Bearer ')) {
        axios.defaults.headers.common['Authorization'] = token;
      } else {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      console.log('Set axios header:', axios.defaults.headers.common['Authorization']);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      console.log('Attempting login to:', `${API_URL}/api/auth/login`);
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      console.log('Login response:', response.data);
      const { token, user } = response.data;
      
      // Store token without 'Bearer ' prefix
      const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;
      console.log('Storing token:', cleanToken);
      localStorage.setItem('token', cleanToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${cleanToken}`;
      console.log('Set axios header:', axios.defaults.headers.common['Authorization']);
      
      setUser(user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      console.log('Attempting registration to:', `${API_URL}/api/auth/register`);
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        name,
        email,
        password,
      });
      console.log('Registration response:', response.data);
      const { token, user } = response.data;
      
      // Store token without 'Bearer ' prefix
      const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;
      console.log('Storing token:', cleanToken);
      localStorage.setItem('token', cleanToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${cleanToken}`;
      console.log('Set axios header:', axios.defaults.headers.common['Authorization']);
      
      setUser(user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 