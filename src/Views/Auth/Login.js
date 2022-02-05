import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Center,
  CloseButton,
} from "@chakra-ui/react";
import Api from "../../api/Api";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const Login = () => {
  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorStatus, setErrorStatus] = useState(null);

  // Action

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const resetError = (e) => setErrorStatus(null);


  const handleLogin = async () => {
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    try {
      const response = await Api().post("/login", formData);
      localStorage.setItem("token", response.data.token);
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
            <Input id="email" type="email" onChange={handleEmailChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="email">Password</FormLabel>
            <Input
              id="password"
              type="password"
              onChange={handlePasswordChange}
            />
          </FormControl>

          <FormControl>
            <Button mt={4} colorScheme="blue" onClick={handleLogin}>
              Login
            </Button>
          </FormControl>

          <div className="error">
            {errorStatus === 422 ? (
              <Alert mt={4} status="warning">
                <AlertIcon />
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
                <AlertIcon />
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
