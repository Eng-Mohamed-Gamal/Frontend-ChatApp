import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { commonStyle } from "../../commonStyle";
import axios from "axios";
import { baseUrl, getUser } from "../../Logic";

function UpdateUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [loading, setLoading] = useState(false);
  const [picLoading, setPicLoading] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const toast = useToast();
  const userInfo = getUser();

  const handelClick = async () => {
    if(!name && !email && !oldPassword && !newPassword){
      toast({
        title: `Update At Least One Field`,
        isClosable: true,
        status: "error",
        duration: 2000,
        position: "top",
      });
      return
    }
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${baseUrl}/user`,
        {
          userName: name,
          email,
          oldPassword,
          newPassword,
        },
        {
          headers: { accesstoken: userInfo.token },
        }
      );
      userInfo.user = data.user;
      localStorage.userData = JSON.stringify(userInfo);
    } catch (e) {
      toast({
        title: e.response.data.error_msg || e.response.data.errors,
        isClosable: true,
        status: "error",
        duration: 2000,
        position: "top",
      });
      setLoading(false);
      return;
    }
    setLoading(false);
    toast({
      title: "Update Done",
      isClosable: true,
      status: "success",
      duration: 3000,
      position: "bottom",
    });
  };
  const handelUplaod = async () => {
    if(!pic){
      toast({
        title: `Select Image`,
        isClosable: true,
        status: "error",
        duration: 2000,
        position: "top",
      });
      return
    }
    setPicLoading(true);
    const formData = new FormData();
    formData.append("profile", pic);
    formData.append("oldPublicId", userInfo?.user?.profilePic?.puplic_id);
    try {
      const { data } = await axios.post(
        `${baseUrl}/user/uploadProfilePic`,
        formData,
        {
          headers: { accesstoken: userInfo.token },
        }
      );
      userInfo.user = data.user;
      localStorage.userData = JSON.stringify(userInfo);
    } catch (e) {
      toast({
        title: `${e.response.data.error_msg}`,
        isClosable: true,
        status: "error",
        duration: 2000,
        position: "top",
      });
      setPicLoading(false);
      return;
    }
    setPicLoading(false);
    toast({
      title: "Upload Done",
      isClosable: true,
      status: "success",
      duration: 3000,
      position: "top",
    });
  };
  const toggleShow = () => {
    setShow(!show);
  };
  return (
    <Box>
      <Button gap={2} ref={btnRef} onClick={onOpen} colorScheme="teal">
        <i className="fa-regular fa-pen-to-square"></i>
        <Text>Update Your Account</Text>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader alignSelf={"center"}>Update Your Account</DrawerHeader>
          <hr />
          <DrawerBody>
            <Tabs
              isFitted
              isLazy
              variant={"soft-rounded"}
              paddingTop={"10px"}
              colorScheme="teal"
            >
              <TabList mb={"20px"} p={"0 10px"}>
                <Tab fontWeight={"900"}>Account Data</Tab>
                <Tab fontWeight={"900"}>profilePic</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <FormControl>
                    <FormLabel mt={"5px"}>Name</FormLabel>
                    <Input
                      type={"text"}
                      variant={"filled"}
                      border={commonStyle.border}
                      _hover={{
                        border: `${commonStyle.border}`,
                      }}
                      placeholder="Please Enter Your Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel mt={"5px"}>Email Adress</FormLabel>
                    <Input
                      type={"email"}
                      variant={"filled"}
                      border={commonStyle.border}
                      _hover={{
                        border: `${commonStyle.border}`,
                      }}
                      placeholder="Please Enter Your Email Adress"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel mt={"5px"}>Old Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={show ? "text" : "password"}
                        variant={"filled"}
                        border={commonStyle.border}
                        _hover={{
                          border: `${commonStyle.border}`,
                        }}
                        placeholder="Please Enter Your Password"
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                      <InputRightElement>
                        <Button
                          size={"ms"}
                          p={"4px"}
                          backgroundColor={commonStyle.tealColor}
                          mr={"20px"}
                          onClick={toggleShow}
                        >
                          {show ? "hide" : "show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel mt={"5px"}>New Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={show ? "text" : "password"}
                        variant={"filled"}
                        border={commonStyle.border}
                        _hover={{
                          border: `${commonStyle.border}`,
                        }}
                        placeholder="Please Enter Your New Password"
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <InputRightElement>
                        <Button
                          size={"ms"}
                          p={"4px"}
                          backgroundColor={commonStyle.tealColor}
                          mr={"20px"}
                          onClick={toggleShow}
                        >
                          {show ? "hide" : "show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Button
                    isLoading={loading}
                    width={"100%"}
                    colorScheme="teal"
                    fontSize={commonStyle.mediumFontSize}
                    mt={"10px"}
                    onClick={handelClick}
                  >
                    Update
                  </Button>
                </TabPanel>
                <TabPanel>
                  <FormControl>
                    <FormLabel mt={"5px"}>Change Your Picture</FormLabel>
                    <Input
                      variant={"filled"}
                      type={"file"}
                      border={commonStyle.border}
                      _hover={{
                        border: `${commonStyle.border}`,
                      }}
                      placeholder="Please Confirm Your Password"
                      onChange={(e) => setPic(e.target.files[0])}
                      p={"3px"}
                    />
                  </FormControl>
                  <Button
                    isLoading={picLoading}
                    width={"100%"}
                    colorScheme="teal"
                    fontSize={commonStyle.mediumFontSize}
                    mt={"10px"}
                    onClick={handelUplaod}
                  >
                    Uplaod Image
                  </Button>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default UpdateUser;
