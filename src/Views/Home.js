import React from "react";
import Login from "../Views/Auth/Login";
import { Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../app/reducers/authSlice";

const Home = () => {
  const userInfo = useSelector(userInfoSelector);

  return (
    <div>
      {userInfo.email}
      {localStorage.getItem("token") ? (
        <div>Dang nhap thanh cong </div>
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
