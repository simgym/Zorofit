import React, { useState } from "react";
import PerformanceTracker from "../components/userProfileServices/PerformanceTracker";
import TrainerPlus from "../components/userProfileServices/TrainerPlus";
import WorkoutPlanner from "../components/userProfileServices/WorkoutPlanner";
import ZoroBuddy from "../components/userProfileServices/ZoroBuddy";
import "./UserProfile.css";

import { SlCalender } from "react-icons/sl";
import { GiSprint } from "react-icons/gi";
import { CgNotes } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";

const UserProfile = () => {
  const [plannerIsActve, setPlannerIsActive] = useState(true);
  const [trainerIsActive, setTrainerIsActive] = useState(false);
  const [performanceIsActive, setPerformanceIsActive] = useState(false);
  const [buddyIsActive, setBuddyIsActive] = useState(false);

  const workoutHandler = () => {
    setPlannerIsActive(true);
    setTrainerIsActive(false);
    setPerformanceIsActive(false);
    setBuddyIsActive(false);
  };
  const performanceHandler = () => {
    setPlannerIsActive(false);
    setTrainerIsActive(false);
    setPerformanceIsActive(true);
    setBuddyIsActive(false);
  };
  const trainerHandler = () => {
    setPlannerIsActive(false);
    setTrainerIsActive(true);
    setPerformanceIsActive(false);
    setBuddyIsActive(false);
  };
  const zoroHandler = () => {
    setPlannerIsActive(false);
    setTrainerIsActive(false);
    setPerformanceIsActive(false);
    setBuddyIsActive(true);
  };

  return (
    <div className="user-wrapper">
      <div className="top-panel">
        <ul className="top-panel-list">
          <li onClick={workoutHandler}>
            <p>
              <SlCalender />
              Workout Planner
            </p>
          </li>
          <li onClick={performanceHandler}>
            <p>
              <GiSprint />
              Performance Tracker
            </p>
          </li>
          <li onClick={trainerHandler}>
            <p>
              <CgNotes />
              Trainer+
            </p>
          </li>
          <li onClick={zoroHandler}>
            <p>
              <FaUserFriends />
              Zoro Buddy
            </p>
          </li>
        </ul>
      </div>
      <div className="bottom-panel">
        <div>
          {plannerIsActve &&
            !trainerIsActive &&
            !performanceIsActive &&
            !buddyIsActive && <WorkoutPlanner />}
        </div>
        <div>
          {!plannerIsActve &&
            !trainerIsActive &&
            performanceIsActive &&
            !buddyIsActive && <PerformanceTracker />}
        </div>
        <div>
          {!plannerIsActve &&
            trainerIsActive &&
            !performanceIsActive &&
            !buddyIsActive && <TrainerPlus />}
        </div>
        <div>
          {!plannerIsActve &&
            !trainerIsActive &&
            !performanceIsActive &&
            buddyIsActive && <ZoroBuddy />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
