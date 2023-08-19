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

function Login({ setIsLoggedIn }) {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = () => {
    // Implement your authentication logic here
    // For example, check if the provided username and password are correct
    if (username === "admin" && password === "admin123") {
      // If authentication is successful, set isLoggedIn to true and navigate to the admin page
      setIsLoggedIn(true);
      history.push("/admin/default");
    } else {
      // If authentication fails, display an error message
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
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter your password"
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
