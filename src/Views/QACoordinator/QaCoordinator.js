import {Link, Outlet} from "react-router-dom";
import {Button, ButtonGroup, Heading, HStack} from "@chakra-ui/react";

const QaCoordinator = () => {
    return (<>
            <Heading>
                QaCoordinator page
            </Heading>
            <HStack>
                <ButtonGroup>
                    <Link to='staffs'>
                        <Button>List of staffs</Button>
                    </Link>
                    <Button>list 2</Button>
                </ButtonGroup>
            </HStack>

            <Outlet/>
        </>)
}

export default QaCoordinator