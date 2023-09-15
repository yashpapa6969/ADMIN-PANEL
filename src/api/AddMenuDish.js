/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Grid,
  GridItem,
  InputGroup,
  InputLeftAddon,
  Textarea,
  RadioGroup,
  HStack,
  Radio,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TEST_URL } from "./URL";

function AddToMenuForm() {
  const [formData, setFormData] = useState({
    foodName: "",
    foodPrice: "",
    foodCategories: "",
    type: "",
    food_category_id: "",
    description: "",
    tax:""
  });

  const [imageFile, setImageFile] = useState(null);
  const [foodCategories, setFoodCategories] = useState([]);
  const [foodCategoryIdSelected, setFoodCategoryIdSelected] = useState(false);

  useEffect(() => {
    fetch(`${TEST_URL}/api/client/getAllDishesCategories`)
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
    setFoodCategoryIdSelected(true);
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
      formDataToSend.append("tax", formData.tax);

      const response = await fetch(`${TEST_URL}/api/admin/createDish`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const addedstuff = await response.json();
      console.log(addedstuff);

      toast.success(`Dish "${formData.foodName}" added to Menu`);

      setFormData({
        foodName: "",
        foodPrice: "",
        foodCategories: "",
        type: "",
        food_category_id: "",
        description: "",
        tax: "",
      });
      setImageFile(null);
    } catch (error) {
      console.error("Error adding dish to menu:", error);
      alert("An error occurred while adding the dish to the menu.");
      toast.error(`Error adding dish: ${formData.foodName} to menu: ${error}`);
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
            Add Dish Image Here
          </p>
        )}
      </div>
      <FormControl mt={4} bg="white" p={3} borderRadius="md">
        <FormLabel fontSize="xl">Food Name</FormLabel>
        <Input
          name="foodName"
          value={formData.foodName}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl mt={4} bg="white" p={3} borderRadius="md">
        <FormLabel fontSize="xl">Food Price</FormLabel>
        <InputGroup>
          <InputLeftAddon children="INR" />
          <Input
            name="foodPrice"
            value={formData.foodPrice}
            onChange={handleFoodPriceChange}
          />
        </InputGroup>
      </FormControl>
      <FormControl mt={4} bg="white" p={3} borderRadius="md">
        <FormLabel fontSize="xl">Food Categories</FormLabel>
        <Select
          name="foodCategories"
          value={formData.food_category_id}
          onChange={handleCategoryChange}
          borderColor="gray.300"
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
      <FormControl mt={4} bg="white" p={3} borderRadius="md">
        <FormLabel fontSize="xl">Food Type</FormLabel>
        <RadioGroup
          value={formData.type}
          onChange={(value) =>
            handleInputChange({ target: { name: "type", value } })
          }
        >
          <HStack spacing={4}>
            <Radio value="0" colorScheme="green">
              Veg
            </Radio>
            <Radio value="1" colorScheme="green">
              Non-Veg
            </Radio>
            <Radio value="2" colorScheme="green">
              Egg
            </Radio>
          </HStack>
        </RadioGroup>
      </FormControl>
      <FormControl mt={4} bg="white" p={3} borderRadius="md">
        <FormLabel fontSize="xl">Food Description</FormLabel>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          borderColor="gray.300"
        />
      </FormControl>
      <FormControl mt={4} bg="white" p={3} borderRadius="md">
        <FormLabel fontSize="xl">TAX </FormLabel>
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
        isDisabled={!foodCategoryIdSelected}
        _hover={{ backgroundColor: "#2c7a49" }}
      >
        Add to Menu
      </Button>
    </div>
  );
}

export default AddToMenuForm;
