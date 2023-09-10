/* eslint-disable no-unused-vars */
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import FetchTableData from "../../../api/GetAllTables";
import FetchDishesCategory from "../../../api/GetDishCategory";
import FetchDrinksCategory from "../../../api/GetDrinkCategory";
import {
  getUsername,
  isUserAdmin,
  isUserDrink,
  isUserFood,
} from "../../auth/signIn/UserAuth";

export default function UserReports() {
  const username = getUsername();
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex justifyContent="space-between" align="start" p="4" gap="20px">
        {isUserAdmin() && (
          <>
            <FetchTableData />
            <FetchDishesCategory />
            <FetchDrinksCategory />
          </>
        )}
        {isUserDrink() && (
          <>
            <FetchTableData />
            <FetchDrinksCategory />
          </>
        )}
        {isUserFood() && (
          <>
            <FetchTableData />
            <FetchDishesCategory />
          </>
        )}
      </Flex>
    </Box>
  );
}
