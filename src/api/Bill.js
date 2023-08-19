import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  VStack,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";

function BillData() {
  const baseUrl = "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com"; // Replace with your actual base URL

  const [staffData, setStaffData] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [newStaffData, setNewStaffData] = useState({
    name: "",
    phoneNo: "",
    email: "",
    password: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fetchStaffData = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/superAdmin/getAllBills`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setStaffData(data.bills);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  const handleMoreInfoClick = (staff) => {
    setSelectedStaff(staff);
  };

  const handleDeleteClick = (staff) => {
    if (window.confirm("Are you sure you want to delete this bill ?")) {
      fetch(`${baseUrl}/api/superAdmin/deleteBillsById/${staff.bill_id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => {
          fetchStaffData();
          setSelectedStaff(null); // Close the More Info modal if open
        })
        .catch((error) => {
          console.error("Error deleting staff:", error);
        });
    }
  };

  const handleCreateStaff = () => {
    fetch(`${baseUrl}/api/superAdmin/setNewBills`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStaffData),
    })
      .then((response) => response.json())
      .then(() => {
        fetchStaffData();
        setNewStaffData({
          amount: "",
          tableNo: "",
          otp: "",
          paid: "",
        });
      })
      .catch((error) => {
        console.error("Error creating staff:", error);
      });
  };

  return (
    <VStack p="3" align="stretch" spacing="4">
      <Text fontSize="xl" fontWeight="bold">
        Bill Information
      </Text>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Table Number</Th>
            <Th>Bill Amount</Th>

            <Th>OTP</Th>
            <Th>Paid</Th>
          </Tr>
        </Thead>
        <Tbody>
          {staffData.map((staff) => (
            <Tr key={staff.bill_id}>
              <Td>{staff.tableNo || "Not Assigned "}</Td>
              <Td>{staff.amount}</Td>

              <Td>{staff.otp}</Td>
              <Td>{staff.paid}</Td>
              <Td>
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={() => handleMoreInfoClick(staff)}
                >
                  More Info
                </Button>{" "}
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDeleteClick(staff)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* More Info Modal */}
      {selectedStaff && (
        <Modal
          isOpen={Boolean(selectedStaff)}
          onClose={() => setSelectedStaff(null)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Bill Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <strong>Bill ID : </strong> {selectedStaff.bill_id}
              </Box>
              <Box>
                <strong>Amount : </strong> {selectedStaff.amount}
              </Box>
              <Box>
                <strong>Table No. : </strong>{" "}
                {selectedStaff.tableNo || " Not Assigned "}
              </Box>
              <Box>
                <strong>OTP : </strong> {selectedStaff.otp}
              </Box>
              <Box>
                <strong>Paid : </strong> {selectedStaff.paid}
              </Box>
              {/* Add more fields as needed */}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={() => setSelectedStaff(null)}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Create Staff Button */}
      

    
    </VStack>
  );
}

export default BillData;
