import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Shimmer from "../skeletons/Shimmer";
import { auth, db } from "../index";
import { doc, setDoc } from "firebase/firestore";
import "./Exercises.css";
import "react-loading-skeleton/dist/skeleton.css";

const Exercises = () => {
  let type = useSelector((state) => state.exerciseReducer.type);
  const [muscle, setMuscle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [exerciseData, setExerciseData] = useState([]);
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);

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

  const workoutDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  useEffect(() => {
    const fetchVideos = async () => {
      setLoadingVideo(true);
      const exVideos = [];

      if (exerciseData.length === 10) {
        for (let i = 0; i < exerciseData.length && i < 10; i++) {
          const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${
            exerciseData[i].name
          }&key=${import.meta.env.VITE_youtube_key}`;

          try {
            const response = await fetch(youtubeUrl, {
              method: "GET",
              headers: {
                Accept: "application/json",
              },
            });

            if (!response.ok) {
              throw new Error("Something is wrong with the YouTube API");
            }

            const data = await response.json();
            const videoId = data.items[0].id.videoId;
            const videoUrl = `https://www.youtube.com/embed/${videoId}`;
            exVideos.push(videoUrl);
          } catch (error) {
            console.log(error);
          }
        }
      }
      setExerciseVideos(exVideos);
      setLoadingVideo(false);
    };

    fetchVideos();
  }, [exerciseData]);

  const trainingData = async () => {
    setLoading(true);
    const url = `https://api.api-ninjas.com/v1/exercises?type=${type}&muscle=${muscle}&difficulty=${difficulty}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Api-Key": import.meta.env.VITE_exerciseNinja_key,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something is wrong with the exercise API");
      }

      const data = await response.json();
      setExerciseData(data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    trainingData();
  }, [type, muscle]);

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
            <select // for adding exercise to a day
              onChange={(e) => {
                const selectedDay = e.target.value;
                // logic to add exercise data for the selected day
                if (auth.currentUser) {
                  if (selectedDay) {
                    const userDocRef = doc(
                      db,
                      "users",
                      `${auth.currentUser.uid}`,
                      selectedDay,
                      `${exerciseItem.name}`
                    );
                    setDoc(userDocRef, {
                      instructions: exerciseItem.instructions,
                      video: "https://www.youtube.com/watch?v=9pSu_v4E-Ck", // this is dummy video for styling workout planner
                      muscle: exerciseItem.muscle,
                      type: exerciseItem.type,
                      difficulty: exerciseItem.difficulty,
                      name: exerciseItem.name,
                      equipment: exerciseItem.equipment,
                    });
                  } else {
                    window.alert("Select a day");
                  }
                } else {
                  window.alert("Login to add exercise or select a day");
                }
              }}
            >
              <option value="">+</option>
              {workoutDays.map((day, index) => (
                <option key={index} value={day}>
                  {day}
                </option>
              ))}
            </select>
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
                {loadingVideo ? (
                  <p>Loading video...</p>
                ) : (
                  <iframe
                    src={exerciseVideos[index]}
                    title="YouTube Video"
                    allowFullScreen
                  />
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
