import React, { useState, useEffect } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import AddToMenuForm from "api/AddMenuDish";
import AddToMenuFormDrink from "api/AddMenuDrink";
import {
  isUserAdmin,
  isUserFood,
  isUserDrink,
} from "../../auth/signIn/UserAuth";

export default function Settings() {
  const [showDishForm, setShowDishForm] = useState(false);
  const [showDrinkForm, setShowDrinkForm] = useState(false);

  const handleShowDishForm = () => {
    setShowDishForm(true);
    setShowDrinkForm(false);
  };

  const handleShowDrinkForm = () => {
    setShowDishForm(false);
    setShowDrinkForm(true);
  };

  // Check if the user is an admin or has food/drink access
  const canCreateDish = isUserAdmin() || isUserFood();
  const canCreateDrink = isUserAdmin() || isUserDrink();

  // Show dish form by default if the user can create food items
  useEffect(() => {
    if (canCreateDish) {
      setShowDishForm(true);
    }
  }, [canCreateDish]);

  useEffect(() => {
    if (canCreateDrink) {
      setShowDrinkForm(true);
    }
  }, [canCreateDrink]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex gap={4}>
        {canCreateDish && (
          <Button
            colorScheme="purple"
            onClick={handleShowDishForm}
            borderRadius="lg"
          >
            Create Dish
          </Button>
        )}
        {canCreateDrink && (
          <Button
            colorScheme="yellow"
            onClick={handleShowDrinkForm}
            borderRadius="lg"
          >
            Create Drink
          </Button>
        )}
      </Flex>
      {/* Show dish form only if the user can create a dish */}
      {showDishForm && canCreateDish && <AddToMenuForm />}
      {/* Show drink form only if the user can create a drink */}
      {showDrinkForm && canCreateDrink && <AddToMenuFormDrink />}
    </Box>
  );
}
