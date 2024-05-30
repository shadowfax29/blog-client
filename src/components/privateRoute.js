import React from "react";
import { useAuth } from "../context/authcontext";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    // If user is not authenticated, redirect to login page
    return <Navigate to="/api/users/login" />;
  }
  
 

 

  return children;
};

export default PrivateRoutes;
