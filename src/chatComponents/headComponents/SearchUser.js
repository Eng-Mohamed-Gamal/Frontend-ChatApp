import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  useDisclosure,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  DrawerBody,
  Input,
  useToast,
  VStack,
  StackDivider,
  Image,
  Heading,
  DrawerFooter,
} from "@chakra-ui/react";
import { commonStyle } from "../../commonStyle";
import axios from "axios";
import { baseUrl, getChatingUser, getUser } from "../../Logic";
import { useChatContext } from "../../Context/ChatContext";

function SearchUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [querySearch, setQuerySearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const { userTochat, setUserToChat, chats, setChats, setSelectedChat } =
    useChatContext();
  const userInfo = getUser();
  const toast = useToast();

  const getUsers = async () => {
    try {
      setLoading(true);
      if (
        querySearch === "" ||
        querySearch[0] === " " ||
        querySearch === undefined
      ) {
        toast({
          title: "Search Cannot By Empty Or Start With Space",
          isClosable: true,
          status: "info",
          duration: 3000,
          position: "top",
        });
        setLoading(false);
        setUsers([]);
        return;
      }
      const { data } = await axios.get(
        `${baseUrl}/user?search=${querySearch}`,
        { headers: { accesstoken: userInfo.token } }
      );
      setUsers(data.users);
    } catch (e) {
      toast({
        title: e.response.data.error_msg || e.response.data.errors,
        isClosable: true,
        status: "error",
        duration: 4000,
        position: "top",
      });
      setLoading(false);
      return;
    }
    setLoading(false);
    return;
  };

  const createChat = async () => {
    setLoadingCreate(true);
    try {
      const { data } = await axios.post(
        `${baseUrl}/chat?userId=${userTochat._id}`,
        {},
        { headers: { accesstoken: userInfo.token } }
      );
      toast({
        title: data.isChat
          ? `You Already Has A Chat With ${
              getChatingUser(data.isChat.users, userInfo.user._id).userName
            }`
          : `${data.message}`,
        isClosable: true,
        status: data.isChat ? "info" : "success",
        duration: 4000,
        position: "top",
      });
      if (data.chatDetails) setChats([...chats, data.chatDetails]);
      if (data.isChat) setSelectedChat(data.isChat);
    } catch (e) {
      toast({
        title: e.response.data.error_msg || e.response.data.errors,
        isClosable: true,
        status: "error",
        duration: 2000,
        position: "top",
      });
    }
    setLoadingCreate(false);
    onClose();
    setUsers([]);
    setUserToChat("");
  };

  useEffect(() => {
    setUsers([]);
    setUserToChat(undefined);
  }, [isOpen]);

  return (
    <Box>
      <Button gap={2} ref={btnRef} onClick={onOpen} colorScheme="teal">
        <i className="fa-solid fa-magnifying-glass"></i>
        <Text>Search User</Text>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader textAlign={"center"} p={"5px"}>
            Search Users
          </DrawerHeader>
          <Text textAlign={"center"} p={"5px"}>
            Search By UserName Or Email
          </Text>
          <DrawerBody overflowX={"hidden"}>
            <Box display="flex" gap={2}>
              <Input
                type="text"
                placeholder="Search Here"
                focusBorderColor={commonStyle.focusBorderColor}
                onChange={(e) => {
                  setQuerySearch(e.target.value);
                  setUsers([]);
                }}
              />
              <Button colorScheme="teal" onClick={getUsers} isLoading={loading}>
                Search
              </Button>
            </Box>
            <Box>
              <VStack
                divider={<StackDivider borderColor="teal.700" />}
                spacing={4}
                align="start"
                mt={"20px"}
              >
                <Heading w={"100%"} textAlign={"center"} fontSize={"20px"}>
                  {users.length} Users Found
                </Heading>

                {users &&
                  users.map((user) => {
                    return (
                      <Box
                        key={user._id}
                        w={"100%"}
                        display={"flex"}
                        gap={2}
                        alignItems={"center"}
                        backgroundColor={"teal.500"}
                        color={commonStyle.mainFontColor}
                        borderRadius={"10px"}
                        p={"10px"}
                        overflowWrap={"break-word"}
                        cursor={"pointer"}
                        onClick={() => {
                          setUserToChat(user);
                        }}
                      >
                        <Image
                          src={user?.profilePic?.secure_url || user?.baseSrc}
                          w="60px"
                          h="60px"
                          border={commonStyle.border}
                          borderRadius={"50%"}
                        />
                        <Box>
                          <Text fontSize={"lg"} textTransform={"capitalize"}>
                            {user.userName}
                          </Text>
                          <Text w={"150px"}>{user.email}</Text>
                        </Box>
                      </Box>
                    );
                  })}
              </VStack>
            </Box>
          </DrawerBody>
          <DrawerFooter display={"flex"} flexDirection={"column"} gap={3}>
            {userTochat && (
              <Button
                w={"100%"}
                colorScheme="teal"
                onClick={createChat}
                isLoading={loadingCreate}
              >
                Start Chat With {userTochat.userName}
              </Button>
            )}
            <Button onClick={onClose} colorScheme="red" alignSelf={"end"}>
              close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default SearchUser;
