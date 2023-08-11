import { useState, useEffect } from "react";
import {
  VStack,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Text,
} from "@chakra-ui/react";

const baseUrl = "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com"; // Replace with your API base URL

function Order() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Fetch orders from the API
    fetch(`${baseUrl}/api/client/getAllOrders`)
      .then((response) => response.json())
      .then((data) => setOrders(data.orders))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const handleViewClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <VStack p="3" align="stretch" spacing="4">
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>
              <Text fontWeight="bold">Table Number</Text>
            </Th>
            <Th>
              <Text fontWeight="bold">Order Status</Text>
            </Th>
            <Th>
              <Text fontWeight="bold">Actions</Text>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <Tr key={order._id}>
              <Td>
                <Text fontWeight="bold">{order.tableNo}</Text>
              </Td>
              <Td color={order.orderStatus === "0" ? "red" : "green"}>
                <Text fontWeight="bold">
                  {order.orderStatus === "0" ? "Inactive" : "Active"}
                </Text>
              </Td>
              <Td>
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={() => handleViewClick(order)}
                >
                  <Text fontWeight="bold">View Details</Text>
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Order Details Modal */}
      <Modal isOpen={selectedOrder} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontWeight="bold">Order Details</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedOrder && (
              <Box>
                <Text>
                  <Text fontWeight="bold">Table Number:</Text>{" "}
                  {selectedOrder.tableNo}
                </Text>
                <Text>
                  <Text fontWeight="bold">Order Status:</Text>{" "}
                  {selectedOrder.orderStatus}
                </Text>
                <Text fontWeight="bold">Dishes:</Text>
                {selectedOrder.dishes.map((dish) => (
                  <Text key={dish._id}>
                    <Text fontWeight="bold">{dish.foodName || "Nan"}</Text>
                    Quantity :{" "}
                    <Text fontWeight="bold">{dish.quantity || "Nan"}</Text>
                  </Text>
                ))}
                <Text fontWeight="bold">Drinks:</Text>
                {selectedOrder.drinks.map((drink) => (
                  <Text key={drink._id}>
                    <Text fontWeight="bold">{drink.drinkName || "Nan"}</Text>
                    Quantity :{" "}
                    <Text fontWeight="bold">{drink.quantity || "Nan"}</Text>
                  </Text>
                ))}
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCloseModal}>
              <Text fontWeight="bold">Close</Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
}

export default Order;
