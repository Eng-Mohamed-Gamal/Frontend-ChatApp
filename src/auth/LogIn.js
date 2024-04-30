import React, { useState } from "react";
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
import { commonStyle } from "../commonStyle";
import axios from "axios";
import { useNavigate } from "react-router";

export default function LogIn() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const navigate = useNavigate()
  const toast = useToast();
  const handelClick = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "PLease Fill Out All The Required Inputs",
        isClosable: true,
        status: "error",
        duration: 2000,
        position: "top",
      });
      setLoading(false)
      return;
    }
    try {
      const {data} = await axios.post(
        "http://localhost:3001/user/logIn",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      toast({
        title: "Successful Login Welcome",
        isClosable: true,
        status: "success",
        duration: 3000,
        position: "bottom",
      })
      localStorage.userData = JSON.stringify({user : data.user , token : data.token})
      navigate("Chats")
    } catch (e) {
      toast({
        title: `${e.response.data.error_msg}`,
        isClosable: true,
        status: "error",
        duration: 2000,
        position: "top",
      });
    }
    setLoading(false)
  };
  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <VStack>
      <FormControl isRequired>
        <FormLabel mt={"5px"}>Email Adress</FormLabel>
        <Input
          type={"email"}
          border={commonStyle.border}
          _hover={{
            border : `${commonStyle.border}`
          }}
          focusBorderColor={commonStyle.focusBorderColor}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Please Enter Your Email Adress"
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel mt={"5px"}>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            border={commonStyle.border}
            _hover={{
              border : `${commonStyle.border}`
            }}
            focusBorderColor={commonStyle.focusBorderColor}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Please Enter Your Password"
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
        backgroundColor={commonStyle.tealColor}
        fontSize={commonStyle.mediumFontSize}
        mt={"10px"}
        onClick={handelClick}
      >
        LogIn
      </Button>
    </VStack>
  );
}




