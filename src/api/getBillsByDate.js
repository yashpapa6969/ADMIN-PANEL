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

  const handleDownload = async () => {
    try {
      // Ensure startDate and endDate are not empty before proceeding
      if (!startDate || !endDate) {
        console.error("Start date and end date are required.");
        return;
      }

      // Create the download URL with startDate and endDate as query parameters
      const downloadUrl = `https://1cxmul59q5.execute-api.ap-south-1.amazonaws.com/api/admin/exportCsv/${startDate}/${endDate}`;

      // Send a request to your backend API to generate the CSV using the download URL
      const response = await fetch(downloadUrl);

      if (!response.ok) {
        throw new Error("CSV generation failed");
      }

      // Convert the response to a Blob
      const blob = await response.blob();

      // Create a temporary URL to the Blob
      const url = window.URL.createObjectURL(blob);

      // Create an anchor element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = "bills.csv"; // Set the desired filename

      // Programmatically click the anchor to start the download
      a.click();

      // Clean up by revoking the temporary URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading CSV:", error);
      // Handle the error as needed (e.g., show an error message)
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
                  <Td fontWeight="bold">{parseInt(bill.grandTotal).toFixed(2)}</Td>
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
                  {/* ... (rest of the code) */}
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
