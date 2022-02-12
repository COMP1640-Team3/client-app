import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getProfileDetail, profileSelector } from "../../../app/reducers/profileSlice";
import {
    Box, Button,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Radio,
    RadioGroup,
    VStack,
    useToast, FormHelperText
} from '@chakra-ui/react'
import { PhoneIcon } from "@chakra-ui/icons";
import Api from "../../../api/Api";

const initState = {
    userName: '', phone: '', address: '',
}
const ProfileDetail = () => {
    const toast = useToast()
    const profileUser = useSelector(profileSelector)
    const dispatch = useDispatch()
    const [error, setError] = useState('');
    const [gender, setGender] = useState('0')
    const [{ userName, phone, address }, setState] = useState(initState)
    const onChange = (event) => {
        const { name, value } = event.target
        setState((prevState) => ({ ...prevState, [name]: value }));
    }
    const clearState = () => {
        setState({ ...initState })
    }

    const handleChangeProfile = async () => {
        try {
            let formData = {
                name: userName,
                phone_number: phone,
                address,
                gender
            }

            await Api().put('/users/profiles', formData)
            toast({
                title: 'Profile update success. Please check your profile!',
                description: "OK",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            dispatch(getProfileDetail())
        } catch (e) {
            console.log(e)
            if (e.response.status === 422) {
                setError(e.response.data.errors);
                toast({
                    title: 'Failed Update',
                    description: "Please try again input all field required!",
                    status: 'error',
                    duration: 9000,
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
        <VStack boxShadow='inner' p='6' rounded='md' bg='gray.100'
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
                        Phone: {profileUser.profile.phone_number}
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

        <Box my={10} boxShadow='outline' p='6' rounded='md'>
            <Heading>Change profile</Heading>
            <FormControl>
                <FormLabel>NAME</FormLabel>
                <Input onChange={onChange} value={userName} placeholder='Eg: your name' id='name'
                    name='userName' type='text' />
                <FormHelperText color={'red.500'} textAlign='left'>{error && error?.name}</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>PHONE</FormLabel>

                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<PhoneIcon color='blue.300' />}
                    />
                    <Input onChange={onChange} value={phone} type='tel' id='phone' name="phone"
                        placeholder='Phone number' />
                    <FormHelperText color={'red.500'} textAlign='left'>{error && error?.phone}</FormHelperText>
                </InputGroup>

            </FormControl>
            <FormControl>
                <FormLabel>ADDRESS</FormLabel>
                <Input onChange={onChange} value={address} placeholder='Eg: your name' id='address'
                    name='address' type='text' />
                <FormHelperText color={'red.500'} textAlign='left'>{error && error?.address}</FormHelperText>
            </FormControl>
            <FormControl as='fieldset' w="90%">
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