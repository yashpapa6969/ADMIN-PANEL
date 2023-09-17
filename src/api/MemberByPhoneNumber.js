import React, { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Badge,
  Spinner,
  Grid,
} from "@chakra-ui/react";
import { TEST_URL } from "./URL";

const baseUrl = TEST_URL; // Replace with your API base URL

function MemberByPhoneNumber() {
  const [phoneNo, setPhoneNo] = useState("");
  const [memberInfo, setMemberInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLookup = () => {
    setLoading(true);
    fetch(`${baseUrl}/api/superAdmin/getMemberByPhoneNO/${phoneNo}`)
      .then((response) => response.json())
      .then((data) => {
        setMemberInfo(data.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching member info:", error);
        setLoading(false);
      });
  };

  return (
    <VStack p="3" align="stretch" spacing="4">
      <Text fontSize="xl" fontWeight="bold">
        Member Lookup
      </Text>
      <Box maxWidth="lg">
        <FormControl isRequired>
          <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
          <Input
            type="tel"
            id="phoneNumber"
            placeholder="Enter your phone number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </FormControl>
        <Button
          colorScheme="blue"
          borderRadius="lg"
          mt="4"
          onClick={handleLookup}
          loadingText="Checking..."
        >
          Check Member
        </Button>
      </Box>
      {loading && <Spinner size="md" color="blue" />}
      {memberInfo ? (
        <Box borderWidth="1px" borderRadius="md" p="3" maxWidth="lg">
          <Text fontSize="xl" fontWeight="bold" mb="2">
            {memberInfo.name}
          </Text>
          <Text fontSize="md" mb="1">
            <strong>Membership ID:</strong> {memberInfo.membership_id}
          </Text>
          <Text fontSize="md" mb="1">
            <strong>Phone Number:</strong> {memberInfo.phoneNo}
          </Text>
          <Text fontSize="md" mb="1">
            <strong>Address:</strong> {memberInfo.Address}
          </Text>
          <Text fontSize="md">
            <strong>Status:</strong>{" "}
            <Badge
              colorScheme={memberInfo.status === "Active" ? "green" : "red"}
              variant="subtle"
              fontSize="sm"
              px="2"
            >
              {memberInfo.status}
            </Badge>
          </Text>
        </Box>
      ) : (
        !loading && <Text>No member found with this phone number.</Text>
      )}
    </VStack>
  );
}

export default MemberByPhoneNumber;
