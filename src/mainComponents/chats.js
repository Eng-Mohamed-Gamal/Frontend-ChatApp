import { Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Head from "../chatComponents/headComponents/Head";

import { commonStyle } from "../commonStyle";
import UserChats from "../chatComponents/userChatsComponents/userChats";
import { useChatContext } from "../Context/ChatContext";
import ChatBox from "../chatComponents/chatBoxComponents/chatBox";

export default function Chats() {
  const { setSelectedChat } = useChatContext();
  useEffect(() => {
    setSelectedChat(undefined);
  }, []);
  return (
    <Grid templateColumns="repeat(6 , 1fr)" gap={{ base: 0, lg: 3 }}>
      <GridItem colSpan={6} bg={commonStyle.mainBgColor} minHeight="80px">
        <Head />
      </GridItem>
      <GridItem
        colSpan={{ base: 6, lg: 2, xl: 2 }}
        h={{ base: "600px", sm: "580px" }}
        overflowY="auto"
        bg={commonStyle.mainBgColor}
        m={{ base: "20px", lg: "0px 0px 20px 20px" }}
        borderRadius="10px"
        position={"relative"}
      >
        <UserChats />
      </GridItem>
      <GridItem
        colSpan={{ base: 6, lg: 4, xl: 4 }}
        h={{ base: "600px", sm: "580px" }}
        overflowY="auto"
        bg={commonStyle.mainBgColor}
        m={{ base: "20px", lg: "0px 20px 20px 0px" }}
        borderRadius="10px"
        position={"relative"}
      >
        <ChatBox />
      </GridItem>
    </Grid>
  );
}
