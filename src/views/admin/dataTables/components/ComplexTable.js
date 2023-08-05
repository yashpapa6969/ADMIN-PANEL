import React, { useEffect, useState } from "react";
import {
  Flex,
  Table,
  Progress,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

export default function ColumnsTable(props) {
  const { columnsData } = props;

  const [tableData, setTableData] = useState([]);

  // Function to fetch the API data
 
   console.log("first");
  useEffect(() => {
    fetchTableData();
  }, []); // The empty dependency array ensures this effect runs only once
   const fetchTableData = async () => {
     try {
      console.log("IN");
       const response = await fetch(
         "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/client/getAllTables"
       );
       const data = await response.json();
       console.log(data.tables)
       setTableData(data.tables);
     } catch (error) {
       console.error("Error fetching table data:", error);
     }
   };
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    console.log("first");
  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Complex Table
        </Text>
        <Menu />
      </Flex>
      <Table variant="simple" color="gray.500" mb="24px">
        <Thead>
          {columnsData.map((column, index) => (
            <Tr key={index}>
              <Th pe="10px" borderColor={borderColor}>
                <Flex
                  justify="space-between"
                  align="center"
                  fontSize={{ sm: "10px", lg: "12px" }}
                  color="gray.400"
                  direction="row"
                >
                  {column.tableNo}
                </Flex>
              </Th>
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {/* {tableData.map((table, index) => (
           
                  
               
              
          ))} */}
        </Tbody>
      </Table>
    </Card>
  );
}
