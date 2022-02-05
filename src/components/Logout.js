import React from "react";
import Api from "../api/Api";
import { MenuItem } from "@chakra-ui/react";

const Logout = () => {
  const handleLogout = async () => {
    try {
      await Api().post("/logout");
      localStorage.removeItem("token");
      window.location.reload();
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
