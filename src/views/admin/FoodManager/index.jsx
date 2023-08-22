import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import {
  getUsername,
  isUserAdmin,
  isUserFood,
} from "../../auth/signIn/UserAuth";
import FoodManagerTable from "api/FoodManager";

export default function FoodManagerReports() {
  const username = getUsername();

  // Chakra Color Mode

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex justifyContent="space-between" align="start" p="4" gap="20px">
        {(isUserAdmin() || isUserFood()) && (
          <Box flex="1">
            {/* Adjust the width to control the space allocated for the table */}
            <FoodManagerTable />
          </Box>
        )}
      </Flex>
    </Box>
  );
}
