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
  Text,
  VStack,
  useColorModeValue,
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

function StaffTableData() {
  // State for managing staff data
  const [tableData, setTableData] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // Custom hooks for modal display
  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onClose: onCloseCreate,
  } = useDisclosure();

  // Function to fetch staff data from an API
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/waiter/getAllStaff"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setTableData(data.staff);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data on component mount and whenever selectedStaff changes
  useEffect(() => {
    fetchData();
  }, [selectedStaff]);

  // Function to handle displaying more info for a staff member
  const handleMoreInfoClick = (staff) => {
    setSelectedStaff(staff);
  };

  return (
    <Box p="3" shadow="md" borderRadius="md" mx="auto">
      <VStack align="stretch" spacing="4">
        <Text fontSize="xl" fontWeight="bold">
          Staff Information
        </Text>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Staff Name</Th>
                <Th>Table No. Assigned</Th>
                <Th>Phone No.</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData.map((table) => (
                <Tr key={table._id}>
                  <Td>{table.name}</Td>
                  <Td>{table.tableNoAssigned}</Td>
                  <Td>{table.phoneNo}</Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => handleMoreInfoClick(table)}
                    >
                      More Info
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        {/* Create Table Button */}
        <Button colorScheme="green" onClick={onOpenCreate}>
          Create Staff
        </Button>

        {/* Create Table Form */}
        <Modal isOpen={isOpenCreate} onClose={onCloseCreate}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Staff</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Staff Name</FormLabel>
                <Input
                  type="text"
                  // Bind input value to corresponding state
                />
              </FormControl>
              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="text"
                  // Bind input value to corresponding state
                />
              </FormControl>
              {/* Add more form fields as needed */}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="green" mr={3}>
                Create
              </Button>
              <Button variant="ghost" onClick={onCloseCreate}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Detailed Staff Info Modal */}
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
                <div>Name: {selectedStaff.name}</div>
                <div>Phone Number: {selectedStaff.phoneNo}</div>
                <div>
                  Table Number Assigned: {selectedStaff.tableNoAssigned}
                </div>
                <div>Order ID : {selectedStaff.order_id}</div>
                <div>Email ID : {selectedStaff.emailAddress}</div>
                <div>Password : {selectedStaff.password}</div>
                <div>Staff ID : {selectedStaff.staff_id}</div>
                {/* Display more staff information as needed */}
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  onClick={() => setSelectedStaff(null)}
                >
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </VStack>
    </Box>
  );
}

export default StaffTableData;
