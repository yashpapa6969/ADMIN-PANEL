import React, { useState, useEffect } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import AddToMenuForm from "api/AddMenuDish";
import BulkAddMenuFormDish from "api/BulkAddMenuDish";
import BulkAddToMenuFormDrink from "api/BulkAddMenuDrink";
import AddToMenuFormDrink from "api/AddMenuDrink";

import {
  isUserAdmin,
  isUserFood,
  isUserDrink,
} from "../../auth/signIn/UserAuth";

export default function Settings() {
  const [showDishForm, setShowDishForm] = useState(false);
  const [showDrinkForm, setShowDrinkForm] = useState(false);
  const [showBulkDishForm, setShowBulkDishForm] = useState(false);
  const [showBulkDrinkForm, setShowBulkDrinkForm] = useState(false);

  const handleShowDishForm = () => {
    setShowDishForm(true);
    setShowDrinkForm(false);
    setShowBulkDishForm(false);
    setShowBulkDrinkForm(false);
  };

  const handleShowDrinkForm = () => {
    setShowDishForm(false);
    setShowDrinkForm(true);
    setShowBulkDrinkForm(false);
    setShowBulkDishForm(false);
  };

  const handleShowBulkDishForm = () => {
    setShowDishForm(false);
    setShowDrinkForm(false);
    setShowBulkDrinkForm(false);
    setShowBulkDishForm(true);
  };

  const handleShowBulkDrinkForm = () => {
    setShowDishForm(false);
    setShowDrinkForm(false);
    setShowBulkDishForm(false);
    setShowBulkDrinkForm(true);
  };

  // Check if the user is an admin or has food/drink access
  const canCreateDish = isUserFood();
  const canCreateDrink = isUserDrink();
  const canCreateBoth = isUserAdmin();

  useEffect(() => {
    if (canCreateDish) {
      setShowDishForm(true);
      setShowDrinkForm(false);
    }
  }, [canCreateDish]);

  useEffect(() => {
    if (canCreateDrink) {
      setShowDrinkForm(true);
      setShowDishForm(false);
    }
  }, [canCreateDrink]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex gap={4}>
        {canCreateBoth && (
          <Button
            colorScheme="purple"
            onClick={handleShowDishForm}
            borderRadius="lg"
          >
            Create Dish
          </Button>
        )}
        {canCreateBoth && (
          <Button
            colorScheme="yellow"
            onClick={handleShowDrinkForm}
            borderRadius="lg"
          >
            Create Drink
          </Button>
        )}
        {canCreateBoth && (
          <Button
            colorScheme="yellow"
            onClick={handleShowBulkDishForm}
            borderRadius="lg"
          >
            Create Bulk Dishes
          </Button>
        )}
        {canCreateBoth && (
          <Button
            colorScheme="yellow"
            onClick={handleShowBulkDrinkForm}
            borderRadius="lg"
          >
            Create Bulk Drinks
          </Button>
        )}
      </Flex>
      {canCreateDish && <AddToMenuForm />}
      {canCreateDrink && <AddToMenuFormDrink />}
      {showDishForm && canCreateBoth && <AddToMenuForm />}
      {showDrinkForm && canCreateBoth && <AddToMenuFormDrink />}
      {showBulkDishForm && canCreateBoth && <BulkAddMenuFormDish />}
      {showBulkDrinkForm && canCreateBoth && <BulkAddToMenuFormDrink />}
    </Box>
  );
}
