import React, {useEffect, useState} from 'react'
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Box,
    Center,
    Button,
    InputGroup,
    InputRightElement,
    InputLeftElement,
    Radio,
    RadioGroup,
    HStack,
    Select,
    useToast
} from '@chakra-ui/react'
import {PhoneIcon} from '@chakra-ui/icons'
import Api from '../../../api/Api'

const initState = {
    email: '',
    userName: '',
    password: '',
    passwordConfirmation: '',
    phone: '',
    address: '',
    roleId: '',
    departmentId: ''
}
const CreateUser = () => {
    const toast = useToast()
    const [show, setShow] = useState(false)
    const [roles, setRoles] = useState()
    const [departments, setDepartments] = useState()
    const [error, setError] = useState('');

    const [{
        userName, email, password, passwordConfirmation, phone, address, roleId, departmentId
    }, setState] = useState(initState);
    const [gender, setGender] = useState('0');

    const handleClick = () => setShow(!show) // show password or not

    const onChange = (e) => {
        //e mean event
        console.log(e.target.name);
        const {name, value} = e.target // Destructuring assignment
        setState((prevState) => ({
            ...prevState, [name]: value // set computed property name == new value
        }))
    }
    const clearState = () => {
        setState({...initState});
    };

    const handleAddNewUser = async () => {
        try {
            let formData = new FormData()
            formData.append('email', email)
            formData.append('name', userName)
            formData.append('phone_number', phone)
            formData.append('address', address)
            formData.append('gender', gender)
            formData.append('role_id', roleId)
            formData.append('department_id', departmentId)
            formData.append('password', password)
            formData.append('password_confirmation', passwordConfirmation)

            await Api().post('/admins/users', formData)
            toast({
                title: 'Account created.',
                description: "We've created your account for you.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        } catch (e) {
            console.log(e)
            if (e.response.status === 422) {
                setError(e.response.data.errors);
                toast({
                    title: 'Failed',
                    description: "Please try again!",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }
        }
    }

    const handleFetchRoleId = async () => {
        try {
            const res = await Api().get('/admins/roles')
            if (res.data) {
                setRoles(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleFetchDepartmentId = async () => {
        try {
            const res = await Api().get('/admins/departments')
            if (res.data) {
                setDepartments(res.data)
            }
        } catch (e) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleFetchRoleId()
        handleFetchDepartmentId()
    }, [])

    return (<>

        <Center w="100%" align='stretch'>
            <Box w="80%" m='5' mb='20' boxShadow='inner' p='6' rounded='md' bg='gray.50'>
                <Center>
                    {/* {email} */}
                    <FormControl w='90%'>
                        <FormLabel htmlFor='email'>Email address</FormLabel>
                        <Input onChange={onChange} value={email} placeholder='Eg: email@gmail.com' id='email'
                               name='email' type='email'/>
                        <FormHelperText color={'red.500'} textAlign='left'>{error && error?.email}</FormHelperText>
                    </FormControl>
                </Center>
                <Center>
                    <FormControl w='90%'>
                        <FormLabel htmlFor='userName'>User Name</FormLabel>
                        <Input onChange={onChange} value={userName} placeholder='Eg: your name' id='name'
                               name='userName' type='text'/>
                        <FormHelperText color={'red.500'} textAlign='left'>{error && error?.name}</FormHelperText>
                    </FormControl>
                </Center>

                <Center>
                    <FormControl w='90%'>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                id='password'
                                name="password"
                                value={password}
                                onChange={onChange}
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormHelperText color={'red.500'} textAlign='left'>{error && error?.password}</FormHelperText>
                    </FormControl>
                </Center>
                <Center>
                    <FormControl w='90%'>
                        <FormLabel htmlFor='password-confirm'>Password confirm</FormLabel>
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                id="password-confirm"
                                name="passwordConfirmation"
                                onChange={onChange}
                                value={passwordConfirmation}
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password again'
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                </Center>
                <Center>
                    <FormControl w='90%'>
                        <FormLabel htmlFor='phone'>Phone number</FormLabel>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                children={<PhoneIcon color='gray.300'/>}
                            />
                            <Input onChange={onChange} value={phone} type='tel' id='phone' name="phone"
                                   placeholder='Phone number'/>
                        </InputGroup>
                        <FormHelperText color={'red.500'}
                                        textAlign='left'>{error && error?.phone_number}</FormHelperText>
                    </FormControl>
                </Center>
                <Center>
                    <FormControl w='90%'>
                        <FormLabel htmlFor='address'>Address</FormLabel>
                        <Input onChange={onChange} value={address} placeholder='Eg: your name' id='address'
                               name='address' type='text'/>
                        <FormHelperText color={'red.500'} textAlign='left'>{error && error?.address}</FormHelperText>
                    </FormControl>
                </Center>
                <Center>
                    <FormControl as='fieldset' w="90%">
                        <FormLabel as='legend'>Gender</FormLabel>
                        <RadioGroup onChange={setGender} defaultValue={gender}>
                            <HStack spacing='24px'>
                                <Radio value='0'>Male</Radio>
                                <Radio value='1'>Female</Radio>
                            </HStack>
                        </RadioGroup>
                        <FormHelperText color={'red.500'} textAlign='left'>{error && error?.gender}</FormHelperText>
                    </FormControl>
                </Center>
                <Center>
                    <FormControl w='50%'>
                        <FormLabel htmlFor='roleId'>Role</FormLabel>
                        <Select textAlign='left' variant='filled' name='roleId'
                                onChange={onChange} id='roleId'
                                placeholder='Select role'>
                            {roles && roles.map((role) => <option key={role.id}
                                                                  value={role.id}>{role.name.toUpperCase()}</option>)}
                        </Select>
                        <FormHelperText color={'red.500'} textAlign='left'>{error && error?.role_id}</FormHelperText>
                    </FormControl>
                </Center>
                <Center>
                    <FormControl w='50%'>
                        <FormLabel htmlFor='roleId'>Department</FormLabel>
                        <Select textAlign='left' variant='filled'
                                name='departmentId' onChange={onChange}
                                id='departmentId'
                                placeholder='Select department'>
                            {departments && departments.map((department) => <option key={department.id}
                                                                                    value={department.id}>{department.name.toUpperCase()}</option>)}
                        </Select>
                        <FormHelperText color={'red.500'}
                                        textAlign='left'>{error && error?.department_id}</FormHelperText>
                    </FormControl>
                </Center>
                <Button m='2' onClick={clearState}>Clear input</Button>
                <Button onClick={handleAddNewUser} colorScheme='whatsapp'>Submit</Button>
            </Box>
        </Center>

    </>)
}

export default CreateUser