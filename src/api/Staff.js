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
import { TEST_URL } from "./URL";

function StaffTableData() {
  const baseUrl = TEST_URL;

  const [staffData, setStaffData] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [newStaffData, setNewStaffData] = useState({
    name: "",
    phoneNo: "",
    email: "",
    password: "",
    whichWaiter: "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchStaffData = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/waiter/getAllStaff`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setStaffData(data.staff);
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
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      fetch(`${baseUrl}/api/waiter/deleteStaff/${staff.staff_id}`, {
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
    fetch(`${baseUrl}/api/waiter/createStaff`, {
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
          name: "",
          phoneNo: "",
          email: "",
          password: "",
          whichWaiter: "",
        });
        onClose(); // Close the Create Staff modal
      })
      .catch((error) => {
        console.error("Error creating staff:", error);
      });
  };

  return (
    <VStack p="3" align="stretch" spacing="4">
      <Text fontSize="xl" fontWeight="bold">
        Staff Information
      </Text>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Table Assigned</Th>
            <Th>Phone No.</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {staffData.map((staff) => (
            <Tr key={staff.staff_id}>
              <Td>
                <strong>{staff.name}</strong>
              </Td>
              <Td>
                <Text
                  fontWeight="bold"
                  color={staff.tableNoAssigned ? "green" : "red"}
                >
                  {staff.tableNoAssigned || "Not Assigned"}
                </Text>
              </Td>
              <Td>
                <strong>{staff.phoneNo}</strong>
              </Td>
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
                  borderRadius="lg"
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
            <ModalHeader>Staff Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <strong>Name:</strong> {selectedStaff.name}
              </Box>
              <Box>
                <strong>Table Assigned:</strong>{" "}
                {selectedStaff.tableNoAssigned || "Not Assigned"}
              </Box>
              <Box>
                <strong>Phone Number:</strong> {selectedStaff.phoneNo}
              </Box>
              <Box>
                <strong>Email:</strong> {selectedStaff.email}
              </Box>
              <Box>
                <strong>password:</strong> {selectedStaff.password}
              </Box>
              <Box>
                <strong>Waiter for :</strong> {selectedStaff.whichWaiter}
              </Box>
              <Box>
                <strong>Staff ID :</strong> {selectedStaff.staff_id}
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
      <Button colorScheme="green" onClick={onOpen} borderRadius="lg">
        Create Staff
      </Button>

      {/* Create Staff Modal */}
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Staff</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={newStaffData.name}
                onChange={(e) =>
                  setNewStaffData({
                    ...newStaffData,
                    name: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="number"
                value={newStaffData.phoneNo}
                onChange={(e) =>
                  setNewStaffData({
                    ...newStaffData,
                    phoneNo: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={newStaffData.email}
                onChange={(e) =>
                  setNewStaffData({
                    ...newStaffData,
                    email: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={newStaffData.password}
                onChange={(e) =>
                  setNewStaffData({
                    ...newStaffData,
                    password: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Waiter for (food or drink) </FormLabel>
              <Input
                type="text"
                value={newStaffData.whichWaiter}
                onChange={(e) =>
                  setNewStaffData({
                    ...newStaffData,
                    whichWaiter: e.target.value,
                  })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              onClick={handleCreateStaff}
              borderRadius="lg"
            >
              Create Staff
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
}

export default StaffTableData;
