import React, { useEffect, useState } from "react";
import {
  AbsoluteCenter,
  Box,
  Heading,
  Spinner,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

import axios from "axios";
import { baseUrl, getChatingUser, getUser } from "../../Logic";
import { useChatContext } from "../../Context/ChatContext";
import { commonStyle } from "../../commonStyle";

function UserChats() {
  const { chats, setChats, setSelectedChat, fetchAgain, setFetchAgain } =
    useChatContext();
  const [loading, setLoading] = useState(false);
  const userInfo = getUser();
  const toast = useToast();
  const getChats = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${baseUrl}/chat`, {
        headers: { accesstoken: userInfo.token },
      });
      setLoading(false);
      setChats(data.chats);
    } catch (e) {
      setLoading(false);
      toast({
        title: `${e.message} Please Wait Or Refresh`,
        isClosable: true,
        status: "info",
        duration: 2000,
        position: "top",
      });
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
          const chatingUser = getChatingUser(chat?.users, userInfo.user._id).userName;
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
                setFetchAgain(!fetchAgain);
                setSelectedChat(chat);
              }}
            >
              <Text>{chatingUser}</Text>
              <Text>
                {chat.latestMessage?.sender?._id === userInfo.user._id
                  ? "You"
                  : chat.latestMessage?.sender?.userName}{" "}
                {chat.latestMessage ? ":" : ""} {chat.latestMessage?.content}
              </Text>
            </Box>
          );
        })
      )}
    </VStack>
  );
}

export default UserChats;
