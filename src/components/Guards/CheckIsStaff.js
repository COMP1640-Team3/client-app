import React from "react";
import {Navigate} from "react-router-dom";

const CheckIsStaff = ({children}) => {

    if (JSON.parse(localStorage.getItem('role')) === "staff") {
        return children;
    }

    return <Navigate to={-1}/>;
};

export default CheckIsStaff;
