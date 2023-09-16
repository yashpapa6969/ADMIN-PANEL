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

function BillByDate() {
  const [bills, setBills] = useState([]);
  const {
    isOpen: isOpenMoreInfo,
    onOpen: onOpenMoreInfo,
    onClose: onCloseMoreInfo,
  } = useDisclosure();
  const [selectedBill, setSelectedBill] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);

  const fetchData = async () => {
    try {
      if (!startDate || !endDate) {
        console.log("Start date and end date are required.");
        return;
      }

      const response = await fetch(
        `${TEST_URL}/api/superAdmin/GetBillByDate/${startDate}/${endDate}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("API response data:", data);

      setBills(data);
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
        <Box pt="4">
          <VStack align="stretch" spacing="4">
            <input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              placeholder="Start Date"
            />
            <input
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              placeholder="End Date"
            />
          </VStack>
        </Box>
        <Text fontSize="xl" fontWeight="bold">
          Bill Data
        </Text>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Date</Th>
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
                  <Td fontWeight="bold">{bill.date1}</Td>
                  <Td fontWeight="bold">{bill.grandTotal}</Td>
                  <Td>
                    <Tag
                      size="lg"
                      borderRadius="0%"
                      bg={
                        bill.foodBillpaid === "notPaid"
                          ? "red.500"
                          : "green.500"
                      }
                      color="white"
                      padding="0.5rem 1rem"
                    >
                      {bill.foodBillpaid}
                    </Tag>
                  </Td>
                  <Td>
                    <Tag
                      size="lg"
                      borderRadius="0%"
                      bg={
                        bill.drinkBillpaid === "notPaid"
                          ? "red.500"
                          : "green.500"
                      }
                      color="white"
                      padding="0.5rem 1rem"
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
      </VStack>
    </Box>
  );
}

export default BillByDate;
