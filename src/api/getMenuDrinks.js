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

function FetchDrinksData() {
  const [dishesData, setDishesData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDishId, setSelectedDishId] = useState(null);
   const [editedDish, setEditedDish] = useState(null);
    const [model, setModel] = useState(null);

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
  const selectedDish = dishesData.find((dish) => dish.drink_id === food_id);
  setEditedDish(selectedDish);
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
   const handleEdit = async (e) => {
     e.preventDefault();
     console.log({
       drinkNamePrice: editedDish.drinkNamePrice,
       description: editedDish.description,
       drinkName: editedDish.drinkName,
       drinkCategories: editedDish.drinkCategories,
     });
     try {
       await fetch(`${TEST_URL}/api/admin/updateDrink/${selectedDishId}`, {
         method: "PATCH",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           drinkNamePrice: editedDish.drinkNamePrice,
           description: editedDish.description,
           drinkName: editedDish.drinkName,
           drinkCategories: editedDish.drinkCategories,
         }),
       });

       onClose();
       fetchData();
     } catch (error) {
       console.error("Error editing dish:", error);
     }
   };
  const handleToggleStatus = async (drink_id, currentStatus) => {
    try {
      const newStatus = currentStatus === "1" ? "0" : "1";
      await fetch(
        `https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/admin/updateDrinkStatus/${drink_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            drinkStatus: newStatus,
          }),
        }
      );

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
            bg="white"
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
                  <strong>Available Status: </strong>
                  <Switch
                    colorScheme="teal"
                    isChecked={dish.drinkStatus === "1"}
                    onChange={() =>
                      handleToggleStatus(dish.drink_id, dish.drinkStatus)
                    }
                  />
                </Text>
                <HStack>
                  <Button
                    colorScheme="red"
                    mt="2"
                    borderRadius="lg"
                    onClick={() => handleDelete(dish.drink_id)}
                  >
                    Delete
                  </Button>
                  <Button
                    colorScheme="blue"
                    mt="2"
                    borderRadius="lg"
                    onClick={() => handelEdit(dish.drink_id)}
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
                        <FormLabel>Drink Name</FormLabel>
                        <Input
                          type="text"
                          value={editedDish.drinkName}
                          onChange={(e) =>
                            setEditedDish({
                              ...editedDish,
                              drinkName: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Price</FormLabel>
                        <Input
                          type="text"
                          value={editedDish.drinkNamePrice}
                          onChange={(e) =>
                            setEditedDish({
                              ...editedDish,
                              drinkNamePrice: e.target.value,
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
                        <FormLabel>Drink Categories</FormLabel>
                        <Input
                          type="text"
                          value={editedDish.drinkCategories}
                          onChange={(e) =>
                            setEditedDish({
                              ...editedDish,
                              drinkCategories: e.target.value,
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
    </>
  );
}

export default FetchDrinksData;
