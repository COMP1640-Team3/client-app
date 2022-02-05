import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const RequiredAuth = ({ children }) => {
  const location = useLocation();

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  return children;
};

export default RequiredAuth;
