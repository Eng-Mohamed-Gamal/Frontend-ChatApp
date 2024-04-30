import React, { useEffect, useState } from "react";
import {
  AbsoluteCenter,
  Box,
  Heading,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";

import axios from "axios";
import { getSender, getUser } from "../../Logic";
import { useChatContext } from "../../Context/ChatContext";
import { commonStyle } from "../../commonStyle";

function UserChats() {
  const { chats, setChats, setSelectedChat } = useChatContext();
  const [loading, setLoading] = useState(false);
  const userInfo = getUser();
  const getChats = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:3001/chat`, {
        headers: { accesstoken: userInfo.token },
      });
      setLoading(false);
      setChats(data.chats);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getChats();
  }, []);
  return (
    <VStack p={"20px"} align={"start"}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        w={"100%"}
      >
        <Heading size={"md"}>My Chats</Heading>
      </Box>
      {chats && loading ? (
        <AbsoluteCenter axis="both">
          <Spinner color={commonStyle.focusBorderColor} size={"xl"} />
        </AbsoluteCenter>
      ) : (
        chats.map((chat) => {
          const sender = getSender(chat?.users, userInfo.user._id).userName;
          return (
            <Box
              key={chat._id}
              backgroundColor={"teal.500"}
              color={commonStyle.mainFontColor}
              fontWeight={"bold"}
              w={"100%"}
              p={"15px"}
              borderRadius={"10px"}
              cursor={"pointer"}
              onClick={() => {
                setSelectedChat(chat);
              }}
            >
              <Text>{sender}</Text>
            </Box>
          );
        })
      )}
    </VStack>
  );
}

export default UserChats;
