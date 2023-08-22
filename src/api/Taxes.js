import React, { useState, useEffect } from "react";
import {
  VStack,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Text,
  Input,
} from "@chakra-ui/react";

const baseUrl = "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com"; // Replace with your API base URL

function Tax() {
  const [tax, setTax] = useState(null); // Initialize with null
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedTaxes, setUpdatedTaxes] = useState({
    cgst: "",
    sgst: "",
    service_tax: "",
  });

  useEffect(() => {
    // Fetch tax data from the API
    fetch(`${baseUrl}/api/client/getTaxes`)
      .then((response) => response.json())
      .then((data) => setTax(data)) // Assuming data is the tax object
      .catch((error) => console.error("Error fetching taxes:", error));
  }, []);

  const handleAlterClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedTaxes((prevTaxes) => ({
      ...prevTaxes,
      [name]: value,
    }));
  };

  const handleSaveTaxes = () => {
    fetch(`${baseUrl}/api/superAdmin/setTaxes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTaxes),
    })
      .then((response) => response.json())
      .then((data) => {
        setTax(data); // Update the tax object with the updated values
        setIsModalOpen(false);
      })
      .catch((error) => console.error("Error updating taxes:", error));
  };

  return (
    <VStack p="3" align="stretch" spacing="4">
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>
              <Text fontWeight="bold">CGST (%)</Text>
            </Th>
            <Th>
              <Text fontWeight="bold">SGST (%)</Text>
            </Th>
            <Th>
              <Text fontWeight="bold">Tax (%)</Text>
            </Th>
            <Th>
              <Text fontWeight="bold">Actions</Text>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {tax && (
            <Tr>
              <Td>
                <Text fontWeight="bold">{tax.cgst}</Text>
              </Td>
              <Td>
                <Text fontWeight="bold">{tax.sgst}</Text>
              </Td>
              <Td>
                <Text fontWeight="bold">{tax.service_tax}</Text>
              </Td>
              <Td>
                <Button size="sm" colorScheme="blue" onClick={handleAlterClick}>
                  <Text fontWeight="bold">Alter Tax</Text>
                </Button>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      {/* Alter Tax Modal */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontWeight="bold">Alter Taxes</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text>
                <Text fontWeight="bold">CGST:</Text>{" "}
                <Input
                  type="number"
                  name="cgst"
                  value={updatedTaxes.cgst}
                  onChange={handleInputChange}
                />
              </Text>
              <Text>
                <Text fontWeight="bold">SGST:</Text>{" "}
                <Input
                  type="number"
                  name="sgst"
                  value={updatedTaxes.sgst}
                  onChange={handleInputChange}
                />
              </Text>
              <Text>
                <Text fontWeight="bold">Service Tax:</Text>{" "}
                <Input
                  type="number"
                  name="service_tax"
                  value={updatedTaxes.service_tax}
                  onChange={handleInputChange}
                />
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveTaxes}>
              <Text fontWeight="bold">Save</Text>
            </Button>
            <Button colorScheme="red" onClick={handleModalClose}>
              <Text fontWeight="bold">Cancel</Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
}

export default Tax;
