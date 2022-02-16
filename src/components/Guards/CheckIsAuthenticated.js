import React from "react";
import {Navigate} from "react-router-dom";

const CheckIsAuthenticated = ({children}) => {
    if (!localStorage.getItem("token")) {
        return children;
    }

    return <Navigate to={-1}/>;
};

export default CheckIsAuthenticated;
