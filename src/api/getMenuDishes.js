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

  const cardBg = useColorModeValue("white", "gray.800");

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

  return (
    <>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing="4">
        {dishesData.map((dish) => (
          <Box
            key={dish._id}
            p="4"
            bg={cardBg}
            borderRadius="md"
            boxShadow="md"
            maxW="400px" // Adjust the maximum width here
          >
            <Flex>
              <Image
                src={dish.filenames}
                alt={dish.foodName}
                boxSize="100px"
                borderRadius="md"
                mr="4"
              />
              <VStack align="flex-start" spacing="2">
                <Box borderTop="0px" borderColor="teal.500" mb="0"></Box>
                <Text fontSize="xl" fontWeight="bold">
                  {dish.foodName}
                </Text>
                <Text>Price: Rs {dish.foodPrice}</Text>
                <Text>Category: {dish.foodCategories}</Text>
                <Text>Description: {dish.description}</Text>
                <Button
                  colorScheme="red"
                  mt="2"
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
            <Button colorScheme="red" onClick={handleConfirmDelete}>
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

export default FetchDishesData;
