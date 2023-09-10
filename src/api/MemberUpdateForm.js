import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  Button,
} from "@chakra-ui/react";
import { TEST_URL } from "./URL";

function MemberUpdateForm({ isOpen, onClose, member, onUpdate }) {
  const [updatedMember, setUpdatedMember] = useState(member || {});
  const baseUrl = TEST_URL; // Replace with your API base URL

  const handleUpdate = () => {
    // Call the API to update the member here
    fetch(`${baseUrl}/api/admin/updateMemberById/${updatedMember.membership_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMember),
    })
      .then((response) => response.json())
      .then(() => {
        onUpdate();
        onClose();
      })
      .catch((error) => {
        console.error("Error updating member:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMember({ ...updatedMember, [name]: value });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Member</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="start" spacing="2">
            <strong>Name :</strong>
            <Input
              name="name"
              value={updatedMember.name || ""}
              onChange={handleChange}
              placeholder="Members Name"
            />
            <strong>Address :</strong>
            <Input
              name="Address"
              value={updatedMember.Address || ""}
              onChange={handleChange}
              placeholder="Postal Address"
            />{" "}
            <strong>Member ID :</strong>
            <Input
              name="membership_id"
              value={updatedMember.membership_id || ""}
              onChange={handleChange}
              placeholder="Member ID"
            />
            <strong>Phone Number :</strong>
            <Input
              name="phoneNo"
              value={updatedMember.phoneNo || ""}
              onChange={handleChange}
              placeholder="Mobile Number"
            />
            <strong>Status :</strong>
            <Input
              name="status"
              value={updatedMember.status || ""}
              onChange={handleChange}
              placeholder="Status"
            />
          </VStack>
        </ModalBody>
        <Button colorScheme="purple" onClick={handleUpdate}>
          Edit
        </Button>
      </ModalContent>
    </Modal>
  );
}

export default MemberUpdateForm;
