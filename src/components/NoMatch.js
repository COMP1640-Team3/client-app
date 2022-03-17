import { Link } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import React from "react";

const NoMatch = () => {
  return (
    <div>
      <Box m={50}>
        <h1 >404 NOT FOUND</h1>
        <Link to="/">
          <Button>Go Back Home Page</Button>
        </Link>
      </Box>
    </div>
  );
};

export default NoMatch;
