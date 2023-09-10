/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { isUserAdmin, isUserDrink } from "../../auth/signIn/UserAuth";
import DrinkManagerTable from "api/DrinkManager";

export default function DrinkManagerReports() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex justifyContent="space-between" align="start" p="4" gap="20px">
        {(isUserAdmin() || isUserDrink()) && (
          <Box flex="1">
            <DrinkManagerTable />
          </Box>
        )}
      </Flex>
    </Box>
  );
}
