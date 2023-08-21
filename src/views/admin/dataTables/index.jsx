import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import AddToMenuForm from "api/AddMenuDish";
import AddToMenuFormDrink from "api/AddMenuDrink";
import { isUserDrink, isUserFood } from "../../auth/signIn/UserAuth";

export default function Settings() {
  // State to track which form component to show
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

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {isUserDrink() && (
        <Button colorScheme="yellow" onClick={handleShowDrinkForm}>
          Create Drink
        </Button>
      )}
      {isUserFood() && (
        <Button colorScheme="purple" onClick={handleShowDishForm}>
          Create Dish
        </Button>
      )}

      {showDishForm && isUserFood() && <AddToMenuForm />}
      {showDrinkForm && isUserDrink() && <AddToMenuFormDrink />}
    </Box>
  );
}
