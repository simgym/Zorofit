import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Shimmer from "../skeletons/Shimmer";
import { auth, db } from "../index";
import { doc, setDoc } from "firebase/firestore";
import "./Exercises.css";
import "react-loading-skeleton/dist/skeleton.css";

// check the code Youtube API is giving too many responses

const Exercises = () => {
  const type = useSelector((state) => state.exerciseReducer.type);
  const [muscle, setMuscle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [exerciseData, setExerciseData] = useState([]);
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [error, setError] = useState(null);

  // Cache for YouTube video URLs
  const [videoCache, setVideoCache] = useState({});

  useEffect(() => {
    if (!localStorage.getItem("youtubeApiCallCount")) {
      localStorage.setItem("youtubeApiCallCount", 0);
    }
  }, []);

  const incrementApiCallCount = () => {
    let count = parseInt(localStorage.getItem("youtubeApiCallCount"), 10);
    count += 1;
    localStorage.setItem("youtubeApiCallCount", count);
    console.log("YouTube API call count:", count);
  };

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

  const fetchVideoUrl = async (exerciseName) => {
    if (videoCache[exerciseName]) {
      return videoCache[exerciseName];
    }

    const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${exerciseName}&key=${
      import.meta.env.VITE_youtube_key
    }`;
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
      setVideoCache((prevCache) => ({
        ...prevCache,
        [exerciseName]: videoUrl,
      }));
      incrementApiCallCount();
      return videoUrl;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const fetchVideos = async (data) => {
    setLoadingVideo(true);
    const exVideos = await Promise.all(
      data.map(async (exerciseItem) => {
        const videoUrl = await fetchVideoUrl(exerciseItem.name);
        return videoUrl;
      })
    );
    setExerciseVideos(exVideos);
    setLoadingVideo(false);
  };

  const fetchTrainingData = async () => {
    setLoading(true);
    setError(null);
    const url = `https://api.api-ninjas.com/v1/exercises?type=${type}&muscle=${muscle}&difficulty=${difficulty}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Api-Key": "YyOwY4yWPhLbZ3fYUWuNhg==tAkiseZZr3E3Xnvk",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Something is wrong with the exercise API");
      }
      const data = await response.json();
      console.log("data for trainingData API is : ", data);
      setExerciseData(data);
      if (data.length > 0) {
        fetchVideos(data);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to load exercises.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainingData();
  }, [type, muscle]);

  const handleDaySelection = async (selectedDay, exerciseItem, index) => {
    if (auth.currentUser) {
      if (selectedDay) {
        const userDocRef = doc(
          db,
          "users",
          auth.currentUser.uid,
          selectedDay,
          exerciseItem.name
        );
        try {
          await setDoc(userDocRef, {
            instructions: exerciseItem.instructions,
            video: exerciseVideos[index],
            muscle: exerciseItem.muscle,
            type: exerciseItem.type,
            difficulty: exerciseItem.difficulty,
            name: exerciseItem.name,
            equipment: exerciseItem.equipment,
          });
        } catch (error) {
          console.log("Error adding document: ", error);
        }
      } else {
        window.alert("Select a day");
      }
    } else {
      window.alert("Login to add exercise or select a day");
    }
  };

  return (
    <main className="exercise-wrapper">
      {error && <p className="error">{error}</p>}
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
        {exerciseData.length === 0 && !loading && (
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
            <select
              onChange={(e) =>
                handleDaySelection(e.target.value, exerciseItem, index)
              }
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
                  {exerciseItem.instructions || "Instructions not available"}
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
