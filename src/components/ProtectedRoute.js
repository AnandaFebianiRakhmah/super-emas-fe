// src/components/ProtectedRoute.js

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  // If the user is not logged in, redirect to /login,
  // but remember the current location so we can come back:
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Otherwise, render the children (i.e. Layout + its <Outlet> etc.)
  return children;
}
