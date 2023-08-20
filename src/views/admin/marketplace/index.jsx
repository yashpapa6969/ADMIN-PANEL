import React, { useState } from "react";
import {
  Container,
  Flex,
  Button,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

// Import your FetchDishesData and FetchDrinksData components
import FetchDishesData from "../../../api/getMenuDishes";
import FetchDrinksData from "../../../api/getMenuDrinks";

export default function Marketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");

  // State to control showing dishes or drinks
  const [showDishes, setShowDishes] = useState(true);

  // Handle showing dishes
  const handleShowDishes = () => {
    setShowDishes(true);
  };

  // Handle showing drinks
  const handleShowDrinks = () => {
    setShowDishes(false);
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex gap={3}>
        <Button colorScheme="purple" onClick={handleShowDishes}>
          Dishes Menu
        </Button>
        <Button colorScheme="yellow" onClick={handleShowDrinks}>
          Drinks Menu
        </Button>
      </Flex>
      <Box pt="20px">
        {showDishes ? <FetchDishesData /> : <FetchDrinksData />}
      </Box>
    </Box>
  );
}
