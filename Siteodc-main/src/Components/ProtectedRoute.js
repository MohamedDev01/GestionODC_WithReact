import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login with the current location for redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
