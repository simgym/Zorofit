import React, { useState } from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

const Sidebar = () => {
  const [usersDetailsArray, setUsersDetailsArray] = useState([]);
  // const [navAvatarList, setNavAvatarList] = useState("");
  console.log("userDetailsArray in Sidebar component is :", usersDetailsArray);

  return (
    <div className="zoro-sidebar">
      <Navbar usersDetailsArray={usersDetailsArray} />
      <Search />
      <Chats setUsersDetailsArray={setUsersDetailsArray} />
    </div>
  );
};

export default Sidebar;
