import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getProfileDetail, profileSelector} from "../../../app/reducers/profileSlice";
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Radio,
    RadioGroup,
    useToast,
    VStack
} from '@chakra-ui/react'
import {PhoneIcon} from "@chakra-ui/icons";
import Api from "../../../api/Api";

const initState = {
    name: '', phone_number: '', address: '',
}
const ProfileDetail = () => {
    const toast = useToast()
    const profileUser = useSelector(profileSelector)
    const dispatch = useDispatch()
    const [error, setError] = useState({});
    const [gender, setGender] = useState('0')
    const [{ name, phone_number, address }, setState] = useState(initState)
    const onChange = (event) => {
        const { name, value } = event.target
        // Delete each error with input name
        if (name) {
            setError((prevState => ({
                ...prevState, [name]: ''
            })))
        }
        setState((prevState) => ({ ...prevState, [name]: value }));
    }
    const clearState = () => {
        setState({ ...initState })
    }

    const handleChangeProfile = async () => {
        try {
            let formData = {
                name ,
                phone_number,
                address,
                gender
            }

            await Api().put('/users/profiles', formData)
            toast({
                title: 'Profile update success. Please check your profile!',
                description: "OK",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            dispatch(getProfileDetail())
            setError([])
            setState({ ...initState })
        } catch (e) {
            console.log('error: ', e.response.data)
            if (e.response.status === 422) {
                setError(e.response.data);
                toast({
                    title: 'Failed Update',
                    description: "Please try again input all field required!",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            }
        }
    }

    useEffect(() => {
        dispatch(getProfileDetail())
    }, [dispatch])

    return (<>
        <Heading>Profile Detail</Heading>
        <VStack boxShadow='inner' p='6' rounded='md' my={'5'} bg='gray.100'
            spacing={4}
            align='stretch'
        >
            {profileUser && (<>
                <Box>
                    Email: {profileUser.email}
                </Box>

                {/*Profile*/}
                {profileUser?.profile && (<>
                    <Box>
                        Name:{profileUser.profile.name}
                    </Box>
                    <Box>
                        Gender:{profileUser.profile.gender === 0 ? ' Male' : ' Female'}
                    </Box>
                    <Box>
                        phone_number: {profileUser.profile.phone_number}
                    </Box>
                    <Box>
                        Address: {profileUser.profile.address}
                    </Box>
                </>)}
                {profileUser?.department && (<>
                    <Box>
                        Department :{profileUser.department.name}
                    </Box>
                </>)}

            </>)}


        </VStack>

        <Box my={'10'} boxShadow='outline' p='6' rounded='md'>
            {error?.name}
            <Heading>Change profile</Heading>
            <FormControl isRequired>
                <FormLabel>NAME</FormLabel>
                <Input onChange={onChange} value={name} placeholder='Eg: your name' id='name'
                    name='name' type='text' />
                <FormHelperText color={'red.500'} textAlign='left'>{error && error?.name}</FormHelperText>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Phone number</FormLabel>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<PhoneIcon color='blue.300' />}
                    />
                    <Input onChange={onChange} value={phone_number} type='tel' id='phone_number' name="phone_number"
                        placeholder='Phone number' />
                </InputGroup>
                <FormHelperText color={'red.500'} textAlign='left'>{error && error?.phone_number}</FormHelperText>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>ADDRESS</FormLabel>
                <Input onChange={onChange} value={address} placeholder='Eg: your name' id='address'
                    name='address' type='text' />
                <FormHelperText color={'red.500'} textAlign='left'>{error && error?.address}</FormHelperText>
            </FormControl>

            <FormControl as='fieldset' isRequired>
                <FormLabel as='legend'>Gender</FormLabel>
                <RadioGroup onChange={setGender} value={gender}>
                    <HStack spacing='24px'>
                        <Radio value='0'>Male</Radio>
                        <Radio value='1'>Female</Radio>
                    </HStack>
                </RadioGroup>
                <FormHelperText color={'red.500'} textAlign='left'>{error && error?.gender}</FormHelperText>
            </FormControl>
            <Button m='2' onClick={clearState}>Clear input</Button>
            <Button onClick={handleChangeProfile} colorScheme='whatsapp'>Submit</Button>
        </Box>
    </>)
}

export default ProfileDetail