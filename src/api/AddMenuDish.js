import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";

function AddToMenuForm() {
  const [formData, setFormData] = useState({
    image: "",
    foodName: "",
    foodPrice: "",
    foodCategories: "",
    type: "",
    food_category_id: "",
    description: ""
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

    // Ensure only numbers are entered for foodPrice
    if (!isNaN(value)) {
      setFormData((prevData) => ({
        ...prevData,
        foodPrice: value,
      }));
    }
  };

  const handleAddToMenu = async () => {
    try {
      const response = await fetch(
        "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/admin/createDish",
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
        title: "Dish Added to Menu",
        description: "The dish has been added to the menu successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setFormData({
        image: "",
        foodName: "",
        foodPrice: "",
        foodCategories: "",
        type: "",
        food_category_id: "",
        description: ""
      });
    } catch (error) {
      console.error("Error adding dish to menu:", error);
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
        <FormLabel>Food Name</FormLabel>
        <Input
          name="foodName"
          value={formData.foodName}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Food Price</FormLabel>
        <Input
          name="foodPrice"
          value={formData.foodPrice}
          onChange={handleFoodPriceChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Food Categories</FormLabel>
        <Input
          name="foodCategories"
          value={formData.foodCategories}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Type</FormLabel>
        <Input name="type" value={formData.type} onChange={handleInputChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Food Category ID</FormLabel>
        <Input
          name="food_category_id"
          value={formData.food_category_id}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Food Description</FormLabel>
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

export default AddToMenuForm;
