import React, { useState } from "react";
import PerformanceTracker from "../components/PerformanceTracker";
import TrainerPlus from "../components/TrainerPlus";
import WorkoutPlanner from "../components/WorkoutPlanner";
import ZoroBuddy from "../components/ZoroBuddy";
import "./UserProfile.css";

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
        <ul>
          <li onClick={workoutHandler}>
            <p>Workout Planner</p>
          </li>
          <li onClick={performanceHandler}>
            <p>Performance Tracker</p>
          </li>
          <li onClick={trainerHandler}>
            <p>Trainer+</p>
          </li>
          <li onClick={zoroHandler}>
            <p>Zoro Buddy</p>
          </li>
        </ul>
      </div>
      <div className="bottom-panel"></div>
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
  );
};

export default UserProfile;
