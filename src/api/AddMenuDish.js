import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";

function AddToMenuForm() {
  const [formData, setFormData] = useState({
    foodName: "",
    foodPrice: "",
    foodCategories: "",
    type: "",
    food_category_id: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [foodCategories, setFoodCategories] = useState([]);

  useEffect(() => {
    fetch(
      "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/client/getAllDishesCategories"
    )
      .then((response) => response.json())
      .then((data) => {
        const categories = data.category_d.map((dish) => ({
          value: dish.food_Category_id,
          label: dish.food_Category,
        }));
        setFoodCategories(categories);
      })
      .catch((error) => {
        console.error("Error fetching food categories:", error);
      });
  }, []);

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

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    const selectedCategory = foodCategories.find(
      (cat) => cat.value === selectedCategoryId
    );

    setFormData((prevData) => ({
      ...prevData,
      food_category_id: selectedCategoryId,
      foodCategories: selectedCategory ? selectedCategory.label : "",
    }));
  };

  const handleImageDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setImageFile(file);
  };

  const handleAddToMenu = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("image", imageFile);
      formDataToSend.append("foodName", formData.foodName);
      formDataToSend.append("foodPrice", formData.foodPrice);
      formDataToSend.append("foodCategories", formData.foodCategories);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("food_category_id", formData.food_category_id);
      formDataToSend.append("description", formData.description);

      const response = await fetch(
        "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/admin/createDish",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      alert("Dish Added to Menu");

      setFormData({
        foodName: "",
        foodPrice: "",
        foodCategories: "",
        type: "",
        food_category_id: "",
        description: "",
      });
      setImageFile(null);
    } catch (error) {
      console.error("Error adding dish to menu:", error);
      alert("An error occurred while adding the dish to the menu.");
    }
  };

  return (
    <div>
      <br />
      <FormLabel>Drag and drop an image below:</FormLabel>
      <div
        onDrop={handleImageDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
        }}
      >
        {imageFile ? (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Selected"
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        ) : (
          <p>Dish Image</p>
        )}
      </div>
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
        <FormLabel>Food Categories </FormLabel>
        <Select
          name="foodCategories"
          value={formData.food_category_id}
          onChange={handleCategoryChange}
        >
          <option value="" disabled>
            Select a food category
          </option>
          {foodCategories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Type</FormLabel>
        <Select name="type" value={formData.type} onChange={handleInputChange}>
          <option value="">Select type here</option>
          <option value="0">Non-Veg</option>
          <option value="1">Veg</option>
          <option value="2">Egg</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Food Description</FormLabel>
        <Input
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </FormControl>
      <Button
        colorScheme="green"
        mt="4"
        onClick={handleAddToMenu}
        borderRadius="lg"
      >
        Add to Menu
      </Button>
    </div>
  );
}

export default AddToMenuForm;
