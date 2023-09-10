/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (isUserDrink()) {
      setShowDishes(false); // If the user is a drink, show drinks menu by default
    }
  }, []);

  const handleShowDishes = () => {
    setShowDishes(true);
  };

  const handleShowDrinks = () => {
    setShowDishes(false);
  };

  const isAdmin = isUserAdmin();

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Flex mb="4" gap={4}>
        {(isAdmin || isUserFood()) && (
          <Button
            colorScheme="purple"
            onClick={handleShowDishes}
            borderRadius="lg"
            isActive={showDishes}
          >
            Dishes Menu
          </Button>
        )}
        {(isAdmin || isUserDrink()) && (
          <Button
            colorScheme="yellow"
            onClick={handleShowDrinks}
            borderRadius="lg"
            isActive={!showDishes}
          >
            Drinks Menu
          </Button>
        )}
      </Flex>
      <Box pt="20px">
        {showDishes ? (
          (isAdmin || isUserFood()) && <FetchDishesData />
        ) : (
          (isAdmin || isUserDrink()) && <FetchDrinksData />
        )}
      </Box>
    </Box>
  );
}
