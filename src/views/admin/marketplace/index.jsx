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
      <Container maxW="container.lg" py="4">
        <Flex justifyContent="center" mb="4">
          {(isUserAdmin() || isUserFood()) && (
            <Button colorScheme="purple" onClick={handleShowDishes} size="lg">
              Dishes Menu
            </Button>
          )}
          {(isUserAdmin() || isUserDrink()) && (
            <Button
              colorScheme="yellow"
              onClick={handleShowDrinks}
              size="lg"
              ml="2"
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
      </Container>
    </Box>
  );
}
