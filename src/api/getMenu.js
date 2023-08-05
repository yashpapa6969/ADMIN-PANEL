import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  VStack,
  SimpleGrid,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function FetchCardsData() {
  const [dishesData, setDishesData] = useState([]);

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
    // Add your delete logic here
    console.log(`Deleting food with ID: ${food_id}`);
  };

  return (
    <Box p="4">
      <Carousel showStatus={false} showThumbs={false} showArrows={true}>
        {dishesData.map((dish) => (
          <Box
            key={dish._id}
            p="4"
            bg={cardBg}
            borderRadius="md"
            boxShadow="md"
            maxW="400px" // Adjust the maximum width here
          >
            <Box borderTop="4px" borderColor="teal.500" mb="2">
              <Text fontSize="lg" fontWeight="bold">
                {console.log(dish)}MENU
              </Text>
            </Box>
            <Image
              src={dish.filenames}
              alt={dish.foodName}
              boxSize="200px"
              borderRadius="md"
            />
            <VStack align="flex-start" spacing="2" mt="4">
              <Text fontSize="xl" fontWeight="bold">
                {dish.foodName}
              </Text>
              <Text>Price: ${dish.foodPrice}</Text>
              <Text>Category: {dish.foodCategories}</Text>
              <Button
                colorScheme="red"
                onClick={() => handleDelete(dish.food_id)}
              >
                Delete
              </Button>
            </VStack>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}

export default FetchCardsData;
