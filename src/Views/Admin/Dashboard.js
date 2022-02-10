import React from 'react'
import {Button, Center, Stack} from '@chakra-ui/react'
import {Link, Outlet} from 'react-router-dom'

const Dashboard = () => {
    return (
        <>
            Dashboard
            <Center>
                <Stack spacing={4} direction='row' align='center'>
                    <Link to='users'>
                        <Button colorScheme='teal' size='md'>
                            CREATE ACCOUNT
                        </Button>
                    </Link>

                    <Button colorScheme='teal' size='md'>
                        Button
                    </Button>
                </Stack>
            </Center>

            <Outlet/>
        </>
    )
}

export default Dashboard