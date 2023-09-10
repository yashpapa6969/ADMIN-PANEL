import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  VStack,
  SimpleGrid,
  Button,
  Flex,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Switch,
} from "@chakra-ui/react";
import { TEST_URL } from "./URL";

function FetchDrinksData() {
  const [dishesData, setDishesData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDishId, setSelectedDishId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${TEST_URL}/api/client/getAllDrinks`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setDishesData(data.drinks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const cardBg = useColorModeValue("white", "gray.800");

  const handleDelete = (food_id) => {
    setSelectedDishId(food_id);
    onOpen();
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch(`${TEST_URL}/api/admin/drinks/${selectedDishId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Remove the deleted dish from the state
      setDishesData((prevData) =>
        prevData.filter((dish) => dish.drink_id !== selectedDishId)
      );
      onClose();
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };

  const handleToggleStatus = async (drink_id, currentStatus) => {
    try {
      const newStatus = currentStatus === "1" ? "0" : "1";
      await fetch(`${TEST_URL}/api/admin/updateDrinkStatus/${drink_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          drinkStatus: newStatus,
        }),
      });

      // Update the status in the state
      setDishesData((prevData) =>
        prevData.map((dish) =>
          dish.drink_id === drink_id
            ? { ...dish, drinkStatus: newStatus }
            : dish
        )
      );
    } catch (error) {
      console.error("Error updating drink status:", error);
    }
  };

  return (
    <>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} spacing="4">
        {dishesData.map((dish) => (
          <Box
            key={dish._id}
            p="4"
            bg={cardBg}
            borderRadius="md"
            boxShadow="md"
            maxW="500px" // Adjust the maximum width here
          >
            <Flex>
              <Image
                src={dish.filenames}
                alt={dish.drinkName}
                boxSize="100px"
                borderRadius="md"
                mr="4"
              />
              <VStack align="flex-start" spacing="2">
                <Text fontSize="xl" fontWeight="bold">
                  {dish.drinkName}
                </Text>
                <Text>
                  <strong>Price: </strong> ₹ {dish.drinkNamePrice}
                </Text>
                <Text>
                  <strong>Category:</strong> {dish.drinkCategories}
                </Text>
                <Text>
                  <strong>Description:</strong> {dish.description}
                </Text>
                <Text>
                  <strong>Status: </strong>
                  <Switch
                    colorScheme="teal"
                    isChecked={dish.drinkStatus === "1"}
                    onChange={() =>
                      handleToggleStatus(dish.drink_id, dish.drinkStatus)
                    }
                  />
                </Text>
                <Button
                  colorScheme="red"
                  mt="2"
                  borderRadius="lg"
                  onClick={() => handleDelete(dish.drink_id)}
                >
                  Delete
                </Button>
              </VStack>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this drink?</ModalBody>
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
      </Modal>
    </>
  );
}

export default FetchDrinksData;
