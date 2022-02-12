import React, {useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";

import {
    Center,
    Flex,
    Box,
    Spacer,
    Button,
    Heading,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Text,
} from "@chakra-ui/react";
import {ChevronDownIcon, EmailIcon} from "@chakra-ui/icons";
import "../../css/layouts/topnav.css";
import Logout from "../Logout";
import {useSelector} from "react-redux";
import {userInfoSelector} from "../../app/reducers/authSlice";

const TopNav = () => {
    const navStyle = ({isActive}) => {
        return {
            color: isActive ? "white" : "black",
            fontWeight: isActive ? "bold" : "normal",
            textDecoration: isActive ? "underline" : "none",
        };
    };

    const userInfo = useSelector(userInfoSelector);

    return (<>
        <Flex m={"25"} boxShadow="base" p="6" rounded="md" bg="white">
            <Box p="2">
                <Heading size="md">My App</Heading>
            </Box>
            <Spacer/>
            <Box>
                <NavLink style={navStyle} to="/">
                    <Button colorScheme="messenger" mr="4">
                        Home
                    </Button>
                </NavLink>

                <NavLink style={navStyle} to="/ideas">
                    <Button colorScheme={"messenger"}>Ideas</Button>
                </NavLink>

                <Menu>
                    <MenuButton
                        transition="all 0.2s"
                        ml={4}
                        colorScheme="blue"
                        as={Button}
                        rightIcon={<ChevronDownIcon/>}
                    >
                        Actions
                    </MenuButton>

                    {/*Admin action*/}
                    <MenuList>
                        {JSON.parse(localStorage.getItem('role')) === 'super admin' && (<>
                            <MenuItem>
                                <Link to='/admins'>Go to DashBoard</Link>
                            </MenuItem>
                        </>)}
                    </MenuList>
                </Menu>

                {/* User authenticated */}
                {localStorage.getItem('token') && (<Menu>
                    <MenuButton
                        transition="all 0.2s"
                        ml={4}
                        colorScheme="blue"
                        as={Button}
                        rightIcon={<ChevronDownIcon/>}
                    >
                        <i className="far fa-user-circle"> {userInfo.email}</i>
                    </MenuButton>
                    <MenuList textAlign={"left"}>
                        <MenuItem>
                            <Link to={'/my-account'}>My account</Link>
                        </MenuItem>
                        <MenuItem>
                            {/* If user is authenticated show logout */}
                            <Logout/>
                        </MenuItem>
                    </MenuList>

                </Menu>)}
            </Box>
        </Flex>
    </>);
};

export default TopNav;
