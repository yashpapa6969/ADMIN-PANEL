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
import { TEST_URL } from "./URL";
import BillUpdateForm from "./BillUpdateForm";

function BillData() {
  const [bills, setBills] = useState([]);
  const {
    isOpen: isOpenMoreInfo,
    onOpen: onOpenMoreInfo,
    onClose: onCloseMoreInfo,
  } = useDisclosure();
  const [selectedBill, setSelectedBill] = useState(null);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${TEST_URL}/api/superAdmin/getAllBills`);

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
  const handleUpdateClick = (bill) => {
    setSelectedBill(bill);
    setIsUpdateFormOpen(true); // Open the update form
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
                <Th>Food Paid</Th>
                <Th>Drink Paid</Th>
                <Th>More Info</Th>
              </Tr>
            </Thead>
            <Tbody>
              {bills.map((bill) => (
                <Tr key={bill._id}>
                  <Td fontWeight="bold">{bill.name}</Td>
                  <Td fontWeight="bold">{bill.tableNo}</Td>
                  <Td fontWeight="bold">{bill.grandTotal}</Td>
                  <Td>
                    <Tag
                      size="lg" // Increase the size for a bigger circle
                      borderRadius="0%" // Make it a circle
                      bg={
                        bill.foodBillpaid === "notPaid"
                          ? "red.500"
                          : "green.500"
                      } // Set background color based on 'paid' value
                      color="white" // Text color
                      padding="0.5rem 1rem" // Adjust padding as needed
                    >
                      {bill.foodBillpaid}
                    </Tag>
                  </Td>
                  <Td>
                    <Tag
                      size="lg" // Increase the size for a bigger circle
                      borderRadius="0%" // Make it a circle
                      bg={
                        bill.drinkBillpaid === "notPaid"
                          ? "red.500"
                          : "green.500"
                      } // Set background color based on 'paid' value
                      color="white" // Text color
                      padding="0.5rem 1rem" // Adjust padding as needed
                    >
                      {bill.drinkBillpaid}
                    </Tag>
                  </Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      borderRadius="lg"
                      onClick={() => handleMoreInfoClick(bill)}
                    >
                      More Info
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="purple" // Use purple color for the update button
                      borderRadius="lg"
                      onClick={() => handleUpdateClick(bill)}
                    >
                      Edit
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
                    <strong>Food Bill Paid:</strong>{" "}
                    <Tag
                      size="sm"
                      colorScheme={
                        selectedBill.foodBillpaid === "notPaid"
                          ? "red"
                          : "green"
                      }
                    >
                      {selectedBill.foodBillpaid}
                    </Tag>
                  </Text>
                  <Text>
                    <strong>Drink Bill Paid:</strong>{" "}
                    <Tag
                      size="sm"
                      colorScheme={
                        selectedBill.drinkBillpaid === "notPaid"
                          ? "red"
                          : "green"
                      }
                    >
                      {selectedBill.drinkBillpaid}
                    </Tag>
                  </Text>
                  <Text>
                    <strong>Dish Items:</strong>
                  </Text>
                  <ul>
                    {selectedBill.DishItems.map((dish) => (
                      <li key={dish._id}>
                        {dish.name} ({dish.quantity})- ₹{dish.amount}
                      </li>
                    ))}
                  </ul>
                  <Text>
                    <strong>Drink Items:</strong>
                  </Text>
                  <ul>
                    {selectedBill.DrinkItems.map((drink) => (
                      <li key={drink._id}>
                        {drink.name} ({drink.quantity})- ₹{drink.amount}
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
                    <strong>Donation Amount:</strong> ₹
                    {selectedBill.donationAmount}
                  </Text>
                  <Text>
                    <strong>Cleared Bill:</strong>{" "}
                    {selectedBill.clear === "0"
                      ? "Not Cleared"
                      : selectedBill.clear === "1"
                      ? "Cleared"
                      : "Unknown"}
                  </Text>
                  <Text>
                    <strong>CGST:</strong> {selectedBill.cgst}
                  </Text>
                  <Text>
                    <strong>SGST:</strong> {selectedBill.sgst}
                  </Text>
                  <Text>
                    <strong>Service Tax:</strong> {selectedBill.service_tax}
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
        {isUpdateFormOpen && (
          <BillUpdateForm
            isOpen={isUpdateFormOpen}
            onClose={() => {
              setSelectedBill(null);
              setIsUpdateFormOpen(false);
            }}
            bill={selectedBill}
            onUpdate={fetchData}
          />
        )}
      </VStack>
    </Box>
  );
}

export default BillData;
