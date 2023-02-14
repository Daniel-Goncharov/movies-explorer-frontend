import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children, isLoggedIn }) {
  let location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  return children;
}