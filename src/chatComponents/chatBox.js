import {
  AbsoluteCenter,
  Box,
  Button,
  Heading,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useChatContext } from "../Context/ChatContext";
import { getSender, getUser, validateMessage } from "../Logic";
import { commonStyle } from "../commonStyle";
import axios from "axios";

/* 
*               <AbsoluteCenter axis="both">
                <Spinner color={commonStyle.focusBorderColor} size={"xl"} />
              </AbsoluteCenter>
*/

function ChatBox() {
  const { selectedChat, messages, setMessages } = useChatContext();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState();
  const userInfo = getUser();
  const inputRef = useRef();
  const toat = useToast();
  if (selectedChat)
    var sender = getSender(selectedChat.users, userInfo.user._id);

  const handleChating = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `http://localhost:3001/message/getAllMessages`,
        { chatId: selectedChat._id },
        { headers: { accesstoken: userInfo.token } }
      );
      setLoading(false);
      setMessages(data.messages);
    } catch (e) {
      console.log(e);
    }
    return;
  };

  const sendMessage = async () => {
    if (!selectedChat) return;
    if (content === undefined || validateMessage(content)) {
      toat({
        title: "Donot Try To Send A Empty Message",
        status: "warning",
        isClosable: true,
        duration: 3000,
        position: "top",
      });
      return;
    }

    try {
      inputRef.current.value = "";
      const { data } = await axios.post(
        `http://localhost:3001/message`,
        { chatId: selectedChat._id, content },
        { headers: { accesstoken: userInfo.token } }
      );
      setMessages([...messages, data.detailsMessage]);
    } catch (e) {}
  };

  useEffect(() => {
    handleChating();
  }, [selectedChat]);

  return (
    <Box
      w={"100%"}
      h={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {selectedChat ? (
        <Box
          backgroundColor={"white"}
          w={"96%"}
          h={"96%"}
          borderRadius={"10px"}
          display={"flex"}
          flexDirection={"column"}
          p={"10px"}
        >
          <Box>
            <Button colorScheme="teal">
              <i className="fa-regular fa-eye"></i>
            </Button>
          </Box>
          <Box
            h={"85%"}
            m={"5px 0px"}
            display={"flex"}
            flexDirection={"column"}
            border={commonStyle.border}
            borderRadius={"10px"}
            position={"relative"}
            overflowY={"auto"}
          >
            {messages &&
              messages.map((message) => {
                return (
                  <Text
                    key={message._id}
                    backgroundColor={"teal.500"}
                    m={"5px 10px"}
                    w={"fit-content"}
                    maxW={"80%"}
                    p={"3px 8px"}
                    borderRadius={"10px"}
                    color={commonStyle.mainFontColor}
                  >
                    {message.content}
                  </Text>
                );
              })}
          </Box>
          <Box
            display={"flex"}
            gap={2}
            justifyContent={"space-between"}
            w={"100%"}
          >
            <Input
              type={"text"}
              border={commonStyle.border}
              placeholder={"Type Here"}
              _hover={{
                border: `${commonStyle.border}`,
              }}
              ref={inputRef}
              focusBorderColor={commonStyle.focusBorderColor}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button colorScheme="teal" onClick={sendMessage}>
              {" "}
              Send
            </Button>
          </Box>
        </Box>
      ) : (
        <Heading size={"md"}>Click On Chat To Start Chating</Heading>
      )}
    </Box>
  );
}

export default ChatBox;
