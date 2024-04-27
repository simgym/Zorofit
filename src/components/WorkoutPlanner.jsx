import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import WorkoutDetails from "./WorkoutDetails";
import { db, auth } from "../index";
import { getDocs, doc, collection, query, where } from "firebase/firestore";

const WorkoutPlanner = () => {
  // const selectedExerciseList = useSelector(
  //   (state) => state.exerciseReducer.userSelectedExerciseList
  // );
  // console.log(selectedExerciseList);

  const [myWorkoutData, setMyWorkoutData] = useState([]);

  const fetchData = async () => {
    // const docRef = doc(db, "users", `${auth.currentUser.uid}`, "exercises");
    // const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
    //   setMyWorkoutData(docSnap.data());
    //   console.log("document data is:", docSnap.data());
    // } else {
    //   console.log("No such doc found");
    // }

    const querySnapshot = await getDocs(
      collection(db, "users", `${auth.currentUser.uid}`, "exercises")
    );
    querySnapshot.forEach((doc) => {
      setMyWorkoutData((prev) => [...prev, doc.data()]); //stores every exercie 2 times in this state but only in development mode won't happen in production mode

      console.log(doc.id, "=>", doc.data());
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* <WorkoutDetails setWorkoutByUser={setMyWorkoutData} /> */}
      <h1>WorkoutPlanner</h1>
      <div>
        {myWorkoutData.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPlanner;
// const userDocRef = doc(
//   db,
//   "users",
//   `${auth.currentUser.uid}`,
//   "exercises",
//   `${exerciseItem.name}`
// );
