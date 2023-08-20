import React, { useState, useEffect } from "react";
import {
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Button,
  Input,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

const baseUrl = "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com"; // Replace with your API base URL

function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMember, setNewMember] = useState({
    Address: "",
    membership_id: "",
    name: "",
    phoneNo: "",
    status: "Active",
  });
  const [selectedMember, setSelectedMember] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [memberIdToDelete, setMemberIdToDelete] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = () => {
    setLoading(true);
    fetch(`${baseUrl}/api/client/getAllMembers`)
      .then((response) => response.json())
      .then((data) => {
        setMembers(data.members); // Corrected field name to "members"
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
        setLoading(false);
      });
  };

  const handleCreateMember = () => {
    setNewMember({
      Address: "",
      membership_id: "",
      name: "",
      phoneNo: "",
      status: "Active",
    });
    setIsCreateModalOpen(true);
  };

  const handleCreate = () => {
    setLoading(true);
    fetch(`${baseUrl}/api/superAdmin/SetMembers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMember),
    })
      .then((response) => response.json())
      .then(() => {
        fetchMembers();
        setLoading(false);
        setIsCreateModalOpen(false);
      })
      .catch((error) => {
        console.error("Error creating member:", error);
        setLoading(false);
      });
  };

  const handleMoreInfoClick = (member) => {
    setSelectedMember(member);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      fetch(`${baseUrl}/api/superAdmin/DeleteMemberById/${memberIdToDelete}`, {
        method: "DELETE",
      })
        .then(() => {
          fetchMembers();
          setIsDeleteModalOpen(false);
          setMemberIdToDelete("");
        })
        .catch((error) => {
          console.error("Error deleting member:", error);
        });
    }
  };

  return (
    <VStack p="3" align="stretch" spacing="4">
      <Text fontSize="xl" fontWeight="bold">
        Members List
      </Text>
      <Button colorScheme="green" onClick={handleCreateMember}>
        Create Member
      </Button>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Member</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="start" spacing="2">
              <Input
                placeholder="Postal Address"
                value={newMember.Address}
                onChange={(e) =>
                  setNewMember({ ...newMember, Address: e.target.value })
                }
              />
              <Input
                placeholder="Member ID"
                value={newMember.membership_id}
                onChange={(e) =>
                  setNewMember({ ...newMember, membership_id: e.target.value })
                }
              />
              <Input
                placeholder="Members Name"
                value={newMember.name}
                onChange={(e) =>
                  setNewMember({ ...newMember, name: e.target.value })
                }
              />
              <Input
                placeholder="Mobile Number"
                value={newMember.phoneNo}
                onChange={(e) =>
                  setNewMember({ ...newMember, phoneNo: e.target.value })
                }
              />
              <Input placeholder="Status" value={newMember.status} readOnly />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={handleCreate}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <VStack>
        <Button colorScheme="red" onClick={() => setIsDeleteModalOpen(true)}>
          Delete Member by Member ID
        </Button>
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setMemberIdToDelete("");
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Member by Member ID</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                placeholder="Member ID"
                value={memberIdToDelete}
                onChange={(e) => setMemberIdToDelete(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                onClick={handleDelete}
                disabled={!memberIdToDelete}
              >
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>

      <Table variant="striped" colorScheme="teal" overflowX="auto">
        <Thead>
          <Tr>
            <Th>SL No</Th>
            <Th>Member ID</Th>
            <Th>Members Name</Th>
            <Th>Mobile Number</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <Tr>
              <Td colSpan="6" textAlign="center">
                <Spinner size="lg" color="blue.500" />
              </Td>
            </Tr>
          ) : (
            members.map((member, index) => (
              <Tr key={member._id}>
                <Td>
                  <strong>{index + 1}</strong>
                </Td>
                <Td>
                  <strong>{member.membership_id}</strong>
                </Td>
                <Td>
                  <strong>{member.name}</strong>
                </Td>
                <Td>
                  <strong>{member.phoneNo}</strong>
                </Td>
                <Td>
                  <strong>{member.status}</strong>
                </Td>
                <Td>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleMoreInfoClick(member)}
                  >
                    More Info
                  </Button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      <Modal
        isOpen={selectedMember !== null}
        onClose={() => setSelectedMember(null)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Member Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedMember && (
              <VStack align="start" spacing="2">
                <Text>
                  <strong>Postal Address:</strong> {selectedMember.Address}
                </Text>
                <Text>
                  <strong>Member ID:</strong> {selectedMember.membership_id}
                </Text>
                <Text>
                  <strong>Members Name:</strong> {selectedMember.name}
                </Text>
                <Text>
                  <strong>Mobile Number:</strong> {selectedMember.phoneNo}
                </Text>
                <Text>
                  <strong>Status:</strong> {selectedMember.status}
                </Text>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
}

export default Members;
