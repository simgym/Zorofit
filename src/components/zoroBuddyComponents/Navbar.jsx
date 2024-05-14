import React from "react";
import "../userProfileServices/ZoroBuddy.css";
import defaultAvatar from "../../assets/default.jpg";

const Navbar = ({ usersDetailsArray }) => {
  return (
    <div className="zoro-navbar">
      <span className="zoro-logo">ZORO BUDDY</span>

      {usersDetailsArray.map((user, index) => (
        <div className="zoro-user" key={index}>
          <img src={user.photoURL} alt="" />
          <span>{user.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
