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
  Badge,
} from "@chakra-ui/react";

function CustomerTableData() {
  const baseUrl = "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com"; // Replace with your actual base URL

  const [staffData, setStaffData] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [newStaffData, setNewStaffData] = useState({
    name: "",
    phoneNo: "",
    tableNo: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fetchStaffData = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/client/getAllCustomers`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setStaffData(data.customer);
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

  const handleCreateStaff = () => {
    console.log(0);
  };

  return (
    <VStack p="3" align="stretch" spacing="4">
      <Text fontSize="xl" fontWeight="bold">
        Customer Information
      </Text>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Table Number</Th>

            <Th>Phone Number</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {staffData.map((staff) => (
            <Tr key={staff.user_id}>
              <Td>
                <strong>{staff.name}</strong>
              </Td>
              <Td>
                <strong>{staff.tableNo || "Not Assigned "}</strong>
              </Td>
              <Td>
                <strong>{staff.phoneNo}</strong>
              </Td>

              <Td>
                {staff.userStatus === 0 ? (
                  <Badge colorScheme="green">Active</Badge>
                ) : (
                  <Badge colorScheme="red">Not Active</Badge>
                )}
              </Td>

              <Td>
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={() => handleMoreInfoClick(staff)}
                >
                  More Info
                </Button>{" "}
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
            <ModalHeader>Customer Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <strong>Customer ID : </strong> {selectedStaff.user_id}
              </Box>
              <Box>
                <strong>Name : </strong> {selectedStaff.name}
              </Box>
              <Box>
                <strong>Table No. : </strong>{" "}
                {selectedStaff.tableNo || " Not Assigned "}
              </Box>
              <Box>
                <strong>Phone Number : </strong> {selectedStaff.phoneNo}
              </Box>
              <Box>
                <strong>Membership ID : </strong>{" "}
                {selectedStaff.membership_id || "Not a member "}
              </Box>
              <Box>
                <strong> Status : </strong> {selectedStaff.userStatus || "NaN "}
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
      <Button colorScheme="green" onClick={onOpen}>
        Create Customer
      </Button>

      {/* Create Staff Modal */}
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Customer</ModalHeader>
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
                type="text"
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
              <FormLabel>Table Number</FormLabel>
              <Input
                type="number"
                value={newStaffData.tableNo}
                onChange={(e) =>
                  setNewStaffData({
                    ...newStaffData,
                    tableNo: e.target.value,
                  })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={handleCreateStaff}>
              Create Customer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
}

export default CustomerTableData;
