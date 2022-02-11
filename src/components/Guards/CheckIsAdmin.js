import React from "react";
import { Navigate } from "react-router-dom";

const CheckIsAdmin = ({ children }) => {

    if (JSON.parse(localStorage.getItem('role')) === "super admin") {
        return children;
    }

    return <Navigate to="/" />;
};

export default CheckIsAdmin;
