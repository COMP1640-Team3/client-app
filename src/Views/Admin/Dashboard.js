import React from 'react'
import {Button, Center, Heading, Stack} from '@chakra-ui/react'
import {Link, Outlet} from 'react-router-dom'

const Dashboard = () => {
    return (
        <>
            <Heading>
                Dashboard
            </Heading>
            <Center>
                <Stack spacing={4} direction='row' align='center'>
                    <Link to='users/create'>
                        <Button colorScheme='teal' size='md'>
                            CREATE ACCOUNT
                        </Button>
                    </Link>
                    <Link to='users'>
                        <Button colorScheme='teal' size='md'>
                            List users
                        </Button>
                    </Link>
                    <Link to='statistics/ideas-department'>
                        <Button colorScheme={'teal'} size={'md'}>
                            List ideas each department
                        </Button>
                    </Link>
                    <Link to='statistics/users-department'>
                        <Button colorScheme={'teal'} size={'md'}>
                            List users each department
                        </Button>
                    </Link>
                    <Link to='hidden-ideas'>
                        <Button colorScheme={'teal'} size={'md'}>
                            List hidden ideas
                        </Button>
                    </Link>

                    <Link to='ideas-without-comments'>
                        <Button colorScheme={'teal'} size={'md'}>
                            List ideas without comments
                        </Button>
                    </Link>
                </Stack>
            </Center>

            <Outlet/>
        </>
    )
}

export default Dashboard