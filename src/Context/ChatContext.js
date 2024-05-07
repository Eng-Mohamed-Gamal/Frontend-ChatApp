import { createContext, useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"

const chatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [userTochat, setUserToChat] = useState();
  const [fetchAgain , setFetchAgain] = useState(false)

  const navigate = useNavigate()

  useEffect(()=>{
    if(!localStorage.userData) navigate("/")
  })


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
