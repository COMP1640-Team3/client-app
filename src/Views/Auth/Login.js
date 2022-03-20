import React, {useState} from "react";
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    Center,
    CloseButton,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement
} from "@chakra-ui/react";
import Api from "../../api/Api";
import {useLocation, useNavigate} from "react-router-dom";
import {updateUserInto} from "../../app/reducers/authSlice";
import {useDispatch} from "react-redux";


const Login = () => {
    // State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorStatus, setErrorStatus] = useState(null);
    const [show, setShow] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    // Action
    const dispatch = useDispatch();
    const handleClick = () => setShow(!show) // show password or not

    const resetError = (e) => setErrorStatus(null);
    const redirectPath = location.state?.path || "/ideas";

    const handleLogin = async () => {
        let formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        try {
            const response = await Api().post("/login", formData);
            dispatch(updateUserInto(response.data.user.email));
            localStorage.setItem("token", response.data.token);
            if (localStorage.getItem("token")) {
                const res2 = await Api().get('/auth/users');
                if (res2.data) {
                    localStorage.setItem("role", JSON.stringify(res2.data.name))
                }
            }
            navigate(redirectPath, {replace: true});
            window.location.reload();
        } catch (error) {
            if (error.response.status === 422) {
                setErrorStatus(422);
            }
            if (error.response.status === 401) {
                setErrorStatus(401);
            }
        }
    };

    return (
        <>
            <Center>
                <Box
                    w="60%"
                    mt={100}
                    p={4}
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="5px"
                >
                    <FormControl isRequired>
                        <FormLabel htmlFor="email">Email address</FormLabel>
                        <Input
                            id="email"
                            type="email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                id='password'
                                name="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <Button mt={4} colorScheme="blue" onClick={handleLogin}>
                            Login
                        </Button>
                    </FormControl>

                    <div className="error">
                        {errorStatus === 422 ? (
                            <Alert mt={4} status="warning">
                                <AlertIcon/>
                                <AlertTitle mr={2}>Please enter you information</AlertTitle>
                                <AlertDescription>
                                    Email and password are required
                                </AlertDescription>
                                <CloseButton
                                    onClick={resetError}
                                    position="absolute"
                                    right="8px"
                                    top="8px"
                                />
                            </Alert>
                        ) : (
                            ""
                        )}

                        {errorStatus === 401 ? (
                            <Alert mt={4} status="error">
                                <AlertIcon/>
                                <AlertTitle mr={2}>Login fail!</AlertTitle>
                                <AlertDescription>Email or password is wrong!</AlertDescription>
                                <CloseButton
                                    onClick={resetError}
                                    position="absolute"
                                    right="8px"
                                    top="8px"
                                />
                            </Alert>
                        ) : (
                            ""
                        )}
                    </div>
                </Box>
            </Center>
        </>
    );
};

export default Login;
