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

function BillData() {
  // State for managing staff data
  const [tableData, setTableData] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [newStaffData, setNewStaffData] = useState({
    amount: "",
    tableNo: "",
    otp: "",
    paid: "",
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
        "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/superAdmin/getAllBills"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setTableData(data.bills);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to create a new staff member
  const createNewStaff = async () => {
    try {
      const response = await fetch(
        "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/superAdmin/setNewBills",
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
      console.error("Error creating bill:", error);
    }
  };

  // Fetch data on component mount and whenever selectedStaff changes
  useEffect(() => {
    fetchData();
  }, [selectedStaff]);

  // Function to handle displaying more info for a bill member
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

  // Function to handle bill deletion
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
      console.error("Error deleting bill:", error);
    }
  };

  return (
    <Box p="3" shadow="md" borderRadius="md" mx="auto">
      <VStack align="stretch" spacing="4">
        <Text fontSize="xl" fontWeight="bold">
          Billing Information
        </Text>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Table Number</Th>
                <Th>Amount</Th>
                <Th>OTP</Th>
                <Th>Paid</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData.map((table) => (
                <Tr key={table._id}>
                  <Td>{table.tableNo}</Td>
                  <Td>{table.amount}</Td>
                  <Td>{table.otp}</Td>
                  <Td>{table.paid}</Td>
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

        {/* Create Bill Button */}
        <Button colorScheme="green" onClick={onOpenCreate}>
          Create Bill
        </Button>

        {/* Create Bill Form */}
        <Modal isOpen={isOpenCreate} onClose={onCloseCreate}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>create New Bill</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Bill amount</FormLabel>
                <Input
                  type="number"
                  value={newStaffData.amount}
                  onChange={(e) =>
                    setNewStaffData({
                      ...newStaffData,
                      amount: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Bill Table Number</FormLabel>
                <Input
                  type="text"
                  value={newStaffData.tableNo}
                  onChange={(e) =>
                    setNewStaffData({
                      ...newStaffData,
                      tableNo: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>OTP</FormLabel>
                <Input
                  type="number"
                  value={newStaffData.otp}
                  onChange={(e) =>
                    setNewStaffData({
                      ...newStaffData,
                      otp: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Paid</FormLabel>
                <Input
                  type="number"
                  value={newStaffData.paid}
                  onChange={(e) =>
                    setNewStaffData({
                      ...newStaffData,
                      paid: e.target.value,
                    })
                  }
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="green" mr={3} onClick={createNewStaff}>
                Create
              </Button>
              <Button variant="ghost" onClick={onCloseCreate}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Detailed bill Info Modal */}
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
                <div>Amount : {selectedStaff.amount}</div>
                <div>table Number : {selectedStaff.tableNo}</div>
                <div>OTP : {selectedStaff.otp}</div>
                <div>Paid Amount : {selectedStaff.paid}</div>
                <div>Bill ID : {selectedStaff.bill_id}</div>
                {/* Display more bill information as needed */}
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
            <ModalBody>Are you sure you want to delete this mem?</ModalBody>
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

export default BillData;
