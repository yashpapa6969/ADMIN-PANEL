import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Text,
  Tag,
  useDisclosure,
} from "@chakra-ui/react";

function BillData() {
  const [bills, setBills] = useState([]);
  const {
    isOpen: isOpenMoreInfo,
    onOpen: onOpenMoreInfo,
    onClose: onCloseMoreInfo,
  } = useDisclosure();
  const [selectedBill, setSelectedBill] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/superAdmin/getAllBills"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setBills(data.bills);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleMoreInfoClick = (bill) => {
    setSelectedBill(bill);
    onOpenMoreInfo();
  };

  return (
    <Box pt="4">
      <VStack align="stretch" spacing="4">
        <Text fontSize="xl" fontWeight="bold">
          Bill Data
        </Text>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Table No.</Th>
                <Th>Amount (₹)</Th>
                <Th>Paid</Th>
                <Th>More Info</Th>
              </Tr>
            </Thead>
            <Tbody>
              {bills.map((bill) => (
                <Tr key={bill._id}>
                  <Td fontWeight="bold">{bill.name}</Td>
                  <Td>{bill.tableNo}</Td>
                  <Td>{bill.grandTotal}</Td>
                  <Td>
                    <Tag
                      size="lg" // Increase the size for a bigger circle
                      borderRadius="0%" // Make it a circle
                      bg={bill.paid === "notPaid" ? "red.500" : "green.500"} // Set background color based on 'paid' value
                      color="white" // Text color
                      padding="0.5rem 1rem" // Adjust padding as needed
                    >
                      {bill.paid}
                    </Tag>
                  </Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => handleMoreInfoClick(bill)}
                    >
                      More Info
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        {selectedBill && (
          <Modal
            isOpen={isOpenMoreInfo}
            onClose={() => {
              setSelectedBill(null);
              onCloseMoreInfo();
            }}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Bill Information</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* Display bill details */}
                <Box>
                  <Text>
                    <strong>Name:</strong> {selectedBill.name}
                  </Text>
                  <Text>
                    <strong>Table No.:</strong> {selectedBill.tableNo}
                  </Text>
                  <Text>
                    <strong>Phone No. :</strong> {selectedBill.phoneNo}
                  </Text>
                  <Text>
                    <strong>OTP:</strong> {selectedBill.otp}
                  </Text>
                  <Text>
                    <strong>Paid:</strong>{" "}
                    <Tag
                      size="sm"
                      colorScheme={
                        selectedBill.paid === "notPaid" ? "red" : "green"
                      }
                    >
                      {selectedBill.paid}
                    </Tag>
                  </Text>
                  <Text>
                    <strong>Dish Items:</strong>
                  </Text>
                  <ul>
                    {selectedBill.DishItems.map((dish) => (
                      <li key={dish._id}>
                        {dish.name} - ₹{dish.amount}
                      </li>
                    ))}
                  </ul>
                  <Text>
                    <strong>Drink Items:</strong>
                  </Text>
                  <ul>
                    {selectedBill.DrinkItems.map((drink) => (
                      <li key={drink._id}>
                        {drink.name} - ₹{drink.amount}
                      </li>
                    ))}
                  </ul>
                  <Text>
                    <strong>Grand Total:</strong> ₹{selectedBill.grandTotal}
                  </Text>
                  <Text>
                    <strong>Dish Total:</strong> ₹{selectedBill.dishTotal}
                  </Text>
                  <Text>
                    <strong>Drink Total:</strong> ₹{selectedBill.drinkTotal}
                  </Text>
                  <Text>
                    <strong>Date:</strong> {selectedBill.date1}
                  </Text>
                  <Text>
                    <strong>Time:</strong> {selectedBill.time1}
                  </Text>
                </Box>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </VStack>
    </Box>
  );
}

export default BillData;
