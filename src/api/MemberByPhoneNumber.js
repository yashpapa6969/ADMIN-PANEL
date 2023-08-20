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
} from "@chakra-ui/react";

const baseUrl = "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com"; // Replace with your API base URL

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
      <FormControl>
        <FormLabel>Enter Phone Number</FormLabel>
        <Input
          type="tel"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />
      </FormControl>
      <Button colorScheme="blue" onClick={handleLookup}>
        Check Member
      </Button>
      {loading && <Spinner size="md" color="blue" />}
      {memberInfo ? (
        <Box borderWidth="1px" borderRadius="md" p="3">
          <Text fontWeight="bold">{memberInfo.name}</Text>
          <Text>
            <strong>Membership ID:</strong> {memberInfo.membership_id}
          </Text>
          <Text>
            <strong>Phone Number:</strong> {memberInfo.phoneNo}
          </Text>
          <Text>
            <strong>Address:</strong> {memberInfo.Address}
          </Text>
          <Text>
            <strong>Status:</strong>{" "}
            <Badge
              colorScheme={memberInfo.status === "Active" ? "green" : "red"}
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
