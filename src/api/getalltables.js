import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Text,
  Center,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

function FetchTableData() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
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

    fetchData();
  }, []);

  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Box p="4" shadow="md" borderRadius="md" bg={cardBg}>
      <VStack align="stretch" spacing="4">
        <Text fontSize="xl" fontWeight="bold">
          Table Order Information
        </Text>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            
            <Thead>
              <Tr>
                <Th>TABLE NUMBER</Th>
                <Th>ACTIVE</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData.map((table) => (
                <Tr key={table._id}>
                  <Td>{table.tableNo}</Td>
                  <Td>{table.active}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Box>
  );
}

export default FetchTableData;
