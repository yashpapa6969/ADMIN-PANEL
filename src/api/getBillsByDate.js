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
  Input,
} from "@chakra-ui/react";
import { TEST_URL } from "./URL";
import CsvDownloadButton from "./CsvDownloadBill";

function BillByDate() {
  const [bills, setBills] = useState([]);
  const {
    isOpen: isOpenMoreInfo,
    onOpen: onOpenMoreInfo,
    onClose: onCloseMoreInfo,
  } = useDisclosure();
  const [selectedBill, setSelectedBill] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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
  useEffect(() => {
    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);

  const handleMoreInfoClick = (bill) => {
    setSelectedBill(bill);
    onOpenMoreInfo();
  };

  return (
    <Box pt="4">
      <VStack align="stretch" spacing="4">
        <Box pt="4" display="flex">
          <VStack align="stretch" spacing="4">
            <Text>Start Date</Text>
            <Input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              placeholder="Start Date"
              borderRadius="md"
              borderColor="gray.300"
              borderWidth="1px"
              px="3"
              py="2"
              _focus={{
                borderColor: "blue.500",
                boxShadow: "outline",
              }}
            />
            <Text>End Date</Text>
            <Input
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              placeholder="End Date"
              borderRadius="md"
              borderColor="gray.300"
              borderWidth="1px"
              px="3"
              py="2"
              _focus={{
                borderColor: "blue.500",
                boxShadow: "outline",
              }}
            />
          </VStack>
        </Box>
        <Text fontSize="xl" fontWeight="bold">
          Bill Data
        </Text>
        <Box>
          <CsvDownloadButton />
        </Box>

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
                  <Td fontWeight="bold">
                    {parseFloat(bill.grandTotal).toFixed(2)}
                  </Td>
                  <Td>
                    <Tag
                      size="lg"
                      borderRadius="md"
                      bg={
                        bill.foodBillpaid === "notPaid"
                          ? "red.500"
                          : "green.500"
                      }
                      color="white"
                      padding="0.5rem 1rem"
                      textTransform="capitalize"
                    >
                      {bill.foodBillpaid}
                    </Tag>
                  </Td>
                  <Td>
                    <Tag
                      size="lg"
                      borderRadius="md"
                      bg={
                        bill.drinkBillpaid === "notPaid"
                          ? "red.500"
                          : "green.500"
                      }
                      color="white"
                      padding="0.5rem 1rem"
                      textTransform="capitalize"
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
