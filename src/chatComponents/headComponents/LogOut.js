import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useRef  } from "react";
import {useNavigate} from "react-router-dom"
function LogOut() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const navigate = useNavigate()
  const toast = useToast()
  const handleClick = () => {
    localStorage.removeItem("userData")
    navigate("/")
    toast({
        title : "LogOut Done ComeBack Soon" ,
        position : "top" ,
        isClosable : true ,
        duration : 3000 ,
        status : "info"
    })
  }
  return (
    <Box>
      <Button onClick={onOpen} colorScheme="red">
        LogOut
      </Button>
      <AlertDialog
        motionPreset="slideInRight"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        size={{ base: "xs", sm: "sm" , lg : "lg" }}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Wanna LogOut ?</AlertDialogHeader>
          <AlertDialogBody>
            You Must LogIn Again To Enter Your Account
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} colorScheme="teal">
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleClick}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
}

export default LogOut;
