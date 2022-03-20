import React, {useState} from "react"
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    useToast,
} from '@chakra-ui/react'
import Api from "../../../api/Api"
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deleteAuth} from "../../../app/reducers/authSlice";

// Init state
const initState = {currentPassword: '', password: '', passwordConfirmation: ''}

const ChangePassword = () => {
    const [{currentPassword, password, passwordConfirmation}, setState] = useState(initState)
    const [show, setShow] = useState(false)
    const [error, setError] = useState({})
    const toast = useToast()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onChange = (event) => {
        const {name, value} = event.target
        // Delete each error with input name
        if (name) {
            setError((prevState => ({
                ...prevState, [name]: ''
            })))
        }

        setState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    // Reset all state
    const clearState = () => {
        setState({...initState})
    }
    // Show password
    const handleClick = () => setShow(!show) // show password or not
    /**
     * Check new password is same the current password
     *
     * @return bool -- true if their same value, otherwise false
     */
    const checkIsSameNewPassword = () => {
        if ((currentPassword.length) !== 0 && (currentPassword === password)) {
            toast({
                title: 'The new password can not same the current password',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
            return true
        }
        return false
    }

    /**
     * Handle change password
     *
     * @return JSON
     */
    const handleChangePassword = async () => {
        if (checkIsSameNewPassword() === false) {
            try {
                let formData = {
                    current_password: currentPassword,
                    password,
                    password_confirmation: passwordConfirmation
                }
                await Api().put('/users/passwords', formData)
                // alert('Change password success')
                toast({
                    title: 'Change password success',
                    description: "Browser will logout after 5 seconds",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })

                setTimeout(() => {
                    handleLogout()
                }, 3000)
            } catch (error) {
                if (error) {
                    if (error.response.status === 422) {
                        setError({...error.response.data})
                    } else if (error.response.status === 403) {
                        toast({
                            title: error.response.data,
                            description: "Please try again!",
                            status: 'error',
                            duration: 3000,
                            isClosable: true,
                        })
                    }
                }
            }
        }
    }

    const handleLogout = async () => {
        try {
            await Api().post("/logout");
            localStorage.removeItem("token");
            localStorage.removeItem("role")
            dispatch(deleteAuth())
            navigate('/', {replace: true})
        } catch (error) {
        }
    };

    return (
        <>
            <Box my={10} boxShadow='outline' p='6' rounded='md'>
                <Heading>Change current password</Heading>

                {/* Current password */}
                <FormControl w='90%'>
                    <FormLabel htmlFor='password'>Current password</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            name="currentPassword"
                            value={currentPassword}
                            onChange={onChange}
                            type={show ? 'text' : 'password'}
                            placeholder='Enter current password'
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormHelperText color={'red.500'}
                                    textAlign='left'>{error && error?.current_password}</FormHelperText>
                </FormControl>

                {/* New password */}
                <FormControl w='90%'>
                    <FormLabel htmlFor='password'>New password</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
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

                {/* New password confirmation */}
                <FormControl w='90%'>
                    <FormLabel htmlFor='password'>Password confirmation</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            name="passwordConfirmation"
                            value={passwordConfirmation}
                            onChange={onChange}
                            type={show ? 'text' : 'password'}
                            placeholder='Enter new password again'
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                {/* Buttons */}
                <Button m='2' onClick={clearState}>Clear input</Button>
                <Button onClick={handleChangePassword}>Submit</Button>
            </Box>
        </>
    )
}

export default ChangePassword