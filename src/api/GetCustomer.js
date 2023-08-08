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

function CustomerTableData() {
  // State for managing staff data
  const [tableData, setTableData] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [newStaffData, setNewStaffData] = useState({
    name: "",
    phoneNo: "",
    emailAddress: "",
    password: "",
  });

  // Custom hooks for modal display
  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onClose: onCloseCreate,
  } = useDisclosure();

  // State to track whether the delete confirmation modal is open
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  // Function to fetch staff data from an API
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/client/getAllCustomers"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setTableData(data.customer);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to create a new staff member
  const createNewStaff = async () => {
    try {
      const response = await fetch(
        "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/waiter/createStaff",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newStaffData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Fetch updated data after creation
      fetchData();
      onCloseCreate(); // Close the create modal
    } catch (error) {
      console.error("Error creating staff:", error);
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

  // Function to open the delete confirmation modal
  const openDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(true);
  };

  // Function to close the delete confirmation modal
  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
  };

  // Function to handle staff deletion
  const handleDeleteStaff = async (staffId) => {
    // Close the delete confirmation modal
    closeDeleteConfirmation();

    try {
      const response = await fetch(
        `https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/waiter/deleteStaff/${staffId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Fetch updated data after deletion
      fetchData();
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  return (
    <Box p="3" shadow="md" borderRadius="md" mx="auto">
      <VStack align="stretch" spacing="4">
        <Text fontSize="xl" fontWeight="bold">
          Customer Information
        </Text>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Customer Name</Th>
                <Th>Table No. Assigned</Th>
                <Th>Status</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData.map((table) => (
                <Tr key={table._id}>
                  <Td>{table.name}</Td>
                  <Td>{table.tableNo}</Td>
                  <Td>{table.userStatus}</Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => handleMoreInfoClick(table)}
                    >
                      More Info
                    </Button>{" "}
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={openDeleteConfirmation} // Open delete confirmation modal
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        {/* Create Table Button */}
        <Button colorScheme="green" onClick={onOpenCreate}>
          Create Customer
        </Button>

        {/* Create Table Form */}
        <Modal isOpen={isOpenCreate} onClose={onCloseCreate}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create User</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>User Name</FormLabel>
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
                <FormLabel>User Phone Number</FormLabel>
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
                <FormLabel>Staff Password</FormLabel>
                <Input
                  type="text"
                  value={newStaffData.password}
                  onChange={(e) =>
                    setNewStaffData({
                      ...newStaffData,
                      password: e.target.value,
                    })
                  }
                />
              </FormControl>
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
                <div>Table Number Assigned: {selectedStaff.tableNo}</div>
                <div>User Status : {selectedStaff.userStatus}</div>
                <div>Order id: {selectedStaff.Orders_id}</div>
                <div>Status: {selectedStaff.status}</div>
                <div>Membership ID : {selectedStaff.membership_id}</div>
                <div>User ID : {selectedStaff.user_id}</div>
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

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteConfirmationOpen}
          onClose={closeDeleteConfirmation}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Deletion</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to delete this staff member?
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                onClick={() => handleDeleteStaff(selectedStaff?.staff_id)}
              >
                Delete
              </Button>
              <Button variant="ghost" onClick={closeDeleteConfirmation}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
}

export default CustomerTableData;
