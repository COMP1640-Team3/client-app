import React from "react";
import {Link, Outlet} from "react-router-dom";
import {Button, Center, Stack,} from "@chakra-ui/react";

const QaHome = () => {
    return (<>
        <Center>
            <Stack spacing={4} direction="row" align="center">
                <Link to="categories">
                    <Button colorScheme="teal" size="sm">
                        Category
                    </Button>
                </Link>
                <Link to="categories/create">
                    <Button colorScheme="facebook" size="sm">
                        Create Category
                    </Button>
                </Link>
            </Stack>
        </Center>

        <Outlet/>
    </>);
};

export default QaHome;
