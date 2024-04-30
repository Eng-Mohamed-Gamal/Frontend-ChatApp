import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useTypewriter } from "react-simple-typewriter";
import LogIn from "../auth/LogIn";
import SignUp from "../auth/SignUp";
import { commonStyle } from "../commonStyle";


export default function Home() {
  const [text] = useTypewriter({
    words: ["LIVE-CHAT", "MERN-Development"],
    loop: {},
  });

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.userData) navigate("Chats") 
  }, [navigate]);

  return (
    <Container
      maxW={{ base: "95%", lg: "75%", xl: "65%" }}
      centerContent
      display={"flex"}
      minHeight={"100vh"}
      justifyContent={"center"}
      gap={"20px"}
    >
      <Box
        backgroundColor={commonStyle.mainBgColor}
        width={"100%"}
        height={"70px"}
        borderRadius={"10px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"20px"}
      >
        <Text
          color={"3b3b3b"}
          textAlign={"center"}
          fontSize={commonStyle.titleFontSize}
          fontWeight={"bold"}
        >
          {text}
        </Text>
      </Box>
      <Box
        width={"100%"}
        backgroundColor={commonStyle.mainBgColor}
        borderRadius={"10px"}
      >
        <Tabs isFitted isLazy variant={"soft-rounded"} paddingTop={"10px"} colorScheme="teal"  >
          <TabList mb={"20px"} p={"0 10px"}>
            <Tab
              fontWeight={"900"}
            >
              LogIn
            </Tab>
            <Tab  fontWeight={"900"}>
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LogIn />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
