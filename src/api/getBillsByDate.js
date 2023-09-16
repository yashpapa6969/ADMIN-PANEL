import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
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
  Flex,
  RadioGroup,
  Radio,
  Stack,
  FormLabel,
} from "@chakra-ui/react";
import { MdDownload } from "react-icons/md";
import { TEST_URL } from "./URL";

function BillByDate() {
  const [bills, setBills] = useState([]);
  const {
    isOpen: isOpenMoreInfo,
    onOpen: onOpenMoreInfo,
    onClose: onCloseMoreInfo,
  } = useDisclosure();
  const [selectedBill, setSelectedBill] = useState(null);
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = today.getFullYear();
  const todayDate = yyyy + "-" + mm + "-" + dd;
  const [mode, setMode] = useState("single");
  const [startDate, setStartDate] = useState(todayDate);
  const [endDate, setEndDate] = useState("");

  function formatDateToWords(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0"); // Get day as two digits
    const month = date.toLocaleString("default", { month: "short" });
    return `${day} ${month}`;
  }

  useEffect(() => {
    if (mode === "single" && startDate) {
      setEndDate(startDate);
      fetchData();
    } else if (mode === "range" && startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate, mode]);

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

  const handleDownload = async () => {
    try {
      if (!startDate || !endDate) {
        console.error("Start date and end date are required.");
        return;
      }
      const downloadUrl = `https://1cxmul59q5.execute-api.ap-south-1.amazonaws.com/api/admin/exportCsv/${startDate}/${endDate}`;
      const response = await fetch(downloadUrl);
      if (!response.ok) {
        throw new Error("CSV generation failed");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "bills.csv"; // Set the desired filename
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  const handleMoreInfoClick = (bill) => {
    setSelectedBill(bill);
    onOpenMoreInfo();
  };

  return (
    <Box pt="4">
      <VStack align="stretch" spacing="4">
        <Box pt="4" display="flex">
          <VStack align="stretch" spacing="4">
            <FormLabel>Select Date Mode:</FormLabel>
            <RadioGroup value={mode} onChange={setMode}>
              <Stack direction="row">
                <Radio value="single">Single Date</Radio>
                <Radio value="range">Date Range</Radio>
              </Stack>
            </RadioGroup>

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

            {mode === "range" && (
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
            )}
            <div>
              <Button
                colorScheme="blue"
                size="md"
                borderRadius="md"
                fontWeight="semibold"
                rightIcon={<MdDownload />}
                onClick={handleDownload}
              >
                Download Bill CSV
              </Button>
            </div>
          </VStack>
        </Box>
        <Text fontSize="xl" fontWeight="bold">
          Bill Data
        </Text>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Sr. No.</Th>
                <Th>Name</Th>
                <Th>Bill Date</Th>
                <Th>Amount (₹)</Th>
                <Th>Food Paid</Th>
                <Th>Drink Paid</Th>
                <Th>More Info</Th>
              </Tr>
            </Thead>
            <Tbody>
              {bills.map((bill, index) => (
                <Tr key={bill._id}>
                  <Td fontWeight="bold">{index + 1}</Td>
                  <Td fontWeight="bold">{bill.name}</Td>
                  <Td fontWeight="bold">{formatDateToWords(bill.date1)}</Td>
                  <Td fontWeight="bold">
                    {parseInt(bill.grandTotal).toFixed(2)}
                  </Td>
                  <Td>
                    <Tag
                      size="lg"
                      borderRadius="lg"
                      textTransform="capitalize"
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
                      borderRadius="lg"
                      textTransform="capitalize"
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
            <Tfoot>
              <Tr>
                <Td></Td>
                <Td></Td>
                <Td fontWeight="bold">Total:</Td>
                <Td fontWeight="bold">
                  {bills
                    .reduce(
                      (total, bill) => total + parseFloat(bill.grandTotal),
                      0
                    )
                    .toFixed(2)}
                </Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
            </Tfoot>
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
