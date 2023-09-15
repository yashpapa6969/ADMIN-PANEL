/* eslint-disable no-unused-vars */
import { Box, Flex, Text } from "@chakra-ui/react";
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
  const isFoodManager = isUserFood();
  const isDrinkManager = isUserDrink();
  let role = "";
  if (isFoodManager) {
    role = "Food Manager";
  } else if (isDrinkManager) {
    role = "Drink Manager";
  } else {
    role = "Admin";
  }
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex direction="column" align="center" p="4" gap="20px">
        {username && (
          <Text fontSize="xl" fontWeight="bold" textAlign="center">
            Welcome, {role}!
          </Text>
        )}
        <Flex justifyContent="center" gap="20px">
          {isUserAdmin() && (
            <>
              <Box>
                <Text fontSize="lg" fontWeight="bold" textAlign="center">
                  Table Data
                </Text>
                <FetchTableData />
              </Box>
              <Box>
                <Text fontSize="lg" fontWeight="bold" textAlign="center">
                  Dish Categories
                </Text>
                <FetchDishesCategory />
              </Box>
              <Box>
                <Text fontSize="lg" fontWeight="bold" textAlign="center">
                  Drink Categories
                </Text>
                <FetchDrinksCategory />
              </Box>
            </>
          )}
          {isUserDrink() && (
            <>
              <Box>
                <Text fontSize="lg" fontWeight="bold" textAlign="center">
                  Table Data
                </Text>
                <FetchTableData />
              </Box>
              <Box>
                <Text fontSize="lg" fontWeight="bold" textAlign="center">
                  Drink Categories
                </Text>
                <FetchDrinksCategory />
              </Box>
            </>
          )}
          {isUserFood() && (
            <>
              <Box>
                <Text fontSize="lg" fontWeight="bold" textAlign="center">
                  Table Data
                </Text>
                <FetchTableData />
              </Box>
              <Box>
                <Text fontSize="lg" fontWeight="bold" textAlign="center">
                  Dish Categories
                </Text>
                <FetchDishesCategory />
              </Box>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
