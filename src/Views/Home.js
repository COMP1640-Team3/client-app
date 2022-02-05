import React, { useEffect, useState } from "react";
import Login from "../Views/Auth/Login";
import { Text } from "@chakra-ui/react";

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    }
    setIsLogin(false);
  });

  return (
    <div>
      {localStorage.getItem("token") ? (
        <div>Dang nhap thanh cong</div>
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
