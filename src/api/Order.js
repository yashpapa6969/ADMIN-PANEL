import React, { useState, useEffect } from "react";
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
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";

const baseUrl = "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com"; // Replace with your API base URL

function Order() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orderIdToDelete, setOrderIdToDelete] = useState(null);

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

  const handleDeleteClick = (orderId) => {
    setOrderIdToDelete(orderId);
    onOpen();
  };

  const handleDeleteConfirm = () => {
    onClose();
    if (orderIdToDelete) {
      fetch(`${baseUrl}/api/client/DeleteOrdersById/${orderIdToDelete}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          // Update the orders list by filtering out the deleted order
          setOrders((prevOrders) =>
            prevOrders.filter((order) => order._id !== orderIdToDelete)
          );
          setOrderIdToDelete(null);
        })
        .catch((error) => console.error("Error deleting order:", error));
    }
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
              <Td>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDeleteClick(order._id)}
                >
                  <Text fontWeight="bold">Delete</Text>
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
                <Text fontWeight="bold">Food Order Status:</Text>{" "}
                {selectedOrder.foodOrderStatus === "0"
                  ? "Pending"
                  : selectedOrder.foodOrderStatus === "1"
                  ? "Cooking"
                  : selectedOrder.foodOrderStatus === "1.5"
                  ? "Ready for Pickup"
                  : selectedOrder.foodOrderStatus === "2"
                  ? "Served"
                  : "Unknown"}
                <Text fontWeight="bold">Drink Order Status:</Text>{" "}
                {selectedOrder.drinkOrderStatus === "0"
                  ? "Pending"
                  : selectedOrder.drinkOrderStatus === "1"
                  ? "Cooking"
                  : selectedOrder.drinkOrderStatus === "1.5"
                  ? "Ready for Pickup"
                  : selectedOrder.drinkOrderStatus === "2"
                  ? "Served"
                  : "Unknown"}
                <Text>
                  <Text fontWeight="bold">OTP:</Text> {selectedOrder.otp}
                </Text>
                <Text fontWeight="bold">Dishes:</Text>
                {selectedOrder.dishes.map((dish) => (
                  <Text key={dish._id}>
                    <Text fontWeight="bold">
                      {dish.foodName || "Nan"}({dish.quantity || "Nan"})
                    </Text>
                    {dish.dish_item_active === "1" && (
                      <Text>Dish Activity: Rejected</Text>
                    )}
                  </Text>
                ))}
                <Text fontWeight="bold">Drinks:</Text>
                {selectedOrder.drinks.map((drink) => (
                  <Text key={drink._id}>
                    <Text fontWeight="bold">
                      {drink.drinkName || "Nan"}({drink.quantity || "Nan"})
                    </Text>

                    {drink.drink_item_active === "1" && (
                      <Text>Drink Activity: Rejected</Text>
                    )}
                  </Text>
                ))}
                <Text>
                  <Text fontWeight="bold">Date:</Text>{" "}
                  {selectedOrder.date1}
                </Text>
                <Text>
                  <Text fontWeight="bold">Time:</Text>{" "}
                  {selectedOrder.time1}
                </Text>
                <Text>
                  <Text fontWeight="bold">Order ID:</Text>{" "}
                  {selectedOrder.Orders_id}
                </Text>
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={undefined}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Confirm Delete
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete this order?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              onClick={handleDeleteConfirm}
              colorScheme="red"
              ml={3}
              borderRadius="lg"
            >
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </VStack>
  );
}

export default Order;
