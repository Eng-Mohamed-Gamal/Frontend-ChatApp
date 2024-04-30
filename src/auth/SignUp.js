import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { commonStyle } from "../commonStyle";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const toast = useToast();
  const handelClick = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "PLease Fill Out All The Required Inputs",
        isClosable: true,
        status: "error",
        duration: 2000,
        position: "top",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password Do Not match",
        isClosable: true,
        status: "error",
        duration: 2000,
        position: "top",
      });
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("profile", pic);
      formData.append("userName", name);
      formData.append("email", email);
      formData.append("password", password);
      await axios.post("http://localhost:3001/user", formData);
    } catch (e) {
      toast({
        title: `${e.response.data.error_msg}`,
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
      title: "Create Done Please LogIn To Start",
      isClosable: true,
      status: "success",
      duration: 3000,
      position: "bottom",
    });
  };

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <VStack>
      <FormControl isRequired>
        <FormLabel mt={"5px"}>Name</FormLabel>
        <Input
          type={"text"}
          border={commonStyle.border}
          _hover={{
            border: `${commonStyle.border}`,
          }}
          focusBorderColor={commonStyle.focusBorderColor}
          placeholder="Please Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel mt={"5px"}>Email Adress</FormLabel>
        <Input
          type="email"
          border={commonStyle.border}
          _hover={{
            border: `${commonStyle.border}`,
          }}
          focusBorderColor={commonStyle.focusBorderColor}
          placeholder="Please Enter Your Email Adress"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel mt={"5px"}>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            border={commonStyle.border}
            _hover={{
              border: `${commonStyle.border}`,
            }}
            focusBorderColor={commonStyle.focusBorderColor}
            placeholder="Please Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
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
      <FormControl isRequired>
        <FormLabel mt={"5px"}>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            border={commonStyle.border}
            _hover={{
              border: `${commonStyle.border}`,
            }}
            focusBorderColor={commonStyle.focusBorderColor}
            placeholder="Please Confirm Your Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
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
        <FormLabel mt={"5px"}>Upload Ypur Picture</FormLabel>
        <Input
          border={commonStyle.border}
          _hover={{
            border: `${commonStyle.border}`,
          }}
          type={"file"}
          placeholder="Please Confirm Your Password"
          onChange={(e) => setPic(e.target.files[0])}
          p={"3px"}
        />
      </FormControl>
      <Button
        isLoading={loading}
        width={"100%"}
        backgroundColor={commonStyle.tealColor}
        fontSize={commonStyle.mediumFontSize}
        mt={"10px"}
        onClick={handelClick}
      >
        Submit
      </Button>
    </VStack>
  );
}
