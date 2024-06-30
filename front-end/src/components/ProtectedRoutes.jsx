import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  // Replace this with your actual authentication logic
  return !!localStorage.getItem('authToken');
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
