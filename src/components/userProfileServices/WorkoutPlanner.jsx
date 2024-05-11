import React, { useState, useEffect } from "react";
import { db, auth } from "../../index";
import { getDocs, doc, collection, deleteDoc } from "firebase/firestore";

import Shimmer from "../../skeletons/Shimmer";

import "../../pages/Exercises.css";

import "react-loading-skeleton/dist/skeleton.css";

import Calendar from "../calender/Calender";

import { MdDelete } from "react-icons/md";

const WorkoutPlanner = () => {
  const [myWorkoutData, setMyWorkoutData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);

  const [deleteExercise, setDeleteExercise] = useState(false);

  //---------------------for calender---------------------------------
  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState(null);
  const [dataNotFound, setDataNotFound] = useState(false);

  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const d = new Date();
  let day = weekday[d.getDay()];

  const [selectedDay, setSelectedDay] = useState(day);

  const showDetailsHandle = (dayStr) => {
    setData(dayStr);
    setShowDetails(true);
  };
  // ------------------------------------------------------------------

  const fetchData = async () => {
    try {
      setLoading(true);
      const workoutData = [];
      console.log("day at workout handler: ", selectedDay);
      const querySnapshot = await getDocs(
        collection(db, "users", `${auth.currentUser.uid}`, selectedDay)
      );

      if (querySnapshot.empty) {
        console.log("No documents found");
        setDataNotFound(true);
      } else {
        setDataNotFound(false);
        querySnapshot.forEach((doc) => {
          workoutData.push(doc.data());
          console.log(doc.id, "=>", doc.data());
        });
        console.log("workoutDataArray :", workoutData);
        setMyWorkoutData(workoutData);
      }
      setDeleteExercise(false);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching documents: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDay, deleteExercise]);

  function getYouTubeVideoId(url) {
    // regular expression to extract video ID from YouTube URL
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    // matching the regular expression with the URL
    const match = url.match(regExp);

    // if match found return the video id else return null
    return match ? match[1] : null;
  }

  return (
    <div className="workout-planner-wrapper">
      <Calendar
        showDetailsHandle={showDetailsHandle}
        setSelectedDay={setSelectedDay}
      />
      <main className="exercise-wrapper">
        <div className="exercise-content">
          {loading && <Shimmer cards={15} />}

          {dataNotFound && (
            <li className="exercise-content-item">
              <div className="exercise-namuent">
                <span className="exercise-details-heading">
                  <p>No exercises for today</p>
                </span>
              </div>
            </li>
          )}

          {!dataNotFound &&
            myWorkoutData.map((exerciseItem, index) => (
              <li key={index} className="exercise-content-item">
                <button
                  className="workout-planner-delete"
                  onClick={async () => {
                    try {
                      if (auth.currentUser) {
                        const userDocRef = doc(
                          db,
                          "users",
                          `${auth.currentUser.uid}`,
                          selectedDay,
                          `${exerciseItem.name}`
                        );
                        await deleteDoc(userDocRef);
                        console.log("Document successfully deleted!");
                        setDeleteExercise(true);
                      } else {
                        window.alert("Login to deltete exercise");
                      }
                    } catch (error) {
                      console.error("Error deleting document: ", error);
                    }
                  }}
                >
                  <MdDelete />
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
                    {loadingVideo ? (
                      <p>Loading video...</p>
                    ) : (
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                          exerciseItem.video
                        )}`}
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
    </div>
  );
};

export default WorkoutPlanner;
