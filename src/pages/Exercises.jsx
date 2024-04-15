import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { exerciseAction } from "../store/ExerciseStore";
import sampleImg from "../assets/2.jpg";
import Shimmer from "../skeletons/Shimmer";
import { auth } from "../index";

import "./Exercises.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/*
Below homepage we can create a body image labeling all the muscles and try to
add animations to it

// Handle the edge cases if array is empty or any parameter is empty or something else
*/

const Exercises = () => {
  let type = useSelector((state) => state.exerciseReducer.type);
  const [muscle, setMuscle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [exerciseData, setExerciseData] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const muscleList = [
    "Shoulders",
    "Abdominals",
    "Abductors",
    "Biceps",
    "Calves",
    "Chest",
    "Forearms",
    "Glutes",
    "Hamstrings",
    "Lats",
    "Lower_back",
    "Middle_back",
    "Neck",
    "Quadriceps",
    "Traps",
    "Triceps",
  ];

  // const difficultyList = ["beginner", "intermediate", "expert"];

  let url = `https://api.api-ninjas.com/v1/exercises?type=${type}&muscle=${muscle}&difficulty=${difficulty}`;

  const trainingData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Api-Key": "YyOwY4yWPhLbZ3fYUWuNhg==tAkiseZZr3E3Xnvk",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something is wrong with exercise API");
      }

      const data = await response.json();
      setExerciseData(data);
      console.log(data);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    trainingData();
  }, [url]);

  return (
    <main className="exercise-wrapper">
      <div className="parameter-wrapper">
        <select
          className="muscle-wrapper"
          onChange={(e) => setMuscle(e.target.value)}
        >
          <option value="">Select Muscle</option>
          {muscleList.map((muscleItem, index) => (
            <option key={index}>{muscleItem}</option>
          ))}
        </select>
      </div>
      <div className="exercise-content">
        {loading && <Shimmer cards={15} />}
        {exerciseData.length === 0 && (
          <li className="exercise-content-item">
            <div className="exercise-namuent">
              <span className="exercise-details-heading">
                <p>Exercise Not in database</p>
              </span>
            </div>
          </li>
        )}

        {exerciseData.map((exerciseItem, index) => (
          <li key={index} className="exercise-content-item">
            <button
              onClick={() => {
                auth.currentUser
                  ? dispatch(
                      exerciseAction.userSelectedExercises({
                        exercise: exerciseItem.name,
                      })
                    )
                  : window.alert("Login to add exercise");
              }}
            >
              +
            </button>
            <div className="exercise-namuent">
              <span className="exercise-details-heading">
                <p>{exerciseItem.name}</p>
              </span>
              <span className="muscle-equipment">
                <div className="exercise-details">
                  <h4>Muscle:</h4>
                  <p>{exerciseItem.muscle}</p>
                </div>
                <div className="exercise-details">
                  <h4>Equipment:</h4>
                  <p>{exerciseItem.equipment}</p>
                </div>
              </span>
              <span className="exercise-dity">
                <div className="exercise-details">
                  <h4>Difficulty:</h4>
                  <p>{exerciseItem.difficulty}</p>
                </div>
                <div className="exercise-details">
                  <h4>Type:</h4>
                  <p>{exerciseItem.type}</p>
                </div>
              </span>
            </div>
            <div className="instruction-videos">
              <span className="instructions">
                <h4>INSTRUCTIONS</h4>
                <p>{exerciseItem.instructions}</p>
              </span>
              <span className="exercise-form">
                {/* VIDEO WILL GO HERE */}
                <img src={sampleImg} />
              </span>
            </div>
          </li>
        ))}
      </div>
    </main>
  );
};

export default Exercises;
