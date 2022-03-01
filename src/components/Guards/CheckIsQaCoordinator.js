import React from "react";
import {Navigate} from "react-router-dom";

const CheckIsQaCoordinator = ({children}) => {

    if (JSON.parse(localStorage.getItem('role')) === "QA coordinator") {
        return children;
    }

    return <Navigate to={-1}/>;
};

export default CheckIsQaCoordinator
