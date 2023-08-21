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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from "@chakra-ui/react";

function DrinkManagerTable() {
  const [foodManagers, setFoodManagers] = useState([]);
  const {
    isOpen: isOpenMoreInfo,
    onOpen: onOpenMoreInfo,
    onClose: onCloseMoreInfo,
  } = useDisclosure();
  const {
    isOpen: isOpenAddFoodManager,
    onOpen: onOpenAddFoodManager,
    onClose: onCloseAddFoodManager,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteAlert,
    onOpen: onOpenDeleteAlert,
    onClose: onCloseDeleteAlert,
  } = useDisclosure();
  const [selectedFoodManager, setSelectedFoodManager] = useState(null);
  const [newFoodManager, setNewFoodManager] = useState({
    name: "",
    phoneNo: "",
    email: "",
    password: "",
  });
  const [deleteFoodManagerId, setDeleteFoodManagerId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/superAdmin/getAlldrinksManager/"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setFoodManagers(data.drinkManager);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleMoreInfoClick = (foodManager) => {
    setSelectedFoodManager(foodManager);
    onOpenMoreInfo();
  };

  const handleDeleteClick = (id) => {
    setDeleteFoodManagerId(id);
    onOpenDeleteAlert();
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/superAdmin/DeletedrinkManagerById/${deleteFoodManagerId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Update the foodManagers list after successful deletion
      const updatedFoodManagers = foodManagers.filter(
        (manager) => manager.manager_id !== deleteFoodManagerId
      );
      setFoodManagers(updatedFoodManagers);

      onCloseDeleteAlert();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleAddFoodManager = async (newManager) => {
    try {
      const response = await fetch(
        "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/superAdmin/addDrinksManager",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newManager),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const createdFoodManager = await response.json();
      setFoodManagers([...foodManagers, createdFoodManager]);
      setNewFoodManager({
        name: "",
        phoneNo: "",
        email: "",
        password: "",
      });
      fetchData();
      onCloseAddFoodManager();
    } catch (error) {
      console.error("Error adding food manager:", error);
    }
  };

  return (
    <Box pt="0">
      <VStack align="stretch" spacing="4">
        <Text fontSize="xl" fontWeight="bold">
          Drink Managers
        </Text>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Phone Number</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {foodManagers.map((foodManager) => (
                <Tr key={foodManager.manager_id}>
                  <Td fontWeight="bold">{foodManager.name}</Td>
                  <Td fontWeight="bold">{foodManager.phoneNo}</Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      borderRadius="lg"
                      onClick={() => handleMoreInfoClick(foodManager)}
                    >
                      More Info
                    </Button>
                    <Button
                      size="sm"
                      borderRadius="lg"
                      colorScheme="red"
                      ml="2"
                      onClick={() => handleDeleteClick(foodManager.manager_id)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <Button
          colorScheme="green"
          onClick={onOpenAddFoodManager}
          borderRadius="lg"
        >
          Add Drink Manager
        </Button>

        {selectedFoodManager && (
          <Modal
            isOpen={isOpenMoreInfo}
            onClose={() => {
              setSelectedFoodManager(null);
              onCloseMoreInfo();
            }}
          >
            <ModalOverlay />
            <ModalContent>
              {" "}
              <ModalHeader>Drink Manager Information</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <strong>Name: {selectedFoodManager.name}</strong>
                <br />
                <strong>Phone Number: {selectedFoodManager.phoneNo}</strong>
                <br />
                <strong>Email: {selectedFoodManager.email}</strong>
                <br />
                <strong>Password: {selectedFoodManager.password}</strong>
                <br />
                <strong>Manager ID: {selectedFoodManager.manager_id}</strong>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  borderRadius="lg"
                  onClick={() => {
                    setSelectedFoodManager(null);
                    onCloseMoreInfo();
                  }}
                >
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}

        <Modal isOpen={isOpenAddFoodManager} onClose={onCloseAddFoodManager}>
          <ModalOverlay />
          <ModalContent>
            {" "}
            <ModalHeader>Add Drink Manager</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Enter name"
                  value={newFoodManager.name}
                  onChange={(e) =>
                    setNewFoodManager({
                      ...newFoodManager,
                      name: e.target.value,
                    })
                  }
                />
                <FormLabel>Phone Number</FormLabel>
                <Input
                  placeholder="Enter phone number"
                  value={newFoodManager.phoneNo}
                  onChange={(e) =>
                    setNewFoodManager({
                      ...newFoodManager,
                      phoneNo: e.target.value,
                    })
                  }
                />
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Enter email"
                  value={newFoodManager.email}
                  onChange={(e) =>
                    setNewFoodManager({
                      ...newFoodManager,
                      email: e.target.value,
                    })
                  }
                />
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="Enter password"
                  value={newFoodManager.password}
                  onChange={(e) =>
                    setNewFoodManager({
                      ...newFoodManager,
                      password: e.target.value,
                    })
                  }
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="green"
                onClick={() => {
                  handleAddFoodManager(newFoodManager);
                }}
              >
                Add
              </Button>
              <Button variant="ghost" onClick={onCloseAddFoodManager}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Confirmation dialog for delete */}
        {isOpenDeleteAlert && (
          <AlertDialog
            isOpen={isOpenDeleteAlert}
            leastDestructiveRef={undefined}
            onClose={onCloseDeleteAlert}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Drink Manager
                </AlertDialogHeader>
                <AlertDialogBody>
                  Are you sure you want to delete this Drink manager? This
                  action cannot be undone.
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button onClick={onCloseDeleteAlert}>Cancel</Button>
                  <Button
                    colorScheme="red"
                    borderRadius="lg"
                    onClick={handleConfirmDelete}
                    ml={3}
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        )}
      </VStack>
    </Box>
  );
}

export default DrinkManagerTable;
