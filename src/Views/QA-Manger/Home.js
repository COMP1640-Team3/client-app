import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Center,
  Heading,
  Stack,
  Box,
} from "@chakra-ui/react";

const QaHome = () => {
  return (
    <>
      <Center>
        <Stack spacing={4} direction="row" align="center">
          <Link to="categories">
            <Button colorScheme="teal" size="sm">
              Category
            </Button>
          </Link>
        </Stack>
      </Center>

      <Outlet />
    </>
  );
};

export default QaHome;
