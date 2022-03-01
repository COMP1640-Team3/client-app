import {useEffect, useState} from "react";
import {Box, Button, ButtonGroup, Flex, Image, Select, Spacer, Text, VStack} from "@chakra-ui/react";
import Api from "../../../api/Api";
import {useParams} from "react-router-dom";
import ChoosePermissions from "../../../components/Permissions/ChoosePermissions";

const StaffDetail = () => {
    // State
    const [user, setUser] = useState({})
    const [userPermissions, setUserPermissions] = useState([]);// current staff permission
    const [permissions, setPermissions] = useState([])
    const {staffId} = useParams();

    // Fetch staff detail
    const fetchStaff = async () => {
        try {
            const response = await Api().get(`/qa-coordinators/staffs/${staffId}`)
            console.log(response.data)
            setPermissions(response.data.permissions);
            setUser(response.data.staff)
            setUserPermissions(response.data.staff.permissions)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        fetchStaff().then()
    }, [])

    return (<>
        <Flex boxShadow='inner' p='6' rounded='md' bg='facebook.500' color={'white'} my={'20px'} w={'35%'}>
            <Box>
                <Image
                    borderRadius={'50%'}
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

        <Flex>
            <VStack>
                <Text>Current permissions of user</Text>
                <ButtonGroup>
                    {userPermissions && userPermissions.map(permission => {
                        return (<>
                            <div key={permission.id}>
                                <Button colorScheme={'blackAlpha'} disabled>
                                    <Text color={'black'}
                                          textTransform={'uppercase'}>
                                        {permission.name}
                                    </Text>
                                </Button>
                            </div>
                        </>)
                    })}
                </ButtonGroup>
            </VStack>
        </Flex>
        <Flex mt={2}>
            <ChoosePermissions permissions={permissions}/>
        </Flex>
    </>)
}

export default StaffDetail