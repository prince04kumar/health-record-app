import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if token exists in localStorage

  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/patient-login" />;
  }

  // If token exists, render the child components (e.g., dashboard)
  return children;
};

export default ProtectedRoute;
