import React from "react"
import {Outlet, Link} from "react-router-dom"
import {Stack, HStack, VStack, Box, Button, Center} from '@chakra-ui/react'

const MyAccount = () => {

    return (<>
        <Center>
            <HStack spacing='24px'>
                {/*Profile link page*/}
                <Link to='profiles'>
                    <Button bg={'red.500'}>
                        Show Profile
                    </Button>
                </Link>

                {/*Edit profile page*/}
                <Link to='edit-profile'>
                    <Button bg='tomato'>
                        Edit Profile
                    </Button>
                </Link>

                {/*Change password page*/}
                {/*<Link>*/}
                {/*    <Box w='40px' h='40px' bg='pink.100'>*/}
                {/*        Change current password*/}
                {/*    </Box>*/}
                {/*</Link>*/}

            </HStack>
        </Center>

        <Outlet/>
    </>)
}
export default MyAccount