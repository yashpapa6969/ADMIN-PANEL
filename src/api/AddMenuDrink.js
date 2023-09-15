/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  InputGroup,
  InputLeftAddon,
  Textarea,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TEST_URL } from "./URL";

function AddToMenuFormDrink() {
  const [formData, setFormData] = useState({
    drinkName: "",
    drinkNamePrice: "",
    drinkCategories: "",
    drinks_category_id: "",
    description: "",
    tax: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [drinkCategoryIdSelected, setDrinkCategoryIdSelected] = useState(false);

  useEffect(() => {
    fetch(`${TEST_URL}/api/client/getAllDrinksCategories`)
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
    setDrinkCategoryIdSelected(true);
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
      formDataToSend.append("tax", formData.tax);

      const response = await fetch(`${TEST_URL}/api/admin/createDrink`, {
        method: "POST",
        body: formDataToSend,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);

      toast.success(`Drink ${formData.drinkName} added to Menu`);

      setFormData({
        drinkName: "",
        drinkNamePrice: "",
        drinkCategories: "",
        drinks_category_id: "",
        description: "",
        tax:"",
      });
      setImageFile(null);
    } catch (error) {
      console.error("Error adding drink to menu:", error);
      alert("An error occurred while adding the drink to the menu.");
      toast.error(
        `Error adding drink: ${formData.drinkName} to menu: ${error}`
      );
    }
  };

  return (
    <div style={{ maxWidth: "80%", padding: "20px" }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <FormLabel mt={5} fontSize="xl">
        Drag and drop an image below:
      </FormLabel>
      <div
        onDrop={handleImageDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{
          border: "2px dashed #718096",
          borderRadius: "8px",
          padding: "20px",
          textAlign: "center",
          margin: "20px 0",
          backgroundColor: "#edf2f7",
        }}
      >
        {imageFile ? (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Selected"
            style={{
              maxWidth: "100%",
              maxHeight: "200px",
              borderRadius: "8px",
            }}
          />
        ) : (
          <p style={{ margin: "0", color: "#718096", fontSize: "lg" }}>
            Add Drink Image Here
          </p>
        )}
      </div>
      <FormControl mt={4} bg="white" p={3} borderRadius="md">
        <FormLabel fontSize="xl">Drink Name</FormLabel>
        <Input
          name="drinkName"
          value={formData.drinkName}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl mt={4} bg="white" p={3} borderRadius="md">
        <FormLabel fontSize="xl">Drink Price</FormLabel>
        <InputGroup>
          <InputLeftAddon children="INR" />
          <Input
            name="drinkPrice"
            value={formData.drinkNamePrice}
            onChange={handleDrinkPriceChange}
          />
        </InputGroup>
      </FormControl>
      <FormControl mt={4} bg="white" p={3} borderRadius="md">
        <FormLabel fontSize="xl">Drink Category</FormLabel>
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
      <FormControl mt={4} bg="white" p={3} borderRadius="md">
        <FormLabel fontSize="xl">Drink Description </FormLabel>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          borderColor="gray.300"
        />
      </FormControl>
      <FormControl mt={4} bg="white" p={3} borderRadius="md">
        <FormLabel fontSize="xl">Drink TAX ₹ </FormLabel>
        <Textarea
          name="tax"
          value={formData.tax}
          onChange={handleInputChange}
          borderColor="gray.300"
        />
      </FormControl>
      <Button
        colorScheme="green"
        mt="4"
        onClick={handleAddToMenu}
        borderRadius="lg"
        isDisabled={!drinkCategoryIdSelected}
        _hover={{ bg: "green.500" }}
      >
        Add to Menu
      </Button>
    </div>
  );
}

export default AddToMenuFormDrink;
