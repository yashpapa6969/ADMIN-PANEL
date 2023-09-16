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
  Box,
  Flex,
} from "@chakra-ui/react";
import { TEST_URL } from "./URL";
import MemberUpdateForm from "./MemberUpdateForm";

const baseUrl = TEST_URL; // Replace with your API base URL

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
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);

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
  const handleEditClick = (member) => {
    setSelectedMember(member);
    setIsUpdateFormOpen(true);
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
      <Box display="flex" justifyContent="center">
        <Button
          colorScheme="green"
          borderRadius="lg"
          onClick={handleCreateMember}
        >
          Create Member
        </Button>
      </Box>

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
        <Box display="flex">
          <Button
            colorScheme="red"
            onClick={() => setIsDeleteModalOpen(true)}
            borderRadius="lg"
          >
            Delete Member by Member ID
          </Button>
        </Box>
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
                borderRadius="lg"
                disabled={!memberIdToDelete}
              >
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>

      <Box overflowX="auto">
        <Table variant="striped" colorScheme="teal" size="md">
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
                  <Spinner size="lg" color="teal.500" />
                </Td>
              </Tr>
            ) : (
              members.map((member, index) => (
                <Tr key={member._id}>
                  <Td>{index + 1}</Td>
                  <Td>{member.membership_id}</Td>
                  <Td>{member.name}</Td>
                  <Td>{member.phoneNo}</Td>
                  <Td>{member.status}</Td>
                  <Td>
                    <Flex direction="row" gap="5px">
                      <Button
                        colorScheme="blue"
                        size="sm"
                        borderRadius="lg"
                        onClick={() => handleMoreInfoClick(member)}
                      >
                        More Info
                      </Button>
                      <Button
                        colorScheme="purple"
                        size="sm"
                        borderRadius="lg"
                        onClick={() => handleEditClick(member)}
                      >
                        Edit
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>

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

            {isUpdateFormOpen && (
              <MemberUpdateForm
                isOpen={isUpdateFormOpen}
                onClose={() => setIsUpdateFormOpen(false)}
                member={selectedMember}
                onUpdate={fetchMembers} // Refresh member data after updating
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
}

export default Members;
