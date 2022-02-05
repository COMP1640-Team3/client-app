import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import "../../css/layouts/topnav.css";
import Logout from "../Logout";

const TopNav = () => {
  const navStyle = ({ isActive }) => {
    return {
      color: isActive ? "white" : "black",
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "underline" : "none",
    };
  };

  return (
    <>
      <Flex m={"25"} boxShadow="base" p="6" rounded="md" bg="white">
        <Box p="2">
          <Heading size="md">My App</Heading>
        </Box>
        <Spacer />
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
              ml={4}
              colorScheme="blue"
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem>My ideas</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              {/* If user is authenticated show logout */}
              {localStorage.getItem("token") && <Logout />}
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </>
  );
};

export default TopNav;
