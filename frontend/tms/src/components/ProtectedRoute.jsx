// src/components/ProtectedRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserToken, selectUserRole } from '../store/userSlice';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = useSelector(selectUserToken);
  const role = useSelector(selectUserRole);

  if (!token) {
    // Not logged redirect to our on boarding page
    return <Navigate to="/onboarding" />;
  }

  // If logged in, redirect based on if admin or a user
  if (role === 'Admin') {
    return <Navigate to="/admin/dashboard" />;
  } else {
    return <Navigate to="/dashboard" />;
  }
};

export default ProtectedRoute;
