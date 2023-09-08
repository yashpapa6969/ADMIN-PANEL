/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
  RadioGroup,
  HStack,
  Radio,
  Select,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import bulkData from "./bulkdata.js";
import { all } from "axios";

function BulkAddToMenuForm() {
  const [formData, setFormData] = useState({
    foodName: "",
    foodPrice: "",
    foodCategories: "",
    type: "",
    food_category_id: "",
    description: "",
  });

  const [foodCategories, setFoodCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [bulkDataIndex, setBulkDataIndex] = useState(0);
  const [foodCategoryIdSelected, setFoodCategoryIdSelected] = useState(false);
  const [allFoodNames, setAllFoodNames] = useState([]);
  const isFoodAdded = (foodName) => {
    return allFoodNames.includes(foodName);
  };

  useEffect(() => {
    fetchFoodCategories();
  }, []);

  const fetchFoodCategories = async () => {
    try {
      const response = await fetch(
        "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/client/getAllDishesCategories"
      );
      const allfoodresponse = await fetch(
        "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/client/getAllDishes"
      );
      if (!allfoodresponse.ok) {
        throw new Error("Network response was not ok");
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const allfooddata = await allfoodresponse.json();
      const categories = data.category_d.map((dish) => ({
        value: dish.food_Category_id,
        label: dish.food_Category,
      }));
      setFoodCategories(categories);
      setAllFoodNames(allfooddata.dishes.map((dish) => dish.foodName));
    } catch (error) {
      console.error("Error fetching food categories:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const bulkDataWithFoodCategoryId = bulkData.map((item) => {
  //   const selectedCategory = foodCategories.find(
  //     (cat) => cat.label === item.foodCategories
  //   );
  //   return {
  //     ...item,
  //     food_category_id: selectedCategory ? selectedCategory.value : "",
  //   };
  // });

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
      setAllFoodNames((prevNames) => [...prevNames, formData.foodName]);
      setFoodCategoryIdSelected(false);
      const addedstuff = await response.json();
      console.log(addedstuff);
      const message = "Dish " + formData.foodName + " added to Menu";
      toast.success(`${message}`);

      setFormData({
        foodName: "",
        foodPrice: "",
        foodCategories: "",
        type: "",
        food_category_id: "",
        description: "",
      });
      setImageFile(null);
      if (bulkDataIndex < bulkData.length) {
        handleAddBulkDataClick();
      }
    } catch (error) {
      console.error("Error adding dish to menu:", error);
      toast.error("An error occurred while adding the dish to the menu.");
    }
  };

  const handleAddBulkDataClick = () => {
    const currentItem = bulkData[bulkDataIndex];
    setFormData(currentItem);
    setBulkDataIndex(bulkDataIndex + 1);
  };

  const handlePopulateForm = (index) => {
    const selectedData = bulkData[index];
    setFormData(selectedData);
    setBulkDataIndex(index + 1);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        maxWidth: "100%",
        padding: "20px",
      }}
    >
      <div style={{ flex: 4 }}>
        <ToastContainer />
        <div>
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
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            ) : (
              <p>Add {formData.foodName} Image Here</p>
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
            {/* <p>Set: {formData.foodCategories}</p> */}
            <FormLabel fontSize="xl">Set: {formData.foodCategories}</FormLabel>
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
          <Button
            colorScheme="green"
            mt="4"
            onClick={handleAddToMenu}
            borderRadius="lg"
            isDisabled={!foodCategoryIdSelected}
          >
            Add to Menu
          </Button>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <Grid templateColumns="repeat(1, 1fr)" gap={2} paddingTop={10}>
          {bulkData.map((item, index) => {
            const shouldShowButton = !isFoodAdded(item.foodName);
            return shouldShowButton ? (
              <GridItem key={index}>
                <Button
                  key={index}
                  colorScheme="blue"
                  ml="4"
                  mt="4"
                  onClick={() => handlePopulateForm(index)}
                  borderRadius="lg"
                >
                  ADD {item.foodName}
                </Button>
              </GridItem>
            ) : null;
          })}
        </Grid>
      </div>
    </div>
  );
}

export default BulkAddToMenuForm;
