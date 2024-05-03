import { createContext, useContext, useState } from "react";

const chatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [userTochat, setUserToChat] = useState();
  const [fetchAgain , setFetchAgain] = useState(false)


  return (
    <chatContext.Provider
      value={{
        userTochat,
        setUserToChat,
        chats,
        setChats,
        messages,
        setMessages,
        selectedChat,
        setSelectedChat,
        fetchAgain ,
        setFetchAgain
      }}
    >
      {children}
    </chatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(chatContext);
};
