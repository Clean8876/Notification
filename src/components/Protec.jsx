// components/ProtectedRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectUser } from '../slices/AuthSlice';

const ProtectedRoute = () => {
    const user = useSelector(selectUser);

  // Redirect to homepage if no ProjectId
  if (!user.user.apps) {
    console.log(user.user.apps)
    return <Navigate to="/HOME" />;
  }

  // Render the protected route
  return <Outlet />;
};

export default ProtectedRoute;