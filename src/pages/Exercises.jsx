import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { exerciseAction } from "../store/ExerciseStore";
import sampleImg from "../assets/2.jpg";
import Shimmer from "../skeletons/Shimmer";
import { auth, db } from "../index";
import {
  doc,
  updateDoc,
  arrayUnion,
  collection,
  setDoc,
} from "firebase/firestore";
import firebase from "firebase/compat/app";
import "./Exercises.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/*
Below homepage we can create a body image labeling all the muscles and try to
add animations to it

// Handle the edge cases if array is empty or any parameter is empty or something else

fix firestore issue for a new user always creaet a exercise array field

fix youtbe issue because something is causing this component to render hunreds or thousands of times at once so it is reaching its quota
look for state changes , useEffect , try using useCallback or something to solve this issue
*/

const Exercises = () => {
  let type = useSelector((state) => state.exerciseReducer.type);
  const [muscle, setMuscle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [exerciseData, setExerciseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exerciseNameData, setExerciseNameData] = useState([]);
  const [exerciseVideos, setExerciseVideos] = useState([]);

  console.log("exercise names are :", exerciseNameData);

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

  //----------------------------------------------------------

  // for youtube API

  useEffect(() => {
    const fetchVideos = async () => {
      const exVideos = [];

      for (let i = 0; i < exerciseNameData.length; i++) {
        const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${
          exerciseNameData[i]
        }&key=${import.meta.env.VITE_youtube_key}`;

        try {
          const response = await fetch(youtubeUrl, {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Something is wrong with youtube API");
          }
          const data = await response.json();
          console.log("youtube search result: ", data);

          // Log the video links
          data.items.forEach((item) => {
            const videoId = item.id.videoId;
            const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
            exVideos.push(videoUrl);
          });
        } catch (error) {
          console.log(error);
        }
      }

      setExerciseVideos(exVideos);
      console.log("exercise videos are : ", exVideos);
    };
    fetchVideos();
  }, []);

  //----------------------------------------------
  const trainingData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Api-Key": import.meta.env.VITE_exerciseNinja_key,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something is wrong with exercise API");
      }

      const data = await response.json();
      setExerciseData(data);
      console.log(data);

      const exName = data.map((item) => item.name);
      setExerciseNameData(exName);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    trainingData();
  }, [url]);

  // const addExerciseHandler = async () => {
  //   if (auth.currentUser) {
  //     const userRef = doc(db, "users", `${auth.currentUser.uid}`);
  //     await updateDoc(userRef, { exercises: [...exercises] });
  //   } else {
  //     window.alert("Login to add exercise");
  //   }
  // };

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
              onClick={async () => {
                if (auth.currentUser) {
                  // const userDocRef = doc(db, "users", `${auth.currentUser.uid}`);
                  // const userColRef = collection(userDocRef,"exercises")
                  const userDocRef = doc(
                    db,
                    "users",
                    `${auth.currentUser.uid}`,
                    "exercises",
                    `${exerciseItem.name}`
                  );
                  // await updateDoc(userDocRef, {
                  //   exercises: arrayUnion(exerciseItem.name),
                  // });
                  setDoc(userDocRef, {
                    instructions: exerciseItem.instructions,
                    video: "youtube video will be stored here",
                    muscle: exerciseItem.muscle,
                    type: exerciseItem.type,
                    name: exerciseItem.name,
                  });
                } else {
                  window.alert("Login to add exercise");
                }
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
                <p>
                  {exerciseItem.instructions
                    ? exerciseItem.instructions
                    : "Instructions not available"}
                </p>
              </span>
              <span className="exercise-form">
                {/* VIDEO WILL GO HERE */}
                {/* <img src={sampleImg} /> */}
                {exerciseVideos[index] ? (
                  <iframe
                    src={"https://www.youtube.com/watch?v=pRkHLluG-V8"}
                    title="YouTube Video"
                    allowFullScreen
                  />
                ) : (
                  <p>No video available</p>
                )}
              </span>
            </div>
          </li>
        ))}
      </div>
    </main>
  );
};

export default Exercises;
