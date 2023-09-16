import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  VStack,
  SimpleGrid,
  Button,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Switch,
  Badge,
  HStack,
  Input,
  FormLabel,
  FormControl,
  Textarea,
} from "@chakra-ui/react";

import { TEST_URL } from "./URL";

function FetchDishesData() {
  const [dishesData, setDishesData] = useState([]);
  const [overallStatus, setOverallStatus] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDishId, setSelectedDishId] = useState(null);
  const [model, setModel] = useState(null);
  const [editedDish, setEditedDish] = useState(null);
  const fetchData = async () => {
    try {
      const response = await fetch(`${TEST_URL}/api/client/getAllDishes`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setDishesData(data.dishes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (food_id) => {
    setModel("delete");
    setSelectedDishId(food_id);
    onOpen();
  };

  const handelEdit = (food_id) => {
    setModel("edit");
    setSelectedDishId(food_id);
    const selectedDish = dishesData.find((dish) => dish.food_id === food_id);
    setEditedDish(selectedDish);
    onOpen();
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch(`${TEST_URL}/api/admin/dishes/${selectedDishId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Remove the deleted dish from the state
      setDishesData((prevData) =>
        prevData.filter((dish) => dish.food_id !== selectedDishId)
      );
      onClose();
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${TEST_URL}/api/admin/updateDishById/${selectedDishId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodPrice: editedDish.foodPrice,
          description: editedDish.description,
          foodName: editedDish.foodName,
          foodCategories: editedDish.foodCategories,
          tax: editedDish.tax,
        }),
      });

      onClose();
      fetchData();
    } catch (error) {
      console.error("Error editing dish:", error);
    }
  };

  const handleToggleStatus = async (food_id, currentStatus) => {
    try {
      const newStatus = currentStatus === "1" ? "0" : "1";
      await fetch(`${TEST_URL}/api/admin/updateFoodStatus/${food_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodStatus: newStatus,
        }),
      });

      // Update the status in the state
      setDishesData((prevData) =>
        prevData.map((dish) =>
          dish.food_id === food_id ? { ...dish, foodStatus: newStatus } : dish
        )
      );
    } catch (error) {
      console.error("Error updating dish status:", error);
    }
  };
  const handleToggleAllStatus = async () => {
    try {
      const newStatus = !overallStatus;
      await fetch(`${TEST_URL}/api/admin/updateAllFoodStatus`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodStatus: newStatus ? "1" : "0",
        }),
      });

      // Update the status in the state for all dishes
      setDishesData((prevData) =>
        prevData.map((dish) => ({ ...dish, foodStatus: newStatus ? "1" : "0" }))
      );

      // Update the overall status
      setOverallStatus(newStatus);
    } catch (error) {
      console.error("Error updating all dish statuses:", error);
    }
  };

  const typeConfig = {
    0: { label: "Veg", color: "green" },
    1: { label: "Non-veg", color: "red" },
    2: { label: "Egg", color: "yellow" },
  };

  return (
    <div>
      <Button
        colorScheme={overallStatus ? "red" : "green"}
        onClick={handleToggleAllStatus}
        mb="2"
      >
        Status
      </Button>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="10px">
        {dishesData.map((dish) => (
          <Box
            key={dish._id}
            p="4"
            bg="white"
            borderRadius="md"
            boxShadow="md"
            maxW="500px"
          >
            <Flex direction="column">
              <Image
                src={dish.filenames}
                alt={dish.foodName}
                boxSize="120px"
                objectFit="cover"
                borderRadius="md"
                mb="4"
              />
              <VStack align="flex-start" spacing="2">
                <Text fontSize="xl" fontWeight="semibold">
                  {dish.foodName}
                </Text>
                <Badge colorScheme={typeConfig[dish.type].color}>
                  {typeConfig[dish.type].label}
                </Badge>
                <Text>
                  <strong>Price:</strong> ₹ {dish.foodPrice}
                </Text>
                <Text>
                  <strong>Category:</strong> {dish.foodCategories}
                </Text>
                <Text>
                  <strong>Description:</strong> {dish.description}
                </Text>
                <Text>
                  <strong>TAX:</strong> {dish.tax}
                </Text>

                <HStack spacing="2" mt="2">
                  <Text>
                    <strong>Available Status:</strong>
                  </Text>
                  <Switch
                    colorScheme="green"
                    isChecked={dish.foodStatus === "0"}
                    onChange={() =>
                      handleToggleStatus(dish.food_id, dish.foodStatus)
                    }
                  />
                </HStack>
                <HStack>
                  <Button
                    colorScheme="red"
                    mt="2"
                    borderRadius="lg"
                    onClick={() => handleDelete(dish.food_id)}
                  >
                    Delete
                  </Button>
                  <Button
                    colorScheme="blue"
                    mt="2"
                    borderRadius="lg"
                    onClick={() => handelEdit(dish.food_id)}
                  >
                    Edit
                  </Button>
                </HStack>
              </VStack>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {model === "delete" ? (
          <ModalContent>
            <ModalHeader>Confirm Delete</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Are you sure you want to delete this dish?</ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                onClick={handleConfirmDelete}
                borderRadius="lg"
              >
                Delete
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        ) : (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            {model === "edit" && editedDish && (
              <ModalContent>
                <ModalHeader>Edit</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <form onSubmit={handleEdit}>
                    <VStack spacing="4">
                      <FormControl>
                        <FormLabel>Food Name</FormLabel>
                        <Input
                          type="text"
                          value={editedDish.foodName}
                          onChange={(e) =>
                            setEditedDish({
                              ...editedDish,
                              foodName: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Price</FormLabel>
                        <Input
                          type="text"
                          value={editedDish.foodPrice}
                          onChange={(e) =>
                            setEditedDish({
                              ...editedDish,
                              foodPrice: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                          value={editedDish.description}
                          onChange={(e) =>
                            setEditedDish({
                              ...editedDish,
                              description: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Tax</FormLabel>
                        <Textarea
                          value={editedDish.tax}
                          onChange={(e) =>
                            setEditedDish({
                              ...editedDish,
                              tax: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Food Categories</FormLabel>
                        <Input
                          type="text"
                          value={editedDish.foodCategories}
                          onChange={(e) =>
                            setEditedDish({
                              ...editedDish,
                              foodCategories: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </VStack>
                    <Button mt="4" colorScheme="blue" type="submit">
                      Save Changes
                    </Button>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button variant="ghost" onClick={onClose}>
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalContent>
            )}
          </Modal>
        )}
      </Modal>
    </div>
  );
}

export default FetchDishesData;
