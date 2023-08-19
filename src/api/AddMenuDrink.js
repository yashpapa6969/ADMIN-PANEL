import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";

function AddToMenuFormDrink() {
  const [formData, setFormData] = useState({
    drinkName: "",
    drinkNamePrice: "",
    drinkCategories: "",
    drinks_category_id: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [drinkCategories, setDrinkCategories] = useState([]);

 useEffect(() => {
   fetch(
     "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/client/getAllDrinksCategories"
   )
     .then((response) => response.json())
     .then((data) => {
       const categories = data.category_d.map((drinkCategory) => ({
         value: drinkCategory.drinks_Category_id,
         label: drinkCategory.drinksCategory,
       }));
       setDrinkCategories(categories);
     })
     .catch((error) => {
       console.error("Error fetching drink categories:", error);
     });
 }, []);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDrinkPriceChange = (event) => {
    const { value } = event.target;

    // Ensure only numbers are entered for drinkPrice
    if (!isNaN(value)) {
      setFormData((prevData) => ({
        ...prevData,
        drinkNamePrice: value,
      }));
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    const selectedCategory = drinkCategories.find(
      (cat) => cat.value === selectedCategoryId
    );

    setFormData((prevData) => ({
      ...prevData,
      drinks_category_id: selectedCategoryId,
      drinkCategories: selectedCategory ? selectedCategory.label : "",
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
      formDataToSend.append("drinkName", formData.drinkName);
      formDataToSend.append("drinkNamePrice", formData.drinkNamePrice);
      formDataToSend.append("drinkCategories", formData.drinkCategories);
      formDataToSend.append("drinks_category_id", formData.drinks_category_id);
      formDataToSend.append("description", formData.description);

      const response = await fetch(
        "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/admin/createDrink",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      alert("Drink Added to Menu");

      setFormData({
        drinkName: "",
        drinkNamePrice: "",
        drinkCategories: "",
        drinks_category_id: "",
        description: "",
      });
      setImageFile(null);
    } catch (error) {
      console.error("Error adding drink to menu:", error);
      alert("An error occurred while adding the drink to the menu.");
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
          <p>Drink Image</p>
        )}
      </div>
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
          onChange={handleDrinkPriceChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Drink Categories</FormLabel>
        <Select
          name="drinkCategories"
          value={formData.drinks_category_id}
          onChange={handleCategoryChange}
        >
          <option value="" disabled>
            Select a drink category
          </option>
          {drinkCategories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </Select>
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
