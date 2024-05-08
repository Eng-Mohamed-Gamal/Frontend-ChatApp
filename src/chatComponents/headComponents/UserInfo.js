import React from "react";
import {
  Box,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import LogOut from "./LogOut";
import UpdateUser from "./UpdateUser";
import { getUser } from "../../Logic";
import { LazyLoadImage } from "react-lazy-load-image-component";

function UserInfo() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userInfo = getUser();

  return (
    <Box>
      <Button onClick={onOpen} colorScheme="teal">
        <i className="fa-solid fa-gear"></i>
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={{ base: "xs", sm: "sm", lg: "lg" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>About You</ModalHeader>
          <ModalBody
            display="flex"
            alignItems="center"
            flexDirection="column"
            textAlign={{ base: "center", sm: "start" }}
            gap={2}
          >
            <LazyLoadImage
              className="lazyImage"
              src={
                userInfo.user?.profilePic?.secure_url || userInfo.user?.baseSrc
              }
              width="160px"
              height="160px"
              effect="blur"
              useIntersectionObserver={true}
            />
            <Text size="md">UserName : {userInfo.user?.userName}</Text>
            <Text size="md">Email : {userInfo.user?.email}</Text>
            <UpdateUser />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Close
            </Button>
            <LogOut />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default UserInfo;
