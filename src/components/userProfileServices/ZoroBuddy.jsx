import Sidebar from "../zoroBuddyComponents/Sidebar";
import Chat from "../zoroBuddyComponents/Chat";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./ZoroBuddy.css";

const ZoroBuddy = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width:768px)");

  const handleSelectChat = (chatId) => {
    console.log("handleSelectChat called in ZOROBUDDY with", chatId);
    setSelectedChat(chatId);
    if (isSmallScreen) {
      setShowChat(true);
    }
    console.log("selectedChat updated to", chatId);
  };

  const handleBackToSidebar = () => {
    setShowChat(false);
  };

  return (
    <div className="zoro-wrapper">
      <div className="zoro-container">
        {isSmallScreen ? (
          showChat ? (
            <Chat selectedChat={selectedChat} onBack={handleBackToSidebar} />
          ) : (
            <Sidebar setSelectedChat={handleSelectChat} />
          )
        ) : (
          <>
            <Sidebar setSelectedChat={handleSelectChat} />
            <Chat selectedChat={selectedChat} />
          </>
        )}
      </div>
    </div>
  );
};

export default ZoroBuddy;
