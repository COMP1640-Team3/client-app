import {useNavigate, useParams} from "react-router-dom";
import Api from "../../../api/Api";
import {useEffect, useState} from "react";
import {Box, Center, Flex, Image, Spacer, Text, useToast} from "@chakra-ui/react";

const initState = {user: {}}
const UserDetails = () => {
    const {userId} = useParams()
    const [{user}, setState] = useState(initState)
    const toast = useToast()
    const navigate = useNavigate()

    // const roleName =
    // methods
    const featchUserDetail = async () => {
        try {
            const res = await Api().get(`/admins/users/${userId}`)
            // console.log(res.data)
            setState({user: res.data})
        } catch (e) {
            // console.log(e)
            if (e.response.status === 404) {
                toast({
                    status: 'error', position: 'top-right', description: 'Error to get user detail',
                })
                // Go redirect back
                navigate(-1)
            }
        }
    }

    useEffect(() => {
        featchUserDetail().then()
    }, [])

    // Template
    return (<>
        <Center>
            <Flex boxShadow='inner' p='6' rounded='md' bg='facebook.500' color={'white'} my={'20px'} w={'35%'}>
                <Box>
                    <Image
                        borderRadius={'50%'}
                        boxSize='100px'
                        boxSize='100px'
                        objectFit='cover'
                        alt='User'
                        src='https://kenh14cdn.com/2018/10/19/photo-1-1539960492660791551744.png'/>
                </Box>
                <Spacer/>
                <Box textAlign={"left"}>
                    <Text>Email: {user?.email}</Text>
                    {user?.department_id && (<>
                        <Text>Department: {user?.department?.name}</Text>
                    </>)}
                    {user?.profile && (<>
                        <Text size={'xl'}>User name: {user.profile.name}</Text>
                        <Text>Phone: {user.profile.phone_number}</Text>
                        <Text fontStyle={'italic'}>Address: {user.profile.address}</Text>
                    </>)}
                </Box>
            </Flex>
        </Center>
    </>)
}

export default UserDetails