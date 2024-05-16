import Sidebar from "../zoroBuddyComponents/Sidebar";
import Chat from "../zoroBuddyComponents/Chat";
import Chats from "../zoroBuddyComponents/Chats";
import { useState } from "react";
import "./ZoroBuddy.css";

const ZoroBuddy = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  // const [chattingWith, setChattingWith] = useState("");
  const handleSelectChat = (chatId) => {
    console.log("handleSelectChat called in ZOROBUDDY with", chatId);
    setSelectedChat(chatId);
    console.log("selectedChat updated to", chatId);
  };
  // console.log("In ZoroBuddy, handleSelectChat is", selectedChat);
  return (
    <div className="zoro-wrapper">
      <div className="zoro-container">
        <Sidebar />
        <Chat selectedChat={selectedChat} />
        <Chats
          handleSelectChat={handleSelectChat}
          selectedChat={selectedChat}
          // setChattingWith={setChattingWith}
        />
      </div>
    </div>
  );
};

export default ZoroBuddy;
