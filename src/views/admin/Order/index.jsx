import {
  Box,
  Flex,
  

} from "@chakra-ui/react";
// Assets

// Custom components

import React from "react";
import Order from "../../../api/Order";


export default function UserReports() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex justifyContent="space-between" align="start" p="4" gap="20px">
        <Order />
      </Flex>
    </Box>
  );
}
