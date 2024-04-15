import React from "react";
import { useSelector } from "react-redux";
import WorkoutDetails from "./WorkoutDetails";

const WorkoutPlanner = () => {
  const selectedExerciseList = useSelector(
    (state) => state.exerciseReducer.userSelectedExerciseList
  );
  console.log(selectedExerciseList);
  return (
    <div>
      <WorkoutDetails />
      <h1>WorkoutPlanner</h1>
      <div>
        {selectedExerciseList.map((item) => (
          <li>{item.exercise}</li>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPlanner;
