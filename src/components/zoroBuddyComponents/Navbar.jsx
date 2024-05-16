import React from "react";
import "../userProfileServices/ZoroBuddy.css";
import defaultAvatar from "../../assets/default.jpg";

const Navbar = ({ usersDetailsArray }) => {
  const navAvatar = localStorage.getItem("navAvatar");
  return (
    <div className="zoro-navbar">
      <span className="zoro-logo">ZORO BUDDY</span>

      {/* {usersDetailsArray.map((user, index) => (
        <div className="zoro-user" key={index}>
          <img src={navAvatar ? navAvatar : defaultAvatar} alt="img" />
          <span>{user.name}</span>
        </div>
      ))} */}
    </div>
  );
};

export default Navbar;
