import React from "react";
import {Navigate} from "react-router-dom";

const CheckIsQaManager = ({children}) => {

    if (JSON.parse(localStorage.getItem('role')) === "quality assurance manager") {
        return children;
    }

    return <Navigate to={-1}/>;
};

export default CheckIsQaManager;
