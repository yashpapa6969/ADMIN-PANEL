// Login.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { authenticateUser } from "./UserAuth"; // Import the authentication function

function Login({ setIsLoggedIn }) {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = () => {
    const authenticatedUsername = authenticateUser(username, password);

    if (authenticatedUsername) {
      setIsLoggedIn(true);
      setUsername(authenticatedUsername);
      history.push("/admin/default");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Box p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Admin-Portal Login
      </Text>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          placeholder="Enter admin username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />
      </FormControl>
      <Button colorScheme="blue" mt={4} onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
}

export default Login;
