

// Chakra imports
import { Box, Grid,Flex } from "@chakra-ui/react";

// Custom components


// Assets

import React from "react";
import StaffTableData from "api/Staff";

export default function Overview() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex justifyContent="space-between" align="start" p="4" gap="20px">
        <StaffTableData/>
      </Flex>
    </Box>
  );
}
