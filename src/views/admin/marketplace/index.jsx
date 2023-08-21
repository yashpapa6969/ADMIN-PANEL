import React, { useState } from "react";
import { Container, Flex, Button, Box } from "@chakra-ui/react";
import FetchDishesData from "../../../api/getMenuDishes";
import FetchDrinksData from "../../../api/getMenuDrinks";
import {
  isUserAdmin,
  isUserDrink,
  isUserFood,
} from "../../auth/signIn/UserAuth";

export default function Marketplace() {
  const [showDishes, setShowDishes] = useState(true);

  const handleShowDishes = () => {
    setShowDishes(true);
  };

  const handleShowDrinks = () => {
    setShowDishes(false);
  };

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Flex mb="4" gap={4}>
        {(isUserAdmin() || isUserFood()) && (
          <Button
            colorScheme="purple"
            onClick={handleShowDishes}
            borderRadius="lg"
          >
            Dishes Menu
          </Button>
        )}
        {(isUserAdmin() || isUserDrink()) && (
          <Button
            colorScheme="yellow"
            onClick={handleShowDrinks}
            borderRadius="lg"
          >
            Drinks Menu
          </Button>
        )}
      </Flex>
      <Box pt="20px">
        {showDishes
          ? (isUserAdmin() || isUserFood()) && <FetchDishesData />
          : (isUserAdmin() || isUserDrink()) && <FetchDrinksData />}
      </Box>
    </Box>
  );
}
