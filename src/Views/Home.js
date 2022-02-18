import React from "react";
import Login from "../Views/Auth/Login";
import {Heading, Image, Text} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {roleNameSelector} from "../app/reducers/authSlice";

const Home = () => {
    const roleName = useSelector(roleNameSelector)
    return (<div>
        {localStorage.getItem("token") ? (<>
            <Text textTransform={'capitalize'} fontSize={'2xl'} color={'facebook.600'}>{roleName}</Text>
            <Heading>Welcome back to GREENWICH</Heading>

            <Image boxShadow='base' rounded='md' bg='white'
                   my={'5'}
                   w={'60%'}
                   mx={'auto'}
                   src={'https://www.gre.ac.uk/__data/assets/image/0025/119653/gre.jpg'}/>
        </>) : (<>
            <Text fontSize="5xl">Login</Text>
            <Login/>
        </>)}
    </div>);
};

export default Home;
