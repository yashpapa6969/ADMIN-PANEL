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

function FetchDrinksCategory() {
  const [tableData, setTableData] = useState([]);
  const [tableToDelete, setTableToDelete] = useState("");
  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onClose: onCloseCreate,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const [tableToCreate, setTableToCreate] = useState({
    tableNo: "",
  });
  const { tableNo } = tableToCreate;
  const [rerender, setRerender] = useState(false); // State to trigger rerendering

  useEffect(() => {
    fetchData();
  }, [rerender]); // Rerender whenever the "rerender" state changes

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/client/getAllDrinksCategories"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setTableData(data.category_d);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch(
        "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/admin/set_drink_category",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            drinksCategory: tableNo,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Update the table data after successful creation
      const createdTableData = await response.json();
      setTableData([...tableData, createdTableData]);
      setTableToCreate({ tableNo: "" }); // Reset the create form input fields
      onCloseCreate(); // Close the create form after successful creation
      setRerender(!rerender); // Toggle the "rerender" state to trigger a rerender after creating the table
    } catch (error) {
      console.error("Error creating table:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/admin/drinksCategory/${tableToDelete}`,
        {
          method: "DELETE",
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Update the table data after successful deletion
      const updatedTableData = tableData.filter(
        (table) => table.drinks_Category_id !== tableToDelete
      );
      setTableData(updatedTableData);
      onCloseDelete(); // Close the delete confirmation modal after successful deletion
    } catch (error) {
      console.error("Error deleting table:", error);
    }
  };

  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Box p="4" shadow="md" borderRadius="md" bg={cardBg} mx="auto">
      <VStack align="stretch" spacing="4">
        <Text fontSize="xl" fontWeight="bold">
          Drink Category List
        </Text>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            {/* Your table headers go here */}
            <Thead>
              <Tr>
                <Th>Drink Category</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData.map((table) => (
                <Tr key={table._id}>
                  {/* Your table data rows go here */}
                  <Td>
                    <strong>{table.drinksCategory}</strong>
                  </Td>

                  <Td>
                    <Button
                      size="sm"
                      colorScheme="red"
                      borderRadius="lg"
                      onClick={() => {
                        setTableToDelete(table.drinks_Category_id);
                        onOpenDelete();
                      }}
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
        <Button
          colorScheme="green"
          borderRadius="lg"
          onClick={() => {
            setTableToCreate({ tableNo: "" });
            onOpenCreate();
          }}
        >
          Create Category
        </Button>

        {/* Create Table Form */}
        <Modal isOpen={isOpenCreate} onClose={onCloseCreate}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Table</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Category Name :</FormLabel>
                <Input
                  type="text"
                  value={tableNo}
                  onChange={(e) =>
                    setTableToCreate({
                      ...tableToCreate,
                      tableNo: e.target.value,
                    })
                  }
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="green" mr={3} onClick={handleCreate}>
                Create
              </Button>
              <Button variant="ghost" onClick={onCloseCreate}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Category</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Are you sure you want to delete the category:</Text>
              <Text fontWeight="bold" mt="2">
                {
                  tableData.find(
                    (table) => table.drinks_Category_id === tableToDelete
                  )?.drinksCategory
                }
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                mr={3}
                onClick={handleDelete}
                borderRadius="lg"
              >
                Confirm Delete
              </Button>
              <Button variant="ghost" onClick={onCloseDelete}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
}

export default FetchDrinksCategory;
