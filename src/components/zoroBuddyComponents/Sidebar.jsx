import React, { useState } from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

const Sidebar = () => {
  const [usersDetailsArray, setUsersDetailsArray] = useState([]);

  return (
    <div className="zoro-sidebar">
      <Navbar usersDetailsArray={usersDetailsArray} />
      <Search />
      <Chats setUsersDetailsArray={setUsersDetailsArray} />
    </div>
  );
};

export default Sidebar;
