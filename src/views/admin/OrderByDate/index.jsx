import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import OrderByDate from "../../../api/getOrdersbyDate";

export default function UserReports() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex justifyContent="space-between" align="start" p="4" gap="20px">
        <OrderByDate />
      </Flex>
    </Box>
  );
}
