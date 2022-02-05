import React from "react";
import { Link } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link as ReachLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Ideas = () => {
  return (
    <>
      <div>Idea page</div>

      <Link as={ReachLink} to="post-idea" color="teal.500">
        Post New Idea <AddIcon mx="2px" />
      </Link>

      <Outlet />
    </>
  );
};

export default Ideas;
