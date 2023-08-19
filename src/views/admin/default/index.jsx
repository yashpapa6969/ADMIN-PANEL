import {
  Box,
  Flex,
  
  
} from "@chakra-ui/react";
// Assets

// Custom components

import React from "react";

import FetchTableData from "../../../api/GetAllTables";
import FetchDishesCategory from "../../../api/GetDishCategory";
import FetchDrinksCategory from "../../../api/GetDrinkCategory";



export default function UserReports() {
  
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex justifyContent="space-between" align="start" p="4" gap="20px">
        <FetchTableData />
        <FetchDishesCategory />
        <FetchDrinksCategory />
      </Flex>
    </Box>
  );
}
