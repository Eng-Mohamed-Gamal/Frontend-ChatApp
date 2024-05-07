import {
  AbsoluteCenter,
  Box,
  Button,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useChatContext } from "../../Context/ChatContext";
import {
  baseUrl,
  getChatingUser,
  getUser,
  messagesPosition,
  validateMessage,
} from "../../Logic";
import { commonStyle } from "../../commonStyle";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io(baseUrl);


function ChatBox() {
  const { selectedChat, messages, setMessages, fetchAgain } = useChatContext();
  const [content, setContent] = useState();
  const [loading, setLoading] = useState();
  const userInfo = getUser();
  const inputRef = useRef();
  const boxRef = useRef();
  const tosat = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (selectedChat)
    var chatingUser = getChatingUser(selectedChat.users, userInfo.user._id);

  useEffect(() => {
    socket.emit("setup", userInfo.user);
    socket.on("message recieved", (msg) => {
      setMessages((oldMessages) => [...oldMessages, msg]);
    });
  }, []);

  useEffect(() => {
    handleStartChating();
  }, [selectedChat, fetchAgain]);

  const handleStartChating = async () => {
    if (!selectedChat) return;
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${baseUrl}/message/getAllMessages`,
        { chatId: selectedChat._id },
        { headers: { accesstoken: userInfo.token } }
      );
      setMessages(data.messages);
      socket.emit("join chat", selectedChat._id);
      setLoading(false);
    } catch (e) {}
    return;
  };

  const sendMessage = async () => {
    if (!selectedChat) return;
    if (content === undefined || validateMessage(content)) {
      tosat({
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
        `${baseUrl}/message`,
        { chatId: selectedChat._id, content },
        { headers: { accesstoken: userInfo.token } }
      );
     socket.emit("new message", data.detailsMessage);
      setMessages([...messages, data.detailsMessage]);
    } catch (e) {}
  };

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
            <Button colorScheme="teal" onClick={onOpen}>
              <i className="fa-regular fa-eye"></i>
              <Modal
                isOpen={isOpen}
                onClose={onClose}
                motionPreset="slideInBottom"
                isCentered
                size={{ base: "xs", sm: "sm", lg: "lg" }}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Chat With</ModalHeader>
                  <ModalBody
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    textAlign={{ base: "center", sm: "start" }}
                    gap={2}
                  >
                    <Image
                      src={
                        chatingUser?.profilePic?.secure_url ||
                        chatingUser?.baseSrc
                      }
                      w="160px"
                      h="160px"
                      borderRadius="50%"
                    ></Image>
                    <Text size="md">UserName : {chatingUser?.userName}</Text>
                    <Text size="md">Email : {chatingUser?.email}</Text>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="teal" onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
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
            ref={boxRef}
          >
            {messages && !loading ? (
              messages.map((message, index) => {
                return (
                  <Text
                    key={message?._id}
                    backgroundColor={"teal.500"}
                    m={"5px 10px"}
                    w={"fit-content"}
                    maxW={"85%"}
                    p={"3px 8px"}
                    borderRadius={"10px"}
                    color={commonStyle.mainFontColor}
                    alignSelf={`${messagesPosition(
                      messages,
                      index,
                      userInfo.user._id
                    )}`}
                  >
                    {message?.content}
                  </Text>
                );
              })
            ) : (
              <AbsoluteCenter axis="both">
                <Spinner color={commonStyle.focusBorderColor} size={"xl"} />
              </AbsoluteCenter>
            )}
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
