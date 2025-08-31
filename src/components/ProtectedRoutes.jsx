import React from "react";
import { Navigate } from "react-router";

export const ProtectedRoutes = ({ children, user }) => {
  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
