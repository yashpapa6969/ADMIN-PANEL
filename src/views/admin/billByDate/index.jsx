import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import GetBillsByDate from "../../../api/getBillsByDate";
// import CsvDownloadButton from "api/CsvDownloadBill";

export default function UserReports() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex justifyContent="space-between" align="start" p="4" gap="20px">
        <GetBillsByDate />
      </Flex>
    </Box>
  );
}
