import React, { useState } from "react";
import { auth } from "../index";
import defaultAvatar from "../assets/default.jpg";
import AboutInput from "./AboutInput";
import BasicTimeline from "./TimelineComp";
import "./About.css";

const About = () => {
  const [showModal, setShowModal] = useState(false);

  const dummyData = {
    favouriteExercises: ["Squats", "Decline bench press", "Triceps pushdown"],
    gymPlaylist: [
      "Eye of the Tiger - Survivor",
      "Stronger - Kanye West",
      "Can't Hold Us - Macklemore & Ryan Lewis Lewis",
    ], // for gym playlist use spotify playlist to get the link to the playlist here
    gymExperience: [
      {
        gymName: "Gold's Gym",
        city: "Los Angeles",
        country: "USA",
        joinDate: "2019-05-10",
      },
      {
        gymName: "FitNation",
        city: "Chicago",
        country: "USA",
        joinDate: "2020-08-15",
      },
      {
        gymName: "The Strength Hub",
        city: "Mumbai",
        country: "India",
        joinDate: "2021-11-22",
      },
    ],
    bio: "Passionate about fitness and always pushing my limits.", // have max 160 charcters limit
    gymCrush: "The girl with the perfect squat form.",
    currentWorkoutMethod: "Bodybuilding",
    weight: 85, // in kg
    height: 190, // in cm
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="aboutPageWrapper">
      <div className="aboutCards">
        {" "}
        <div className="leftAboutCard">
          {" "}
          <div className="firstAboutCard">
            <span className="aboutImageWrapper">
              <img
                src={auth.currentUser.photoURL || defaultAvatar}
                alt="User Avatar"
              />
            </span>
            <span className="aboutUserBasicDetailsWrapper">
              <span> {auth.currentUser.displayName}</span>
              <span>Method followed</span>
            </span>
          </div>
          <div className="secondAboutCard">
            <div className="secondAboutCardHead">
              <h2>Experience</h2>
            </div>
            <div className="secondAboutCardCont">
              <BasicTimeline gymExperience={dummyData.gymExperience} />
            </div>
          </div>
        </div>
        <div className="rightAboutCard">
          {" "}
          <div className="thirdAboutCard">
            <div className="thirdAboutCardHead">
              <h2>Playlist</h2>
            </div>
            <div className="thirdAboutCardCont">
              {dummyData.gymPlaylist.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </div>
          </div>
          <div className="fourthAboutCard">
            <div className="fourthAboutCardHead">
              <h2>Fav Exercises</h2>
            </div>
            <div className="fourthAboutCardCont">
              {dummyData.favouriteExercises.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </div>
            <div className=""></div>
          </div>
          <div className="editButtonWrap">
            {" "}
            <button className="editButton" onClick={toggleModal}>
              Edit
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modalBackdrop">
          {/* <button className="closeButton" onClick={toggleModal}>
            X
          </button> */}
          <AboutInput toggleModal={toggleModal} />
        </div>
      )}
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
user's selected membership plan


layout:

Name    [edit button]

--------------------------------------
user entered info
------------------------------------

along with each info there should be an edit button 

*/
