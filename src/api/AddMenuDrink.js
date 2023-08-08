import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";

function AddToMenuFormDrink() {
  const [formData, setFormData] = useState({
    image: "",
    drinkName: "",
    drinkNamePrice: "",
    drinkCategories: "",
    drink_category_id: "",
    description: "",
  });

  const toast = useToast();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFoodPriceChange = (event) => {
    const { value } = event.target;

    // Ensure only numbers are entered for drinkPrice
    if (!isNaN(value)) {
      setFormData((prevData) => ({
        ...prevData,
        drinkPrice: value,
      }));
    }
  };

  const handleAddToMenu = async () => {
    try {
      const response = await fetch(
        "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/admin/createDrink",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      toast({
        title: "Drink Added to Menu",
        description: "The drink has been added to the menu successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setFormData({
        image: "",
        drinkName: "",
        drinkNamePrice: "",
        drinkCategories: "",
        drinks_category_id: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding drink to menu:", error);
      toast({
        title: "Error",
        description: "An error occurred while adding the dish to the menu.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <FormControl>
        <FormLabel>Image URL</FormLabel>
        <Input
          name="image"
          value={formData.image}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Drink Name</FormLabel>
        <Input
          name="drinkName"
          value={formData.drinkName}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Drink Price</FormLabel>
        <Input
          name="drinkNamePrice"
          value={formData.drinkNamePrice}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Drink Categories</FormLabel>
        <Input
          name="drinkCategories"
          value={formData.drinkCategories}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Drink Category ID</FormLabel>
        <Input
          name="drinks_category_id"
          value={formData.drinks_category_id}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Drink Description</FormLabel>
        <Input
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </FormControl>
      <Button colorScheme="green" mt="4" onClick={handleAddToMenu}>
        Add to Menu
      </Button>
    </div>
  );
}

export default AddToMenuFormDrink;
