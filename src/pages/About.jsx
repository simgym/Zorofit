import React from "react";
import { auth } from "../index";
import defaultAvatar from "../assets/default.jpg";
import "./About.css";

const About = () => {
  console.log("Photo from auth : ", auth.currentUser.photoURL);
  return (
    <div className="aboutPageWrapper">
      {auth.currentUser.displayName}
      <img
        src={auth.currentUser.photoURL}
        style={{
          borderRadius: "50%",
          height: "300px",
          width: "300px",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default About;

/*
This page will contain :

user's name [editable]  [VISIBLE TO PUBLIC IN ZOROBUDDY]
user's Gym name [optional , editable] [VISIBLE TO PUBLIC IN ZOROBUDDY if wanted]
User's description [optional,editable] [VISIBLE TO PUBLIC IN ZOROBUDDY]
user's trainer name [optional,editable]


layout:

Name    [edit button]

--------------------------------------
user entered info
------------------------------------

along with each info there should be an edit button 

*/
