import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import {
  getUsername,
  isUserAdmin,
  isUserDrink,
} from "../../auth/signIn/UserAuth";
import DrinkManagerTable from "api/DrinkManager";

export default function DrinkManagerReports() {
  const username = getUsername();

  // Chakra Color Mode

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex justifyContent="space-between" align="start" p="4" gap="20px">
        {(isUserAdmin() || isUserDrink()) && (
          <Box flex="1">
            {/* Adjust the width to control the space allocated for the table */}
            <DrinkManagerTable />
          </Box>
        )}
      </Flex>
    </Box>
  );
}
