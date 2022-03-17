import React from "react";
import {Navigate} from "react-router-dom";

const CheckIsAdmin = ({children}) => {

    if (JSON.parse(localStorage.getItem('role')) === "super admin") {
        return children;
    }

    return <Navigate to={-1}/>;
};

export default CheckIsAdmin;
