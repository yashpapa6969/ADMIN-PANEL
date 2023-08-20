import { Box, Flex } from "@chakra-ui/react";
// Assets

// Custom components

import React from "react";
import Members from "api/Members";

export default function UserReports() {
  // Chakra Color Mode

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex justifyContent="space-between" align="start" p="4" gap="20px">
        <Box flex="1">
          {" "}
          {/* Adjust the width to control the space allocated for the table */}
          <Members></Members>
        </Box>
      </Flex>
    </Box>
  );
}
