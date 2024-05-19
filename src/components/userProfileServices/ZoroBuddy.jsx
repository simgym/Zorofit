import Sidebar from "../zoroBuddyComponents/Sidebar";
import Chat from "../zoroBuddyComponents/Chat";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./ZoroBuddy.css";

const ZoroBuddy = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [selectedUserPic, setSelectedUserPic] = useState("");

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
            <Chat
              selectedChat={selectedChat}
              onBack={handleBackToSidebar}
              selectedUserPic={selectedUserPic}
            />
          ) : (
            <Sidebar
              setSelectedChat={handleSelectChat}
              setSelectedUserPic={setSelectedUserPic}
            />
          )
        ) : (
          <>
            <Sidebar
              setSelectedChat={handleSelectChat}
              setSelectedUserPic={setSelectedUserPic}
            />
            <Chat
              selectedChat={selectedChat}
              selectedUserPic={selectedUserPic}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ZoroBuddy;
