import React, {useEffect} from "react";
import Login from "../Views/Auth/Login";
import {Text} from "@chakra-ui/react";
import {useSelector, useDispatch} from "react-redux";
import {getUserInfo, userInfoSelector} from "../app/reducers/authSlice";

const Home = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector(userInfoSelector);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(getUserInfo());
        }
    }, [dispatch]);

    return (
        <div>
            {userInfo.email}
            {localStorage.getItem("token") ? (
                <div>Dang nhap thanh cong </div>
            ) : (
                <>
                    <Text fontSize="5xl">Login</Text>
                    <Login/>
                </>
            )}
        </div>
    );
};

export default Home;
