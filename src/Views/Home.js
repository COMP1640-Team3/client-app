import React from "react";
import Login from "../Views/Auth/Login";
import { Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { roleNameSelector, userInfoSelector } from "../app/reducers/authSlice";

const Home = () => {
  const userInfo = useSelector(userInfoSelector);
  const roleName = useSelector(roleNameSelector)
  return (
    <div>
      {userInfo.email}
      {localStorage.getItem("token") ? (
        <div>Dang nhap thanh cong with role:  {roleName} </div>
      ) : (
        <>
          <Text fontSize="5xl">Login</Text>
          <Login />
        </>
      )}
    </div>
  );
};

export default Home;
