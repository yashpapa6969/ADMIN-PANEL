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
} from "@chakra-ui/react";

function FetchDishesData() {
  const [dishesData, setDishesData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDishId, setSelectedDishId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/client/getAllDishes"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setDishesData(data.dishes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (food_id) => {
    setSelectedDishId(food_id);
    onOpen();
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch(
        `https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/admin/dishes/${selectedDishId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Remove the deleted dish from the state
      setDishesData((prevData) =>
        prevData.filter((dish) => dish.food_id !== selectedDishId)
      );
      onClose();
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };

  const handleToggleStatus = async (food_id, currentStatus) => {
    try {
      const newStatus = currentStatus === "1" ? "0" : "1";
      await fetch(
        `https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/admin/updateFoodStatus/${food_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            foodStatus: newStatus,
          }),
        }
      );

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
  const typeConfig = {
    0: { label: "Veg", color: "green" },
    1: { label: "Non-veg", color: "red" },
    2: { label: "Egg", color: "yellow" },
  };

  return (
    <div>
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
                <Button
                  colorScheme="red"
                  mt="2"
                  borderRadius="lg"
                  onClick={() => handleDelete(dish.food_id)}
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
      </Modal>
    </div>
  );
}

export default FetchDishesData;
