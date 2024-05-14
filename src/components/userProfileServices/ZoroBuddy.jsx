import Sidebar from "../zoroBuddyComponents/Sidebar";
import Chat from "../zoroBuddyComponents/Chat";
import Chats from "../zoroBuddyComponents/Chats";
import { useState } from "react";
import "./ZoroBuddy.css";

const ZoroBuddy = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  // const [chattingWith, setChattingWith] = useState("");
  // const handleSelectChat = (chatId) => {
  //   setSelectedChat(chatId);
  // };

  return (
    <div className="zoro-wrapper">
      <div className="zoro-container">
        <Sidebar />
        <Chat selectedChat={selectedChat} />
        <Chats
          setSelectedChat={setSelectedChat}
          // setChattingWith={setChattingWith}
        />
      </div>
    </div>
  );
};

export default ZoroBuddy;
