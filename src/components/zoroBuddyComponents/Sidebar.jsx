import React, { useState } from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

const Sidebar = ({ setSelectedChat, setSelectedUserPic }) => {
  const [usersDetailsArray, setUsersDetailsArray] = useState([]);
  const [searchUser, setSearchUser] = useState("");

  return (
    <div className="zoro-sidebar">
      <Navbar usersDetailsArray={usersDetailsArray} />
      <Search setSearchUser={setSearchUser} />
      <Chats
        setUsersDetailsArray={setUsersDetailsArray}
        setSelectedChat={setSelectedChat}
        searchUser={searchUser}
        setSelectedUserPic={setSelectedUserPic}
      />
    </div>
  );
};

export default Sidebar;
