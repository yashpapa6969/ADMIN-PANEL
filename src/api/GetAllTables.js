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
  Select,
  useDisclosure,
} from "@chakra-ui/react";

function FetchTableData() {
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
    active: "yes",
    maxPeople: "",
  });
  const { tableNo, active, maxPeople } = tableToCreate;
  const [rerender, setRerender] = useState(false); // State to trigger rerendering

  useEffect(() => {
    fetchData();
  }, [rerender]); // Rerender whenever the "rerender" state changes

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/client/getAllTables"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setTableData(data.tables);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch(
        "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/admin/setTable",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tableNo,
            active,
            maxPeople,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Update the table data after successful creation
      const createdTableData = await response.json();
      setTableData([...tableData, createdTableData]);
      setTableToCreate({ tableNo: "", active: "yes", maxPeople: "" }); // Reset the create form input fields
      onCloseCreate(); // Close the create form after successful creation
      setRerender(!rerender); // Toggle the "rerender" state to trigger a rerender after creating the table
    } catch (error) {
      console.error("Error creating table:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/admin/tables/${tableToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Update the table data after successful deletion
      const updatedTableData = tableData.filter(
        (table) => table.tableNo !== tableToDelete
      );
      setTableData(updatedTableData);
      onCloseDelete(); // Close the delete confirmation modal after successful deletion
    } catch (error) {
      console.error("Error deleting table:", error);
    }
  };

  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Box p="3" shadow="md" borderRadius="md" bg={cardBg} mx="auto">
      <VStack align="stretch" spacing="4">
        <Text fontSize="xl" fontWeight="bold">
          Table Order Information
        </Text>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            {/* Your table headers go here */}
            <Thead>
              <Tr>
                <Th>Table No.</Th>
                <Th>Active</Th>
                <Th>Max people</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData.map((table) => (
                <Tr key={table._id}>
                  {/* Your table data rows go here */}
                  <Td>
                    <strong>{table.tableNo}</strong>
                  </Td>

                  <Td>
                    <Text
                      fontWeight={table.active === "true" ? "bold" : "bold"}
                      color={table.active === "true" ? "green.500" : "red.500"}
                    >
                      {table.active === "true" ? "Yes" : "No"}
                    </Text>
                  </Td>
                  <Td>
                    <strong>{table.maxPeople}</strong>
                  </Td>
                  <Td>
                    <Button
                      size="sm"
                      borderRadius="lg"
                      colorScheme="red"
                      onClick={() => {
                        setTableToDelete(table.tableNo);
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
            setTableToCreate({ tableNo: "", active: "yes", maxPeople: "" });
            onOpenCreate();
          }}
        >
          Create Table
        </Button>

        {/* Create Table Form */}
        <Modal isOpen={isOpenCreate} onClose={onCloseCreate}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Table</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Table Number:</FormLabel>
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
              <FormControl>
                <FormLabel>Max People:</FormLabel>
                <Input
                  type="text"
                  value={maxPeople}
                  onChange={(e) =>
                    setTableToCreate({
                      ...tableToCreate,
                      maxPeople: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl mt="4">
                <FormLabel>Active:</FormLabel>
                <Select
                  value={active}
                  onChange={(e) =>
                    setTableToCreate({
                      ...tableToCreate,
                      active: e.target.value,
                    })
                  }
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Select>
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
            <ModalHeader>Delete Table</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                Are you sure you want to delete the table with Table Number:
              </Text>
              <Text fontWeight="bold" color="black" mt="2">
                {tableToDelete}
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

export default FetchTableData;
