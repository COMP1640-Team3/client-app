import React from "react";
import { Link } from "react-router-dom";
import {
  Text,
  Button,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
export const PostIdeas = () => {
  return (
    <div>
      <Text size="xl">Form post idea</Text>

      <Link to="manual">
        <Button mr={5}>Post idea manually</Button>
      </Link>

      <Link to="via-pdf">
        <Button>Post idea with PDF file</Button>
      </Link>

      <Outlet />
    </div>
  );
};
