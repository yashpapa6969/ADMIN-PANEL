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
import { TEST_URL } from "./URL";

function BillByTableNo() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedBills, setSelectedBills] = useState([]);
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
      const response = await fetch(`${TEST_URL}/api/client/getAllTables`);
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
      const response = await fetch(`${TEST_URL}/api/superAdmin/getAllBills`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const matchedBills = data.bills.filter(
        (bill) => bill.tableNo === selectedTable
      );
      setSelectedBills(matchedBills);
      onOpenBillModal();
    } catch (error) {
      console.error("Error fetching bill data:", error);
    }
  };

  return (
    <Box pt="4">
      <VStack align="stretch" spacing="4">
        <FormControl>
          <FormLabel fontWeight="bold">Select Table Number :</FormLabel>
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
              setSelectedBills([]);
              onCloseBillModal();
            }}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Bill Details</ModalHeader>
              <ModalCloseButton />
              {selectedBills.length > 0 ? (
                <ModalBody>
                  {selectedBills.map((selectedBill) => (
                    <Box key={selectedBill._id}>
                      <Text>
                        <strong>Name:</strong>{" "}
                        <strong>{selectedBill.name}</strong>
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
                        <strong>Food Bill Paid:</strong>{" "}
                        <Tag
                          size="sm"
                          colorScheme={
                            selectedBill.foodBillpaid === "notPaid"
                              ? "red"
                              : "green"
                          }
                        >
                          {selectedBill.foodBillpaid}
                        </Tag>
                      </Text>
                      <Text>
                        <strong>Drink Bill Paid:</strong>{" "}
                        <Tag
                          size="sm"
                          colorScheme={
                            selectedBill.drinkBillpaid === "notPaid"
                              ? "red"
                              : "green"
                          }
                        >
                          {selectedBill.drinkBillpaid}
                        </Tag>
                      </Text>
                      <Text>
                        <strong>Dish Items:</strong>
                      </Text>
                      <ul>
                        {selectedBill.DishItems.map((dish) => (
                          <li key={dish._id}>
                            {dish.name} ({dish.quantity})- ₹{dish.amount}
                          </li>
                        ))}
                      </ul>
                      <Text>
                        <strong>Drink Items:</strong>
                      </Text>
                      <ul>
                        {selectedBill.DrinkItems.map((drink) => (
                          <li key={drink._id}>
                            {drink.name} ({drink.quantity})- ₹{drink.amount}
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
                        <strong>Donation Amount:</strong> ₹
                        {selectedBill.donationAmount}
                      </Text>
                      <Text>
                        <strong>Cleared Bill:</strong>{" "}
                        {selectedBill.clear === "0"
                          ? "Not Cleared"
                          : selectedBill.clear === "1"
                          ? "Cleared"
                          : "Unknown"}
                      </Text>
                      <Text>
                        <strong>CGST:</strong> {selectedBill.cgst}
                      </Text>
                      <Text>
                        <strong>SGST:</strong> {selectedBill.sgst}
                      </Text>
                      <Text>
                        <strong>Service Tax:</strong> {selectedBill.service_tax}
                      </Text>
                      <Text>
                        <strong>Date:</strong> {selectedBill.date1}
                      </Text>
                      <Text>
                        <strong>Time:</strong> {selectedBill.time1}
                      </Text>
                    </Box>
                  ))}
                </ModalBody>
              ) : (
                <ModalBody>
                  <Text fontWeight="bold">
                    No bills generated for Table No: {selectedTable}
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
