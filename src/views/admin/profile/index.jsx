

// Chakra imports
import { Box, Grid } from "@chakra-ui/react";

// Custom components


// Assets

import React from "react";
import StaffTableData from "api/Staff";

export default function Overview() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <StaffTableData />
    </Box>
  );
}
