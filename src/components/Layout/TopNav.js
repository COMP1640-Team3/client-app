import React from "react";
import {Link, NavLink} from "react-router-dom";
import {Box, Button, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Spacer, Text,} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import "../../css/layouts/topnav.css";
import Logout from "../Logout";
import {useSelector} from "react-redux";
import {userInfoSelector} from "../../app/reducers/authSlice";

const TopNav = () => {
    const navStyle = ({isActive}) => {
        return {
            fontWeight: isActive ? "bold" : "normal",
            textDecoration: isActive ? "underline" : "none",
        };
    };

    const userInfo = useSelector(userInfoSelector);

    return (
        <>
            <Flex p="6" mb={'5'} bg={'white'}>
                <Box p="2">
                    <Heading size="md" color={'black'}>
                        <img width={'250'} height={'64'} src={require('../../images/logo_blue_550.png')}/>
                    </Heading>
                </Box>
                <Spacer/>
                <Box>
                    <NavLink style={navStyle} to="/">
                        <Button colorScheme={'facebook'} mr="4">
                            Home
                        </Button>
                    </NavLink>

                    <NavLink style={navStyle} to="/ideas">
                        <Button colorScheme={'facebook'}>Ideas</Button>
                    </NavLink>

                    <Menu>
                        <MenuButton
                            transition="all 0.2s"
                            ml={4}
                            colorScheme={'facebook'}
                            as={Button}
                            rightIcon={<ChevronDownIcon/>}
                        >
                            Actions
                        </MenuButton>

                        {/*Admin action*/}
                        <MenuList>
                            {JSON.parse(localStorage.getItem("role")) === "super admin" && (
                                <>
                                    <MenuItem>
                                        <Link to="/admins">Go to DashBoard</Link>
                                    </MenuItem>
                                </>
                            )}

                            {/*qa manager action*/}

                            {JSON.parse(localStorage.getItem("role")) ===
                                "quality assurance manager" && (
                                    <>
                                        <MenuItem>
                                            <Link to="/qa-managers">QA manger homepage</Link>
                                        </MenuItem>
                                    </>
                                )}
                        </MenuList>
                    </Menu>

                    {/* User authenticated */}
                    {localStorage.getItem("token") && (
                        <Menu>
                            <MenuButton
                                transition="all 0.2s"
                                ml={4}
                                colorScheme={'facebook'}
                                as={Button}
                                rightIcon={<ChevronDownIcon/>}
                            >
                                <i className="far fa-user-circle"> {userInfo.email}</i>
                            </MenuButton>
                            <MenuList textAlign={"left"}>
                                <MenuItem>
                                    <Link to={"/my-account"}>My account</Link>
                                </MenuItem>
                                <MenuItem>
                                    {/* If user is authenticated show logout */}
                                    <Logout/>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    )}
                </Box>
            </Flex>
            <Flex bg={'facebook.600'} color={'white'}>
                <Box w={'100%'}>
                    <Text fontSize='2xl' align={'center'} fontFamily={'Source Code Pro'}>GREENWICH UNIVERSITY</Text>
                </Box>
            </Flex>
        </>
    );
};

export default TopNav;
