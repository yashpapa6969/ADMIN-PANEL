import React, { useState } from "react";
import {
  Input,
  Box,
  Text,
  VStack,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { TEST_URL } from "./URL";

function BillByMemberID() {
  const [membershipId, setMembershipId] = useState("");
  const [totalExpenditure, setTotalExpenditure] = useState(null);

  const fetchTotalExpenditure = async () => {
    try {
      const response = await fetch(
        `${TEST_URL}/api/superAdmin/total-expenditure/${membershipId}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const { total_expenditure } = data;
      setTotalExpenditure(total_expenditure);
    } catch (error) {
      console.error("Error fetching total expenditure:", error);
    }
  };

  return (
    <Box pt="4">
      <VStack align="stretch" spacing="4">
        <FormControl>
          <FormLabel fontWeight="bold">Membership ID:</FormLabel>
          <Input
            type="text"
            placeholder="Enter membership ID"
            value={membershipId}
            onChange={(e) => setMembershipId(e.target.value)}
          />
        </FormControl>

        <Button
          colorScheme="blue"
          onClick={fetchTotalExpenditure}
          borderRadius="lg"
        >
          Get Total Expenditure
        </Button>

        {totalExpenditure !== null && (
          <Text fontWeight="bold">
            Total Expenditure for Membership ID {membershipId}: ₹
            {totalExpenditure}
          </Text>
        )}
      </VStack>
    </Box>
  );
}

export default BillByMemberID;
