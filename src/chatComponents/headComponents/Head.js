import {
  Box,
  Flex,
  Heading,

} from "@chakra-ui/react";

import React from "react";

import UserInfo from "./UserInfo";
import SearchUser from "./SearchUser";


function Head() {

  return (
    <Flex h="100%" align="center"  justify="space-between" p="10px 20px" wrap="wrap" gap={3}>
      <SearchUser/>
      <Box order={{base : 3 , sm : 0}} w={{base : "100%" , sm : "fit-content"}} textAlign="center">
        <Heading size="lg">Talk-A-Tive</Heading>
      </Box>
      <UserInfo/>
    </Flex>
  );
}

export default Head;
