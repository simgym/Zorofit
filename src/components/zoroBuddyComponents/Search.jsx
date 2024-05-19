import React, { useState } from "react";
import defaultAvatar from "../../assets/default.jpg";

const Search = ({ setSearchUser }) => {
  return (
    <div className="zoro-user-search">
      <div className="zoro-searchForm">
        <input
          type="text"
          placeholder="search"
          onChange={(e) => setSearchUser(e.target.value)}
        />
      </div>
      {/* <div className="userChat">
        <img src={defaultAvatar} />
        <div className="userChatInfo">
          <span>Aditya</span>
          <p></p>
        </div>
      </div> */}
    </div>
  );
};

export default Search;
