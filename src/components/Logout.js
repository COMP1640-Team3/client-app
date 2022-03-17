import React from "react";
import Api from "../api/Api";
import { MenuItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteAuth } from "../app/reducers/authSlice";

const Logout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      await Api().post("/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("role")
      dispatch(deleteAuth())
      navigate('/', { replace: true })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </>
  );
};

export default Logout;
