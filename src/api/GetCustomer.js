/* eslint-disable no-unused-vars */
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
import { TEST_URL } from "./URL";

function CustomerTableData() {
  const baseUrl = TEST_URL;

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
                <strong>Name : </strong> {selectedStaff.name}
              </Box>
              <Box>
                <strong>Phone Number : </strong> {selectedStaff.phoneNo}
              </Box>
              <Box>
                <strong>Member Name : </strong> {selectedStaff.member_name}
              </Box>
              <Box>
                <strong>Member Phone Number : </strong>{" "}
                {selectedStaff.member_phoneNo}
              </Box>
              <Box>
                <strong>Membership ID : </strong>{" "}
                {selectedStaff.membership_id || "Not a member "}
              </Box>
              <Box>
                <strong>Table No. : </strong>{" "}
                {selectedStaff.tableNo || " Not Assigned "}
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
    </VStack>
  );
}

export default CustomerTableData;
