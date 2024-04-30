import { createContext, useContext, useState } from "react";

const chatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [userTochat, setUserToChat] = useState();


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
        setSelectedChat
      }}
    >
      {children}
    </chatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(chatContext);
};
