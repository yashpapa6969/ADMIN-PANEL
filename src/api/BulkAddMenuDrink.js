import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
  Select,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import bulkData from "./bulkdataDrink.js"; // Import your bulk data here
import { TEST_URL } from "./URL";

function BulkAddToMenuFormDrink() {
  const [formData, setFormData] = useState({
    drinkName: "",
    drinkNamePrice: "",
    drinkCategories: "",
    drinks_category_id: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [bulkDataIndex, setBulkDataIndex] = useState(0);
  const [drinkCategoryIdSelected, setDrinkCategoryIdSelected] = useState(false);
  const [allDrinkNames, setAllDrinkNames] = useState([]);
  const isDrinkAdded = (drinkName) => {
    return allDrinkNames.includes(drinkName);
  };

  useEffect(() => {
    fetchDrinkCategories();
  }, []);

  const fetchDrinkCategories = async () => {
    try {
      const response = await fetch(
        `${TEST_URL}/api/client/getAllDrinksCategories`
      );
      const alldrinkresponse = await fetch(
        `${TEST_URL}/api/client/getAllDrinks`
      );
      if (!alldrinkresponse.ok) {
        throw new Error("Network response was not ok");
      }
      if (!response.ok) {
        throw Error("Network response was not ok");
      }
      const data = await response.json();
      const alldrinkdata = await alldrinkresponse.json();
      const categories = data.category_d.map((drinkCategory) => ({
        value: drinkCategory.drinks_Category_id,
        label: drinkCategory.drinksCategory,
      }));
      setDrinkCategories(categories);
      setAllDrinkNames(alldrinkdata.drinks.map((drink) => drink.drinkName));
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

  const handleDrinkPriceChange = (event) => {
    const { value } = event.target;

    // Ensure only numbers are entered for foodPrice
    if (!isNaN(value)) {
      setFormData((prevData) => ({
        ...prevData,
        drinkNamePrice: value,
      }));
    }
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

      const response = await fetch(`${TEST_URL}/api/admin/createDrink`, {
        method: "POST",
        body: formDataToSend,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setAllDrinkNames((prevNames) => [...prevNames, formData.drinkName]);
      setDrinkCategoryIdSelected(false);
      const addedstuff = await response.json();
      console.log(addedstuff);
      const message = "Drink " + formData.drinkName + " added to Menu";
      toast.success(`${message}`);

      setFormData({
        drinkName: "",
        drinkNamePrice: "",
        drinkCategories: "",
        drinks_category_id: "",
        description: "",
      });
      setImageFile(null);
      if (bulkDataIndex < bulkData.length) {
        handleAddBulkDataClick();
      }
    } catch (error) {
      console.error("Error adding drink to menu:", error);
      toast.error(
        `Error adding drink: ${formData.drinkName} to menu: ${error}`
      );
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
              <p>Add {formData.drinkName} Image Here</p>
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
            <FormLabel fontSize="xl">Set: {formData.drinkCategories}</FormLabel>
            <Select
              name="drinkCategories"
              value={formData.drinks_category_id}
              onChange={handleCategoryChange}
              borderColor="gray.300"
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
            <FormLabel fontSize="xl">Drink Description</FormLabel>
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
            isDisabled={!drinkCategoryIdSelected}
          >
            Add to Menu
          </Button>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <Grid templateColumns="repeat(1, 1fr)" gap={2} paddingTop={10}>
          {bulkData.map((item, index) => {
            const shouldShowButton = !isDrinkAdded(item.drinkName);
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
                  ADD {item.drinkName}
                </Button>
              </GridItem>
            ) : null;
          })}
        </Grid>
      </div>
    </div>
  );
}

export default BulkAddToMenuFormDrink;
