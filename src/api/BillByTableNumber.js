import React, { useState, useEffect } from "react";
import {
  Select,
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
  FormControl,
  FormLabel,
  Tag,
  useDisclosure,
} from "@chakra-ui/react";

function BillByTableNo() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedBill, setSelectedBill] = useState(null);
  const {
    isOpen: isOpenBillModal,
    onOpen: onOpenBillModal,
    onClose: onCloseBillModal,
  } = useDisclosure();

  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    try {
      const response = await fetch(
        "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/client/getAllTables"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTables(data.tables);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  const fetchBillByTableNo = async () => {
    try {
      const response = await fetch(
        "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/superAdmin/getAllBills"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const matchedBill = data.bills.find(
        (bill) => bill.tableNo === selectedTable
      );
      setSelectedBill(matchedBill);
      onOpenBillModal();
    } catch (error) {
      console.error("Error fetching bill data:", error);
    }
  };

  return (
    <Box pt="4">
      <VStack align="stretch" spacing="4">
        <FormControl>
          <FormLabel fontWeight="bold">Select Table Number : </FormLabel>
          <Select
            placeholder="Select table"
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
          >
            {tables.map((table) => (
              <option key={table._id} value={table.tableNo}>
                {table.tableNo}
              </option>
            ))}
          </Select>
        </FormControl>

        <Button
          colorScheme="green"
          onClick={fetchBillByTableNo}
          borderRadius="lg"
        >
          Show Bill
        </Button>

        {isOpenBillModal && (
          <Modal
            isOpen={isOpenBillModal}
            onClose={() => {
              setSelectedBill(null);
              onCloseBillModal();
            }}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Bill Details</ModalHeader>
              <ModalCloseButton />
              {selectedBill ? (
                <ModalBody>
                  {/* Display bill details */}
                  <Box>
                    <Text>
                      <strong>Name:</strong> {selectedBill.name}
                    </Text>
                    <Text>
                      <strong>Table No.:</strong> {selectedBill.tableNo}
                    </Text>
                    <Text>
                      <strong>Phone No. :</strong> {selectedBill.phoneNo}
                    </Text>
                    <Text>
                      <strong>OTP:</strong> {selectedBill.otp}
                    </Text>
                    <Text>
                      <strong>Paid:</strong>{" "}
                      <Tag
                        size="sm"
                        colorScheme={
                          selectedBill.paid === "notPaid" ? "red" : "green"
                        }
                      >
                        {selectedBill.paid}
                      </Tag>
                    </Text>
                    <Text>
                      <strong>Dish Items:</strong>
                    </Text>
                    <ul>
                      {selectedBill.DishItems.map((dish) => (
                        <li key={dish._id}>
                          {dish.name} - ₹{dish.amount}
                        </li>
                      ))}
                    </ul>
                    <Text>
                      <strong>Drink Items:</strong>
                    </Text>
                    <ul>
                      {selectedBill.DrinkItems.map((drink) => (
                        <li key={drink._id}>
                          {drink.name} - ₹{drink.amount}
                        </li>
                      ))}
                    </ul>
                    <Text>
                      <strong>Grand Total:</strong> ₹{selectedBill.grandTotal}
                    </Text>
                    <Text>
                      <strong>Dish Total:</strong> ₹{selectedBill.dishTotal}
                    </Text>
                    <Text>
                      <strong>Drink Total:</strong> ₹{selectedBill.drinkTotal}
                    </Text>
                    <Text>
                      <strong>Date:</strong> {selectedBill.date1}
                    </Text>
                    <Text>
                      <strong>Time:</strong> {selectedBill.time1}
                    </Text>
                  </Box>
                </ModalBody>
              ) : (
                <ModalBody>
                  <Text fontWeight="bold">
                    {" "}
                    No bill generated for Table No: {selectedTable}
                  </Text>
                </ModalBody>
              )}
            </ModalContent>
          </Modal>
        )}
      </VStack>
    </Box>
  );
}

export default BillByTableNo;
