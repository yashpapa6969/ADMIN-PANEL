import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Button,
  Input,
  FormLabel,
  Select
} from "@chakra-ui/react";
import { TEST_URL } from "./URL";

function BillUpdateForm({ isOpen, onClose, bill, onUpdate }) {
  const [updatedBill, setUpdatedBill] = useState({ ...bill });

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `https://1cxmul59q5.execute-api.ap-south-1.amazonaws.com/api/admin/updateBillById/${bill.bills_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBill),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Call the onUpdate callback to refresh the bill data
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating bill:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBill({ ...updatedBill, [name]: value });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Bill</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <strong>Name :</strong>
            <Input
              name="name"
              value={updatedBill.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <strong>Phone Number :</strong>
            <Input
              name="phoneNo"
              value={updatedBill.phoneNo}
              onChange={handleChange}
              placeholder="Phone No."
            />
            <strong>Table Number :</strong>
            <Input
              name="tableNo"
              value={updatedBill.tableNo}
              onChange={handleChange}
              placeholder="Table No."
            />
            <strong>OTP :</strong>
            <Input
              name="otp"
              value={updatedBill.otp}
              onChange={handleChange}
              placeholder="Table No."
            />
            <strong>Food Bill Paid :</strong>
            <Select
              name="foodBillpaid"
              value={updatedBill.foodBillpaid}
              onChange={handleChange}
              
            >
              <option value="Paid">Paid</option>
              <option value="notPaid">Not Paid</option>
            </Select>

            <strong>Drink Bill Paid :</strong>
            <Select
              name="drinkBillpaid"
              value={updatedBill.drinkBillpaid}
              onChange={handleChange}
              
            >
              <option value="Paid">Paid</option>
              <option value="notPaid">Not Paid</option>
            </Select>
            <strong>Donation Amount :</strong>
            <Input
              name="donationAmount"
              value={updatedBill.donationAmount}
              onChange={handleChange}
              placeholder="Table No."
            />
            <strong>Membership ID :</strong>
            <Input
              name="membership_id"
              value={updatedBill.membership_id}
              onChange={handleChange}
              placeholder="Table No."
            />
            <strong>Grand Total :</strong>
            <Input
              name="grandTotal"
              value={updatedBill.grandTotal}
              onChange={handleChange}
              placeholder="Grand Total"
            />
            <strong>Dish Total :</strong>
            <Input
              name="dishTotal"
              value={updatedBill.dishTotal}
              onChange={handleChange}
              placeholder="Dish Total"
            />
            <strong>Drink Total :</strong>
            <Input
              name="drinkTotal"
              value={updatedBill.drinkTotal}
              onChange={handleChange}
              placeholder="Drink Total"
            />
            <strong>CGST :</strong>
            <Input
              name="cgst"
              value={updatedBill.cgst}
              onChange={handleChange}
              placeholder="CGST"
            />
            <strong>SGST :</strong>
            <Input
              name="sgst"
              value={updatedBill.sgst}
              onChange={handleChange}
              placeholder="SGST"
            />
            <strong>Service Tax :</strong>
            <Input
              name="service_tax"
              value={updatedBill.service_tax}
              onChange={handleChange}
              placeholder="Service Tax"
            />
          </Box>
          <Button colorScheme="purple" onClick={handleUpdate}>
            Update
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default BillUpdateForm;
